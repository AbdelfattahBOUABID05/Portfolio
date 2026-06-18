/// <reference lib="webworker" />

import { pipeline } from '@xenova/transformers';

// Define types for messages
interface WorkerMessage {
  type: 'generate' | string;
  userInput?: string;
}

interface WorkerResponse {
  type: 'ready' | 'progress' | 'text' | 'error';
  text?: string;
  error?: any;
  progress?: any;
}

let generator: any | null = null; // Use any for now to avoid TypeScript issues

// PRE-PROCESSED CONTEXT - Concise summary of the portfolio
const PRE_PROCESSED_CONTEXT = `
Name: Abdelfattah Bouabid
Title: Full-Stack Engineer, DevOps & Network Infrastructure
Summary: Full-Stack & DevOps Engineer with end-to-end expertise: from performant Web and Mobile applications to automated infrastructures. Designer of complete solutions like LogSOC. Optimizes performance, resilience and security of stacks to accelerate companies' digital transformation.
Availability: Available for new projects
Languages: English, French

Skills:
  Frontend & Mobile: Angular, Flutter, Dart, HTML5, CSS3, Tailwind CSS
  Backend & APIs: Java, Spring Boot, PHP, Laravel, Flask, REST APIs
  DevOps & Cloud: Docker, GitLab CI/CD, Jenkins, VMware ESXi, Nginx, Linux, Bash/Shell
  Network & Security: Cisco IOS, CCNA Routing & Switching, Cisco CyberOps, Routing & Switching, VLANs & ACLs, NAT/DHCP
  Digital Design & Docs: Logo Design, Canva, Technical Documentation, Professional Reports (LaTeX)

Experience:
  1. System & DevOps Engineering Intern at Attijariwafa Bank (Apr 2026 - Jun 2026):
     - Optimized system infrastructure and reliability of bank server environments
     - Industrialized web application life cycle with Docker and GitLab CI/CD
     - Designed LogSOC system for intelligent monitoring and supervision
  2. Network & Telecommunications Intern at TSM (Mar 2025 - Apr 2025):
     - Installed and configured enterprise network equipment (Huawei, Juniper)
     - Implemented routing/switching protocols, access security, and telecom link troubleshooting
     - Provided level 2 technical support
  3. Computer & Systems Intern at Sefrou Province (Jul 2024 - Aug 2024):
     - Deployed and configured local network equipment
     - Managed computer park (Windows/Linux installation, hardware maintenance, system image deployment)
     - Provided technical assistance and level 1/2 support
  4. Computer Space Manager at Computer Library (Aug 2023 - Sep 2023):
     - Managed local network access, basic routing, and public Wi-Fi security
     - Performed software/hardware maintenance, malware disinfection, and performance optimization
     - Provided user support and training

Projects:
  1. LogSOC - Intelligent Platform for System Log Analysis and Supervision (Full-Stack / AI):
     - Centralizes, analyzes, and detects anomalies in system logs with AI integration
     - Uses Angular, Spring Boot, Laravel, GitLab CI/CD, Docker, Nginx, LLM
  2. Automated CI/CD Infrastructure Pipeline (DevOps):
     - Industrializes application life cycle from source code to production
     - Uses Jenkins, CI/CD, Automation, Git
  3. Tactix - Football Strategy Mobile App (Mobile):
     - Cross-platform strategy, performance tracking, and team management app
     - Uses Flutter, Dart, OOP, State Management
  4. Cisco Enterprise Network Infrastructure (Network / NetOps):
     - Secure and resilient enterprise network architecture
     - Uses Cisco IOS, Packet Tracer, Routing, Switching, NAT, VLANs, ACLs
  5. Enterprise Virtualization Infrastructure (Cloud & Virtualization):
     - Enterprise-grade virtualization for resource consolidation and workload optimization
     - Uses VMware ESXi, Windows Server, Active Directory, DNS, Datastores

Certifications:
  - Enterprise Networking, Security, and Automation
  - Cisco CyberOps Associate
  - Ethical Hacker
  - Cisco IT Essentials 7
  - Network Technician Career Path
  - Notions de base sur les réseaux
  - Python Essentials 1
  - Switching, Routing, and Wireless Essentials

Services:
  - Full-Stack Web Development: Design and develop modern end-to-end web applications with Angular and Spring Boot/Laravel
  - Cross-Platform Mobile Development: Create performant mobile apps for iOS/Android with Flutter & Dart
  - DevOps & Automation Engineering: Implement cloud/virtualized architectures, Docker, and CI/CD pipelines
  - Networks & Cybersecurity (SecOps): Security audit, network configuration, and automated log analysis systems

Contact:
  - Email: abdelfattahbouabid123@gmail.com
  - GitHub: https://github.com/AbdelfattahBOUABID05
  - LinkedIn: https://www.linkedin.com/in/abdelfattah-bouabid-150a56335
`;

// Initialize the model
async function initModel() {
  try {
    self.postMessage({ type: 'progress', progress: { status: 'Loading model...' } } as WorkerResponse);

    // Use Xenova/tinyllama-1.1b-chat-v1.0 - chat-focused, lightweight model
    generator = await pipeline('text-generation', 'Xenova/tinyllama-1.1b-chat-v1.0', {
      progress_callback: (progress: any) => {
        self.postMessage({ type: 'progress', progress } as WorkerResponse);
      }
    });

    self.postMessage({ type: 'ready' } as WorkerResponse);
  } catch (error) {
    self.postMessage({ type: 'error', error } as WorkerResponse);
  }
}

// Generate text from user input
async function generateText(userInput: string) {
  try {
    if (!generator) {
      throw new Error('Model not initialized');
    }

    // Build prompt using TinyLlama chat template
    const systemPrompt = `You are Abdelfattah's Portfolio Assistant. Answer questions based ONLY on the following context. If you don't know, say: 'I don't have that info in the portfolio.

Context:
${PRE_PROCESSED_CONTEXT}`;

    const finalPrompt = `<|system|>
${systemPrompt}</s>
<|user|>
${userInput}</s>
<|assistant|>
`;

    console.log('Final Prompt sent to AI (length:', finalPrompt.length, '):', finalPrompt);

    self.postMessage({ type: 'progress', progress: { status: 'Generating response...' } } as WorkerResponse);

    const outputs = await generator(finalPrompt, {
      max_new_tokens: 200,
      temperature: 0.1,
      top_p: 0.95,
      do_sample: false,
      repetition_penalty: 1.1,
      return_full_text: false,
      stop_tokens: ['</s>']
    });

    // Extract and clean response
    let response = (outputs as any)[0].generated_text.trim();

    console.log('Final generated text:', response);

    // If model didn't generate anything, use the default
    if (!response) {
      response = "I don't have that info in the portfolio.";
    }

    console.log('Final cleaned text:', response);
    self.postMessage({ type: 'text', text: response } as WorkerResponse);
  } catch (error) {
    console.error('Error in generateText:', error);
    self.postMessage({ type: 'error', error } as WorkerResponse);
  }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event: MessageEvent<WorkerMessage>) => {
  switch (event.data.type) {
    case 'generate':
      if (event.data.userInput) {
        await generateText(event.data.userInput);
      }
      break;
  }
});

// Initialize everything when the worker starts
initModel();
