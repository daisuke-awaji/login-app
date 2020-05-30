import { IUser } from 'components/users/IUser'
import { fetchUser, updateUser } from 'apis/users'

const ActionType = {
  FETCH_USER_REQUEST: 'FETCH_USER_REQUEST',
  FETCH_USER_SUCCEED: 'FETCH_USER_SUCCEED',
  FETCH_USER_FAILED: 'FETCH_USER_FAILED',
  UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCEED: 'UPDATE_USER_SUCCEED',
  UPDATE_USER_FAILED: 'UPDATE_USER_FAILED',
}

interface IUserAction {
  type: typeof ActionType[keyof typeof ActionType]
  queryUserId: string
  user: IUser | null
  error: any | null
}

const fetchUserRequestAction = (userId: string): IUserAction => {
  return {
    type: ActionType.FETCH_USER_REQUEST,
    queryUserId: userId,
    user: null,
    error: null,
  }
}

const fetchUserSucceedAction = (user: IUser): IUserAction => {
  return {
    type: ActionType.FETCH_USER_SUCCEED,
    queryUserId: user.id,
    user,
    error: null,
  }
}

const fetchUserFailedAction = (error: any, userId: string): IUserAction => {
  return {
    type: ActionType.FETCH_USER_FAILED,
    queryUserId: userId,
    user: null,
    error,
  }
}

export const thunkedFetchUserAction = (userId: string) => {
  return async (dispatch: any) => {
    dispatch(fetchUserRequestAction(userId))
    fetchUser(userId)
      .then((user) => {
        dispatch(fetchUserSucceedAction(user))
      })
      .catch((e) => {
        dispatch(fetchUserFailedAction(e, userId))
      })
  }
}

const updateUserRequestAction = (user: IUser): IUserAction => {
  return {
    type: ActionType.UPDATE_USER_REQUEST,
    queryUserId: user.id,
    user: user,
    error: null,
  }
}

const updateUserSucceedAction = (user: IUser): IUserAction => {
  return {
    type: ActionType.UPDATE_USER_SUCCEED,
    queryUserId: user.id,
    user,
    error: null,
  }
}

const updateUserFailedAction = (error: any, user: IUser): IUserAction => {
  return {
    type: ActionType.UPDATE_USER_FAILED,
    queryUserId: user.id,
    user: null,
    error,
  }
}

export const thunkedUpdateUserAction = (user: IUser) => {
  return async (dispatch: any) => {
    dispatch(updateUserRequestAction(user))
    updateUser(user)
      .then((updatedUser: IUser) => {
        dispatch(updateUserSucceedAction(updatedUser))
      })
      .catch((e) => {
        dispatch(updateUserFailedAction(e, user))
      })
  }
}

export interface IUserState {
  queryUserId: string | null
  isFetching: boolean
  user: IUser | null
  error: any | null
}

const users = (state: IUserState[] = [], action: IUserAction): IUserState[] => {
  switch (action.type) {
    case ActionType.FETCH_USER_REQUEST:
      const one = state.find((item) => item.queryUserId === action.queryUserId)
      if (!one)
        state.push({
          queryUserId: action.queryUserId,
          isFetching: true,
          user: null,
          error: null,
        })
      return state
    case ActionType.FETCH_USER_SUCCEED:
      return state.map((user) =>
        action.queryUserId === user.queryUserId
          ? {
              queryUserId: action.queryUserId,
              isFetching: false,
              user: action.user,
              error: null,
            }
          : user,
      )
    case ActionType.FETCH_USER_FAILED:
      return state.map((user) =>
        action.queryUserId === user.queryUserId
          ? {
              queryUserId: action.queryUserId,
              isFetching: false,
              user: null,
              error: action.error,
            }
          : user,
      )
    case ActionType.UPDATE_USER_REQUEST:
      return state.map((user) =>
        action.queryUserId === user.queryUserId
          ? {
              queryUserId: action.queryUserId,
              isFetching: true,
              user: action.user,
              error: null,
            }
          : user,
      )
    case ActionType.UPDATE_USER_SUCCEED:
      return state.map((user) =>
        action.queryUserId === user.queryUserId
          ? {
              queryUserId: action.queryUserId,
              isFetching: false,
              user: action.user,
              error: null,
            }
          : user,
      )
    case ActionType.UPDATE_USER_FAILED:
      return state.map((user) =>
        action.queryUserId === user.queryUserId
          ? {
              queryUserId: action.queryUserId,
              isFetching: false,
              user: null,
              error: action.error,
            }
          : user,
      )
    default:
      return state
  }
}

export default users
