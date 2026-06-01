import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../services/seo.service';
import { LandingContentService, WebsiteType, ContentType } from '../../services/landing-content.service';

@Component({
  selector: 'app-shipping-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shipping-policy.component.html'
})
export class ShippingPolicyComponent implements OnInit {
  content: string = '';
  title: string = 'Shipping Policy';
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
    this.contentService.getStaticContent(WebsiteType.REECOACH, ContentType.SHIPPING_POLICY)
      .subscribe({
        next: (data) => {
          if (data) {
            this.content = data.content;
            this.title = data.title;

            this.seoService.updateSeo({
              title: data.metaTitle || 'Shipping Policy | ReeCoach',
              description: data.metaTitle || 'Read the shipping policy for ReeCoach.',
              keywords: data.metaKeywords?.join(', ') || 'shipping policy, reecoach',
              canonical: 'https://reecoach.in/shipping-policy/',
              robots: 'noindex, follow',
              ogTitle: data.metaTitle || 'Shipping Policy - ReeCoach',
              ogDescription: data.metaTitle || 'Shipping policy for ReeCoach.',
              ogImage: 'https://reecoach.in/logo.png',
              ogUrl: 'https://reecoach.in/shipping-policy/',
              ogType: 'website'
            });
          } else {
            this.seoService.updateSeo({
              title: 'Shipping Policy | ReeCoach',
              description: 'Read the shipping policy for ReeCoach.',
              keywords: 'shipping policy, reecoach',
              canonical: 'https://reecoach.in/shipping-policy/',
              robots: 'noindex, follow',
              ogTitle: 'Shipping Policy - ReeCoach',
              ogDescription: 'Shipping policy for ReeCoach.',
              ogImage: 'https://reecoach.in/logo.png',
              ogUrl: 'https://reecoach.in/shipping-policy/',
              ogType: 'website'
            });
          }

          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading shipping policy:', error);
          this.isLoading = false;
        }
      });
  }
}
