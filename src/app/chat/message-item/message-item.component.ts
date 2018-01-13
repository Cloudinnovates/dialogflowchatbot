import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from '../../chat.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  @Input()
  message: ChatMessage;

  constructor() { }

  ngOnInit() {
  }

  cardBackgroundByUser() {
    if(this.message.sentBy === 'user') {
      return 'bg-info';
    } else if (this.message.sentBy === 'welcome') {
      return 'bg-warning';
    } else {
      return 'bg-success';
    }
  }

  cardMarginByUser() {
    if(this.message.sentBy === 'user') {
      return 'userMessageCard';
    } else if (this.message.sentBy === 'welcome') {
      return 'welcomeMessageCard';
    } else {
      return 'botMessageCard';
    }
  }

}
