import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Smartphone, Mail, MapPin, Loader, Check, ChevronDown, AlertCircle } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, FormsModule],
    templateUrl: './signup.component.html',
})
export class SignUpComponent implements OnInit {
    readonly ChevronDownIcon = ChevronDown;
    readonly AlertCircleIcon = AlertCircle;
    readonly PhoneIcon = Smartphone;
    readonly MailIcon = Mail;
    readonly MapPinIcon = MapPin;
    readonly CheckIcon = Check;

  readonly loginUrl = environment.portalLoginUrl;

    constructor(private seoService: SeoService, private router: Router) { }

    ngOnInit() {
        this.seoService.updateSeo({
            title: 'Sign Up | ReeCoach',
            description: 'Join ReeCoach today and transform your nutrition practice with our all-in-one platform.',
            keywords: 'sign up, join reecoach, nutrition software, dietitian registration',
            canonical: 'https://reecoach.in/signup/',
            robots: 'index, follow'
        });
    }

    formData = {
        name: '',
        contact: '',
        countryCode: '+91',
        email: '',
        country: 'India',
        state: '',
        city: '',
        pincode: ''
    };

    countries = [
        { name: 'Afghanistan', code: '+93', iso: 'af' },
        { name: 'Albania', code: '+355', iso: 'al' },
        { name: 'Algeria', code: '+213', iso: 'dz' },
        { name: 'American Samoa', code: '+1-684', iso: 'as' },
        { name: 'Andorra', code: '+376', iso: 'ad' },
        { name: 'Angola', code: '+244', iso: 'ao' },
        { name: 'Anguilla', code: '+1-264', iso: 'ai' },
        { name: 'Antarctica', code: '+672', iso: 'aq' },
        { name: 'Antigua and Barbuda', code: '+1-268', iso: 'ag' },
        { name: 'Argentina', code: '+54', iso: 'ar' },
        { name: 'Armenia', code: '+374', iso: 'am' },
        { name: 'Aruba', code: '+297', iso: 'aw' },
        { name: 'Australia', code: '+61', iso: 'au' },
        { name: 'Austria', code: '+43', iso: 'at' },
        { name: 'Azerbaijan', code: '+994', iso: 'az' },
        { name: 'Bahamas', code: '+1-242', iso: 'bs' },
        { name: 'Bahrain', code: '+973', iso: 'bh' },
        { name: 'Bangladesh', code: '+880', iso: 'bd' },
        { name: 'Barbados', code: '+1-246', iso: 'bb' },
        { name: 'Belarus', code: '+375', iso: 'by' },
        { name: 'Belgium', code: '+32', iso: 'be' },
        { name: 'Belize', code: '+501', iso: 'bz' },
        { name: 'Benin', code: '+229', iso: 'bj' },
        { name: 'Bermuda', code: '+1-441', iso: 'bm' },
        { name: 'Bhutan', code: '+975', iso: 'bt' },
        { name: 'Bolivia', code: '+591', iso: 'bo' },
        { name: 'Bosnia and Herzegovina', code: '+387', iso: 'ba' },
        { name: 'Botswana', code: '+267', iso: 'bw' },
        { name: 'Brazil', code: '+55', iso: 'br' },
        { name: 'British Indian Ocean Territory', code: '+246', iso: 'io' },
        { name: 'Brunei Darussalam', code: '+673', iso: 'bn' },
        { name: 'Bulgaria', code: '+359', iso: 'bg' },
        { name: 'Burkina Faso', code: '+226', iso: 'bf' },
        { name: 'Burundi', code: '+257', iso: 'bi' },
        { name: 'Cambodia', code: '+855', iso: 'kh' },
        { name: 'Cameroon', code: '+237', iso: 'cm' },
        { name: 'Canada', code: '+1', iso: 'ca' },
        { name: 'Cape Verde', code: '+238', iso: 'cv' },
        { name: 'Cayman Islands', code: '+1-345', iso: 'ky' },
        { name: 'Central African Republic', code: '+236', iso: 'cf' },
        { name: 'Chad', code: '+235', iso: 'td' },
        { name: 'Chile', code: '+56', iso: 'cl' },
        { name: 'China', code: '+86', iso: 'cn' },
        { name: 'Christmas Island', code: '+61', iso: 'cx' },
        { name: 'Cocos (Keeling) Islands', code: '+61', iso: 'cc' },
        { name: 'Colombia', code: '+57', iso: 'co' },
        { name: 'Comoros', code: '+269', iso: 'km' },
        { name: 'Congo', code: '+242', iso: 'cg' },
        { name: 'Congo, Democratic Republic', code: '+243', iso: 'cd' },
        { name: 'Cook Islands', code: '+682', iso: 'ck' },
        { name: 'Costa Rica', code: '+506', iso: 'cr' },
        { name: 'Croatia', code: '+385', iso: 'hr' },
        { name: 'Cuba', code: '+53', iso: 'cu' },
        { name: 'Cyprus', code: '+357', iso: 'cy' },
        { name: 'Czech Republic', code: '+420', iso: 'cz' },
        { name: 'Denmark', code: '+45', iso: 'dk' },
        { name: 'Djibouti', code: '+253', iso: 'dj' },
        { name: 'Dominica', code: '+1-767', iso: 'dm' },
        { name: 'Dominican Republic', code: '+1-809', iso: 'do' },
        { name: 'Ecuador', code: '+593', iso: 'ec' },
        { name: 'Egypt', code: '+20', iso: 'eg' },
        { name: 'El Salvador', code: '+503', iso: 'sv' },
        { name: 'Equatorial Guinea', code: '+240', iso: 'gq' },
        { name: 'Eritrea', code: '+291', iso: 'er' },
        { name: 'Estonia', code: '+372', iso: 'ee' },
        { name: 'Ethiopia', code: '+251', iso: 'et' },
        { name: 'Fiji', code: '+679', iso: 'fj' },
        { name: 'Finland', code: '+358', iso: 'fi' },
        { name: 'France', code: '+33', iso: 'fr' },
        { name: 'French Guiana', code: '+594', iso: 'gf' },
        { name: 'French Polynesia', code: '+689', iso: 'pf' },
        { name: 'Gabon', code: '+241', iso: 'ga' },
        { name: 'Gambia', code: '+220', iso: 'gm' },
        { name: 'Georgia', code: '+995', iso: 'ge' },
        { name: 'Germany', code: '+49', iso: 'de' },
        { name: 'Ghana', code: '+233', iso: 'gh' },
        { name: 'Gibraltar', code: '+350', iso: 'gi' },
        { name: 'Greece', code: '+30', iso: 'gr' },
        { name: 'Greenland', code: '+299', iso: 'gl' },
        { name: 'Grenada', code: '+1-473', iso: 'gd' },
        { name: 'Guadeloupe', code: '+590', iso: 'gp' },
        { name: 'Guam', code: '+1-671', iso: 'gu' },
        { name: 'Guatemala', code: '+502', iso: 'gt' },
        { name: 'Guinea', code: '+224', iso: 'gn' },
        { name: 'Guinea-Bissau', code: '+245', iso: 'gw' },
        { name: 'Guyana', code: '+592', iso: 'gy' },
        { name: 'Haiti', code: '+509', iso: 'ht' },
        { name: 'Honduras', code: '+504', iso: 'hn' },
        { name: 'Hong Kong', code: '+852', iso: 'hk' },
        { name: 'Hungary', code: '+36', iso: 'hu' },
        { name: 'Iceland', code: '+354', iso: 'is' },
        { name: 'India', code: '+91', iso: 'in' },
        { name: 'Indonesia', code: '+62', iso: 'id' },
        { name: 'Iran', code: '+98', iso: 'ir' },
        { name: 'Iraq', code: '+964', iso: 'iq' },
        { name: 'Ireland', code: '+353', iso: 'ie' },
        { name: 'Israel', code: '+972', iso: 'il' },
        { name: 'Italy', code: '+39', iso: 'it' },
        { name: 'Jamaica', code: '+1-876', iso: 'jm' },
        { name: 'Japan', code: '+81', iso: 'jp' },
        { name: 'Jordan', code: '+962', iso: 'jo' },
        { name: 'Kazakhstan', code: '+7', iso: 'kz' },
        { name: 'Kenya', code: '+254', iso: 'ke' },
        { name: 'Kiribati', code: '+686', iso: 'ki' },
        { name: 'Kuwait', code: '+965', iso: 'kw' },
        { name: 'Kyrgyzstan', code: '+996', iso: 'kg' },
        { name: 'Laos', code: '+856', iso: 'la' },
        { name: 'Latvia', code: '+371', iso: 'lv' },
        { name: 'Lebanon', code: '+961', iso: 'lb' },
        { name: 'Lesotho', code: '+266', iso: 'ls' },
        { name: 'Liberia', code: '+231', iso: 'lr' },
        { name: 'Libya', code: '+218', iso: 'ly' },
        { name: 'Liechtenstein', code: '+423', iso: 'li' },
        { name: 'Lithuania', code: '+370', iso: 'lt' },
        { name: 'Luxembourg', code: '+352', iso: 'lu' },
        { name: 'Macau', code: '+853', iso: 'mo' },
        { name: 'Madagascar', code: '+261', iso: 'mg' },
        { name: 'Malawi', code: '+265', iso: 'mw' },
        { name: 'Malaysia', code: '+60', iso: 'my' },
        { name: 'Maldives', code: '+960', iso: 'mv' },
        { name: 'Mali', code: '+223', iso: 'ml' },
        { name: 'Malta', code: '+356', iso: 'mt' },
        { name: 'Marshall Islands', code: '+692', iso: 'mh' },
        { name: 'Martinique', code: '+596', iso: 'mq' },
        { name: 'Mauritania', code: '+222', iso: 'mr' },
        { name: 'Mauritius', code: '+230', iso: 'mu' },
        { name: 'Mexico', code: '+52', iso: 'mx' },
        { name: 'Micronesia', code: '+691', iso: 'fm' },
        { name: 'Moldova', code: '+373', iso: 'md' },
        { name: 'Monaco', code: '+377', iso: 'mc' },
        { name: 'Mongolia', code: '+976', iso: 'mn' },
        { name: 'Montenegro', code: '+382', iso: 'me' },
        { name: 'Morocco', code: '+212', iso: 'ma' },
        { name: 'Mozambique', code: '+258', iso: 'mz' },
        { name: 'Myanmar', code: '+95', iso: 'mm' },
        { name: 'Namibia', code: '+264', iso: 'na' },
        { name: 'Nauru', code: '+674', iso: 'nr' },
        { name: 'Nepal', code: '+977', iso: 'np' },
        { name: 'Netherlands', code: '+31', iso: 'nl' },
        { name: 'New Zealand', code: '+64', iso: 'nz' },
        { name: 'Nicaragua', code: '+505', iso: 'ni' },
        { name: 'Niger', code: '+227', iso: 'ne' },
        { name: 'Nigeria', code: '+234', iso: 'ng' },
        { name: 'North Macedonia', code: '+389', iso: 'mk' },
        { name: 'Norway', code: '+47', iso: 'no' },
        { name: 'Oman', code: '+968', iso: 'om' },
        { name: 'Pakistan', code: '+92', iso: 'pk' },
        { name: 'Palau', code: '+680', iso: 'pw' },
        { name: 'Panama', code: '+507', iso: 'pa' },
        { name: 'Papua New Guinea', code: '+675', iso: 'pg' },
        { name: 'Paraguay', code: '+595', iso: 'py' },
        { name: 'Peru', code: '+51', iso: 'pe' },
        { name: 'Philippines', code: '+63', iso: 'ph' },
        { name: 'Poland', code: '+48', iso: 'pl' },
        { name: 'Portugal', code: '+351', iso: 'pt' },
        { name: 'Puerto Rico', code: '+1-787', iso: 'pr' },
        { name: 'Qatar', code: '+974', iso: 'qa' },
        { name: 'Romania', code: '+40', iso: 'ro' },
        { name: 'Russia', code: '+7', iso: 'ru' },
        { name: 'Rwanda', code: '+250', iso: 'rw' },
        { name: 'Samoa', code: '+685', iso: 'ws' },
        { name: 'San Marino', code: '+378', iso: 'sm' },
        { name: 'Saudi Arabia', code: '+966', iso: 'sa' },
        { name: 'Senegal', code: '+221', iso: 'sn' },
        { name: 'Serbia', code: '+381', iso: 'rs' },
        { name: 'Seychelles', code: '+248', iso: 'sc' },
        { name: 'Sierra Leone', code: '+232', iso: 'sl' },
        { name: 'Singapore', code: '+65', iso: 'sg' },
        { name: 'Slovakia', code: '+421', iso: 'sk' },
        { name: 'Slovenia', code: '+386', iso: 'si' },
        { name: 'Solomon Islands', code: '+677', iso: 'sb' },
        { name: 'Somalia', code: '+252', iso: 'so' },
        { name: 'South Africa', code: '+27', iso: 'za' },
        { name: 'South Korea', code: '+82', iso: 'kr' },
        { name: 'Spain', code: '+34', iso: 'es' },
        { name: 'Sri Lanka', code: '+94', iso: 'lk' },
        { name: 'Sudan', code: '+249', iso: 'sd' },
        { name: 'Suriname', code: '+597', iso: 'sr' },
        { name: 'Sweden', code: '+46', iso: 'se' },
        { name: 'Switzerland', code: '+41', iso: 'ch' },
        { name: 'Syria', code: '+963', iso: 'sy' },
        { name: 'Taiwan', code: '+886', iso: 'tw' },
        { name: 'Tajikistan', code: '+992', iso: 'tj' },
        { name: 'Tanzania', code: '+255', iso: 'tz' },
        { name: 'Thailand', code: '+66', iso: 'th' },
        { name: 'Togo', code: '+228', iso: 'tg' },
        { name: 'Tonga', code: '+676', iso: 'to' },
        { name: 'Trinidad and Tobago', code: '+1-868', iso: 'tt' },
        { name: 'Tunisia', code: '+216', iso: 'tn' },
        { name: 'Turkey', code: '+90', iso: 'tr' },
        { name: 'Turkmenistan', code: '+993', iso: 'tm' },
        { name: 'Tuvalu', code: '+688', iso: 'tv' },
        { name: 'Uganda', code: '+256', iso: 'ug' },
        { name: 'Ukraine', code: '+380', iso: 'ua' },
        { name: 'United Arab Emirates', code: '+971', iso: 'ae' },
        { name: 'United Kingdom', code: '+44', iso: 'gb' },
        { name: 'United States', code: '+1', iso: 'us' },
        { name: 'Uruguay', code: '+598', iso: 'uy' },
        { name: 'Uzbekistan', code: '+998', iso: 'uz' },
        { name: 'Vanuatu', code: '+678', iso: 'vu' },
        { name: 'Vatican', code: '+379', iso: 'va' },
        { name: 'Venezuela', code: '+58', iso: 've' },
        { name: 'Vietnam', code: '+84', iso: 'vn' },
        { name: 'Yemen', code: '+967', iso: 'ye' },
        { name: 'Zambia', code: '+260', iso: 'zm' },
        { name: 'Zimbabwe', code: '+263', iso: 'zw' }
    ];

    selectedCountry = this.countries.find(c => c.name === 'India') || this.countries[0];
    showCountryDropdown = false;
    showAddressDropdown = false;
    filteredCountries = this.countries;
    errors: Record<string, string> = {};

    toggleCountryDropdown() {
        this.showCountryDropdown = !this.showCountryDropdown;
    }

    selectCountry(country: any) {
        this.selectedCountry = country;
        this.formData.countryCode = country.code;
        this.showCountryDropdown = false;
    }

    onNameInput() {
        if (this.formData.name) {
            this.formData.name = this.formData.name.replace(/\b\w/g, char => char.toUpperCase());
        }
    }

    // Filter countries as user types
    filterAddressCountries() {
        const query = this.formData.country.toLowerCase();
        this.filteredCountries = this.countries.filter(c =>
            c.name.toLowerCase().includes(query)
        );
    }

    selectAddressCountry(name: string) {
        this.formData.country = name;
        this.showAddressDropdown = false;
        this.filteredCountries = this.countries;
    }

    validate() {
        this.errors = {};
        if (!this.formData.name.trim()) this.errors['name'] = 'Please enter your name.';



        // 7-15 digit check for international phones
        // Dynamic phone validation based on selected country
        // Most countries have 7-15 digits. If strict rules are needed per country, a map is better.
        // For 'strict 10' requirement mentioned before, we'll assume it applies generally unless specified otherwise.
        // However, user asked "manage in it acc to teh number of country".
        // Let's implement a rudimentary length check: India is 10. Others vary.

        // Defining lengths or ranges for validation
        let expectedLength = 10; // Default (e.g., India, US)
        if (this.selectedCountry.name === 'China') expectedLength = 11;
        // Add more specific rules if known, otherwise typical range:

        const isIndia = this.selectedCountry.name === 'India';

        let phone = this.formData.contact.replace(/\s/g, '');
        if (!this.formData.contact) {
            this.errors['contact'] = 'Please enter your phone number.';
        } else {
            // If implicit "only" request from previous turn meant "strictly for that country",
            // we adjust logic. India = 10.
            if (isIndia) {
                if (!/^\d{10}$/.test(phone)) {
                    this.errors['contact'] = 'Please enter a valid 10-digit phone number.';
                }
            } else {
                // Generic international validation
                if (!/^\d{7,15}$/.test(phone)) {
                    this.errors['contact'] = `Please enter a valid phone number (7-15 digits).`;
                }
            }
        }

        if (!this.formData.email) {
            this.errors['email'] = 'Please enter your email address.';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.formData.email)) {
            this.errors['email'] = 'Please enter a valid email address.';
        }

        if (!this.formData.state.trim()) this.errors['state'] = 'Please enter your state.';
        if (!this.formData.city.trim()) this.errors['city'] = 'Please enter your city.';

        if (!this.formData.pincode) {
            this.errors['pincode'] = 'Please enter your pincode.';
        } else if (!/^\d{4,6}$/.test(this.formData.pincode)) {
            this.errors['pincode'] = 'Please enter a valid pincode (4-6 digits).';
        }

        return Object.keys(this.errors).length === 0;
    }

    onNumberKeyDown(event: KeyboardEvent) {
        const allowedKeys = [
            'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight',
            'Delete', 'Home', 'End'
        ];

        if (event.ctrlKey || event.metaKey) {
            return;
        }

        if (allowedKeys.includes(event.key)) {
            return;
        }

        if (!/^[0-9]$/.test(event.key)) {
            event.preventDefault();
        }
    }

    handleSubmit() {
        if (this.validate()) {
            console.log('Form Submitted', this.formData);
            alert('Sign Up Successful!');
            // Reset form or send to API
        }
    }
}
