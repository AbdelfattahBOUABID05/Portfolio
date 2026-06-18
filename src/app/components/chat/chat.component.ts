import { Component, inject, PLATFORM_ID, Inject, OnInit, signal, effect } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiChatService } from '../../services/ai-chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public aiChatService = inject(AiChatService);
  public userInput = '';
  public isBrowser = false;
  public isOpen = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Track changes to messages
    effect(() => {
      console.log('ChatComponent: messages changed!', this.aiChatService.messages());
    });

    // Track changes to isInitialized
    effect(() => {
      console.log('ChatComponent: UI state updated to ready:', this.aiChatService.isInitialized());
    });

    // Track changes to isLoading
    effect(() => {
      console.log('ChatComponent: UI state updated to loading:', this.aiChatService.isLoading());
    });
  }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  toggleChat() {
    this.isOpen.update(prev => !prev);
  }

  onSend() {
    if (this.userInput.trim()) {
      console.log('ChatComponent: sending message:', this.userInput);
      this.aiChatService.sendMessage(this.userInput);
      this.userInput = '';
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSend();
    }
  }
}
