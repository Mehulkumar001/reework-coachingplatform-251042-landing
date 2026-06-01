import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
    selector: 'app-reework',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './reework.component.html',
    styleUrl: './reework.component.css',
})
export class ReeworkComponent implements OnInit {

    constructor(private seoService: SeoService) { }

    benefits = [
        "Yearly subscription for the app.",
        "Get a blood test with 68 parameters with your subscription.",
        "Daily score of the health, body and mind.",
        "Get an offline consultation with a dietitian in your geo location.",
        "ReePlan consisting of nutrition, supplements, physical activity and lifestyle.",
        "Vast Recipe & Ingredients database with a macro and micro nutritional values"
    ];

    sliderImages = [
        '/reeworkerImg-7.png',
        '/reeworkerImg-6.png',
        '/reeworkerImg-5.png',
        '/reeworkerImg-4.png',
        '/reeworkerImg-3.png',
        '/reeworkerImg-2.png',
        '/reeworkerImg-1.jpeg'
    ];
    currentImageIndex = 0;

    ngOnInit() {
        this.seoService.updateSeo({
            title: 'ReeWork: Personalized Health Monitoring & Nutrition Plans',
            description: 'Get your health score (ReeScore), 68-parameter blood test, and tailored lifestyle plans. Take charge of your health with data-driven insights.',
            keywords: 'health score app, blood test assessment, personalized lifestyle plan, vitals monitoring, ReeWork app',
            canonical: 'https://reecoach.in/reework/',
            robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
            ogTitle: 'Optimize Your Health with ReeWork | 68-Parameter Analysis',
            ogDescription: 'Track your body and mind. Get professional dietitian support and a complete health transformation.',
            ogImage: 'https://reecoach.in/reeworkBannerImg.jpeg',
            ogUrl: 'https://reecoach.in/reework/',
            ogType: 'website',
            twitterCard: 'summary_large_image',
            twitterTitle: 'Optimize Your Health with ReeWork',
            twitterDescription: 'Track your body and mind. Get professional dietitian support and a complete health transformation.',
            twitterImage: 'https://reecoach.in/reeworkBannerImg.jpeg',
            jsonLd: {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "WebPage",
                        "@id": "https://reecoach.in/reework/#webpage",
                        "url": "https://reecoach.in/reework/",
                        "name": "ReeWork - Intelligent Health Platform",
                        "isPartOf": { "@id": "https://reecoach.in/#website" },
                        "description": "An intelligent platform designed to empower dietitians and health-conscious clients.",
                        "breadcrumb": {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://reecoach.in/"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "ReeWork",
                                    "item": "https://reecoach.in/reework/"
                                }
                            ]
                        }
                    },
                    {
                        "@type": "SoftwareApplication",
                        "name": "ReeWork App",
                        "operatingSystem": "iOS, Android",
                        "applicationCategory": "HealthApplication",
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.8",
                            "reviewCount": "1250"
                        },
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "INR"
                        },
                        "description": "Track health scores (ReeScore), monitor vitals, and receive personalized nutrition plans."
                    }
                ]
            }
        });

        this.startImageSlider();
    }

    startImageSlider() {
        setInterval(() => {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.sliderImages.length;
        }, 2000);
    }

    features = [
        {
            title: "REEASSESS",
            subtitle: "First assessment to know your current health.",
            bullets: [
                "ReeScore – Unique Health Score",
                "Detailed Health Assessment",
                "Full Body Check-Up With 68 Parameters"
            ],
            image: "/REEASSESS.png",
            reverse: false
        },
        {
            title: "REEPLAN",
            subtitle: "Connect with a REECOACH (qualified dietitian) near you.",
            bullets: [
                "Vast Recipe Database",
                "Recipe Customization",
                "Easy Appointment Booking",
                "Offline Nutrition Consultation",
                "Body Composition Analysis",
                "Personalized Food & Lifestyle Plan",
                "Personalized Grocery Shopping List",
                "Healthy Swaps"
            ],
            image: "/REEPLAN.png",
            reverse: true
        },
        {
            title: "REEMONITOR",
            subtitle: "What gets tracked gets improved.",
            bullets: [
                "Daily Health Tracking",
                "Smart Wearables Integration",
                "Support and Accountability"
            ],
            image: "/REEmonitor.png",
            reverse: false
        },
        {
            title: "REEVALUATE",
            subtitle: "Continuously improve with data-driven insights.",
            bullets: [
                "Manage All Medical Records",
                "Health Progress Report"
            ],
            image: "/REEvaluate.png",
            reverse: true
        }
    ];
}
