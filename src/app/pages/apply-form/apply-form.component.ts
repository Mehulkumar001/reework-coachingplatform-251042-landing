import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { LucideAngularModule, ArrowRight, X } from 'lucide-angular';
import { SeoService } from '../../services/seo.service';

@Component({
    selector: 'app-apply-form',
    standalone: true,
    imports: [CommonModule, RouterLink, LucideAngularModule],
    templateUrl: './apply-form.component.html',
    styleUrl: './apply-form.component.css'
})
export class ApplyFormComponent implements OnInit {
    readonly ArrowRight = ArrowRight;
    readonly X = X;

    selectedPosition = '';

    constructor(private route: ActivatedRoute, private seoService: SeoService) { }

    ngOnInit() {
        this.seoService.updateSeo({
            title: 'Apply Now | Join ReeCoach',
            description: 'Apply for your chosen position at ReeCoach. Submit your details and take the first step towards a rewarding career in nutrition technology.',
            canonical: 'https://reecoach.in/apply/',
            robots: 'noindex, follow',
            ogTitle: 'Application Form - ReeCoach',
            ogImage: 'https://reecoach.in/logo.png',
            ogUrl: 'https://reecoach.in/apply/',
            ogType: 'website',
            jsonLd: {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "WebPage",
                        "@id": "https://reecoach.in/apply/#webpage",
                        "url": "https://reecoach.in/apply/",
                        "name": "Job Application Form - ReeCoach",
                        "isPartOf": { "@id": "https://reecoach.in/#website" }
                    }
                ]
            }
        });
        this.route.queryParams.subscribe(params => {
            this.selectedPosition = params['position'] || 'General Application';
        });
    }

    submitApplication(event: Event) {
        event.preventDefault();
        alert(`Application submitted for ${this.selectedPosition}! We will contact you soon.`);
        // Navigate back or show success state
    }
}
