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

  public message : ChatMessage;
  // public messages : Message[];
  messages: Observable<ChatMessage[]>;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    const welcome_message = new ChatMessage('Welcome to Grange Virtual Private Assistant. I can help you to ' +
      'RESET your password or UNLOCK your account. Please let me know what I can do for you?', 'welcome');
    this.sendMessage(welcome_message);
    this.messages = this.chatService.conversation.asObservable()
      .scan((acc, val) => acc.concat(val) );
  }

  sendMessage(chatMessage: ChatMessage) {
    this.chatService.converse(chatMessage);
  }

}
