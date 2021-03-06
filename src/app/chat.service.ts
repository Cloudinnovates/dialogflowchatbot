import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiAiClient } from 'api-ai-javascript';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class ChatMessage {
  public link: string;
  public timestamp: Date;
  public avatar: string;
  // public sentBy: string;

  constructor(public content: string, public sentBy: string) {
    if (this.sentBy === 'user') {
      this.avatar = './../../../assets/images/user.png';
    } else {
      this.avatar = './../../../assets/images/bot.png';
    }
  }
}

@Injectable()
export class ChatService {

  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({accessToken: this.token});
  conversation = new BehaviorSubject<ChatMessage[]>([]);

  constructor() { }

  converse(msg: ChatMessage) {
    msg.timestamp = new Date();
    console.log('Send message', msg);
    this.update(msg);

    if(msg.sentBy === 'welcome') {
      return;
    }
    // const userMessage = new ChatMessage(msg, 'user');
    return this.client.textRequest(msg.content)
      .then(res => {
        const speech = res.result.fulfillment.speech;
        const linkifiedSpeech = this.linkify(speech);
        const botImage = require('./../assets/images/bot.png')
        const botMessage = new ChatMessage(linkifiedSpeech[0], 'bot');
        botMessage.timestamp = new Date();
        if ( linkifiedSpeech.length > 1) {
          botMessage.link = linkifiedSpeech[1];
        }
        this.update(botMessage);
      });
  }

  private linkify(plainText): [string] {
    const splitted = plainText.split('http');
    return splitted;
  }

  update(msg: ChatMessage) {
    this.conversation.next([msg]);

  }
}
