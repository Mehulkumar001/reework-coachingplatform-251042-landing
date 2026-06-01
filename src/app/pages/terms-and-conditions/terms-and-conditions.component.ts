import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../services/seo.service';
import { LandingContentService, WebsiteType, ContentType } from '../../services/landing-content.service';

@Component({
    selector: 'app-terms-and-conditions',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './terms-and-conditions.component.html',
    styleUrl: './terms-and-conditions.component.css'
})
export class TermsAndConditionsComponent implements OnInit {
    content: string = '';
    title: string = 'Website Terms of Use';
    isLoading: boolean = true;

    constructor(
        private seoService: SeoService,
        private contentService: LandingContentService
    ) { }

    ngOnInit() {
        this.loadContent();
    }

    loadContent() {
        this.isLoading = true;
        this.contentService.getStaticContent(WebsiteType.REECOACH, ContentType.TERMS_CONDITIONS)
            .subscribe({
                next: (data) => {
                    if (data) {
                        this.content = data.content;
                        this.title = data.title;
                        
                        // Update SEO with dynamic content
                        this.seoService.updateSeo({
                            title: data.metaTitle || 'Terms & Conditions | ReeCoach User Agreement',
                            description: data.metaTitle || 'Read the terms and conditions for using the ReeCoach platform. Understand your rights and responsibilities as a user.',
                            keywords: data.metaKeywords?.join(', ') || 'terms and conditions, user agreement, service terms, ReeCoach legal',
                            canonical: 'https://reecoach.in/terms-and-conditions/',
                            robots: 'noindex, follow',
                            ogTitle: data.metaTitle || 'Terms & Conditions - ReeCoach',
                            ogDescription: data.metaTitle || 'User agreement and terms of service for the ReeCoach platform.',
                            ogImage: 'https://reecoach.in/logo.png',
                            ogUrl: 'https://reecoach.in/terms-and-conditions/',
                            ogType: 'website',
                            jsonLd: {
                                "@context": "https://schema.org",
                                "@graph": [
                                    {
                                        "@type": "WebPage",
                                        "@id": "https://reecoach.in/terms-and-conditions/#webpage",
                                        "url": "https://reecoach.in/terms-and-conditions/",
                                        "name": data.title || "Terms & Conditions - ReeCoach",
                                        "description": data.metaTitle || "Legal terms for using the ReeCoach nutrition software.",
                                        "isPartOf": { "@id": "https://reecoach.in/#website" }
                                    }
                                ]
                            }
                        });
                    } else {
                        // Fallback SEO if no content
                        this.seoService.updateSeo({
                            title: 'Terms & Conditions | ReeCoach User Agreement',
                            description: 'Read the terms and conditions for using the ReeCoach platform. Understand your rights and responsibilities as a user.',
                            keywords: 'terms and conditions, user agreement, service terms, ReeCoach legal',
                            canonical: 'https://reecoach.in/terms-and-conditions/',
                            robots: 'noindex, follow',
                            ogTitle: 'Terms & Conditions - ReeCoach',
                            ogDescription: 'User agreement and terms of service for the ReeCoach platform.',
                            ogImage: 'https://reecoach.in/logo.png',
                            ogUrl: 'https://reecoach.in/terms-and-conditions/',
                            ogType: 'website'
                        });
                    }
                    this.isLoading = false;
                },
                error: (error) => {
                    console.error('Error loading terms and conditions:', error);
                    this.isLoading = false;
                }
            });
    }
}
