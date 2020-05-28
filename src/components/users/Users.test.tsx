import React from 'react'
import { Router } from 'react-router-dom'
import Users from './Users'
import renderer from 'react-test-renderer'

const setup = () => {
  // Routerコンポーネントに依存する hisotry は mock 化して注入する
  const mockHistory: any = { push: jest.fn(), location: {}, listen: jest.fn() }
  const component = (
    <Router history={mockHistory}>
      <Users />
    </Router>
  )
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
