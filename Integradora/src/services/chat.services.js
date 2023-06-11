import chatModel from '../models/chat.model.js';

class ChatService {
    constructor() {
        this.chatModel = chatModel; 
    }

    async saveChat(data){
        try {
          const newMessage = data;
          return await this.chatModel.create(newMessage);
        } catch (error) {
          console.log('Error saving message:', error);
        }
      };
      
      async getChat(){
        try {
          const messages = await this.chatModel.find().sort({ timestamp: 1 });
          return messages;
        } catch (error) {
          console.log('Error retrieving messages:', error);
          return [];
        }
      };
}

export const chatServices = new ChatService();


