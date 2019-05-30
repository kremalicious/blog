import { render } from '@testing-library/react'

const testRender = component => {
  it('renders without crashing', () => {
    const { container } = render(component)

    expect(container.firstChild).toBeInTheDocument()
  })
}

export default testRender
