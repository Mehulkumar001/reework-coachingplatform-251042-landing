import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Users, Layout, Smartphone } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-practice-section',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, RouterLink],
    templateUrl: './practice-section.component.html',
})
export class PracticeSectionComponent {
}
