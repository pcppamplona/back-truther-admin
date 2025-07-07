
interface Authentication {
  id: number;
  uuid: string;
  name: string;
  username: string;
  password: string;
  active: boolean;
  createdAt: string;
  updateAt: string;
  deleteAt: string | null;
  forceResetPwd: boolean;
  typeAuth: string;
  groupLevel: Group
}

type Group = "N1" | "N2" | "N3" | "PRODUTO" | "MKT" | "ADMIN";

export { Authentication, Group} 