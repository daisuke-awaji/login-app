export const SET_USER = 'SET_USER'
export const UNSET_USER = 'UNSET_USER'

export interface IAuthenticateAction {
  type: typeof SET_USER | typeof UNSET_USER
  user: any
}

// action creater
export const setUser = (user: any): IAuthenticateAction => {
  return { type: SET_USER, user }
}

export const unSetUser = (): IAuthenticateAction => {
  return { type: UNSET_USER, user: null }
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
