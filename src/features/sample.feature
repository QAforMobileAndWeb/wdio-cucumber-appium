Feature: Sample feature
  Sample feature to run on the iOS and Android app based on the given platform

  Scenario: User is able to see all tabs in bottom navigation without login
    Given User is on the 'Home' page
    Then User should see the 'Home screen'
    When User taps on 'Webview' tab
    Then User is on the 'Webview' page
    When User taps on 'Login' tab
    Then User is on the 'Login' page
    When User taps on 'Forms' tab
    Then User is on the 'Forms' page
    When User taps on 'Swipe' tab
      And User swipes 'left' 5 times
