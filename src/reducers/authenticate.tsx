import { IUser } from 'components/users/IUser'

export const SET_USER = 'SET_USER'
export const UNSET_USER = 'UNSET_USER'

export interface IAuthenticateAction {
  type: typeof SET_USER | typeof UNSET_USER
  user?: IUser
}

// action creater
export const setUser = (user: IUser): IAuthenticateAction => {
  return { type: SET_USER, user }
}

export const unSetUser = (): IAuthenticateAction => {
  return { type: UNSET_USER, user: undefined }
}

const authenticatedUser = (state = null, action: IAuthenticateAction) => {
  switch (action.type) {
    case SET_USER:
      // TODO: サーバサイドでcookieにセットする方法に切り替える
      localStorage.setItem('sessionId', '1')
      return action.user
    case UNSET_USER:
      // TODO: サーバサイドでcookieにセットする方法に切り替える
      localStorage.setItem('sessionId', '0')
      return null
    default:
      return state
  }
}

export default authenticatedUser
