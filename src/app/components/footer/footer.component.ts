import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Mail, Instagram, Linkedin, Facebook, Youtube, Phone } from 'lucide-angular';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, RouterLink, LucideAngularModule],
    templateUrl: './footer.component.html',
})
export class FooterComponent {
    readonly Mail = Mail;
    readonly Instagram = Instagram;
    readonly Linkedin = Linkedin;
    readonly Facebook = Facebook;
    readonly Youtube = Youtube;
    readonly Phone = Phone;
    readonly reecoachApplicationUrl = environment.reecoachApplicationUrl;
}
