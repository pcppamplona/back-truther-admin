export interface Roles {
  id: number;
  name: string;
  description: string;
}

export interface Permission {
  id: number;
  key_name: string;
  description: string;
}

export interface RolePermission {
  id: number;
  role_id: number;
  permission_id: number;
}

export interface UserPermission {
  id: number;
  user_id: number;
  permission_id: number;
}
