import { IUser } from 'components/users/IUser'
import { login } from 'apis/auth'

const LoginActionType = {
  REQUEST_LOGIN: 'REQUEST_LOGIN',
  LOGIN_SUCCEED: 'LOGIN_SUCCEED',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGOUT: 'LOGOUT',
}

interface IAuthenticateAction {
  type: typeof LoginActionType[keyof typeof LoginActionType]
  user: IUser | null
  error: any | null
}

export const loginSucceedAction = (user: IUser): IAuthenticateAction => {
  return { type: LoginActionType.LOGIN_SUCCEED, user, error: null }
}

const loginFailedAction = (error: any): IAuthenticateAction => {
  return { type: LoginActionType.LOGIN_FAILED, user: null, error }
}

const requestLoginAction = () => {
  return { type: LoginActionType.REQUEST_LOGIN, user: null, error: null }
}

export const thunkedLoginAction = ({ email, password }: any) => {
  return async (dispatch: any) => {
    dispatch(requestLoginAction())
    login({ email, password })
      .then((user) => {
        dispatch(loginSucceedAction(user))
      })
      .catch((error) => {
        dispatch(loginFailedAction(error))
      })
  }
}

export const logoutAction = (): IAuthenticateAction => {
  return { type: LoginActionType.LOGOUT, user: null, error: null }
}

export interface IAuthState {
  isFetching: boolean
  user: IUser | null
  error: any | null
}

const initialState = { isFetching: false, user: null, error: null }
const auth = (
  state: IAuthState = initialState,
  action: IAuthenticateAction,
): IAuthState => {
  switch (action.type) {
    case LoginActionType.REQUEST_LOGIN:
      return {
        ...state,
        isFetching: true,
        user: action.user,
        error: action.error,
      }
    case LoginActionType.LOGIN_SUCCEED:
      // TODO: サーバサイドでcookieにセットする方法に切り替える
      localStorage.setItem('sessionId', '1')
      return {
        ...state,
        isFetching: false,
        user: action.user,
        error: action.error,
      }
    case LoginActionType.LOGIN_FAILED:
      return {
        ...state,
        isFetching: false,
        user: action.user,
        error: action.error,
      }
    case LoginActionType.LOGOUT:
      // TODO: サーバサイドでcookieにセットする方法に切り替える
      localStorage.setItem('sessionId', '0')
      return {
        ...state,
        isFetching: false,
        user: null,
        error: null,
      }
    default:
      return state
  }
}

export default auth
