export const AUTHENTICATE = 'AUTHENTICATE'
export const SIGN_OUT = 'SIGN_OUT'

export interface IAuthenticateAction {
  type: typeof AUTHENTICATE | typeof SIGN_OUT
}

const authenticateReducer = (state = false, action: IAuthenticateAction) => {
  switch (action.type) {
    case AUTHENTICATE:
      return true
    case SIGN_OUT:
      return false
    default:
      return state
  }
}

export default authenticateReducer
