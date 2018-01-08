import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { MessageItemComponent } from './message-item/message-item.component';
import {FormsModule} from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from '../chat.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [MessageListComponent, MessageFormComponent, MessageItemComponent, ChatComponent],
  exports: [MessageListComponent, MessageFormComponent, ChatComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ChatService]
})
export class ChatModule { }
