import { renderWithProviders } from '../../../testing-utils'
import { fireEvent, screen, waitFor } from '@testing-library/react-native'
import { FormikInput, IFormikInputProps } from '../FormikInput'

describe(FormikInput, () => {
  const inputChangeFn = jest.fn()
  const inputBlurFn = jest.fn(() => {
    undefined
  })

  const data: IFormikInputProps = {
    value: 'TestValue',
    fieldName: 'a',
    handleBlur: inputBlurFn,
    handleChange: inputChangeFn,
    label: 'TestLabel',
    placeholder: 'TestPlaceholder...',
    errors: { a: 'Error 1', b: 'Error 2' },
  }
  beforeEach(() => {
    const runRenderer = () => renderWithProviders(<FormikInput {...data} />)

    runRenderer()
  })

  it('Renders successfully', () => {
    expect(screen.getByTestId('input')).toBeDefined()
  })

  it('Has the correct placeholder prop', () => {
    const inputElement = screen.getByTestId('input')

    expect(inputElement.props.placeholder).toBe(data.placeholder)
  })

  it('Has the correct value prop', () => {
    const inputElement = screen.getByTestId('input')

    expect(inputElement.props.value).toBe(data.value)
  })
  it('Has the correct error based on fieldName', () => {
    expect(screen.getByText(data.errors.a)).toBeDefined()
    expect(screen.queryByText(data.errors.b)).toBe(null)
  })
  it('Has the correct label prop', () => {
    const labelElement = screen.getByTestId('label')
    expect(labelElement.props.children[0].props.children).toBe(data.label)
  })

  it('calls handleChange event handler for the onChangeText event, with the correct input value', async () => {
    const inputElement = screen.getByTestId('input')

    fireEvent(inputElement, 'onChangeText', 'NewValue#1')

    await waitFor(() => {
      expect(inputChangeFn.mock.calls.length).toBe(1)
      expect(inputChangeFn).toHaveBeenCalledWith('NewValue#1')
    })
  })

  it('calls handleBlur event handler for the onBlur event, with the correct input value', async () => {
    const inputElement = screen.getByTestId('input')

    fireEvent(inputElement, 'onBlur', 'NewValue#2')

    await waitFor(() => {
      expect(inputBlurFn.mock.calls.length).toBe(1)
      expect(inputBlurFn).toHaveBeenCalledWith('NewValue#2')
    })
  })
})
