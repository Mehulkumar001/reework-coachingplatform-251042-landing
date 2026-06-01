import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, ChevronDown, Menu, X } from 'lucide-angular';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
    templateUrl: './navbar.component.html',
})
export class NavbarComponent {
    readonly ChevronDown = ChevronDown;
    readonly Menu = Menu;
    readonly X = X;

  readonly loginUrl = environment.portalLoginUrl;
  readonly reecoachApplicationUrl = environment.reecoachApplicationUrl;

    isMobileMenuOpen = false;
    isAboutDropdownOpen = false;

    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        // Prevent body scroll when menu is open
        if (this.isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    closeMobileMenu() {
        this.isMobileMenuOpen = false;
        document.body.style.overflow = 'auto';
    }

    toggleAboutDropdown() {
        this.isAboutDropdownOpen = !this.isAboutDropdownOpen;
    }

    openInNewTab(path: string) {
        window.open(path, '_blank');
    }
}
