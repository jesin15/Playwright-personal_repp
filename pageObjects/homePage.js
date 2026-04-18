const { expect } = require("@playwright/test");
const { link } = require("node:fs");
const { setMaxIdleHTTPParsers } = require("node:http");

class HomePage{
    constructor(page){
        this.page=page;
        this.contactName=page.locator('#name');
        this.contactEmail=page.locator('#email');
        this.phone=page.locator('#phone');
        this.subject=page.locator("#subject");
        this.message=page.locator("#description");
        this.submitButton= page.getByRole('button',{name:'Submit'});
        this.succesMessageName=page.locator('#contact .h4');
        this.succesMessageSubject=page.locator('#contact p[style*="bold"]');
        
    }
    async fillAndSendMessage(name,email,phone,subject,message){
        await this.contactName.fill(name);
        await this.contactEmail.fill(email);
        await this.phone.fill(phone);
        await this.subject.fill(subject);
        await this.message.fill(message);
        await this.submitButton.click();
    }
    getDateInput(dateType){
       return this.page.locator(`//label[text()='${dateType}']/following-sibling::div//input`)

    }
    async fillDate(dateType,dateValue){
        await this.getDateInput(dateType).fill(dateValue);
       
        

    }
    getButtonWithText(buttonText){
        return this.page.getByRole('button',{name:buttonText});
    }
    async clickButtonWithText(buttonText){
        await this.getButtonWithText(buttonText).click();
    }
    getRoomName(roomName){
        return this.page.locator(".card").filter({hasText:roomName}).getByRole('link',{name:'Book now'});
    }
     async  bookForTheGivenRoom(roomName){
        await this.getRoomName(roomName).click();

    }
    getSelectedRowRange(){
        const selectedRow= this.page.locator('.rbc-event-content',{hasText:'Selected'});
        return this.parentRow=this.page.locator('.rbc-month-row').filter({has:selectedRow});

    }
    splitDate(date){
        return date =date.split('/')[0];

    }
    async verifiesSelectedDates(startDate,endDate){
       
        
        const selectedRows= this.page.locator('.rbc-event-content',{hasText:'Selected'});
         let maxAttmepts=0;
        while(!await selectedRows.last().isVisible()&&maxAttmepts<12){
            //click on th next month button 
            await this.page.getByRole('button',{name:'Next'}).click();
            await this.page.waitForTimeout(500);
        
            maxAttmepts--;
            
        }
        const startRow=this.page.locator('.rbc-month-row').filter({has:selectedRows}).first();
        const lastRow= this.page.locator('.rbc-month-row').filter({has:selectedRows}).last();
        const startDay=this.splitDate(startDate);
        const endDay=this.splitDate(endDate);

        await expect(startRow).toContainText(startDay);
        await expect(lastRow).toContainText(endDay);

    }
    async fillBookingField(fieldName, value) {
    // This locator is dynamic and will work for 'firstname', 'lastname', or 'email'
    const field = this.page.locator(`input[name="${fieldName}"]`);
    
    await field.waitFor({ state: 'visible' });
    await field.fill(value);
}
async fillDetails(name,lastName,phoneNumber,email){
    await this.fillBookingField("firstname",name);
    await this.fillBookingField("lastname",lastName);
    await this.fillBookingField("email",email);
    await this.fillBookingField("phone",phoneNumber);

}
async confirmText(expectedText){
    const textLocator = this.page.getByText(expectedText);
    
    // toBeVisible() includes a built-in retry/wait mechanism (default 5s)
    await expect(textLocator).toBeVisible({ timeout: 10000 });
}
    

}
module.exports={ HomePage };