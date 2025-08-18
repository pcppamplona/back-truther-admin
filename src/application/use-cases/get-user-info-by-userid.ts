import { UserInfo } from "@/domain/clients/model/userinfo";
import { UserInfoRepository } from "@/domain/clients/repositories/user-info-repository";

export class GetUserInfoByUserIdUseCase {
  constructor(private userInfoRepository: UserInfoRepository) {}

  async execute(user_id: number): Promise<UserInfo | null> {
    return this.userInfoRepository.findByUserId(user_id)
  }
}
