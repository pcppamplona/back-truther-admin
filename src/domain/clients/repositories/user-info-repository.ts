import { UserInfo } from "../model/userinfo";

export interface UserInfoRepository {
  findAll(): Promise<UserInfo[]>
}
