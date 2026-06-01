import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { PartnerMovementComponent } from '../../components/partner-movement/partner-movement.component';
import { IntelligenceSectionComponent } from '../../components/intelligence-section/intelligence-section.component';
import { FeaturesGridComponent } from '../../components/features-grid/features-grid.component';
import { FounderSectionComponent } from '../../components/founder-section/founder-section.component';
import { PracticeSectionComponent } from '../../components/practice-section/practice-section.component';
import { GoDigitalBannerComponent } from '../../components/go-digital-banner/go-digital-banner.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { FAQSectionComponent } from '../../components/faq-section/faq-section.component';
import { SignOnBannerComponent } from '../../components/sign-on-banner/sign-on-banner.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Users, Activity, Clock, Layout, Smartphone, BookOpen } from 'lucide-angular';
import { SeoService } from '../../services/seo.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        HeroComponent,
        PartnerMovementComponent,
        IntelligenceSectionComponent,
        FeaturesGridComponent,
        FounderSectionComponent,
        PracticeSectionComponent,
        GoDigitalBannerComponent,
        TestimonialsComponent,
        FAQSectionComponent,
        SignOnBannerComponent
    ],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    coachFeatures: any[] = [
        { image: '/feature1.png', name: "Smart Client Management", desc: "Tools that simplify everyday workflows and empower you to scale your practice.", link: '/features' },
        { image: '/feature-2.png', name: "Nutrition Care Process Integration", desc: "Features that align NCP to support evidence-based clinical decisions.", link: '/features' },
        { image: '/feature-3-1-300x238.png', name: "Nutrition Analysis & Calculators", desc: "Smart calculators and tools that support in-depth analysis and accurate planning.", link: '/features' },
        { image: '/feature-4.png', name: "Meal Planning & Personalization", desc: "Personalized planning that's medically accurate, culturally sensitive, & easy to use.", link: '/features' },
        { image: '/feature-5.png', name: "Seamless Client Engagement", desc: "Tools that keep clients informed, engaged, and accountable.", link: '/features' },
        { image: '/feature-6.png', name: "Education, Growth & Community", desc: "Knowledge tools and peer support to stay ahead in your practice.", link: '/features' }
    ];

    clientFeatures: any[] = [
        { image: '/reeworkfeature-1-199x300.png', name: "Personalized Nutrition & Smart Planning", nameLines: ["Personalized Nutrition", "& Smart Planning"], desc: "Empowering clients to follow practical, customized meal plans based on their needs.", link: '/features' },
        { image: '/reeworkfeature-2.png', name: "Habit Tracking & Daily Monitoring", desc: "Support for everyday progress with built-in tracking tools for lifestyle and behaviour change.", link: '/features', titleFontSize: '18px', descFontSize: '16px' },
        { image: '/reeworkfeature-3-300x210.png', name: "Enhanced Clinical Integration", desc: "Bridge between clients and dietitians for smarter, data-driven care.", link: '/features' },
        { image: '/reeworkfeature-4.png', name: "Ease Of Use & Daily Integration", desc: "Simple and intuitive tools that fit into a client's daily routine.", link: '/features' },
        { image: '/reeworkfeature-5-300x300.png', name: "Client Empowerment & Education", desc: "Tools to help clients understand their own health and build habits that last.", link: '/features' },
        { image: '/reeworkfeature-6-300x237.png', name: "Seamless Communication & Support", desc: "Stay connected effortlessly for better engagement and outcomes.", link: '/features' }
    ];

    constructor(private sanitizer: DomSanitizer, private seoService: SeoService) { }

    ngOnInit() {
        this.seoService.updateSeo({
            title: 'ReeCoach | AI-Driven Nutrition Software for Dietitians',
            description: 'Scale your dietetic practice with ReeCoach. An all-in-one platform for personalized meal plans, 68+ parameter assessments, and real-time client tracking.',
            keywords: 'nutrition software, dietitian platform, nutritionist tools, free nutrition software India, meal planning software',
            canonical: 'https://reecoach.in/',
            robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
            ogTitle: 'Transform Nutrition Coaching with AI | ReeCoach',
            ogDescription: 'Empowering dietitians with evidence-based tools & real-time monitoring. Join the elite network of ReeCoaches today.',
            ogImage: 'https://reecoach.in/logo.png',
            ogUrl: 'https://reecoach.in/',
            ogType: 'website',
            twitterCard: 'summary_large_image',
            twitterTitle: 'ReeCoach | AI-Driven Nutrition Software for Dietitians',
            twitterDescription: 'Empowering dietitians with evidence-based tools & real-time monitoring.',
            twitterImage: 'https://reecoach.in/logo.png',
            jsonLd: {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "Organization",
                        "@id": "https://reecoach.in/#organization",
                        "name": "ReeCoach (Shamrock Nutrascience)",
                        "url": "https://reecoach.in",
                        "logo": "https://reecoach.in/logo.png",
                        "sameAs": [
                            "https://www.instagram.com/ree_coach_/",
                            "https://www.linkedin.com/company/reecoach/",
                            "https://www.facebook.com/people/Reecoach/61570660792756/",
                            "https://www.youtube.com/@reecoach"
                        ],
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+91-9619650505",
                            "contactType": "customer service",
                            "email": "support@reework.in"
                        }
                    },
                    {
                        "@type": "WebPage",
                        "@id": "https://reecoach.in/#webpage",
                        "url": "https://reecoach.in/",
                        "name": "ReeCoach - AI Nutrition & Health Ecosystem",
                        "description": "Premium software for qualified dietitians and nutritionists.",
                        "isPartOf": { "@id": "https://reecoach.in/#website" }
                    },
                    {
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "How does ReeCoach improve client compliance?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "ReeCoach uses real-time monitoring, smart wearable integration, and the ReeScore tracking system to bridge the gap between consultation and compliance."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Is the ReeWork blood test clinically validated?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, our 68-parameter blood assessment follows Good Manufacturing Practices (GMP) and site audits to ensure scientific accuracy."
                                }
                            }
                        ]
                    }
                ]
            }
        });

        this.coachFeatures = this.coachFeatures.map(f => ({
            ...f,
            icon: this.sanitizer.bypassSecurityTrustHtml(f.icon)
        }));
        this.clientFeatures = this.clientFeatures.map(f => ({
            ...f,
            icon: this.sanitizer.bypassSecurityTrustHtml(f.icon)
        }));
    }
}

