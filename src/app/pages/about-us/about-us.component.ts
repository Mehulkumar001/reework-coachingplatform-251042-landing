import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronRight } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { LandingContentService, PageType } from '../../services/landing-content.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-about-us',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, RouterLink],
    templateUrl: './about-us.component.html',
    styleUrl: './about-us.component.css',
})
export class AboutUsComponent implements OnInit {
    readonly ChevronRight = ChevronRight;
    contentSections: any[] = [];
    isLoading: boolean = true;
    readonly reecoachApplicationUrl = environment.reecoachApplicationUrl;

    constructor(
        private seoService: SeoService,
        private contentService: LandingContentService
    ) { }

    ngOnInit() {
        this.seoService.updateSeo({
            title: 'About ReeCoach | Driven by Shamrock Nutrascience',
            description: 'Discover the visionaries behind ReeCoach. Part of the Shamrock Pharma Group, we bridge the gap between nutrition literacy and accessibility.',
            keywords: 'ReeCoach founders, Shamrock Nutrascience, nutrition technology vision, dietitian empowerment, healthcare innovation',
            canonical: 'https://reecoach.in/about-us/',
            robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
            ogTitle: 'About ReeCoach | Innovation in Nutrition Technology',
            ogDescription: 'Meet the visionary leaders driving innovation in nutrition technology and empowering dietitians globally.',
            ogImage: 'https://reecoach.in/wp-content/uploads/2025/06/aboutBannerImg.jpeg',
            ogUrl: 'https://reecoach.in/about-us/',
            ogType: 'website',
            twitterCard: 'summary_large_image',
            twitterTitle: 'About ReeCoach | Empowering Dietitians',
            twitterDescription: 'Meet the team behind the world-class integrated Mind and Body Digital platform.',
            twitterImage: 'https://reecoach.in/wp-content/uploads/2025/06/aboutBannerImg.jpeg',
            jsonLd: {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "AboutPage",
                        "@id": "https://reecoach.in/about-us/#webpage",
                        "url": "https://reecoach.in/about-us/",
                        "name": "About ReeCoach",
                        "description": "Information about ReeCoach, its vision, mission, and leadership team.",
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
                                    "name": "About Us",
                                    "item": "https://reecoach.in/about-us/"
                                }
                            ]
                        }
                    },
                    {
                        "@type": "Organization",
                        "name": "Shamrock Nutrascience / ReeCoach",
                        "parentOrganization": {
                            "@type": "Organization",
                            "name": "Shamrock Pharma Group"
                        }
                    }
                ]
            }
        });
        this.loadContent();
    }

    // Fallback content (existing hardcoded content)
    visionItems = [
        { label: 'PRECISE', img: '/visionImg-1.jpeg' },
        { label: 'EMPATHETIC', img: '/visionImg-2.jpeg' },
        { label: 'SEAMLESS', img: '/visionImg-3.jpeg' },
        { label: 'ENABLING', img: '/visionImg-1.jpeg' },
    ];

    missionItems = [
        "To empower dietitians and clients with scientific, evidence-based and digitally enabled platform time-efficient practice for lifestyle management.",
        "To personalize meal plans so that long-term compliance can be achieved without fatigue and boredom.",
        "To motivate clients through successful journeys that lead to improved health.",
        "To acknowledge dietitians for their immense contribution to the multidimensional healthcare industry.",
        "To provide an affordable and sustainable solution fostering a healthy way of life."
    ];

    managementTeam = [
        { name: "KAMLESH KHOKHANI", role: "Founder & Managing Director", image: "/KamleshKhokhani.jpeg", color: "#2D5A54" },
        { name: "NAAZNIN HUSEIN", role: "Co-Founder & CEO", image: "/NaazninHusein.jpeg", color: "#47CBB6" },
        { name: "VIKAS KUKREJA", role: "Chief Operating Officer", image: "/Vikas-coo.png", color: "#6366F1" },
        { name: "SURAJ GUPTA", role: "Director – Product Strategy", image: "/SurajGupta.jpeg", color: "#F59E0B" },
        { name: "SHEETAL SOMAIYA", role: "Director of Nutrition", image: "/SheetalSomaiya.jpeg", color: "#EC4899" },
        { name: "PRADNYA REKHA", role: "IT Head", image: "/PradnyaRekhna.jpeg", color: "#3B82F6" }
    ];

    loadContent(): void {
        this.isLoading = true;
        this.contentService.getContent(PageType.ABOUT_US).subscribe(
            (data) => {
                if (data && data.length > 0) {
                    this.contentSections = data
                        .filter(item => item.isActive)
                        .sort((a, b) => a.order - b.order);
                    
                    // Update vision/mission/team from CMS if available
                    const visionSection = this.getSectionContent('VISION_MISSION');
                    if (visionSection) {
                        if (visionSection.visionItems) this.visionItems = visionSection.visionItems;
                        if (visionSection.missionItems) this.missionItems = visionSection.missionItems;
                    }
                    
                    const teamSection = this.getSectionContent('MANAGEMENT_TEAM');
                    if (teamSection && teamSection.members) {
                        this.managementTeam = teamSection.members;
                    }
                }
                this.isLoading = false;
            },
            (error) => {
                console.error('Error loading about content:', error);
                this.isLoading = false;
            }
        );
    }

    getSectionContent(sectionType: string): any {
        const section = this.contentSections.find(s => s.sectionType === sectionType);
        return section ? section.content : null;
    }
}
