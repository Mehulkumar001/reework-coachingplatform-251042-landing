import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronDown } from 'lucide-angular';

@Component({
    selector: 'app-faq-section',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './faq-section.component.html',
})
export class FAQSectionComponent {
    readonly ChevronDown = ChevronDown;

    activeTab = 'General';
    openIndex = 0;

    tabs = ['General', 'Sign In and Login', 'Support'];

    generalFaqs = [
        { q: "What is Reework?", a: "Reework is an integrated mind and body digital platform that connects qualified dietitians with clients, helping them achieve their health goals through personalized nutrition and lifestyle plans." },
        { q: "Who is a ReeWorker?", a: "A ReeWorker is an individual using Reework to achieve health goals through personalized guidance from qualified dietitians on an integrated digital platform." },
        { q: "Who is a ReeCoach?", a: "A qualified dietitian leveraging Reework to deliver personalized nutrition plans and support, guiding ReeWorkers towards sustainable health outcomes." },
        { q: "Who can become a ReeCoach?", a: "Any professional qualified Dietitian/Clinical Nutritionist with formal education and experience in Nutrition and Dietetics can become a ReeCoach." }
    ];

    signUpFaqs = [
        {
            q: "How can I register as a ReeCoach?",
            a: `
                <ol class="list-decimal pl-5 space-y-1">
                    <li>Go to 'Become a ReeCoach' page on the website.</li>
                    <li>Click on 'Click here' button on the banner.</li>
                    <li>Fill in your personal and professional information.</li>
                    <li>Upload the documents required.</li>
                    <li>Click Submit.</li>
                </ol>
            `
        },
        {
            q: "What should I do if I forgot my password?",
            a: `
                <ul class="list-disc pl-5 space-y-1">
                    <li>Tap the "Forgot Password?" link on the login screen.</li>
                    <li>Enter the email address or mobile number associated with your account.</li>
                    <li>Follow the instructions sent to you via email.</li>
                </ul>
            `
        }
    ];

    supportFaqs = [
        { q: "Do I need an internet connection to use the dashboard?", a: "Yes, you need an internet connection to use the dashboard." },
        { q: "Do I need an internet connection to use the app?", a: "Yes, you need an internet connection to use the app." },
        { q: "Who should I contact if I have a query?", a: "If you have any questions or need assistance with the ReeCoach Dashboard, our friendly and supportive customer service team is here to help. You can reach out to them at support@reework.in They are more than happy to assist you with any questions or issues you may have and will do their best to provide you with the information and support you need." },
        { q: "Is the ReeCoach Dashbaord secure?", a: "Yes, the Reework App takes data security and privacy very seriously and uses a variety of measures to ensure that the data is kept safe and secure." },
        { q: "Can I access the ReeCoach platform from any device?", a: "Yes, the platform is user-friendly and accessible on laptops, personal computers or tablets, allowing you to manage your practice efficiently from anywhere." }
    ];

    get faqs() {
        switch (this.activeTab) {
            case 'General':
                return this.generalFaqs;
            case 'Sign In and Login':
                return this.signUpFaqs;
            case 'Support':
                return this.supportFaqs;
            default:
                return this.generalFaqs;
        }
    }

    toggle(i: number) {
        this.openIndex = this.openIndex === i ? -1 : i;
    }

    setTab(tab: string) {
        this.activeTab = tab;
        this.openIndex = 0; // Reset to first question when changing tabs
    }
}
