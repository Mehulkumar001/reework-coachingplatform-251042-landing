import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../services/seo.service';
import { LandingContentService, WebsiteType } from '../../services/landing-content.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  feedbackForm = {
    name: '',
    email: '',
    phone: '',
    rating: 5,
    message: ''
  };

  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  readonly ratingOptions = [1, 2, 3, 4, 5] as const;

  constructor(
    private seoService: SeoService,
    private contentService: LandingContentService
  ) {
    this.seoService.updateSeo({
      title: 'Share Your Feedback | ReeCoach',
      description: 'Tell us about your experience with ReeCoach so we can keep improving the platform for you.',
      keywords: 'reecoach feedback, review, support, suggestions',
      canonical: 'https://reecoach.in/feedback/',
      robots: 'index, follow'
    });
  }

  setRating(value: number): void {
    this.feedbackForm.rating = value;
  }

  getRatingLabel(value: number): string {
    switch (value) {
      case 5:
        return 'Loved it';
      case 4:
        return 'Very good';
      case 3:
        return 'It was okay';
      case 2:
        return 'Not great';
      case 1:
        return 'Poor';
      default:
        return '';
    }
  }

  onSubmit(): void {
    if (!this.feedbackForm.name || !this.feedbackForm.email || !this.feedbackForm.message) {
      this.submitError = 'Please fill in your name, email, and feedback.';
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = '';

    this.contentService
      .submitFeedback({
        name: this.feedbackForm.name,
        email: this.feedbackForm.email,
        phone: this.feedbackForm.phone || undefined,
        rating: this.feedbackForm.rating,
        message: this.feedbackForm.message,
        websiteType: WebsiteType.REECOACH
      })
      .subscribe(
        () => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          this.feedbackForm = {
            name: '',
            email: '',
            phone: '',
            rating: 5,
            message: ''
          };
          setTimeout(() => {
            this.submitSuccess = false;
          }, 5000);
        },
        (error) => {
          console.error('Error submitting feedback:', error);
          this.isSubmitting = false;
          this.submitError = 'Failed to submit your feedback. Please try again later.';
        }
      );
  }
}

