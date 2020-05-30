import { AppState } from 'reducers/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { thunkedFetchUserAction } from 'reducers/users'

/**
 * users storeをラップしたカスタムHooks
 */
export const useUser = (userId: string) => {
  const users = useSelector((state: AppState) => state.users)
  const one = users.find((user) => user.queryUserId === userId)
  const user = one?.user
  const error = one?.error

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(thunkedFetchUserAction(userId))
    // 本来は POSTリクエストが完了したら再度 fetchData() を実行したい。
    // 違う userId が history に push された場合に再度 fetch されるようにしている。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, user])
  return [user, error]
}
