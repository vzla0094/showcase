import { renderWithProviders } from '../../../testing-utils'
import { ReadOnlyField } from '../ReadOnlyField'
import { screen } from '@testing-library/react-native'

const data = {
  label: 'label',
  value: 'value',
}

describe('ReadOnlyField', () => {
  beforeEach(() => {
    renderWithProviders(<ReadOnlyField {...data} />)
  })

  it('should render the label', () => {
    const label = screen.getByTestId('label')
    expect(label).toBeTruthy()
    expect(label.props.children[0].props.children).toBe(data.label)
  })

  it('should render the input with correct value', () => {
    const input = screen.getByTestId('input')
    expect(input).toBeTruthy()
    expect(input.props.value).toBe(data.value)
  })

  it('should have the input disabled', () => {
    const input = screen.getByTestId('input')
    expect(input.props.disabled).toBe(true)
  })
})
