import { render } from 'react-testing-library'

const testRender = component => {
  it('renders without crashing', () => {
    const { container } = render(component)

    expect(container.firstChild).toBeInTheDocument()
  })
}

export default testRender
