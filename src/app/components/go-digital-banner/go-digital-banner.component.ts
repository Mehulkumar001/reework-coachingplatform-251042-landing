import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-go-digital-banner',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './go-digital-banner.component.html',
})
export class GoDigitalBannerComponent {
    readonly reecoachApplicationUrl = environment.reecoachApplicationUrl;
    readonly dots = new Array(36);
}
