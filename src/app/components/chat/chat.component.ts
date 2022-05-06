import { Component, OnInit } from '@angular/core';
import { ChatShowcaseService } from 'src/app/services/chat-showcase/chat-showcase.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages!: any[];
  date = new Date();
  constructor(private chatShowcaseService: ChatShowcaseService) {
    this.messages = this.chatShowcaseService.loadMessages();
  }

  ngOnInit(): void {
  }
  sendMessage(event: any) {
    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: 'text',
      user: {
        name: 'Jonh Doe',
      },
    });
    // const botReply = this.chatShowcaseService.reply(event.message);
    // if (botReply) {
    //   setTimeout(() => { this.messages.push(botReply) }, 500);
    // }
  }
  // recieveMessage() {
  //   this.chatShowcaseService.reply({

  //   });
  // }
}
