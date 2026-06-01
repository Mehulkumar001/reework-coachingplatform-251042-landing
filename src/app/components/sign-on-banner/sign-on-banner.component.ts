import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-sign-on-banner',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sign-on-banner.component.html',
})
export class SignOnBannerComponent {
    readonly reecoachApplicationUrl = environment.reecoachApplicationUrl;
}
