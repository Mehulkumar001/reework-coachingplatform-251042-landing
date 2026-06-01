import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Plus, ChevronRight } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-community',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, RouterLink],
    templateUrl: './community.component.html',
    styleUrl: './community.component.css',
})
export class CommunityPageComponent implements OnInit, OnDestroy {
    readonly PlusIcon = Plus;
    readonly ChevronRightIcon = ChevronRight;
  readonly reecoachApplicationUrl = environment.reecoachApplicationUrl;

    constructor(private seoService: SeoService) { }

    stats = [
        { min: 90, max: 110, label: 'MEMBERS', current: 90, suffix: '' },
        { min: 80, max: 100, label: 'ENGAGEMENT', current: 80, suffix: '%' },
        { min: 490, max: 510, label: 'HEALTHCARE EVENTS', current: 490, suffix: '' }
    ];

    features = [
        {
            title: "Reecoach Community Support",
            bullets: [
                "Exclusive platform to connect with qualified dietitians",
                "A supportive and collaborative community to share your insights and experiences.",
                "Opportunities to elevate your coaching and technology skills"
            ],
            image: "/makeDifferenceImg-1.jpeg",
            reverse: false
        },
        {
            title: "Experience and Knowledge Sharing",
            bullets: [
                "Discuss outcomes and alternative approaches to various cases.",
                "Engage in practice-oriented discussions to improve your skills and knowledge."
            ],
            image: "/makeDifferenceImg-2.jpeg",
            reverse: true
        },
        {
            title: "Research and Continuous Learning",
            bullets: [
                "Explore the latest research findings, review studies, and exchange insights on clinical nutrition.",
                "Participate in Continuous Nutrition Education (CNE) activities for ongoing knowledge exchange."
            ],
            image: "/makeDifferenceImg-3.jpeg",
            reverse: false
        }
    ];

    dots = new Array(18);

    ngOnInit() {
        this.seoService.updateSeo({
            title: 'ReeCoach Community | Quality Nutrition Affiliations',
            description: 'Join a vibrant forum of qualified dietitians. Discover our stringent Good Manufacturing Practices (GMP) and evidence-based brand partnerships.',
            keywords: 'dietitian community, nutrition research sharing, CNE activities, clinical nutrition insights, ReeCoach forum',
            canonical: 'https://reecoach.in/community/',
            robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
            ogTitle: 'ReeCoach Community | Collaborative Dietetic Growth',
            ogDescription: 'Connect with qualified dietitians and engage in research-led nutrition discussions.',
            ogImage: 'https://reecoach.in/reecoachcommunitybannerImg.jpeg',
            ogUrl: 'https://reecoach.in/community/',
            ogType: 'website',
            twitterCard: 'summary_large_image',
            twitterTitle: 'ReeCoach Community | Knowledge Sharing',
            twitterDescription: 'Join the ecosystem of research and continuous learning for dietitians.',
            twitterImage: 'https://reecoach.in/reecoachcommunitybannerImg.jpeg',
            jsonLd: {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "WebPage",
                        "@id": "https://reecoach.in/community/#webpage",
                        "url": "https://reecoach.in/community/",
                        "name": "ReeCoach Community",
                        "description": "A ecosystem for dietitians to collaborate, share research, and grow together.",
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
                                    "name": "Community",
                                    "item": "https://reecoach.in/community/"
                                }
                            ]
                        }
                    }
                ]
            }
        });
        this.startStatsLoop();
    }

    private statsLoopTimer: ReturnType<typeof setInterval> | null = null;
    private statsPauseTimeout: ReturnType<typeof setTimeout> | null = null;
    private statsGoingUp = true;
    private statsPhaseProgress = 0;
    private statsPaused = false;

    ngOnDestroy() {
        if (this.statsLoopTimer) clearInterval(this.statsLoopTimer);
        if (this.statsPauseTimeout) clearTimeout(this.statsPauseTimeout);
    }

    startStatsLoop() {
        const phaseDurationMs = 2000;
        const tickMs = 40;
        const progressPerTick = tickMs / phaseDurationMs;
        const pauseAtEndMs = 2000;

        this.stats.forEach(stat => stat.current = stat.min);

        this.statsLoopTimer = setInterval(() => {
            if (this.statsPaused) return;

            if (this.statsPhaseProgress >= 1) {
                this.statsPaused = true;
                this.statsPauseTimeout = setTimeout(() => {
                    this.statsPaused = false;
                    this.statsPhaseProgress = 0;
                    this.statsGoingUp = !this.statsGoingUp;
                    this.statsPauseTimeout = null;
                }, pauseAtEndMs);
            } else {
                this.statsPhaseProgress = Math.min(1, this.statsPhaseProgress + progressPerTick);
            }

            const p = Math.min(this.statsPhaseProgress, 1);
            this.stats.forEach(stat => {
                const range = stat.max - stat.min;
                if (this.statsGoingUp) {
                    stat.current = stat.min + Math.floor(range * p);
                } else {
                    stat.current = stat.max - Math.floor(range * p);
                }
                stat.current = Math.max(stat.min, Math.min(stat.max, stat.current));
            });
        }, tickMs);
    }
}
