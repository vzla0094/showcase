import { renderWithProviders } from '../../../testing-utils'
import { fireEvent, screen } from '@testing-library/react-native'
import { CountSelector, ICountSelector } from '../CountSelector'
import { ReactElement } from 'react'

const onPressHandler = jest.fn()
let iconButton: ReactElement
const data: ICountSelector = {
  isDisabled: true,
  iconName: 'user',
  onPress: onPressHandler,
}

describe('CountSelector disabled', () => {
  beforeEach(() => {
    const runRenderer = () => renderWithProviders(<CountSelector {...data} />)
    runRenderer()
    iconButton = screen.getByTestId('iconButton')
  })

  it('Does not fire onPress event', () => {
    fireEvent.press(iconButton)

    expect(onPressHandler).not.toHaveBeenCalled()
  })

  it('Renders with the right icon name prop', () => {
    expect(iconButton.props.children[0].props.name).toBe(data.iconName)
  })
})

describe('CountSelector not disabled', () => {
  beforeEach(() => {
    data.isDisabled = false
    const runRenderer = () => renderWithProviders(<CountSelector {...data} />)
    runRenderer()
    iconButton = screen.getByTestId('iconButton')
  })

  it('Fires onPress event', () => {
    fireEvent.press(iconButton)

    expect(onPressHandler).toHaveBeenCalled()
  })
  it('Renders with the right icon name prop', () => {
    expect(iconButton.props.children[0].props.name).toBe(data.iconName)
  })
})
