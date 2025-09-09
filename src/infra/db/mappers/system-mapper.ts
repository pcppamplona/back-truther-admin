import { System } from '@/domain/systems/model/system'

export class SystemMapper {
  static toSystem(row: any): System | null {
    if (!row) {
      return null
    }
    
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      created_at: row.created_at,
      updated_at: row.updated_at
    }
  }

  static toSystemList(rows: any[]): System[] {
    if (!rows || rows.length === 0) {
      return []
    }
    
    return rows.map(row => this.toSystem(row)).filter((system): system is System => system !== null)
  }
}