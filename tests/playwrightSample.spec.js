const {test,expect}= require('@playwright/test');
import { faker } from '@faker-js/faker';

const path = require('node:path');


test('navigate and check whether the title is correct', async function ({page}) {
    await page.goto("https://automationexercise.com");

    await expect(page).toHaveTitle("Automation Exercise")
    await page.locator("//a[@href='/login']").click();
    await expect(page.locator("//h2[text()='New User Signup!']")).toBeVisible();
    await page.locator("//input[@data-qa='signup-name']").fill("Rakesh Lakhan")
    await page.locator("//input[@data-qa='signup-email']").fill("rakeshl@gmail.com")
    await page.locator("//button[text()='Signup']").click()
    await expect(page.locator("//b[text()='Enter Account Information']")).toBeVisible();
    await page.locator("[data-qa='password']").fill("Jesin@2001")
    await page.locator("#days").selectOption("15");
    await page.locator("#months").selectOption("September");
    await page.locator("#years").selectOption("2001")
    await page.locator("#newsletter").click()
    await page.locator("#optin").click()
    await page.locator("[data-qa='first_name']").fill("Rakesh");
    await page.locator("[data-qa='last_name']").fill("Lakhan");
    await page.locator("[data-qa='company']").fill("JBurst");
    await page.locator("[data-qa='address']").fill("12345");
      await page.locator("[data-qa='address2']").fill("67890");
      await page.locator("[data-qa='state']").fill("Kerala")
     await page.locator("[data-qa='city']").fill("Tvm")
     await page.locator("[data-qa='zipcode']").fill("121001")
          await page.locator("[data-qa='mobile_number']").fill("989990112")
              await page.pause();

          await page.locator("[data-qa='create-account']").click()

    // await page.pause();
});
test('rahul Shetty assignment', async function ({page}) {
    const products=page.locator(".productinfo");
    const productName="Stylish Dress";
    await page.goto("https://automationexercise.com");
    await expect(page).toHaveTitle("Automation Exercise") 
    await page.locator("//a[@href='/login']").click();
  await expect(page.locator("//h2[text()='Login to your account']")).toBeVisible();
  await page.locator("//input[@data-qa='login-email']").fill("rakeshl@gmail.com")
  await page.locator("//input[@data-qa='login-password']").fill("Jesin@2001")
    await page.locator("[data-qa='login-button']").click()
    const titles= await page.locator(".productinfo p").allTextContents();
    // const count=await products.count();
for(let i=0;i<=(await products.count()); ++i){
    if(await products.nth(i).locator("p").textContent()===productName){
        await products.nth(i).locator("text=Add to cart").click()
        break;
    }
}
//its the view link when we add the product to the cart 
await page.locator(".modal-content a").click()
//this the content to be loaded that means the table should be loaded 
await page.locator("div tr").first().waitFor()
//it is check whether the name of the product is available or not 
const bool=await page.locator(`a:has-text("${productName}")`).isVisible();
expect(bool).toBeTruthy();
await page.locator(".check_out").click();
const number = await page.locator('#address_invoice .address_phone').textContent()
console.log(number)
const name =await page.locator("#address_invoice .address_lastname").textContent();
await expect(page.locator('#address_invoice .address_phone')).toHaveText("989990112")
await page.locator(".check_out").click();
await page.locator("//input[@data-qa='name-on-card']").fill(name);
await page.locator("//input[@data-qa='card-number']").fill(number);
await page.locator("//input[@data-qa='cvc']").fill("666")
await page.locator("//input[@data-qa='expiry-month']").fill("09")
await page.locator("//input[@data-qa='expiry-year']").fill("2006")
await page.locator("#submit").click()

await page.pause()
  


   
});
test('Special Locators', async function({page}){
   await page.goto("https://rahulshettyacademy.com/angularpractice/");
   await page.getByLabel('Check me out if you Love IceCreams!').click();
   await page.getByLabel("Gender").selectOption("Male");
   await page.getByRole("button", {name : 'Submit'}).click();   
   await page.getByRole("link",{name:'Shop'}).click();
   await page.locator("app-card").filter({hasText: 'Blackberry'}).getByRole("button").click();
});
test('Calendar Validation Rahul Setty', async function ({page}) {
    const date="15";
    const month="10";
    const year="2027";
    const expectedList=[month,date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click()
    const inputs=  page.locator(".react-date-picker__inputGroup__input")
    for(let i =0;i<expectedList.length;i++){
          const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
    }
     //await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();


    
});
test('place order: register while checkout',async function ({page}) {
    const product="Stylish Dress";
    await page.goto("https://automationexercise.com");
    await expect(page).toHaveTitle("Automation Exercise");
    const productElement= page.locator(".productinfo").filter({hasText:product})
    await productElement.getByText("Add to cart").first().click()
    await page.getByRole("link",{name:'View Cart'}).click()
    await page.getByText("Proceed To Checkout").click()  
   const textTobeVisbile= await page.getByText("Register / Login account to proceed on checkout.").isVisible();
   expect(textTobeVisbile).toBeTruthy();
   const email = faker.internet.email()
   const firstName= faker.person.firstName()
   const lastName=faker.person.lastName()
   await page.getByRole("link",{name:'Register / Login'}).click()
   await expect(page.locator("//h2[text()='New User Signup!']")).toBeVisible();
    await page.locator("//input[@data-qa='signup-name']").fill(firstName+" "+lastName)
    await page.locator("//input[@data-qa='signup-email']").fill(email)
    await page.locator("//button[text()='Signup']").click()
    await expect(page.locator("//b[text()='Enter Account Information']")).toBeVisible();
    await page.locator("[data-qa='password']").fill("Jesin@2001")
    await page.locator("#days").selectOption("15");
    await page.locator("#months").selectOption("September");
    await page.locator("#years").selectOption("2001")
    await page.locator("#newsletter").click()
    await page.locator("#optin").click()
    await page.locator("[data-qa='first_name']").fill(firstName);
    await page.locator("[data-qa='last_name']").fill(lastName);
    await page.locator("[data-qa='company']").fill("JBurst");
    await page.locator("[data-qa='address']").fill("12345");
      await page.locator("[data-qa='address2']").fill("67890");
      await page.locator("[data-qa='state']").fill("Kerala")
     await page.locator("[data-qa='city']").fill("Tvm")
     await page.locator("[data-qa='zipcode']").fill("121001")
          await page.locator("[data-qa='mobile_number']").fill("989990112")
              await page.pause();

          await page.locator("[data-qa='create-account']").click()

})