class APIUtils
{
    constructor(apiContext){
        this.apiContext= apiContext;
    }
    async getAdminToken(loginPayLaod){
         const loginResponse = await this.apiContext.post("https://automationintesting.online/api/auth/login", {
        data: loginPayLaod
    });
    const loginResponseJson=await loginResponse.json();
    return loginResponseJson.token;

    }
    async getMessageCount(){
        const messageCountResponse= await this.apiContext.get("https://automationintesting.online/api/message/count");
        const messageCountResponseJson=await messageCountResponse.json();
        return messageCountResponseJson.count;
    }
}
module.exports = { APIUtils };  