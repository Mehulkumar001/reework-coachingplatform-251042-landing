import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../services/seo.service';
import { LandingContentService, WebsiteType, ContentType } from '../../services/landing-content.service';

@Component({
    selector: 'app-privacy-policy',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './privacy-policy.component.html',
    styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent implements OnInit {
    content: string = '';
    title: string = 'Privacy Policy';
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
        this.contentService.getStaticContent(WebsiteType.REECOACH, ContentType.PRIVACY_POLICY)
            .subscribe({
                next: (data) => {
                    if (data) {
                        this.content = data.content;
                        this.title = data.title;
                        
                        // Update SEO with dynamic content
                        this.seoService.updateSeo({
                            title: data.metaTitle || 'Privacy Policy | ReeCoach Data Protection',
                            description: data.metaTitle || 'Learn how ReeCoach collects, uses, and protects your data. Your privacy and data security are our top priorities.',
                            keywords: data.metaKeywords?.join(', ') || 'privacy policy, data protection, GDPR compliance, nutrition software security',
                            canonical: 'https://reecoach.in/privacy-policy/',
                            robots: 'noindex, follow',
                            ogTitle: data.metaTitle || 'Privacy Policy - ReeCoach',
                            ogDescription: data.metaTitle || 'Transparency regarding your data and privacy at ReeCoach.',
                            ogImage: 'https://reecoach.in/logo.png',
                            ogUrl: 'https://reecoach.in/privacy-policy/',
                            ogType: 'website',
                            jsonLd: {
                                "@context": "https://schema.org",
                                "@graph": [
                                    {
                                        "@type": "WebPage",
                                        "@id": "https://reecoach.in/privacy-policy/#webpage",
                                        "url": "https://reecoach.in/privacy-policy/",
                                        "name": data.title || "Privacy Policy - ReeCoach",
                                        "description": data.metaTitle || "Information about how ReeCoach manages user data.",
                                        "isPartOf": { "@id": "https://reecoach.in/#website" }
                                    }
                                ]
                            }
                        });
                    } else {
                        // Fallback SEO if no content
                        this.seoService.updateSeo({
                            title: 'Privacy Policy | ReeCoach Data Protection',
                            description: 'Learn how ReeCoach collects, uses, and protects your data. Your privacy and data security are our top priorities.',
                            keywords: 'privacy policy, data protection, GDPR compliance, nutrition software security',
                            canonical: 'https://reecoach.in/privacy-policy/',
                            robots: 'noindex, follow',
                            ogTitle: 'Privacy Policy - ReeCoach',
                            ogDescription: 'Transparency regarding your data and privacy at ReeCoach.',
                            ogImage: 'https://reecoach.in/logo.png',
                            ogUrl: 'https://reecoach.in/privacy-policy/',
                            ogType: 'website'
                        });
                    }
                    this.isLoading = false;
                },
                error: (error) => {
                    console.error('Error loading privacy policy:', error);
                    this.isLoading = false;
                }
            });
    }
}
