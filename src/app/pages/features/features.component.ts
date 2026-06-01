import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    LucideAngularModule, Plus, Users, TrendingUp, Zap, MessageSquare,
    BookOpen, Briefcase, Award, Clock, Heart, Share2,
    Thermometer, FlaskConical, Pill, ShieldCheck, Laptop,
    ShoppingCart, DollarSign, Microscope, Droplets
} from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-features-page',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, RouterLink],
    templateUrl: './features.component.html',
    styleUrl: './features.component.css',
})
export class FeaturesPageComponent implements OnInit, OnDestroy {
    readonly PlusIcon = Plus;
    readonly UsersIcon = Users;
    readonly TrendingUpIcon = TrendingUp;
    readonly ZapIcon = Zap;
    readonly MessageSquareIcon = MessageSquare;
    readonly BookOpenIcon = BookOpen;
    readonly BriefcaseIcon = Briefcase;
    readonly AwardIcon = Award;
    readonly ClockIcon = Clock;
    readonly HeartIcon = Heart;
    readonly Share2Icon = Share2;
    readonly ThermometerIcon = Thermometer;
    readonly FlaskConicalIcon = FlaskConical;
    readonly PillIcon = Pill;
    readonly ShieldCheckIcon = ShieldCheck;
    readonly LaptopIcon = Laptop;
    readonly ShoppingCartIcon = ShoppingCart;
    readonly DollarSignIcon = DollarSign;
    readonly MicroscopeIcon = Microscope;
    readonly DropletsIcon = Droplets;
    readonly reecoachApplicationUrl = environment.reecoachApplicationUrl;

    constructor(private seoService: SeoService) { }

    stats = [
        { min: 90, max: 110, label: 'MEMBERS', current: 90, suffix: '' },
        { min: 80, max: 100, label: 'ENGAGEMENT', current: 80, suffix: '%' },
        { min: 490, max: 510, label: 'HEALTHCARE EVENTS', current: 490, suffix: '' }
    ];

    ngOnInit() {
        this.seoService.updateSeo({
            title: 'ReeCoach Features | Premium Dietitian Management Tools',
            description: 'Explore the powerful features of ReeCoach: efficient client management, precision diet planning, 68+ parameter assessments, and multiple revenue streams.',
            keywords: 'dietitian management tools, precision diet planning, meal analysis calculators, clinical nutrition software, dietitian revenue streams',
            canonical: 'https://reecoach.in/features/',
            robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
            ogTitle: 'Elevate Your Practice with ReeCoach Features',
            ogDescription: 'From integrated health assessments to precision diet planning, discover tools designed to transform your practice.',
            ogImage: 'https://reecoach.in/reecoachBannerImg.jpeg',
            ogUrl: 'https://reecoach.in/features/',
            ogType: 'website',
            twitterCard: 'summary_large_image',
            twitterTitle: 'ReeCoach Features | Premium Practice Tools',
            twitterDescription: 'Unlock powerful tools designed to transform your dietetic practice.',
            twitterImage: 'https://reecoach.in/reecoachBannerImg.jpeg',
            jsonLd: {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "WebPage",
                        "@id": "https://reecoach.in/features/#webpage",
                        "url": "https://reecoach.in/features/",
                        "name": "ReeCoach Features",
                        "description": "Comprehensive list of features and benefits offered by the ReeCoach platform.",
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
                                    "name": "Features",
                                    "item": "https://reecoach.in/features/"
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

    features = [
        {
            image: "/elevateImg-1.png",
            title: "EFFICIENT CLIENT MANAGEMENT",
            desc: "Streamline your practice with the ability to manage multiple clients, their profiles, medical histories, diet preferences, and track their progress systematically."
        },
        {
            image: "/elevateImg-2.png",
            title: "INTEGRATED HEALTH ASSESSMENT",
            desc: "Provide clients with a detailed analysis including a full-body blood test of 68 parameters, detailed Body Composition Analysis, a unique health score, gadget integration, and progress tracking reports."
        },
        {
            image: "/elevateImg-3.png",
            title: "PRECISION DIET PLANNING IN MINUTES",
            desc: "Plan regional and cultural tailored meal plans swiftly using a diverse nutrition database of ingredients and recipes that are disease and region specific based on IFCT/USDA."
        },
        {
            image: "/elevateImg-4.png",
            title: "REAL-TIME CLIENT SUPPORT",
            desc: "Engage clients through a secure and convenient in-app chat support."
        },
        {
            image: "/elevateImg-5.png",
            title: "KNOWLEDGE REPOSITORY",
            desc: "Access up-to-date evidence based scientific resources to stay informed on the latest trends and research in the field of nutrition."
        },
        {
            image: "/elevateImg-1.png",
            title: "DIVERSE REVENUE STREAMS",
            desc: "Explore multiple revenue generation options to enhance your brand's growth and visibility in the industry."
        },
        {
            image: "/elevateImg-5.png",
            title: "BRAND DEVELOPMENT",
            desc: "Establish a professional brand identity, enhance visibility, and broaden your market presence to become the preferred dietitian in your locality."
        },
        {
            image: "/elevateImg-6.png",
            title: "TIME EFFICIENCY",
            desc: "Operate your practice seamlessly by leveraging ReeCoach, a user-friendly platform that enables you deliver quality care efficiently to your clients."
        },
        {
            image: "/elevateImg-7.png",
            title: "MENTAL HEALTH COUNSELLING",
            desc: "Collaboration with mental health coaches to help you provide integrated care to your clients."
        }
    ];

    benefits = [
        { image: "/partnerBenefitsImg-1.png", label: "Membership subscription sharing" },
        { image: "/partnerBenefitsImg-2.png", label: "Gadget bundle (health monitoring devices)" },
        { image: "/partnerBenefitsImg-3.png", label: "Additional blood test" },
        { image: "/partnerBenefitsImg-4.png", label: "Nutritional supplements" },
        { image: "/partnerBenefitsImg-5.png", label: "Affiliate program (Referrals)" },
        { image: "/partnerBenefitsImg-6.png", label: "Webinars and workshops" },
        { image: "/partnerBenefitsImg-7.png", label: "Corporate tie-ups and partnerships" },
        { image: "/partnerBenefitsImg-8.png", label: "Grocery" },
        { image: "/partnerBenefitsImg-9.png", label: "E-commerce income" },
        { image: "/partnerBenefitsImg-10.png", label: "Gut microbiome testing" },
        { image: "/partnerBenefitsImg-11.png", label: "Allergy test" }
    ];

    dots = new Array(24);
    gridDots = new Array(21);
}
