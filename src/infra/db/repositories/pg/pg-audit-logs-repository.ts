import { PostgresDatabase } from '../../pg/connection'
import { AuditLog } from '@/domain/audit-logs/model/audit-log'
import { AuditLogPaginationParams } from '@/domain/audit-logs/model/audit-log-pagination-params'
import { AuditLogsRepository, CreateAuditLogData } from '@/domain/audit-logs/repositories/audit-logs-repository'
import { AuditLogMapper } from '../../mappers/audit-log-mapper'
import { PaginatedResult } from '@/shared/pagination'

export class PgAuditLogsRepository implements AuditLogsRepository {
  async create(data: CreateAuditLogData): Promise<AuditLog> {
    const client = await PostgresDatabase.getClient()
    try {
      const result = await client.query(
        `INSERT INTO audit_logs (
          method, 
          action, 
          message, 
          description, 
          sender_type, 
          sender_id, 
          target_type, 
          target_id,
          target_external_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [
          data.method,
          data.action,
          data.message,
          data.description || null,
          data.sender_type,
          data.sender_id,
          data.target_type,
          data.target_id,
          data.target_external_id || null
        ]
      )
      const auditLog = AuditLogMapper.toAuditLog(result.rows[0])
      if (!auditLog) {
        throw new Error('Falha ao criar log de auditoria')
      }
      return auditLog
    } finally {
      client.release()
    }
  }
  
  // Métodos auxiliares privados para reduzir duplicação de código
  private async fetchUserNames(client: any, ids: string[]): Promise<Record<string, string>> {
    if (ids.length === 0) return {};
    
    const uniqueIds = [...new Set(ids)];
    const result = await client.query(
      `SELECT id, username FROM users WHERE id IN (${uniqueIds.map((_, i) => `$${i + 1}`).join(',')})`,
      uniqueIds
    );
    
    const nameMap: Record<string, string> = {};
    result.rows.forEach(row => {
      nameMap[row.id] = row.username;
    });
    
    return nameMap;
  }
  
  private async fetchSystemNames(client: any, ids: string[]): Promise<Record<string, string>> {
    if (ids.length === 0) return {};
    
    const uniqueIds = [...new Set(ids)];
    const result = await client.query(
      `SELECT id, name FROM systems WHERE id IN (${uniqueIds.map((_, i) => `$${i + 1}`).join(',')})`,
      uniqueIds
    );
    
    const nameMap: Record<string, string> = {};
    result.rows.forEach(row => {
      nameMap[row.id] = row.name;
    });
    
    return nameMap;
  }
  
  private collectIds(auditLogs: AuditLog[]): {
    userSenderIds: string[],
    systemSenderIds: string[],
    userTargetIds: string[],
    systemTargetIds: string[]
  } {
    const userSenderIds: string[] = [];
    const systemSenderIds: string[] = [];
    const userTargetIds: string[] = [];
    const systemTargetIds: string[] = [];
    
    auditLogs.forEach(log => {
      if (log.sender_type === 'USER') {
        userSenderIds.push(log.sender_id);
      } else {
        systemSenderIds.push(log.sender_id);
      }
      
      if (log.target_type === 'USER') {
        userTargetIds.push(log.target_id);
      } else {
        systemTargetIds.push(log.target_id);
      }
    });
    
    return { userSenderIds, systemSenderIds, userTargetIds, systemTargetIds };
  }
  
  private async enrichAuditLogs(
    client: any, 
    auditLogs: AuditLog[]
  ): Promise<AuditLog[]> {
    // Coletar IDs únicos de remetentes e destinatários por tipo
    const { userSenderIds, systemSenderIds, userTargetIds, systemTargetIds } = this.collectIds(auditLogs);
    
    // Buscar nomes de usuários para remetentes e destinatários do tipo USER
    const userSenderMap = await this.fetchUserNames(client, userSenderIds);
    const userTargetMap = await this.fetchUserNames(client, userTargetIds);
    
    // Buscar nomes para remetentes e destinatários do tipo sistema de forma simplificada
    const systemSenderMap = await this.fetchSystemNames(client, systemSenderIds);
    const systemTargetMap = await this.fetchSystemNames(client, systemTargetIds);
    
    // Adicionar sender_name e target_name a cada log de auditoria
    auditLogs.forEach(log => {
      // Processar sender_name
      if (log.sender_type === 'USER') {
        log.sender_name = userSenderMap[log.sender_id] || `Usuário ${log.sender_id}`;
      } else {
        // Simplificar nome do sistema para sender
        log.sender_name = systemSenderMap[log.sender_id] || `Sistema ${log.sender_type}`;
      }
      
      // Processar target_name
      if (log.target_type === 'USER') {
        // Para USER, usar o username da tabela users
        log.target_name = userTargetMap[log.target_id] || `Usuário ${log.target_id}`;
      } else {
        // Para outros tipos, simplificar o nome do sistema
        log.target_name = systemTargetMap[log.target_id] || `Sistema ${log.target_type}`;
        
        // Se tiver target_external_id e for diferente de USER, buscar o usuário relacionado
        if (log.target_external_id) {
          // Adicionar informação do usuário externo ao nome do target quando disponível
          const externalUser = userTargetMap[log.target_external_id];
          if (externalUser) {
            log.target_name += ` (${externalUser})`;
          }
        }
      }
    });
    
    return auditLogs;
  }

  async findAll(): Promise<AuditLog[]> {
    const client = await PostgresDatabase.getClient()
    try {
      const result = await client.query(
        `SELECT * FROM audit_logs ORDER BY created_at DESC`
      )
      
      // Obter os logs de auditoria
      const auditLogs = AuditLogMapper.toAuditLogList(result.rows);
      
      // Enriquecer os logs com nomes de remetentes e destinatários
      await this.enrichAuditLogs(client, auditLogs);
      
      return auditLogs;
    } finally {
      client.release()
    }
  }

  async findById(id: number): Promise<AuditLog | null> {
    const client = await PostgresDatabase.getClient()
    try {
      const result = await client.query(
        `SELECT * FROM audit_logs WHERE id = $1 LIMIT 1`,
        [id]
      )
      if (result.rowCount === 0) return null
      
      // Obter o log de auditoria
      const auditLog = AuditLogMapper.toAuditLog(result.rows[0])
      if (!auditLog) return null
      
      // Enriquecer o log com nomes de remetente e destinatário
      await this.enrichAuditLogs(client, [auditLog]);
      
      return auditLog
    } finally {
      client.release()
    }
  }

  async findPaginated(params: AuditLogPaginationParams): Promise<PaginatedResult<AuditLog>> {
    const {
      page,
      limit,
      search,
      sortBy = "created_at",
      sortOrder = "DESC",
      action,
      method,
      sender_id,
      sender_type,
      target_id,
      target_type,
      target_external_id,
      created_after,
      created_before
    } = params;
    const client = await PostgresDatabase.getClient();

    const offset = (page - 1) * limit;

    const allowedSortBy = [
      "id",
      "method",
      "action",
      "message",
      "created_at",
      "sender_type",
      "sender_id",
      "target_type",
      "target_id",
      "target_external_id"
    ];
    const safeSortBy = allowedSortBy.includes(sortBy) ? sortBy : "created_at";
    const safeSortOrder = sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const where: string[] = [];
    const values: any[] = [];

    if (search) {
      values.push(`%${search}%`);
      where.push(
        `(message ILIKE $${values.length} OR method ILIKE $${values.length})`
      );
    }
    
    if (action) {
      values.push(action);
      where.push(`action = $${values.length}`);
    }
    
    if (method) {
      values.push(method);
      where.push(`method = $${values.length}`);
    }
    
    if (sender_id) {
      values.push(sender_id);
      where.push(`sender_id = $${values.length}`);
    }
    
    if (sender_type) {
      values.push(sender_type);
      where.push(`sender_type = $${values.length}`);
    }
    
    if (target_id) {
      values.push(target_id);
      where.push(`target_id = $${values.length}`);
    }
    
    if (target_type) {
      values.push(target_type);
      where.push(`target_type = $${values.length}`);
    }
    
    if (target_external_id) {
      values.push(target_external_id);
      where.push(`target_external_id = $${values.length}`);
    }
    
    if (created_after) {
      values.push(created_after);
      where.push(`created_at >= $${values.length}`);
    }
    
    if (created_before) {
      values.push(created_before);
      where.push(`created_at <= $${values.length}`);
    }

    const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

    try {
      const query = `
      SELECT * FROM audit_logs
      ${whereClause}
      ORDER BY ${safeSortBy} ${safeSortOrder}
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
    `;

      const countQuery = `
      SELECT COUNT(*)::int AS total FROM audit_logs
      ${whereClause}
    `;

      const result = await client.query(query, [...values, limit, offset]);
      const countResult = await client.query(countQuery, values);
      
      // Obter os logs de auditoria
      const auditLogs = AuditLogMapper.toAuditLogList(result.rows);
      
      // Enriquecer os logs com nomes de remetentes e destinatários
      await this.enrichAuditLogs(client, auditLogs);

      return {
        data: auditLogs,
        total: Number(countResult.rows[0].total),
        page,
        limit
      };
    } finally {
      client.release()
    }
  }
}