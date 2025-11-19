export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";

  onlyAssigned?: boolean;
  /**
   * Support filtering by one single role id (legacy) or multiple role ids.
   * Use `assignedRoles` when providing more than one id.
   */
  assignedRole?: string;
  assignedRoles?: number[];
  userId?: string | number;
  status?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface PaginableRepository<T> {
  findPaginated(params: PaginationParams): Promise<PaginatedResult<T>>;
}
