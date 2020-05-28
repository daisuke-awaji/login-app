import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { combineReducers, createStore } from 'redux'
import auth, { loginAction } from 'reducers/authenticate'
import { LoginPage } from './LoginPage'
import renderer from 'react-test-renderer'
import { IUser } from '../users/IUser'

const setup = () => {
  // Routerコンポーネントに依存する hisotry は mock 化して注入する
  const mockHistory: any = { push: jest.fn(), location: {}, listen: jest.fn() }
  // Redux は必要な store だけ mock を作成して注入する
  const reducer = combineReducers({ authenticatedUser: auth })
  const mockStore = createStore(reducer)
  const component = (
    <Provider store={mockStore}>
      <Router history={mockHistory}>
        <LoginPage />
      </Router>
    </Provider>
  )

  const user: IUser = {
    id: '1',
    name: 'John Scott',
    email: 'john@email.com',
    type: 'admin',
  }
  mockStore.dispatch(loginAction(user))
  return { component }
}

describe('スナップショット', () => {
  it('レンダリングができること', () => {
    const { component } = setup()
    const header = renderer.create(component)
    let tree = header.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
