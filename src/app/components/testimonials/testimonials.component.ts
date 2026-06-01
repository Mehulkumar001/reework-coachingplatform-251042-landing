import { Component, OnInit, OnDestroy, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronLeft, ChevronRight, Activity } from 'lucide-angular';
import { LandingContentService, WebsiteType } from '../../services/landing-content.service';

const MOBILE_BREAKPOINT = 768;

interface TestimonialItem {
    name: string;
    title: string;
    experience: string;
    content: string;
    profileImageUrl?: string;
    rating?: number;
}

@Component({
    selector: 'app-testimonials',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './testimonials.component.html',
})
export class TestimonialsComponent implements OnInit, OnDestroy {
    readonly ChevronLeft = ChevronLeft;
    readonly ChevronRight = ChevronRight;
    readonly Activity = Activity;

    currentPage = signal(0);
    isMobile = signal(false);

    get totalPages(): number {
        const n = this.items?.length ?? 0;
        return this.isMobile() ? n : Math.ceil(n / 2);
    }

    /** Slide offset for transform: mobile = 1 per page, desktop = 2 per page */
    get slideOffset(): number {
        const p = this.currentPage();
        return this.isMobile() ? p : p * 2;
    }

    /** On desktop show 2 cards; each slide = 50% viewport. On mobile show 1; each = 100%. */
    get containerWidthPercent(): number {
        const n = this.items?.length ?? 0;
        return n * (this.isMobile() ? 100 : 50);
    }

    get transformPercent(): number {
        const n = this.items?.length ?? 1;
        return (this.slideOffset / n) * 100;
    }

    private intervalId: any;
    private startX: number = 0;

    readonly fallbackItems: TestimonialItem[] = [
        // ... (preserving existing items)
        {
            name: "DR. EILEEN CANDAY",
            title: "HEAD OF DEPARTMENT OF NUTRITION AND DIETETICS AT SIR H. N. RELIANCE FOUNDATION HOSPITAL AND RESEARCH CENTRE",
            experience: "(30 YEARS OF EXPERIENCE)",
            content: "Reework has transformed the way I deliver precision nutrition. The platform allows me to personalize meal plans using a vast library of customizable recipes, each with detailed nutritional analysis. I can align each plan with a patient's unique health needs and activity levels, track their compliance, and guide them towards real, measurable results. It's a powerful digital tool that supports me in achieving patients long-term health goals effectively.",
            rating: 5
        },
        {
            name: "SHRUTI GUPTA PATEL",
            title: "",
            experience: "",
            content: "I truly appreciate all the exciting new features being introduced. With such constant innovation, I'm confident we're going to go a long way with this software."
        },
        {
            name: "SHRUTI GUPTA PATEL",
            title: "",
            experience: "",
            content: "I truly appreciate all the exciting new features being introduced. With such constant innovation, I'm confident we're going to go a long way with this software."
        },
        {
            name: "MARIYA BHARMAN",
            title: "",
            experience: "",
            content: "The ReeCoach Support explained everything so clearly and patiently. I really appreciated the way she took the time to make sure I understood each part. It genuinely made a difference and helped me feel more confident. I'm glad I got the chance to learn from her today."
        },
        {
            name: "MARIYA BHARMAN",
            title: "",
            experience: "",
            content: "The ReeCoach Support explained everything so clearly and patiently. I really appreciated the way she took the time to make sure I understood each part. It genuinely made a difference and helped me feel more confident. I'm glad I got the chance to learn from her today."
        },
        {
            name: "SHWETA SHEGAL",
            title: "",
            experience: "",
            content: "Reework has transformed the way I deliver precision nutrition. The platform allows me to personalize meal plans using a vast library of customizable recipes, each with detailed nutritional analysis. I can align each plan with a patient's unique health needs and activity levels, track their compliance, and guide them towards real, measurable results. It's a powerful digital tool that supports me in achieving patients long-term health goals effectively."
        },
        {
            name: "SHWETA SHEGAL",
            title: "",
            experience: "",
            content: "Reework has transformed the way I deliver precision nutrition. The platform allows me to personalize meal plans using a vast library of customizable recipes, each with detailed nutritional analysis. I can align each plan with a patient's unique health needs and activity levels, track their compliance, and guide them towards real, measurable results. It's a powerful digital tool that supports me in achieving patients long-term health goals effectively."
        },
        {
            name: "RUCHI SRIVASTAVA",
            title: "",
            experience: "",
            content: "Each section of the dashboard is very well-structured and detailed, which makes it easy for me to manage my clients efficiently. I'm excited and looking forward to onboarding more clients soon."
        },
        {
            name: "RUCHI SRIVASTAVA",
            title: "",
            experience: "",
            content: "Each section of the dashboard is very well-structured and detailed, which makes it easy for me to manage my clients efficiently. I'm excited and looking forward to onboarding more clients soon."
        },
        {
            name: "VAISHNAVI PANDYA VORA",
            title: "",
            experience: "",
            content: "I loved both the ReeCoach dashboard and the App. The integration makes it seamless to manage my clients. The knowledge bank section on the software is also very interesting and informative."
        },
        {
            name: "VAISHNAVI PANDYA VORA",
            title: "",
            experience: "",
            content: "I loved both the ReeCoach dashboard and the App. The integration makes it seamless to manage my clients. The knowledge bank section on the software is also very interesting and informative."
        },
        {
            name: "DR. EILEEN CANDAY",
            title: "HEAD OF DEPARTMENT OF NUTRITION AND DIETETICS AT SIR H. N. RELIANCE FOUNDATION HOSPITAL AND RESEARCH CENTRE",
            experience: "(30 YEARS OF EXPERIENCE)",
            content: "Reework has transformed the way I deliver precision nutrition. The platform allows me to personalize meal plans using a vast library of customizable recipes, each with detailed nutritional analysis. I can align each plan with a patient's unique health needs and activity levels, track their compliance, and guide them towards real, measurable results. It's a powerful digital tool that supports me in achieving patients long-term health goals effectively."
        }
    ];

    items: TestimonialItem[];

    constructor(private contentService: LandingContentService) {
        this.items = [...this.fallbackItems];
    }

    @HostListener('window:resize')
    onResize() {
        this.isMobile.set(typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT);
    }

    ngOnInit() {
        this.onResize();
        this.startAutoPlay();
        this.contentService.getTestimonials(WebsiteType.REECOACH).subscribe({
            next: (data) => {
                if (data && data.length > 0) {
                    this.items = data
                        .filter(t => t.isActive)
                        .sort((a, b) => a.sortOrder - b.sortOrder)
                        .map(t => ({
                            name: t.name.toUpperCase(),
                            title: (t.designation ?? '').toUpperCase(),
                            experience: t.yearsOfExperience
                                ? `(${t.yearsOfExperience} YEARS OF EXPERIENCE)`
                                : '',
                            content: t.message,
                            profileImageUrl: t.profileImageUrl,
                            rating: t.rating ?? 5
                        }));
                    this.currentPage.set(0);
                }
            }
        });
    }

    ngOnDestroy() {
        this.stopAutoPlay();
    }

    private startAutoPlay() {
        this.intervalId = setInterval(() => {
            this.next();
        }, 5000); // 5 seconds interval
    }

    private stopAutoPlay() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    next() {
        const total = this.totalPages;
        this.currentPage.update(p => (p + 1) % total);
    }

    prev() {
        const total = this.totalPages;
        this.currentPage.update(p => (p - 1 + total) % total);
    }

    set(i: number) {
        this.currentPage.set(i);
        this.stopAutoPlay();
        this.startAutoPlay();
    }

    onMouseDown(event: MouseEvent) {
        this.startX = event.clientX;
        this.stopAutoPlay();
    }

    onMouseUp(event: MouseEvent) {
        const endX = event.clientX;
        if (this.startX - endX > 50) {
            this.next();
        } else if (endX - this.startX > 50) {
            this.prev();
        }
        this.startAutoPlay();
    }

    onTouchStart(event: TouchEvent) {
        this.startX = event.touches[0].clientX;
        this.stopAutoPlay();
    }

    onTouchEnd(event: TouchEvent) {
        const endX = event.changedTouches[0].clientX;
        if (this.startX - endX > 50) {
            this.next();
        } else if (endX - this.startX > 50) {
            this.prev();
        }
        this.startAutoPlay();
    }

    getStars(rating: number): number[] {
        const n = Math.min(5, Math.max(0, Math.floor(Number(rating) || 0)));
        return Array(n).fill(0);
    }

    getInitials(name: string): string {
        if (!name || !name.trim()) return '?';
        const parts = name.trim().split(/\s+/);
        if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        return parts[0].slice(0, 2).toUpperCase();
    }
}
