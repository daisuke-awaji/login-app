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
  requestLoginAction()
  return async (dispatch: any) => {
    try {
      const user = await login({ email, password })
      return dispatch(loginSucceedAction(user))
    } catch (error) {
      return dispatch(loginFailedAction(error))
    }
  }
}

export const logoutAction = (): IAuthenticateAction => {
  return { type: LoginActionType.LOGOUT, user: null, error: null }
}

const isFetching = (action: IAuthenticateAction) => {
  switch (action.type) {
    case LoginActionType.REQUEST_LOGIN:
      return true
    default:
      return false
  }
}

interface IState {
  isFetching: boolean
  user: IUser | null
  error: any | null
}

const initialState = { isFetching: false, user: null, error: null }
const auth = (state: IState = initialState, action: IAuthenticateAction) => {
  switch (action.type) {
    case LoginActionType.LOGIN_SUCCEED:
      // TODO: サーバサイドでcookieにセットする方法に切り替える
      localStorage.setItem('sessionId', '1')
      return {
        ...state,
        isFetching: isFetching(action),
        user: action.user,
        error: action.error,
      }
    case LoginActionType.LOGIN_FAILED:
      return {
        ...state,
        isFetching: isFetching(action),
        user: action.user,
        error: action.error,
      }
    case LoginActionType.LOGOUT:
      // TODO: サーバサイドでcookieにセットする方法に切り替える
      localStorage.setItem('sessionId', '0')
      return {
        ...state,
        isFetching: isFetching(action),
        user: null,
        error: null,
      }
    default:
      return state
  }
}

export default auth
