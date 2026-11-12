import { Component, inject, PLATFORM_ID, OnInit, signal, ViewChild, ElementRef, Injector, effect, afterNextRender } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiChatService } from '../../services/ai-chat.service';
import { LucideMessageSquare, LucideX, LucideSend, LucideBot } from '@lucide/angular';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideMessageSquare, LucideX, LucideSend, LucideBot],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public aiChatService = inject(AiChatService);
  public isBrowser = false;
  public isOpen = signal(false);
  public selectedLang: 'en' | 'fr' | 'ar' | null = null;
  public suggestedQuestions: string[] = [];
  public userInput = '';

  @ViewChild('chatMessagesContainer') private chatMessagesContainer!: ElementRef;

  private platformId = inject(PLATFORM_ID);
  private injector = inject(Injector);

  constructor() {
    // Scroll en bas uniquement lorsqu'un nouveau message arrive ou à l'ouverture du chat,
    // et après le rendu (afterNextRender) : plus de reflow forcé à chaque cycle de CD.
    effect(() => {
      const isOpen = this.isOpen();
      this.aiChatService.messages();

      if (!isPlatformBrowser(this.platformId) || !isOpen) {
        return;
      }

      afterNextRender(() => this.scrollToBottom(), { injector: this.injector });
    });
  }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  toggleChat() {
    const newState = !this.isOpen();
    this.isOpen.set(newState);
    
    // Réinitialiser les messages si on ferme le chat
    if (!newState && this.selectedLang) {
      this.aiChatService.messages.set([]);
      this.selectedLang = null;
      this.suggestedQuestions = [];
    }
  }

  setLanguage(lang: 'en' | 'fr' | 'ar') {
    // Vider les messages précédents avant d'ajouter le nouveau message de bienvenue
    this.aiChatService.messages.set([]);
    this.selectedLang = lang;
    this.suggestedQuestions = this.aiChatService.getSuggestedQuestions(lang);
    this.aiChatService.addMessage('assistant', this.aiChatService.getWelcomeMessage(lang));
  }

  async selectQuestion(question: string) {
    if (!this.isBrowser || !this.selectedLang || this.aiChatService.isLoading()) return;
    
    this.aiChatService.addMessage('user', question);
    this.aiChatService.isLoading.set(true);
    
    const response = await this.aiChatService.getResponse(question, this.selectedLang);
    
    this.aiChatService.addMessage('assistant', response);
    this.aiChatService.isLoading.set(false);
  }

  async onSend() {
    if (!this.userInput.trim() || !this.selectedLang || this.aiChatService.isLoading()) return;
    
    const question = this.userInput.trim();
    this.userInput = '';
    await this.selectQuestion(question);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSend();
    }
  }

  formatMessage(content: string): string {
    return content.replace(/\n/g, '<br>');
  }

  private scrollToBottom(): void {
    if (this.chatMessagesContainer) {
      try {
        this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
      } catch (err) {
        console.error('Scroll error:', err);
      }
    }
  }
}