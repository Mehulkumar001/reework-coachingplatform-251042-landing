import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LucideAngularModule, ArrowRight, MapPin, Clock, Briefcase } from 'lucide-angular';
import { SeoService } from '../../services/seo.service';
import { Career, LandingContentService, WebsiteType } from '../../services/landing-content.service';

@Component({
    selector: 'app-open-positions',
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule],
    templateUrl: './open-positions.component.html',
    styleUrl: './open-positions.component.css'
})
export class OpenPositionsComponent implements OnInit {

    careers: Career[] = [];
    isLoading = true;
    hasError = false;

    // Simple filters
    selectedDepartment = '';
    selectedLocation = '';
    selectedEmploymentType = '';

    constructor(
        private seoService: SeoService,
        private contentService: LandingContentService,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        this.seoService.updateSeo({
            title: 'Open Positions | Join the ReeCoach Team',
            description: 'Explore our latest job openings. We are looking for passionate individuals to join us in transforming the nutrition industry through technology.',
            keywords: 'job openings, hire dietitians, software developer jobs, nutrition startup hiring',
            canonical: 'https://reecoach.in/open-positions/',
            robots: 'index, follow',
            ogTitle: 'Hiring Now: Open Positions at ReeCoach',
            ogDescription: 'Ready to innovate? Join our team and help us build world-class nutrition software.',
            ogImage: 'https://reecoach.in/logo.png',
            ogUrl: 'https://reecoach.in/open-positions/',
            ogType: 'website',
            jsonLd: {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "WebPage",
                        "@id": "https://reecoach.in/open-positions/#webpage",
                        "url": "https://reecoach.in/open-positions/",
                        "name": "Open Positions - ReeCoach",
                        "description": "Current vacancies at ReeCoach.",
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
                                    "name": "Careers",
                                    "item": "https://reecoach.in/careers/"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": "Open Positions",
                                    "item": "https://reecoach.in/open-positions/"
                                }
                            ]
                        }
                    }
                ]
            }
        });

        this.loadCareers();
    }
    readonly ArrowRight = ArrowRight;
    readonly MapPin = MapPin;
    readonly Clock = Clock;
    readonly Briefcase = Briefcase;

    private loadCareers(): void {
        this.isLoading = true;
        this.hasError = false;
        this.contentService.getCareers(WebsiteType.REECOACH, { pageSize: 50 }).subscribe({
            next: (data) => {
                this.careers = (data || []).filter(c => c.isActive);
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading careers:', error);
                this.careers = [];
                this.isLoading = false;
                this.hasError = true;
            }
        });
    }

    getMailtoLink(career: Career): string {
        const subject = encodeURIComponent(`Application for ${career.title} (${career.id})`);
        const body = encodeURIComponent(
            `Hi ReeCoach team,%0D%0A%0D%0AI would like to apply for the position \"${career.title}\" (${career.id}).%0D%0A%0D%0AThanks,%0D%0A`
        );
        return `mailto:careers@reework.in?subject=${subject}&body=${body}`;
    }

    getDepartments(): string[] {
        return Array.from(new Set(this.careers.map(c => c.department).filter((d): d is string => !!d)));
    }

    getLocations(): string[] {
        return Array.from(new Set(this.careers.map(c => c.location).filter((d): d is string => !!d)));
    }

    getEmploymentTypes(): string[] {
        return Array.from(new Set(this.careers.map(c => c.employmentType).filter((d): d is string => !!d)));
    }

    getFilteredCareers(): Career[] {
        return this.careers.filter(c => {
            if (this.selectedDepartment && c.department !== this.selectedDepartment) return false;
            if (this.selectedLocation && c.location !== this.selectedLocation) return false;
            if (this.selectedEmploymentType && c.employmentType !== this.selectedEmploymentType) return false;
            return true;
        });
    }

    clearFilters(): void {
        this.selectedDepartment = '';
        this.selectedLocation = '';
        this.selectedEmploymentType = '';
    }

    getRichText(html?: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(html || '');
    }
}
