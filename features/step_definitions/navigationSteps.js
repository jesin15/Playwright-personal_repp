const {Given,Then}= require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const {faker} =require('@faker-js/faker');

Given('User Navigates to the Hotel WebSite',  async function ()  {
    await this.page.goto("https://automationintesting.online/");
await expect(this.page).toHaveTitle( /Restful-booker-platform/ );

  
});
Then(`User Fills the Messages Form and Submits it using Fake credentials`, async function()  {
    // [Then] Describes the expected outcome or result of the scenario.
     this.name=faker.person.fullName();
    const email=faker.internet.email();
    const phone=faker.phone.number()
    this.subject=faker.hacker.phrase();
    const message=faker.lorem.paragraph(2);
    await this.homePage.fillAndSendMessage(this.name,email,phone,this.subject,message);

});

Then(`User verifies the correct message is displayed on submiting the form`, async function()  {
    // [Then] Describes the expected outcome or result of the scenario.
   await expect(this.homePage.succesMessageName).toContainText(this.name);
   await expect(this.homePage.succesMessageSubject).toContainText(this.subject);

});



Then(`User Verifes the Message Count should be increased by one.`, async function() {
    expect(this.laterCount).toBe(this.intialCount+1);
    console.log(this.intialCount);
    console.log(this.laterCount);
    // [Then] Describes the expected outcome or result of the scenario.
});


Then(`User Fetches the {string} Message Count through API`, async function (type)  {
const count= await this.apiUtils.getMessageCount();
    if(type=="Initial"){
       this.intialCount = count;
    }
   else{
    this.laterCount=count;

   }
    // [Then] Describes the expected outcome or result of the scenario.
});


Then(`User enters the {string} Date as {string}`, async function (dateType,dateValue)  {
        await this.homePage.fillDate(dateType,dateValue);
         if(dateType=='Check In'){
            this.startDate=dateValue;
        }
        else{
            this.endDate=dateValue;
        }
    // [Then] Describes the expected outcome or result of the scenario.
});

Then(`User clicks on the {string} Button`,async function  (buttonText) {
    await this.homePage.clickButtonWithText(buttonText);
    // [Then] Describes the expected outcome or result of the scenario.
});

Then(`User Books a Room for the {string}`,async function (roomType) {
    await this.homePage.bookForTheGivenRoom(roomType)
    // [Then] Describes the expected outcome or result of the scenario.
});

Then(`User Verifes correct dates are selected in the Booking Page`,{timeout:20000}, async function () {
    // [Then] Describes the expected outcome or result of the scenario.
    await this.homePage.verifiesSelectedDates(this.startDate,this.endDate);
});

Then(`User Fills the Booking Form with the Fake credentials.`, async function ()  {
    this.firstName=faker.person.firstName();
    this.lastName= faker.person.lastName();
    this.phoneNumber=faker.phone.number();
    this.email=faker.internet.email()
    await this.homePage.fillDetails(this.firstName,this.lastName,this.phoneNumber,this.email);
    // [Then] Describes the expected outcome or result of the scenario.
});

Then(`User Verifes The {string} message is displayed.`, async function (messageText){
   await this.homePage.confirmText(messageText);
});

