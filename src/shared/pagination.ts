export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";

  onlyAssigned?: boolean;
  assignedRole?: string;
  userId?: string | number;
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
