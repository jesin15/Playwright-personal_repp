const{Before, After, setWorldConstructor, BeforeAll,AfterAll}=require('@cucumber/cucumber');
const{chromium,request}=require('@playwright/test');
const {APIUtils}=require('../../utils/APIUtils.js');
const {HomePage}=require('../../pageObjects/homePage.js');
const { finalization } = require('node:process');
require('dotenv').config();

let token;
let globalApiContext;
let browser

Before(async function(){
    
    this.context=await browser.newContext();
    await this.context.addCookies([{
        name:'token',
        value:token,
        url:'https://automationintesting.online'
    }])
    this.page=await this.context.newPage();
    this.apiContext= await request.newContext();
    this.apiUtils=new APIUtils(this.apiContext);
    this.homePage=new HomePage(this.page);
    this.adminToken= token;
})
After(async function(){
    await this.page.close();
    await this.context.close();
   
});
BeforeAll(async function () {
    browser= await chromium.launch({headless:false});
    globalApiContext= await request.newContext()
    const apiUtils= new APIUtils(globalApiContext);
    const payLoad={
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD
    };
    const url= process.env.BASE_URL;
    token= await apiUtils.getAdminToken(payLoad);
});
AfterAll(async function () {
    await globalApiContext.dispose();
    await browser.close(); // Close the browser once at the very end
});
