import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface FeatureItem {
    icon?: any; // Lucide icon
    image?: string;
    link?: string;
    name: string;
    /** Optional array of title lines (rendered with <br> between). When set, used instead of name for display. */
    nameLines?: string[];
    desc: string;
    /** Optional override for title font size (e.g. '18px'). */
    titleFontSize?: string;
    /** Optional override for description font size (e.g. '16px'). */
    descFontSize?: string;
}

@Component({
    selector: 'app-features-grid',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './features-grid.component.html',
})
export class FeaturesGridComponent {
    @Input() title: string = '';
    @Input() subtitle: string = '';
    @Input() items: FeatureItem[] = [];
    @Input() addTopPadding: boolean = false;
    @Input() showViewMore: boolean = true;
    /** Optional custom image dimensions (e.g. for client/reework section). */
    @Input() imageHeight: string | number | null = null;
    @Input() imageWidth: string | number | null = null;
    /** Slightly more space between subtitle and the feature grid. */
    @Input() extraSubtitleSpacing: boolean = false;
}
