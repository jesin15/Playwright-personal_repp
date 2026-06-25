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
    async deleteBooking(roomType,firstName,token){
        const roomRespone= await this.apiContext.get('https://automationintesting.online/api/room');
        const roomData= await roomRespone.json();
        const targetRoom=roomData.rooms.find(r => r.type==roomType);
        if(!targetRoom) throw new Error(`Room Type ${roomType} not found`);
        const roomID=targetRoom.roomid;
    const bookingResponse= await this.apiContext.get(`https://automationintesting.online/api/booking?roomid=${roomID}`,{
        headers :{
            'Cookie':`token=${token}`

        }
    });
    const bookingData=await bookingResponse.json();
    const userBooking = bookingData.bookings.find(b => 
    b.firstname.trim().toLowerCase() === firstName.trim().toLowerCase()
);

// 3. Safety Check: If NO match is found, do NOT proceed to delete
if (!userBooking) {
    throw new Error(`CRITICAL: Could not find a booking for "${firstName}". Aborting delete to prevent accidental data loss.`);
}
    const bookingID=userBooking.bookingid;
    const deleteResponse=await this.apiContext.delete(`https://automationintesting.online/api/booking/${bookingID}`,{
        headers: {
            'Cookie':`token=${token}`
        }
    });
    return deleteResponse.status()


    }
    async websiteHealthCheckup(){
        const response =await this.apiContext.get('https://automationintesting.online/');
        return response;

    }
    async deleteMessage(targetName,token){
        const response=await this.apiContext.get('https://automationintesting.online/api/message');
        const responseBody = await response.json();
        const matchedMessage = responseBody.messages.find(msg => msg.name.trim()==targetName);
        const id =matchedMessage.id;
        const deleteResponse=await this.apiContext.delete(`https://automationintesting.online/api/message//${id}`,{
        headers: {
            'Cookie':`token=${token}`
        }
       
    });
    return deleteResponse.status();





    }
}
module.exports = { APIUtils };  