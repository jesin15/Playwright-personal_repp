const{Before, After, setWorldConstructor }=require('@cucumber/cucumber');
const{chromium,request}=require('@playwright/test');
const {APIUtils}=require('../../utils/APIUtils.js');
const {HomePage}=require('../../pageObjects/homePage.js')

Before(async function(){
    this.browser= await chromium.launch({headless:false});
    this.context=await this.browser.newContext();
    this.page=await this.context.newPage();
    this.apiContext= await request.newContext();
    this.apiUtils=new APIUtils(this.apiContext);
    this.homePage=new HomePage(this.page);
})
After(async function(){
    await this.page.close();
    await this.context.close();
    await this.browser.close();
    await this.apiContext.dispose();
});