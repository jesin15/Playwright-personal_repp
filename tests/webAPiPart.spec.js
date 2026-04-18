const { test, expect } = require('@playwright/test');
import { fa, faker } from '@faker-js/faker';
import { parseEnv } from 'node:util';
const {APIUtils}= require('../utils/APIUtils');

    const loginPayLaod = { username: "admin", password: "password" };
    let token; // We store the token in this variable to share it
    let apiContext;
    let apiUtils;

    test.beforeAll(async ({ playwright }) => {
        apiContext= await playwright.request.newContext();
        apiUtils= new APIUtils(apiContext);
        token= await apiUtils.getAdminToken(loginPayLaod);
        
    });
    test.afterAll(async()=>{
        await apiContext.dispose()
    });

// Use beforeEach to ensure EVERY test gets the token injected
test.beforeEach(async ({ context }) => {
    await context.addCookies([{
        name: 'token',
        value: token,
        url: 'https://automationintesting.online'
    }]);
});

test('Login check', async ({ page }) => {
    await page.goto("https://automationintesting.online/admin/rooms"); 
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
});

test('login as admin and click on the branding link', async ({ page }) => {
    await page.goto("https://automationintesting.online/admin/rooms"); 
await page.locator('[data-testid="roomlisting"]').getByText('Single').click();  


const bookinDetail= await page.locator('.detail ');
await bookinDetail.waitFor({ state :'visible', timeout:5000})
const desiredBookingDetail= bookinDetail.last();
const bookedName= await desiredBookingDetail.locator('.col-sm-2').first().innerText();
console.log(bookedName);
console.log(bookinDetail);
console.log(desiredBookingDetail);

  // Verify we are still on a valid page
    await page.pause()
});
test('User visits the site and check the availability of the room that has both wifi and radio and book the room for date', async function ({page}) {
    await page.goto("https://automationintesting.online/#rooms");
   await page.locator("//label[text()='Check In']/following-sibling::div//input").fill('18/03/2026');
   await page.locator("//label[text()='Check Out']/following-sibling::div//input").fill('19/03/2026');
   const roomCards=  page.locator(".card");
   const HightechRoom= roomCards
   .filter({hasText:'Radio'})
   .filter({hasText:'WiFi'});
   const roomName= await HightechRoom.first().locator('h5').innerText();
   console.log(roomName);
   await HightechRoom.first().getByRole('link',{name:'Book now'}).click()
   await page.locator('#doReservation').click();
   const firstName=faker.person.firstName()
   const lastName=faker.person.lastName();
   const email= faker.internet.email();
   const randomNumber=faker.phone.number()
    await page.getByLabel('Firstname').fill(firstName);
    await page.getByLabel('Lastname').fill(lastName);
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Phone').fill(randomNumber);
    await page.getByRole('button',{name:'Reserve Now'}).click()
    await page.goto("https://automationintesting.online/admin/rooms"); 
    await page.locator('[data-testid="roomlisting"]').getByText(`${roomName}`).click(); 
    const bookinDetail= await page.locator('.detail ');
    const desiredBookingDetail= bookinDetail.last();
     await desiredBookingDetail.waitFor({ state :'visible', timeout:5000})
    const bookedName= await desiredBookingDetail.locator('.col-sm-2').first();
    await expect(bookedName).toHaveText(firstName);


     await page.pause();


   

    
});
test.only('Verify the message count ', async function ({page}) {
    const intialMessageCount=await apiUtils.getMessageCount();
    console.log(intialMessageCount);
    const Name=faker.person.fullName();
    const email= faker.internet.email();
    const phoneNumber=faker.phone.number();
    const subject=faker.lorem.lines(1);
    const message=faker.lorem.paragraph(4);
    await page.locator('')
    

    
    
})