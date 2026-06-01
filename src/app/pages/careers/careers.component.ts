import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.css'
})
export class CareersComponent implements OnInit {
  constructor(private seoService: SeoService) { }

  ngOnInit() {
    this.seoService.updateSeo({
      title: 'Careers at ReeCoach | Join the Nutrition Revolution',
      description: 'Looking to make an impact in healthcare and nutrition technology? Explore career opportunities at ReeCoach and help us empower dietitians worldwide.',
      keywords: 'ReeCoach careers, nutrition tech jobs, health startup hiring, healthcare innovation roles',
      canonical: 'https://reecoach.in/careers/',
      robots: 'index, follow',
      ogTitle: 'Build the Future of Nutrition with ReeCoach',
      ogDescription: 'Join a team of visionaries bridging nutrition literacy and accessibility.',
      ogImage: 'https://reecoach.in/Careers_banner.png',
      ogUrl: 'https://reecoach.in/careers/',
      ogType: 'website',
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": "https://reecoach.in/careers/#webpage",
            "url": "https://reecoach.in/careers/",
            "name": "Careers - ReeCoach",
            "description": "Job opportunities and company culture at ReeCoach.",
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
                }
              ]
            }
          }
        ]
      }
    });
  }
}
