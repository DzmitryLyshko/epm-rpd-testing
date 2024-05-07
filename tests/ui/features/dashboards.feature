@dashboards
Feature: Dashboards

  Background:
    Given I open Login page
    And I log in with default credentials

  Scenario: user is able to create a dashboard via UI
    When I create a dashboard with name "Test_Create"
    Then I should see name "Test_Create" in the breadcrumbs menu

  Scenario: user is able to remove a dashboard via UI
    When I create a dashboard with name "Test_Delete"
    And I delete the dashboard
    Then I should not see the dashboard with name "Test_Delete" in the dashboards list

  Scenario: user is able to edit dashboard via UI
    When I create a dashboard with name "Test_Edit"
    And I update the dashboard name to "Test_Update"
    Then I should see name "Test_Update" in the breadcrumbs menu

  Scenario Outline: create, edit and delete a dashboard
    When I create a dashboard with name "<dashboard_name>"
    Then I should see name "<dashboard_name>" in the breadcrumbs menu

    When I update the dashboard name to "<new_dashboard_name>"
    Then I should see name "<new_dashboard_name>" in the breadcrumbs menu
    But I should not see name "<dashboard_name>" in the breadcrumbs menu

    When I delete the dashboard
    Then I should not see the dashboard with name "<new_dashboard_name>" in the dashboards list
    And I should not see the dashboard with name "<dashboard_name>" in the dashboards list

    Examples:
      | dashboard_name | new_dashboard_name |
      | Test Dashboard | New Test Dashboard |
      | My Dashboard   | New My Dashboard   |
