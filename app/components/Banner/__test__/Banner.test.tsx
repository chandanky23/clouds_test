import React from 'react'
import { render, RenderResult, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'

import Banner from '../Banner'

const onclick = jest.fn()
const bannnerName = 'Am happy to solve this project'
const testId = 'test_banner'

let documentBody: RenderResult

afterEach(cleanup)

describe('<Banner />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Banner bannerName={bannnerName} testId={testId} reset={() => onclick} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
