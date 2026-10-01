import { Injectable, signal } from '@angular/core';
import { of, delay, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiChatService {
  public messages = signal<Array<{role: 'user' | 'assistant', content: string}>>([]);
  public isLoading = signal<boolean>(false);

  // Base de connaissances PERSONNALISÉE selon mon portfolio/CV
  private faqDatabase = [
    // 🇬🇧 English FAQs (exact portfolio data)
    { lang: 'en', question: 'What services do you offer?', answer: 'I offer : 🖥️ Full-Stack Web & Mobile Development • ☁️ DevOps & Cloud Infrastructure • 🌐 Network & System Administration • 🔒 Secure solution architecture. I end-to-end deliver projects from design to production.' },
    { lang: 'en', question: 'What technologies do you use?', answer: 'My technical stack : Frontend: Angular, Flutter, Dart, HTML5, CSS3, Tailwind CSS • Backend: Java, Spring Boot, PHP, Laravel, Flask • DevOps: Docker, GitLab CI/CD, Jenkins, Linux, Nginx • Network: Cisco IOS, CCNA, VLANs, NAT/DHCP.' },
    { lang: 'en', question: 'How can I contact you?', answer: '📱 WhatsApp: <a href="https://wa.me/abdo_._bd" target="_blank" class="text-blue-500 hover:underline font-medium">@abdo_._bd</a> • 📧 Email: <a href="mailto:abdelfattahbouabid123@gmail.com" class="text-blue-500 hover:underline font-medium">abdelfattahbouabid123@gmail.com</a> • 🔗 LinkedIn: <a href="https://www.linkedin.com/in/abdelfattah-bouabid-150a56335" target="_blank" class="text-blue-500 hover:underline font-medium">Profile</a> • 💻 GitHub: <a href="https://github.com/AbdelfattahBOUABID05" target="_blank" class="text-blue-500 hover:underline font-medium">Profile</a> • Or use the contact form on this website to send me a direct message!' },
    { lang: 'en', question: 'What projects have you built?', answer: 'My key projects : 1️⃣ LogSOC : AI-powered log analysis platform • 2️⃣ Tactix : Football strategy mobile app • 3️⃣ Cisco Enterprise Network Infrastructure • 4️⃣ Automated CI/CD Pipeline. Check the projects section for details!' },
    { lang: 'en', question: 'What is your professional experience?', answer: 'My career: 1️⃣ Systems & DevOps Intern @ Attijariwafa Bank (Apr-Jun 2026, Casablanca) • 2️⃣ Network Intern @ TSM (Mar-Apr 2025, Casablanca) • 3️⃣ IT Intern @ Province of Sefrou (Jul-Aug 2024). I worked on LogSOC, Cisco networks & CI/CD pipelines.' },
    { lang: 'en', question: 'Are you available for new projects?', answer: 'Yes! I am currently available for new freelance projects or full-time opportunities. Feel free to contact me to discuss your project needs!' },

    // 🇫🇷 French FAQs (vos données exactes du portfolio)
    { lang: 'fr', question: 'Quels services proposez-vous?', answer: 'Je propose : 🖥️ Développement Web & Mobile Full-Stack • ☁️ Infrastructure DevOps & Cloud • 🌐 Administration Réseaux & Systèmes • 🔒 Architecture de solutions sécurisées. Je livre des projets de bout en bout, de la conception à la production.' },
    { lang: 'fr', question: 'Quelles technologies utilisez-vous?', answer: 'Ma stack technique : Frontend : Angular, Flutter, Dart, HTML5, CSS3, Tailwind CSS • Backend : Java, Spring Boot, PHP, Laravel, Flask • DevOps : Docker, GitLab CI/CD, Jenkins, Linux, Nginx • Réseau : Cisco IOS, CCNA, VLANs, NAT/DHCP.' },
    { lang: 'fr', question: 'Comment puis-je vous contacter?', answer: '📱 WhatsApp: <a href="https://wa.me/abdo_._bd" target="_blank" class="text-blue-500 hover:underline font-medium">@abdo_._bd</a> • 📧 Email: <a href="mailto:abdelfattahbouabid123@gmail.com" class="text-blue-500 hover:underline font-medium">abdelfattahbouabid123@gmail.com</a> • 🔗 LinkedIn: <a href="https://www.linkedin.com/in/abdelfattah-bouabid-150a56335" target="_blank" class="text-blue-500 hover:underline font-medium">Profil</a> • 💻 GitHub: <a href="https://github.com/AbdelfattahBOUABID05" target="_blank" class="text-blue-500 hover:underline font-medium">Profil</a> • Ou utilisez le formulaire de contact sur ce site pour m\'envoyer un message !' },
    { lang: 'fr', question: 'Quels projets avez-vous réalisés?', answer: 'Mes projets principaux : 1️⃣ LogSOC : Plateforme d\'analyse de logs avec IA • 2️⃣ Tactix : Application mobile de stratégie football • 3️⃣ Infrastructure réseau Cisco entreprise • 4️⃣ Pipeline CI/CD automatisé. Consultez la section projets pour plus de détails !' },
    { lang: 'fr', question: 'Quelle est votre expérience professionnelle?', answer: 'Mon parcours : 1️⃣ Stagiaire Ingénierie Systèmes & DevOps chez Attijariwafa Bank (avr-juin 2026, Casablanca) • 2️⃣ Stagiaire Réseaux & Télécom chez TSM (mars-avr 2025, Casablanca) • 3️⃣ Stagiaire Informatique à la Province de Sefrou (juil-août 2024). J\'ai travaillé sur LogSOC, des réseaux Cisco et des pipelines CI/CD.' },
    { lang: 'fr', question: 'Êtes-vous disponible pour de nouveaux projets?', answer: 'Oui ! Je suis actuellement disponible pour de nouveaux projets freelance ou des opportunités en CDI. N\'hésitez pas à me contacter pour discuter de vos besoins !' },

    // 🇸🇦 Arabic FAQs (بياناتك الدقيقة من معرض أعمالك)
    { lang: 'ar', question: 'ما هي الخدمات التي تقدمها؟', answer: 'أقدم : 🖥️ تطوير الويب والجوال Full-Stack • ☁️ البنية التحتية DevOps والسحابة • 🌐 إدارة الشبكات والأنظمة • 🔒 تصميم حلول آمنة. أقوم بتسليم المشاريع من البداية إلى النهاية.' },
    { lang: 'ar', question: 'ما هي التقنيات التي تستخدمها؟', answer: 'مجموعة تقنياتي : الواجهة الأمامية: Angular, Flutter, Dart, HTML5, CSS3, Tailwind CSS • الواجهة الخلفية: Java, Spring Boot, PHP, Laravel, Flask • DevOps: Docker, GitLab CI/CD, Jenkins, Linux, Nginx • الشبكات: Cisco IOS, CCNA, VLANs, NAT/DHCP.' },
    { lang: 'ar', question: 'كيف يمكنني الاتصال بك؟', answer: '📱 واتساب: <a href="https://wa.me/abdo_._bd" target="_blank" class="text-blue-500 hover:underline font-medium">@abdo_._bd</a> • 📧 البريد الإلكتروني: <a href="mailto:abdelfattahbouabid123@gmail.com" class="text-blue-500 hover:underline font-medium">abdelfattahbouabid123@gmail.com</a> • 🔗 LinkedIn: <a href="https://www.linkedin.com/in/abdelfattah-bouabid-150a56335" target="_blank" class="text-blue-500 hover:underline font-medium">الملف الشخصي</a> • 💻 GitHub: <a href="https://github.com/AbdelfattahBOUABID05" target="_blank" class="text-blue-500 hover:underline font-medium">الملف الشخصي</a> • أو استخدم نموذج الاتصال على هذا الموقع لإرسال رسالة مباشرة!' },
    { lang: 'ar', question: 'ما هي المشاريع التي قمت بإنشائها؟', answer: 'مشاريعي الرئيسية : 1️⃣ LogSOC : منصة تحليل السجلات بالذكاء الاصطناعي • 2️⃣ Tactix : تطبيق جوال لاستراتيجيات كرة القدم • 3️⃣ البنية التحتية لشبكة سيسكو المؤسسية • 4️⃣ خط أنابيب CI/CD آلي. اطلع على قسم المشاريع للمزيد من التفاصيل!' },
    { lang: 'ar', question: 'ما هي خبرتك المهنية؟', answer: 'مساري المهني : 1️⃣ متدرب هندسة الأنظمة والـ DevOps في بنك التجاري وفا (أبريل-يونيو 2026، الدار البيضاء) • 2️⃣ متدرب شبكات في شركة TSM (مارس-أبريل 2025، الدار البيضاء) • 3️⃣ متدرب تكنولوجيا المعلومات في مقاطعة صفرو (يوليو-أغسطس 2024). عملت على LogSOC وشبكات سيسكو وخطوط CI/CD.' },
    { lang: 'ar', question: 'هل أنت متاح لمشاريع جديدة؟', answer: 'نعم! أنا متاح حالياً لمشاريع العمل الحر المستقلة أو فرص العمل بدوام كامل. لا تتردد في الاتصال بي لمناقشة احتياجات مشروعك!' }
  ];

  private fallbackMessages = {
    en: "I'm here to help with any questions about my services, projects, experience, or technologies! Feel free to ask me anything from the suggested questions or contact me directly for more details, I'm always happy to discuss new opportunities.",
    fr: "Je suis là pour répondre à toutes vos questions sur mes services, mes projets, mon expérience ou les technologies que j'utilise ! N'hésitez pas à choisir parmi les questions suggérées ou à me contacter directement pour plus de détails, je serai ravi de discuter de vos nouveaux projets.",
    ar: "أنا هنا للمساعدة في أي أسئلة حول خدماتي أو مشاريعي أو خبرتي أو التقنيات! لا تتردد في اختيار من الأسئلة المقترحة أو التواصل معي مباشرة لمزيد من التفاصيل، أنا سعيد دائماً بمناقشة الفرص الجديدة."
  };

  private welcomeMessages = {
    en: "Hello! 👋 I'm your virtual assistant. How can I help you today?",
    fr: "Bonjour ! 👋 Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
    ar: "أهلاً بك! 👋 أنا مساعدك الافتراضي. كيف يمكنني مساعدتك اليوم؟"
  };

  private suggestedQuestions = {
    en: [
      "What services do you offer?",
      "What technologies do you use?",
      "How can I contact you?",
      "What projects have you built?"
    ],
    fr: [
      "Quels services proposez-vous?",
      "Quelles technologies utilisez-vous?",
      "Comment puis-je vous contacter?",
      "Quels projets avez-vous réalisés?"
    ],
    ar: [
      "ما هي الخدمات التي تقدمها؟",
      "ما هي التقنيات التي تستخدمها؟",
      "كيف يمكنني الاتصال بك؟",
      "ما هي المشاريع التي قمت بإنشائها؟"
    ]
  };

  public getWelcomeMessage(lang: 'en' | 'fr' | 'ar'): string {
    return this.welcomeMessages[lang];
  }

  public getSuggestedQuestions(lang: 'en' | 'fr' | 'ar'): string[] {
    return this.suggestedQuestions[lang];
  }

  constructor() {}

  private calculateSimilarity(str1: string, str2: string): number {
    const set1 = new Set(str1.toLowerCase().split(/\s+/).filter(w => w.length > 2));
    const set2 = new Set(str2.toLowerCase().split(/\s+/).filter(w => w.length > 2));
    
    if (set1.size === 0 || set2.size === 0) return 0;
    
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    
    return intersection.size / union.size;
  }

  public addMessage(role: 'user' | 'assistant', content: string) {
    this.messages.update(messages => [...messages, { role, content }]);
  }

  public clearMessages() {
    this.messages.set([]);
  }

  public async getResponse(question: string, lang: 'en' | 'fr' | 'ar') {
    const userQuestion = question.toLowerCase().trim();
    const langFaqs = this.faqDatabase.filter(item => item.lang === lang);
    
    // Chercher dans la FAQ locale avec une similarité élevée
    let bestMatch: any = null;
    let maxSimilarity = 0;
    
    for (const faq of langFaqs) {
      const similarity = this.calculateSimilarity(userQuestion, faq.question);
      if (similarity > maxSimilarity && similarity > 0.4) { // 40% de similarité minimum pour une meilleure détection
        maxSimilarity = similarity;
        bestMatch = faq;
      }
    }

    if (bestMatch) {
      return firstValueFrom(of(bestMatch.answer).pipe(delay(500))); // Délai plus naturel pour l'utilisateur
    }

    // Si pas de réponse trouvée, renvoyer le message d'aide
    return firstValueFrom(of(this.fallbackMessages[lang]).pipe(delay(700)));
  }
}