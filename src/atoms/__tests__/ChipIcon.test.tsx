import { IconProps } from 'phosphor-react-native'
import { renderWithProviders } from '../../../testing-utils'
import { ChipIcon, IChipIcon } from '../ChipIcon'
import { fireEvent, screen } from '@testing-library/react-native'
import { ReactElement } from 'react'

const onPressHandler = jest.fn()
const mockIconRenderer = jest.fn()

const IconData = (active: boolean) =>
  ({
    size: 24,
    color: active ? 'white' : 'dark.600',
    weight: active ? 'regular' : 'thin',
  } as IconProps)

const getChipIconData = (active: boolean): IChipIcon<string> => ({
  active,
  children: 'Latest',
  onPress: onPressHandler,
  icon: iconData => mockIconRenderer({ ...iconData }),
})

describe.each([true, false])('With ChipIcon active: %s', isActive => {
  let chipIcon: ReactElement
  let pressable: ReactElement
  beforeEach(() => {
    const chipIconData = getChipIconData(isActive)

    chipIconData.icon(IconData(chipIconData.active as boolean))

    const runRenderer = () =>
      renderWithProviders(<ChipIcon {...chipIconData} />)
    runRenderer()
    chipIcon = screen.getByTestId('text')
    pressable = screen.getByTestId('pressable')
  })

  it('Should render the Text element with the right color and fontWeight', () => {
    const expectedColor = isActive ? '#FFFFFF' : '#000000'
    const expectedFontWeight = isActive ? '600' : 'regular'

    expect(chipIcon.props.style.color).toBe(expectedColor)
    expect(chipIcon.props.style.fontWeight).toBe(expectedFontWeight)
  })

  it('Should call the mock icon rendering function with the right props', () => {
    const expectedIconProps = {
      size: 24,
      color: isActive ? 'white' : 'dark.600',
      weight: isActive ? 'regular' : 'thin',
    }

    expect(mockIconRenderer).toHaveBeenCalledWith(expectedIconProps)
  })

  it('Should call onPress handler with the right children', () => {
    fireEvent.press(chipIcon)
    expect(onPressHandler).toBeCalledWith('Latest')
  })
  it('Should render the Pressable element with the right backgroundColor', () => {
    const expectedBackgroundColor = isActive ? '#34d399' : '#FFFFFF'
    expect(pressable.props.style.backgroundColor).toBe(expectedBackgroundColor)
  })
})
