import { UserInfo } from "@/domain/clients/model/userinfo";
import { UserInfoRepository } from "@/domain/clients/repositories/user-info-repository";

export class GetUserInfoByDocumentUseCase {
  constructor(private userInfoRepository: UserInfoRepository) {}

  async execute(document: string): Promise<UserInfo | null> {
    return this.userInfoRepository.findByDocument(document)
  }
}
