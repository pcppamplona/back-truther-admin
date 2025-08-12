import { UserInfo } from "@/domain/clients/model/userinfo";
import { UserInfoRepository } from "@/domain/clients/repositories/user-info-repository";

export class ListUserInfoUseCase {
  constructor(private userInfoRepository: UserInfoRepository) {}

  async execute(): Promise<UserInfo[]> {
    return this.userInfoRepository.findAll()
  }
}
