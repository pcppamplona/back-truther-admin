import type { DecisionKycStatus, UserTrutherWithWallet, Wallet } from '@/domain/user-truther/model/user-truther'
import { UsersTrutherRepository, UserTrutherPaginationParams } from '@/domain/user-truther/repositories/user-truther-repository'
import { UserDetailedInfo } from '@/domain/user-truther/model/user-detailed-info'
import { UserImage } from '@/domain/user-truther/model/user-image'
import { KycUser } from '@/domain/user-truther/model/kyc-user'
import { Customer } from '@/domain/user-truther/model/customer'
import { UserInfo } from '@/domain/clients/model/userinfo'
import { PaginatedResult, PaginationParams } from '@/shared/pagination'

import { PostgresDatabase } from '../../pg/connection'
import { UserMapper } from '../../mappers/user-mapper'
import { WalletMapper } from '../../mappers/wallet-mapper'
import { UserInfoMapper } from '../../mappers/user-info-mapper'
import { UserImageMapper } from '../../mappers/user-image-mapper'
import { KycUserMapper } from '../../mappers/kyc-user-mapper'
import { CustomerMapper } from '../../mappers/customer-mapper'

export class PgUserTrutherRepository implements UsersTrutherRepository {
  async findDetailedUserInfoById(userId: number): Promise<UserDetailedInfo | null> {
    const trutherClient = await PostgresDatabase.getClient('truther')
    let banksClient = null
    
    try {
      // 1. Buscar usuário com carteiras
      const userResult = await trutherClient.query(
        `SELECT 
          u.id, 
          u.name, 
          u.role, 
          u.is_verified, 
          u.can_transact, 
          u.status, 
          u.fee_level_id, 
          u.created_at, 
          u.updated_at, 
          u.flags, 
          u.expo_id, 
          u.kyc_approved, 
          u.kyc_risk, 
          u.banking_enable, 
          u.disinterest, 
          u.register_txid, 
          u.called_attempts_guenno, 
          u.stage_kyc, 
          u.comment_kyc, 
          u."providerKyc", 
          u."attemptsKyc", 
          u.password, 
          u."ipCreate", 
          u.error, 
          u.restrict, 
          u.override_instant_pay, 
          u.uuid, 
          u."lastLogin", 
          u."lastIpLogin", 
          u."retryKyc", 
          u."regenerateKyc", 
          u.master_instant_pay,
          w.id as wallet_id, 
          w.address, 
          w.device_id, 
          w.user_id, 
          w.salt, 
          w.created_at as wallet_created_at, 
          w.updated_at as wallet_updated_at, 
          w.type, 
          w.locked_balance, 
          w.balance, 
          w.protocol, 
          w.custodian, 
          w.new_wallet, 
          w."usdtBalance", 
          w."usdtLockedBalance"
        FROM public.users u
        LEFT JOIN public.wallets w ON u.id = w.user_id
        WHERE u.id = $1`,
        [userId]
      )
      
      if (userResult.rows.length === 0) {
        return null
      }
      
      // Mapear dados do usuário
      const user = UserMapper.toUserTrutherWithWallet(userResult.rows[0])
      
      // Adicionar carteiras ao usuário
      for (const row of userResult.rows) {
        const wallet = WalletMapper.toWallet(row)
        if (wallet) {
          user.wallets.push(wallet)
        }
      }
      
      // 2. Buscar informações do usuário
      const userInfoResult = await trutherClient.query(
        `SELECT id, user_id, "name", "document", document_type, email, phone, nationality, 
                cep, city, state, neighborhood, street, "location", flags, created_at, 
                updated_at, house_number, "mothersName", birthday, active, "uuid"
         FROM public.users_info
         WHERE user_id = $1`,
        [userId]
      )
      
      const userInfo = UserInfoMapper.toUserInfo(userInfoResult.rows[0])
      
      // Inicializar variáveis com valores padrão
      let userImages: UserImage[] = []
      let kycUser: KycUser | null = null
      let customer: Customer | null = null
      
      // Aplicar lógica condicional com base no stage_kyc e providerKyc
      if (user.stage_kyc !== 0) {
        if (user.providerKyc === 'GUENO') {
          // 3. Buscar imagens do usuário para GUENO
          const userImagesResult = await trutherClient.query(
            `SELECT id, user_id, link, "type", created_at, updated_at, "enable", "kycId", kyc_id
             FROM public.users_images
             WHERE user_id = $1`,
            [userId]
          )
          
          userImages = UserImageMapper.toUserImages(userImagesResult.rows)
        } 
        else if (user.providerKyc === 'CELCOIN') {
          // 3. Buscar imagens do usuário para CELCOIN
          const userImagesResult = await trutherClient.query(
            `SELECT id, user_id, link, "type", created_at, updated_at, "enable", "kycId", kyc_id
             FROM public.users_images
             WHERE user_id = $1`,
            [userId]
          )
          
          userImages = UserImageMapper.toUserImages(userImagesResult.rows)
          
          // 4. Buscar informações de KYC do usuário para CELCOIN
          const kycUserResult = await trutherClient.query(
            `SELECT id, "uuid", "document", provider, "statusOcr", "statusBcc", url, "internalMsg", 
                    active, "createdAt", "updatedAt", "userId", "kycOnboarding", "getFiles"
             FROM public."kycUser"
             WHERE "userId" = $1`,
            [userId]
          )
          
          kycUser = KycUserMapper.toKycUser(kycUserResult.rows[0])
          
          // 5. Buscar informações do cliente no banco de dados banks para CELCOIN
          banksClient = await PostgresDatabase.getClient('banks')
          
          // Buscar conta Celcoin do usuário
          const customerResult = await banksClient.query(
            `SELECT id, "uuid", "onboardingId", "fullName", "socialName", "motherName", 
                    "documentNumber", "phoneNumber", email, "typePerson", status, 
                    "isPoliticallyExposedPerson", "businessId", "createdAt", "updateAt", 
                    "deleteAt", "authenticationId", "createKeyPix", "walletAddress", "birthDate"
             FROM public.customers
             WHERE "documentNumber" = $1`,
            [userInfo?.document]
          )
          
          customer = CustomerMapper.toCustomer(customerResult.rows[0])
          
          // Buscar walletAddress da tabela customers relacionada com kycUser.kycOnboarding
          if (kycUser && kycUser.kycOnboarding) {
            const walletAddressResult = await banksClient.query(
              `SELECT "walletAddress"
               FROM public.customers
               WHERE "onboardingId" = $1`,
              [kycUser.kycOnboarding]
            )
            
            if (walletAddressResult.rows.length > 0 && walletAddressResult.rows[0].walletAddress) {
              // Atualizar o walletAddress do customer se encontrado
              if (customer) {
                customer.walletAddress = walletAddressResult.rows[0].walletAddress
              }
            }
          }
        }
      }
      
      // 6. Combinar todos os dados em UserDetailedInfo
      return {
        user,
        userInfo,
        userImages,
        kycUser,
        customer
      }
    } finally {
      trutherClient.release()
      if (banksClient) {
        banksClient.release()
      }
    }
  }
  
  async updateKycStatus(decisionKycStatus: DecisionKycStatus): Promise<void> {
    const client = await PostgresDatabase.getClient('truther')

    try {
      await client.query(
        `UPDATE public.users
         SET kyc_approved = $2,
             banking_enable = $3,
             comment_kyc = $4,
             stage_kyc = $5
         WHERE id = $1`,
        [
          decisionKycStatus.id,
          decisionKycStatus.kyc_approved,
          decisionKycStatus.banking_enable,
          decisionKycStatus.comment_kyc ?? null,
          decisionKycStatus.stage_kyc ?? null,
        ],
      )
    } finally {
      client.release()
    }
  }

  async findPaginatedWithWallets({ page, limit, address, custodian }: UserTrutherPaginationParams): Promise<PaginatedResult<UserTrutherWithWallet>> {
    const client = await PostgresDatabase.getClient('truther')
    try {
      const offset = (page - 1) * limit
      
      // Build the WHERE clause for filtering
      const whereConditions = [];
      const queryParams = [];
      let paramIndex = 1;
      
      if (address) {
        whereConditions.push(`w.address ILIKE $${paramIndex}`);
        queryParams.push(`%${address}%`);
        paramIndex++;
      }
      
      if (custodian) {
        whereConditions.push(`w.custodian = $${paramIndex}`);
        queryParams.push(custodian);
        paramIndex++;
      }
      
      const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
      
      // Count query with filters
      const countQuery = `
        SELECT COUNT(DISTINCT u.id) 
        FROM public.users u
        LEFT JOIN public.wallets w ON u.id = w.user_id
        ${whereClause}
      `;
      
      const countResult = await client.query(countQuery, queryParams);
      const total = parseInt(countResult.rows[0].count, 10);
      
      // Main query with filters
      const mainQueryParams = [...queryParams, limit, offset];
      const limitOffsetParamStart = paramIndex;
      
      const result = await client.query(
        `SELECT 
          u.id, 
          u.name, 
          u.role, 
          u.is_verified, 
          u.can_transact, 
          u.status, 
          u.fee_level_id, 
          u.created_at, 
          u.updated_at, 
          u.flags, 
          u.expo_id, 
          u.kyc_approved, 
          u.kyc_risk, 
          u.banking_enable, 
          u.disinterest, 
          u.register_txid, 
          u.called_attempts_guenno, 
          u.stage_kyc, 
          u.comment_kyc, 
          u."providerKyc", 
          u."attemptsKyc", 
          u.password, 
          u."ipCreate", 
          u.error, 
          u.restrict, 
          u.override_instant_pay, 
          u.uuid, 
          u."lastLogin", 
          u."lastIpLogin", 
          u."retryKyc", 
          u."regenerateKyc", 
          u.master_instant_pay,
          w.id as wallet_id, 
          w.address, 
          w.device_id, 
          w.user_id, 
          w.salt, 
          w.created_at as wallet_created_at, 
          w.updated_at as wallet_updated_at, 
          w.type, 
          w.locked_balance, 
          w.balance, 
          w.protocol, 
          w.custodian, 
          w.new_wallet, 
          w."usdtBalance", 
          w."usdtLockedBalance"
        FROM public.users u
        LEFT JOIN public.wallets w ON u.id = w.user_id
        ${whereClause}
        ORDER BY u.id
        LIMIT $${limitOffsetParamStart} OFFSET $${limitOffsetParamStart + 1}`,
        mainQueryParams
      )
      
      // Agrupar resultados por usuário e aninhar dados de carteira
      const usersMap = new Map<number, UserTrutherWithWallet>();
      
      for (const row of result.rows) {
        if (!usersMap.has(row.id)) {
          // Criar objeto de usuário usando o mapeador
          const user = UserMapper.toUserTrutherWithWallet(row);
          usersMap.set(row.id, user);
        }
        
        // Adicionar carteira ao array de carteiras do usuário se a carteira existir
        const wallet = WalletMapper.toWallet(row);
        if (wallet) {
          usersMap.get(row.id)!.wallets.push(wallet);
        }
      }
      
      // Converter mapa para array
      const usersWithWallets = Array.from(usersMap.values());
      
      return {
        data: usersWithWallets,
        total,
        page,
        limit
      }
    } finally {
      client.release()
    }
  }
}
