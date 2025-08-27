import { Customer } from './customer'
import { KycUser } from './kyc-user'
import { UserImage } from './user-image'
import { UserTrutherWithWallet } from './user-truther'
import { UserInfo } from '@/domain/clients/model/userinfo'

export interface UserDetailedInfo {
  user: UserTrutherWithWallet
  userInfo: UserInfo | null
  userImages: UserImage[]
  kycUser: KycUser | null
  customer: Customer | null
}