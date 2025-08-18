import { UserInfo } from "../model/userinfo";

export interface UserInfoRepository {
  findAll(): Promise<UserInfo[]>
  findByUserId(user_id: number): Promise<UserInfo | null>
  findByDocument(document: string): Promise<UserInfo | null>
}
