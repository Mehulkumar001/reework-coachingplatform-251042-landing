import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Linkedin } from 'lucide-angular';

@Component({
    selector: 'app-founder-section',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './founder-section.component.html',
})
export class FounderSectionComponent {
    readonly Linkedin = Linkedin;
}
