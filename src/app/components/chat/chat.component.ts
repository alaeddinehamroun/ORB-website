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
    const files = !event.files ? [] : event.files.map((file: any) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'file-text-outline',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: 'Jonh Doe',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
    const botReply = this.chatShowcaseService.reply(event.message);
    if (botReply) {
      setTimeout(() => { this.messages.push(botReply) }, 500);
    }
  }
}
