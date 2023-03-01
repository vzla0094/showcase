# Testing Strategy 
### Unit Tests
These tests are performed on components/functions at the lowest level of abstraction. They are used to test the functionality of a single component. They are also used to test the functionality of a component in isolation from other components. Unit tests are written using the [Jest](https://jestjs.io/) framework. 

Tests that fall in this category are:
* [components](#components-testing-guide)
  * `atoms`
  * `molecules` (whenever they don't import any atoms)
  * `forms`
* [functions / hooks](#functions-testing-guide)
  * firebase functions
  * helpers

#### Components testing guide:
* Inputs / Outputs (I/O) - assert that the component renders the correct output given a set of props
* User Interactions - assert that the component responds to user interactions correctly
* Event Handlers - assert that the component calls prop functions correctly (e.g. `onClick`, `onSubmit`, etc.)

#### Functions testing guide:
* Inputs / Outputs (I/O) - assert that the function returns the correct output given a set of inputs
* Edge cases - assert that the function handles edge cases correctly (e.g. `null`, `undefined`, etc.)

### Integration Tests
These tests are performed on components/functions at the highest level of abstraction. They are used to test the functionality of a component in conjunction with other components. Integration tests are performed by testing Screens, which are the highest level of abstraction in the app.

Tests that fall in this category are:
* [screens](#screens-testing-guide)

#### Screens testing guide (WIP)
* navigation - assert that the screen navigates to the correct screen when a user clicks on a button
* inputs / outputs (I/O) - assert that the screen renders the correct output given a set of props (e.g. navigation/route params)
* side effects - for example, assert that the screen calls the correct firebase function when a user clicks on a button

### Reference
* [What should we test (ReactJS Components)](https://hackernoon.com/what-should-we-test-reactjs-components-647ded674928)
* [Where and how to start testing 🧪 your react-native app ⚛️ and how to keep on testin’](https://medium.com/@stevegalili/where-and-how-to-start-testing-your-react-native-app-%EF%B8%8F-and-how-to-keep-on-testin-ec3464fb9b41)
* [Static vs Unit vs Integration vs E2E Testing for Frontend Apps](https://kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests)

# User flows

### Discovery
```mermaid
graph TD;
subgraph DiscoveryStack
  B(DiscoveryScreen)
  B-->|taps Cog Wheel|D(HighlightsScreen);
  B-->|taps EventCard|E(UserEventScreen);

  D(HighlightsScreen)
  D-->|back|B(DiscoveryScreen);

  E(UserEventScreen)
  E-->|back|B(DiscoveryScreen);
  E-->|taps Reserve button|F(TicketPurchaseScreen);

  F(TicketPurchaseScreen)
  F-->|back|E(UserEventScreen);
  F-->|selects ticket amounts|G(Confirm button);
  G-->|taps Confirm button|H(TicketsConfirmationScreen);

  H(TicketsConfirmationScreen)
  H-->|taps 'View My Tickets' button|I(UserEventTicketsScreen);
end
```

### Search
```mermaid
graph TD;
subgraph SearchScreen
  J(SearchScreen)
  J-->|taps Cog Wheel|K(SearchFilterScreen)
  K-->|slides distance filter|L(db gets updated)
  K-->|switches event categories|L(db gets updated)
  K-->|back|J(SearchScreen)
end
  ```

### User Tickets
```mermaid
graph TD;
subgraph UserTicketsStack
  M(UserTicketsScreen)
  M-->|taps UserEventCard|N(UserEventTicketsScreen)

  N(UserEventTicketsScreen)
  N-->|back|M(UserTicketsScreen)
  N-->|sees|O(Tickets for the particular event)
end
```

### Profile
```mermaid
graph TD;
subgraph ProfileScreen
  P(ProfileScreen)
  P-->|fills user details|Q(db gets updated)
  P-->R{has company}
  R-->|no|T(Add company button)
end
T-->|taps Add company button|U(CompanyDetailsScreen)
```

### Company
```mermaid
graph TD;
    subgraph CompanyStack
V(CompanyDashboardScreen)
V-->|taps Cog Wheel|U(CompanyDetailsScreen)
V-->|taps Event|Y(CompanyEventDetailsView)
V-->|'Create an Event'|Z(EventEditDetailsView)


U(CompanyDetailsScreen)
U-->|fills company details|X(db gets updated)
X-->|back|V(CompanyDashboardScreen)


subgraph CompanyEventScreen
Y(CompanyEventDetailsView)
Y-->|taps Cog Wheel|Z(EventEditDetailsView)

Z(EventEditDetailsView)
Z-->|fills event details|AA{Cancel or Save and go back}
AA-->|taps Save and go back|AB(db gets updated)
end
AB-->V(CompanyDashboardScreen)
AA-->|Cancel|V(CompanyDashboardScreen)

Y-->|back|V(CompanyDashboardScreen)
Y-->|taps EventTicketsButton|AC(EventTicketTypesScreen)
Y-->|taps Redemptions button|AG(TicketTypesScreen)


AC(EventTicketTypesScreen)
AC-->|taps 'Create new ticket type'|AD(CreateEditTicketTypeScreen)
AC-->|taps TicketTypeCard|AD(CreateEditTicketTypeScreen)
AC-->|back|Y(CompanyEventDetailsView)

AD(CreateEditTicketTypeScreen)
AD-->|back|AC(EventTicketTypesScreen)
AD-->|fills ticketType details|AE(Save and go back)
AE-->|taps 'Save and go back'|AF(db gets updated)
AF-->AC(EventTicketTypesScreen)


AG(TicketTypesScreen)
AG-->|back|Y(CompanyEventDetailsView)
AG-->|taps TicketTypeCard|AH(RedemptionsScreen)

subgraph RedemptionsScreen
AH(RedemptionsScreen)
AH-->|reserved tab|AI(sees reserved TicketCards)
AI-->|taps TicketCard|AK(sees RedeemTicketDialog)
AK-->AL{Cancel or Redeem}
AL-->|Cancel|AM(Dialog dismisses)
AL-->|Redeem|AN(db gets updated)
AN-->AM(Dialog dismisses)
AH-->|redeemed tab|AJ(sees redeemed TicketCards)
end
AH-->|back|AG(TicketTypesScreen)
AH-->|+ fab|AO(RedeemTicketScreen)

AO(RedeemTicketScreen)
AO-->|back|AH(RedemptionsScreen)
AO-->|fills ticketId|AP(Confirm button)
AP-->AQ(db gets updated)
AQ-->AH(RedemptionsScreen)
end
```
