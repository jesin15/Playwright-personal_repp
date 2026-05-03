Feature: Navigation to WebSite


        Scenario: Verify contact form increases message count in the database
        Given User Navigates to the Hotel WebSite
        Then User Fetches the "Initial" Message Count through API
        Then User Fills the Messages Form and Submits it using Fake credentials
        Then User verifies the correct message is displayed on submiting the form
        Then User Fetches the "Later" Message Count through API 
        Then User Verifes the Message Count should be increased by one. 


    Scenario: Verify the Booking is Successful for the given date and given room 
    Given User Navigates to the Hotel WebSite
    Then User enters the "Check In" Date as "14/08/2026"
    Then User enters the "Check Out" Date as "18/08/2026"
    Then User clicks on the "Check Availability" Button
    Then User Books a Room for the "Double"
    Then User Verifes correct dates are selected in the Booking Page
    Then User clicks on the "Reserve Now" Button
    Then User Fills the Booking Form with the Fake credentials.
    Then User clicks on the "Reserve Now" Button
    Then User Verifes The "Booking Confirmed" message is displayed.
    Then User Logins in as Admin using API
    Then User clicks on the room that was booked previously
    Then The admin dashboard should display the guest's reservation details
    Then The admin deletes the guest's reservation details through API
    Then The admin dashboard should not display the guest's reservation details

    



    # Scenario: Admin Logs in through API and checks whether the There is admin access
    # Given User Navigates to the website using API
    # Then User Navigates to the room page 
