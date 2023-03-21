import { DiscoveryScreen } from '../DiscoveryScreen'
import { renderWithProviders } from '../../../testing-utils'
import { DiscoveryStackScreenProps } from '../../types'

describe('DiscoveryScreen', () => {
  it('should render', () => {
    // Mocking stack navigator props: https://stackoverflow.com/a/75558276/13722854
    const discoveryStackScreenProps = {
      navigation: { navigate: jest.fn() },
      route: jest.fn(),
    } as unknown as DiscoveryStackScreenProps<'Discovery'>

    renderWithProviders(<DiscoveryScreen {...discoveryStackScreenProps} />)
  })
})
