import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../services/seo.service';
import { LandingContentService, WebsiteType, ContentType } from '../../services/landing-content.service';

@Component({
  selector: 'app-refund-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './refund-policy.component.html'
})
export class RefundPolicyComponent implements OnInit {
  content: string = '';
  title: string = 'Refund & Cancellation Policy';
  isLoading: boolean = true;

  constructor(
    private seoService: SeoService,
    private contentService: LandingContentService
  ) {}

  ngOnInit() {
    this.loadContent();
  }

  loadContent() {
    this.isLoading = true;
    this.contentService.getStaticContent(WebsiteType.REECOACH, ContentType.REFUND_CANCELLATION)
      .subscribe({
        next: (data) => {
          if (data) {
            this.content = data.content;
            this.title = data.title;

            this.seoService.updateSeo({
              title: data.metaTitle || 'Refund & Cancellation Policy | ReeCoach',
              description: data.metaTitle || 'Read the refund and cancellation policy for ReeCoach.',
              keywords: data.metaKeywords?.join(', ') || 'refund policy, cancellation policy, reecoach',
              canonical: 'https://reecoach.in/refund-cancellation-policy/',
              robots: 'noindex, follow',
              ogTitle: data.metaTitle || 'Refund & Cancellation Policy - ReeCoach',
              ogDescription: data.metaTitle || 'Refund and cancellation policy for ReeCoach.',
              ogImage: 'https://reecoach.in/logo.png',
              ogUrl: 'https://reecoach.in/refund-cancellation-policy/',
              ogType: 'website'
            });
          } else {
            this.seoService.updateSeo({
              title: 'Refund & Cancellation Policy | ReeCoach',
              description: 'Read the refund and cancellation policy for ReeCoach.',
              keywords: 'refund policy, cancellation policy, reecoach',
              canonical: 'https://reecoach.in/refund-cancellation-policy/',
              robots: 'noindex, follow',
              ogTitle: 'Refund & Cancellation Policy - ReeCoach',
              ogDescription: 'Refund and cancellation policy for ReeCoach.',
              ogImage: 'https://reecoach.in/logo.png',
              ogUrl: 'https://reecoach.in/refund-cancellation-policy/',
              ogType: 'website'
            });
          }

          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading refund policy:', error);
          this.isLoading = false;
        }
      });
  }
}
