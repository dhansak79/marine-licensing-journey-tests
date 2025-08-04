@issue=ML-26 @accessibility
Feature: Accessibility checks: Ensure pages pass basic accessibility checks
  As a user of the marine licensing service
  I want the service to be accessible
  So that I can use the service without any barriers

  Scenario: Verify accessibility of project name page
    Given a notification has been created with a valid project name
    When the "Project name" task is selected
    Then the page passes basic accessibility checks

  Scenario: Verify accessibility of activity dates page
    Given a notification has been created with a valid project name
    When the "Activity dates" task is selected
    Then the page passes basic accessibility checks

  Scenario: Verify accessibility of activity description page
    Given a notification has been created with a valid project name
    When the "Activity description" task is selected
    Then the page passes basic accessibility checks

  Scenario: Verify accessibility of public register page
    Given a notification has been created with a valid project name
    When the "Public register" task is selected
    Then the page passes basic accessibility checks