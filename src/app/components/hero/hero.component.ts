import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Plus, ChevronRight } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, RouterLink],
    templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit, OnDestroy {
    readonly Plus = Plus;
    readonly ChevronRight = ChevronRight;
    readonly dots = new Array(15);

    currentSlide = 0;
    private slideInterval: any;

    // Touch swipe properties
    private touchStartX = 0;
    private touchEndX = 0;
    private minSwipeDistance = 50;

    slides = [
        {
            title: 'Simplify your Dietetic Practice <br> with ReeCoach Nutrition<br> Software',
            subtitle: 'Standout. Elevate Your Practice. Reach More<br> Clients.',
            buttonText: 'START YOUR JOURNEY',
            image: '/next step .jpeg'
        },
        {
            title: '1-STOP NUTRITION SOLUTION <br> FOR DIETITIANS BY DIETITIANS',
            subtitle: 'A Nutrition Management Platform designed by experts<br> who understand your needs.',
            buttonText: 'START YOUR JOURNEY',
            image: '/bannerImg-3.jpeg'
        },
        {
            title: 'Be Future Ready with ReeCoach - <br> Digital Nutrition Platform',
            subtitle: 'Deliver 2x Outcomes with 50% Less Efforts',
            buttonText: 'START YOUR JOURNEY',
            image: '/bannerImg-2.jpeg'
        }
    ];

    ngOnInit() {
        this.startAutoSlide();
    }

    ngOnDestroy() {
        this.stopAutoSlide();
    }

    // Touch event handlers for mobile swipe
    @HostListener('touchstart', ['$event'])
    onTouchStart(event: TouchEvent) {
        this.touchStartX = event.changedTouches[0].screenX;
    }

    @HostListener('touchend', ['$event'])
    onTouchEnd(event: TouchEvent) {
        this.touchEndX = event.changedTouches[0].screenX;
        this.handleSwipe();
    }

    private handleSwipe() {
        const swipeDistance = this.touchStartX - this.touchEndX;

        if (Math.abs(swipeDistance) > this.minSwipeDistance) {
            if (swipeDistance > 0) {
                // Swiped left - go to next slide
                this.nextSlide();
            } else {
                // Swiped right - go to previous slide
                this.prevSlide();
            }
        }
    }

    startAutoSlide() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }

    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.resetAutoSlide();
    }

    prevSlide() {
        this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        this.resetAutoSlide();
    }

    goToSlide(index: number) {
        this.currentSlide = index;
        this.resetAutoSlide();
    }

    private resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
}
