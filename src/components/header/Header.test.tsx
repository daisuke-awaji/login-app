import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { combineReducers, createStore } from 'redux'
import auth, { loginSucceedAction } from 'reducers/authenticate'
import Header from './Header'
import renderer from 'react-test-renderer'
import { IUser } from '../users/IUser'

describe('学習用テストコード', () => {
  test('Enzyme shallow', () => {
    const element = <a href="http://www.facebook.com">Facebook</a>
    const wrapper = shallow(element)
    expect(wrapper.find('a').prop('href')).toBe('http://www.facebook.com')
  })
})

const setup = () => {
  // Routerコンポーネントに依存する hisotry は mock 化して注入する
  const mockHistory: any = { push: jest.fn(), location: {}, listen: jest.fn() }
  // Redux は必要な store だけ mock を作成して注入する
  const reducer = combineReducers({ authenticatedUser: auth })
  const mockStore = createStore(reducer)
  const component = (
    <Provider store={mockStore}>
      <Router history={mockHistory}>
        <Header />
      </Router>
    </Provider>
  )
  const getWrapper = () => mount(component)

  const user: IUser = {
    id: '1',
    name: 'John Scott',
    email: 'john@email.com',
    type: 'admin',
  }
  mockStore.dispatch(loginSucceedAction(user))
  return { wrapper: getWrapper(), component }
}
/**
 * Enzymeのshallowを使っても良いが
 * Reduxのstoreを剥がす実装コストを考慮すると
 * mountを使用したFULLレンダリングの方が効率的で可読性も良いと考えた
 */
describe('Headerコンポーネントの FULLレンダリングテスト', () => {
  describe('Homeボタン', () => {
    it('Homeボタン押下でHome画面に遷移される', () => {
      const { wrapper } = setup()
      wrapper.find('button').at(0).simulate('click')
      expect(window.location.pathname).toEqual('/')
    })
  })
})

/**
 * Headerのような大きなサイズのコンポーネントに対してはスナップショットテストで十分
 */
describe('スナップショット', () => {
  it('レンダリングができること', () => {
    const { component } = setup()
    const header = renderer.create(component)
    let tree = header.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
