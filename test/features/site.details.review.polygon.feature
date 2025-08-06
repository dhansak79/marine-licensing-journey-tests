@issue=ML-121
Feature: Site details review polygon: The user can review polygon site details before saving
  As an applicant
  I want to review the details of the site that I added manually by providing multiple sets of coordinates
  So that I can confirm that everything is correct

  @smoke @run-only
  Scenario: Successfully reviewing triangular polygon site details using WGS84 coordinates
    Given an exemption for a triangular site using WGS84 coordinates with point 1 "55.123456", "-1.123456", point 2 "55.223456", "-1.223456" and point 3 "55.323456", "-1.323456"
    And the site details task is reached
    When the triangular site coordinates are entered and continued to review
    Then the polygon site details review page shows the correct site details
