import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from '../models/message';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {

  // @Input()
  // messages: Message[];
  //
  // @Input()
  message: Message;

  @Output('sendMessage')
  sendMessageEvent: EventEmitter<Message> = new EventEmitter();

  formValue: string;

  constructor() { }

  ngOnInit() {
  }

  public sendMessage(): void {
    // get text, create a new message every time and add it
    // this.message.content = this.formValue;
    // this.message.timestamp = new Date();
    // this.messages.push(this.message);
    this.message = new Message(this.formValue, new Date(), './../../../assets/images/user.png');
    this.sendMessageEvent.emit(this.message);
    this.formValue = '';
  }
}
