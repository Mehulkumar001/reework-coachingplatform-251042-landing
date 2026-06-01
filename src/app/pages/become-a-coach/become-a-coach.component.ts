import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronRight } from 'lucide-angular';
import { SeoService } from '../../services/seo.service';
import { environment } from '../../../environments/environment';



@Component({
    selector: 'app-become-a-coach',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './become-a-coach.component.html',
    styleUrl: './become-a-coach.component.css',
})
export class BecomeACoachComponent implements OnInit {
    readonly ChevronRight = ChevronRight;
  readonly reecoachApplicationUrl = environment.reecoachApplicationUrl;

    constructor(private seoService: SeoService) { }

    ngOnInit() {
        this.seoService.updateSeo({
            title: 'Become a ReeCoach | High-Reach Dietitian Partnership',
            description: 'Join the ReeCoach ecosystem. Streamline your practice, serve more clients, and use world-class nutrition tools. Apply in 4 easy steps.',
            keywords: 'dietitian partnership, nutrition coaching career, join ReeCoach network, dietitian career growth, nutritionist business platform',
            canonical: 'https://reecoach.in/become-a-reecoach/',
            robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
            ogTitle: 'Become a ReeCoach | Empowering Your Nutrition Practice',
            ogDescription: 'Join the intelligent platform designed for dietitians. Serve a larger client base and streamline your practice.',
            ogImage: 'https://reecoach.in/wp-content/uploads/2025/06/BecomeAReecoachBannerImg.jpeg',
            ogUrl: 'https://reecoach.in/become-a-reecoach/',
            ogType: 'website',
            twitterCard: 'summary_large_image',
            twitterTitle: 'Become a ReeCoach | Dietitian Career Growth',
            twitterDescription: 'Join the ReeCoach ecosystem and serve more clients with ease.',
            twitterImage: 'https://reecoach.in/wp-content/uploads/2025/06/BecomeAReecoachBannerImg.jpeg',
            jsonLd: {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "WebPage",
                        "@id": "https://reecoach.in/become-a-reecoach/#webpage",
                        "url": "https://reecoach.in/become-a-reecoach/",
                        "name": "Become a ReeCoach",
                        "description": "Join the elite network of dietitians and nutritionists using the ReeCoach platform.",
                        "isPartOf": { "@id": "https://reecoach.in/#website" },
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
                                    "name": "Become a ReeCoach",
                                    "item": "https://reecoach.in/become-a-reecoach/"
                                }
                            ]
                        }
                    },
                    {
                        "@type": "Service",
                        "name": "ReeCoach Optimizer for Dietitians",
                        "description": "A comprehensive platform for dietitians to manage clients, track health metrics, and grow their practice.",
                        "provider": { "@id": "https://reecoach.in/#organization" }
                    }
                ]
            }
        });
    }
    steps = [
        {
            id: '01',
            title: 'Registration',
            desc: 'Start you journey as a ReeCoach',
            cta: 'Click Here'
        },
        {
            id: '02',
            title: 'APPLICATION',
            desc: 'Provide your basic details and apply as ReeCoach.'
        },
        {
            id: '03',
            title: 'Verification',
            desc: 'Your details will be vetted and verified by our team within 48 hours.'
        },
        {
            id: '04',
            title: 'onboarding',
            desc: 'Get a dashboard walkthrough and begin your professional journey!',
            cta: 'Click Here'
        }
    ];

    dots = new Array(24);
}
