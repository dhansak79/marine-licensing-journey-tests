@issue=ML-121
Feature: Site details review polygon: The user can review polygon site details before saving
  As an applicant
  I want to review the details of the site that I added manually by providing multiple sets of coordinates
  So that I can confirm that everything is correct

  Scenario: Successfully reviewing triangular polygon site details using WGS84 coordinates
    Given an exemption for a triangular site using WGS84 coordinates with point 1 "55.123456", "-1.123456", point 2 "55.223456", "-1.223456" and point 3 "55.323456", "-1.323456"
    And the site details task is reached
    When the triangular site coordinates are entered and continued to review
    Then the polygon site details review page shows the correct site details

  Scenario: Successfully reviewing square polygon site details using WGS84 coordinates
    Given an exemption for a quadrilateral site using WGS84 coordinates with point 1 "50.000000", "-1.000000", point 2 "50.001000", "-1.000000", point 3 "50.001000", "-0.999000" and point 4 "50.000000", "-0.999000"
    And the site details task is reached
    When the quadrilateral site coordinates are entered and continued to review
    Then the polygon site details review page shows the correct site details

  @smoke
  Scenario: Successfully reviewing pentagon polygon site details using WGS84 coordinates
    Given an exemption for a pentagon site using WGS84 coordinates with point 1 "50.000000", "-1.000000", point 2 "50.001000", "-1.000000", point 3 "50.001500", "-0.999500", point 4 "50.001000", "-0.999000" and point 5 "50.000000", "-0.999000"
    And the site details task is reached
    When the pentagon site coordinates are entered and continued to review
    Then the polygon site details review page shows the correct site details

  Scenario: Successfully reviewing triangular polygon site details using OSGB36 coordinates
    Given an exemption for a triangular site using OSGB36 coordinates with point 1 "432675", "181310", point 2 "433000", "181500" and point 3 "432800", "181700"
    And the site details task is reached
    When the triangular site coordinates are entered and continued to review
    Then the polygon site details review page shows the correct site details

  Scenario: Successfully reviewing square polygon site details using OSGB36 coordinates
    Given an exemption for a quadrilateral site using OSGB36 coordinates with point 1 "432675", "181310", point 2 "433000", "181310", point 3 "433000", "181500" and point 4 "432675", "181500"
    And the site details task is reached
    When the quadrilateral site coordinates are entered and continued to review
    Then the polygon site details review page shows the correct site details

  @smoke
  Scenario: Successfully reviewing pentagon polygon site details using OSGB36 coordinates
    Given an exemption for a pentagon site using OSGB36 coordinates with point 1 "432675", "181310", point 2 "433000", "181310", point 3 "433200", "181400", point 4 "433000", "181500" and point 5 "432675", "181500"
    And the site details task is reached
    When the pentagon site coordinates are entered and continued to review
    Then the polygon site details review page shows the correct site details
