import { Injectable, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiChatService {
  public isLoading = signal<boolean>(false);
  public isInitialized = signal<boolean>(false);
  public messages = signal<ChatMessage[]>([]);
  private worker?: Worker;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initWorker();
    }
  }

  private initWorker() {
    if (typeof Worker !== 'undefined') {
      // Create a new worker from the worker file we'll create
      this.worker = new Worker(new URL('./ai-chat.worker', import.meta.url));

      this.worker.onmessage = ({ data }) => {
        console.log('Received message from worker:', data);
        switch (data.type) {
          case 'progress':
            console.log('Model loading progress:', data);
            break;
          case 'ready':
            console.log('Worker is ready!');
            this.isInitialized.set(true);
            this.isLoading.set(false);
            // Test: add welcome message
            this.addMessage('assistant', 'Hello! I am ready to help!');
            console.log('Test welcome message added!');
            break;
          case 'text':
            console.log('Received text from worker:', data.text);
            this.addMessage('assistant', data.text);
            this.isLoading.set(false);
            console.log('Current messages:', this.messages());
            break;
          case 'error':
            console.error('AI Error:', data.error);
            this.isLoading.set(false);
            break;
        }
      };

      this.worker.onerror = (error) => {
        console.error('Worker Error:', error);
        this.isLoading.set(false);
      };
    } else {
      console.error('Web Workers are not supported in your browser');
    }
  }

  public async sendMessage(userInput: string) {
    if (!isPlatformBrowser(this.platformId) || !this.worker || this.isLoading()) return;

    this.addMessage('user', userInput);
    this.isLoading.set(true);

    this.worker.postMessage({
      type: 'generate',
      userInput
    });
  }

  private addMessage(role: 'user' | 'assistant', content: string) {
    this.messages.update((prev) => [...prev, { role, content }]);
  }
}
