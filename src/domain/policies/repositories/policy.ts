export interface PolicyContext {
  userId: number
  roleId: number
  [key: string]: any 
}

export interface Policy<T = any> {
  // aplicado na query SQL antes da execução
  filterQuery?(context: PolicyContext): Promise<Record<string, any>> | Record<string, any>

  // aplicado em memória, pós-query
  canRead?(context: PolicyContext, record: T): Promise<boolean> | boolean

  // extensível para operações futuras (create/update/delete)
  canCreate?(context: PolicyContext, data: Partial<T>): Promise<boolean> | boolean
  canUpdate?(context: PolicyContext, record: T): Promise<boolean> | boolean
  canDelete?(context: PolicyContext, record: T): Promise<boolean> | boolean
}
