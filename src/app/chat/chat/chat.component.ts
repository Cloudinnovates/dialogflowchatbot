import { Component, OnInit } from '@angular/core';
import {Message} from '../models/message';
import {ChatService, ChatMessage} from '../../chat.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public message : Message;
  // public messages : Message[];
  messages: Observable<ChatMessage[]>;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    const userImage = require('./../../../assets/images/user.png')
    const botImage = require('./../../../assets/images/bot.png')
    this.message = new Message('', null, userImage);
    // this.messages = [
    //   new Message('Welcome to chatbot universe', new Date(), botImage)
    // ];
    this.messages = this.chatService.conversation.asObservable()
      .scan((acc, val) => acc.concat(val) );
  }

  sendMessage(chatMessage: Message) {
    this.chatService.converse(chatMessage.content);
  }

}
