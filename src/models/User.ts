interface User {
  isLogged: boolean
  token: string
  user?: UserInfo
}
type UserInfo = {
  id: string
  username: string
  profilePicture: string
  badge: null
  about: string
  isActive: boolean
  address: string
  nonce: string
  role: string
  createdAt: string
  updatedAt: string
}
