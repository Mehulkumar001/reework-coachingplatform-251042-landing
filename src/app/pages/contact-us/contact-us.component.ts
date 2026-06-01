import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../services/seo.service';
import { LandingContentService, PageType } from '../../services/landing-content.service';

type FaqTab = 'general' | 'signup' | 'support';

interface FaqItem {
  question: string;
  answer: string;
}

interface CountryOption {
  name: string;
  dialCode: string;
  flag: string; // Can be emoji or image URL
  flagImage?: string; // Image URL for flag
}

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ContactUsComponent implements OnInit {
  // Form fields
  contactForm = {
    name: '',
    phone: '',
    email: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    query: ''
  };

  selectedCountry: CountryOption = {
    name: 'India',
    dialCode: '+91',
    flag: this.resolveFlag('India'),
    flagImage: this.getFlagImageUrl('IN')
  };
  countryOpen = false;
  countrySearch = '';

  activeFaqTab: FaqTab = 'general';

  expandedByTab: Record<FaqTab, number | null> = {
    general: 0,
    signup: 0,
    support: 0
  };

  readonly faqTabs: { key: FaqTab; label: string }[] = [
    { key: 'general', label: 'General' },
    { key: 'signup', label: 'Sign Up and Login' },
    { key: 'support', label: 'Support' }
  ];

  faqData: Record<FaqTab, FaqItem[]> = {
    general: [
      {
        question: 'What is Reework?',
        answer:
          'Reework is an integrated mind and body digital platform that connects qualified dietitians with clients, helping them achieve their health goals through personalized nutrition and lifestyle plans.'
      },
      {
        question: 'Who is a ReeWorker?',
        answer:
          'A ReeWorker is an individual using Reework to achieve health goals through personalized guidance from qualified dietitians on an integrated digital platform.'
      },
      {
        question: 'Who is a ReeCoach?',
        answer:
          'A qualified dietitian leveraging Reework to deliver personalized nutrition plans and support, guiding Reeworkers towards sustainable health outcomes.'
      },
      {
        question: 'Who can become a ReeCoach?',
        answer:
          'Any professional qualified Dietitian/Clinical Nutritionist with formal education and experience in Nutrition and Dietetics can become a ReeCoach.'
      }
    ],
    signup: [
      {
        question: 'How do I create an account on Reework?',
        answer:
          'Download Reework from the Apple Store or Google Play Store. Click Sign Up on the welcome screen, fill basic information, choose your subscription plan, complete your questionnaire, and start exploring app features.'
      },
      {
        question: 'What devices are compatible with Reework?',
        answer:
          'Reework is compatible with most iOS and Android devices. For iOS it requires version 12.0 or higher, and for Android it requires version 8.0 or higher.'
      },
      {
        question: "How do I log in to Reework after I've created an account?",
        answer:
          'Open the app and tap Log In. Enter your registered email/mobile number and password or OTP.'
      },
      {
        question: 'What should I do if I forgot my password?',
        answer:
          'Tap the Forgot Password link on login, enter your registered email/mobile number, and follow the reset instructions sent to you.'
      },
      {
        question:
          'While trying to login, why am I asked for a password after I have entered an OTP?',
        answer:
          "For account safety, Reework may ask for password if OTP login wasn't used for a long time. This helps prevent unauthorized access in case a mobile number changes ownership."
      },
      {
        question: 'How can I change the Email or mobile number that I used to register with Reework?',
        answer:
          'Log in, open Profile from the homepage, tap Edit Profile, update your email/mobile number, and save.'
      },
      {
        question: 'Why am I not receiving the verification email?',
        answer:
          'Verify your email/mobile number, check spam or junk folder, and ensure notification permissions are enabled. If still not received, resend the code or contact support.'
      },
      {
        question: 'Can I have multiple accounts on one device?',
        answer:
          'No, you need to log out of one account before logging into another account.'
      }
    ],
    support: [
      {
        question: 'Why is my account locked?',
        answer:
          "Reework locks accounts for a specified period or permanently after too many failed login attempts. Reset your password or contact ReeCoach support through the Help & Support section."
      },
      {
        question: 'Do I need an internet connection to use the app?',
        answer: 'Yes, an internet connection is required to use the app.'
      },
      {
        question: 'What will happen after the plan is expired?',
        answer:
          'You will be notified before plan end. If not renewed, access is limited to features under the free plan.'
      },
      {
        question: 'Can I change my ReeCoach?',
        answer: "Yes. Contact Reework support through the Help & Support section."
      },
      {
        question: 'Who should I contact if I have a query?',
        answer:
          'For any query or assistance, contact support@reework.in. The support team will help with app questions and issues.'
      },
      {
        question: 'Is the Reework App secure?',
        answer:
          'Yes, Reework takes data privacy and security seriously and uses multiple measures to keep user data safe.'
      }
    ]
  };

  private readonly regionNameToIso = this.buildRegionNameToIsoMap();
  readonly countryOptions: CountryOption[] = this.buildCountryOptions();

  isSubmitting: boolean = false;
  submitSuccess: boolean = false;
  submitError: string = '';
  showCaptcha: boolean = false; // Hidden for now

  constructor(
    private seoService: SeoService,
    private contentService: LandingContentService
  ) { }

  ngOnInit() {
    this.seoService.updateSeo({
      title: 'Contact ReeCoach | Support & Business Enquiry',
      description: 'Get in touch with the ReeCoach team for support, feedback, or business enquiries. We are here to help you scale your nutrition practice.',
      keywords: 'contact ReeCoach, dietitian support, nutrition software enquiry, ReeCoach feedback, shamrock nutrascience contact',
      canonical: 'https://reecoach.in/contact/',
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      ogTitle: 'Contact ReeCoach | We Are Here to Help',
      ogDescription: 'Reach out for any queries regarding our intelligent nutrition platform.',
      ogImage: 'https://reecoach.in/logo.png',
      ogUrl: 'https://reecoach.in/contact/',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "ContactPage",
            "@id": "https://reecoach.in/contact/#webpage",
            "url": "https://reecoach.in/contact/",
            "name": "Contact Us",
            "isPartOf": { "@id": "https://reecoach.in/#website" },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://reecoach.in/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Contact Us",
                  "item": "https://reecoach.in/contact/"
                }
              ]
            }
          }
        ]
      }
    });
    this.loadContent();
  }

  loadContent(): void {
    this.contentService.getContent(PageType.CONTACT_US).subscribe(
      (data) => {
        if (data && data.length > 0) {
          // Process FAQ sections
          const faqSections = data.filter(item => item.sectionType === 'FAQ_SECTION' && item.isActive);
          faqSections.forEach(section => {
            if (section.content && section.content.category) {
              const category = section.content.category.toLowerCase();
              if (category === 'general' || category === 'signup' || category === 'support') {
                if (!this.faqData[category as FaqTab]) {
                  this.faqData[category as FaqTab] = [];
                }
                this.faqData[category as FaqTab].push({
                  question: section.content.question,
                  answer: section.content.answer
                });
              }
            }
          });
        }
      },
      (error) => {
        console.error('Error loading contact content:', error);
      }
    );
  }

  private readonly limits = {
    nameMax: 70,
    phoneMin: 7,
    phoneMax: 15,
    emailMax: 60,
    stateMax: 70,
    cityMax: 70,
    pincodeMin: 4,
    pincodeMax: 10,
    queryMax: 300
  };

  private readonly emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  get isIndiaSelected(): boolean {
    return this.selectedCountry?.dialCode === '+91' || this.selectedCountry?.name === 'India';
  }

  onSubmitForm(): void {
    this.submitError = '';

    const name = (this.contactForm.name || '').trim();
    const email = (this.contactForm.email || '').trim();
    const phone = (this.contactForm.phone || '').trim();
    const country = (this.contactForm.country || '').trim();
    const state = (this.contactForm.state || '').trim();
    const city = (this.contactForm.city || '').trim();
    const pincode = (this.contactForm.pincode || '').trim();
    const query = (this.contactForm.query || '').trim();

    if (!name) {
      this.submitError = 'Please enter your name.';
      return;
    }
    if (name.length > this.limits.nameMax) {
      this.submitError = `Name must be at most ${this.limits.nameMax} characters.`;
      return;
    }
    if (!phone) {
      this.submitError = 'Please enter your contact number.';
      return;
    }
    if (this.isIndiaSelected) {
      const indianMobilePattern = /^[6-9]\d{9}$/;
      if (!indianMobilePattern.test(phone)) {
        this.submitError =
          'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.';
        return;
      }
    } else if (phone.length < this.limits.phoneMin || phone.length > this.limits.phoneMax) {
      this.submitError = `Contact number must be between ${this.limits.phoneMin} and ${this.limits.phoneMax} digits.`;
      return;
    }
    if (!email) {
      this.submitError = 'Please enter your email.';
      return;
    }
    if (!this.emailPattern.test(email)) {
      this.submitError = 'Please enter a valid email address.';
      return;
    }
    if (email.length > this.limits.emailMax) {
      this.submitError = `Email must be at most ${this.limits.emailMax} characters.`;
      return;
    }
    if (!country) {
      this.submitError = 'Please select your country.';
      return;
    }
    if (!state) {
      this.submitError = 'Please enter your state.';
      return;
    }
    if (state.length > this.limits.stateMax) {
      this.submitError = `State must be at most ${this.limits.stateMax} characters.`;
      return;
    }
    if (!city) {
      this.submitError = 'Please enter your city.';
      return;
    }
    if (city.length > this.limits.cityMax) {
      this.submitError = `City must be at most ${this.limits.cityMax} characters.`;
      return;
    }
    if (!pincode) {
      this.submitError = 'Please enter your pincode.';
      return;
    }
    if (!/^\d+$/.test(pincode)) {
      this.submitError = 'Pincode must contain only digits.';
      return;
    }
    if (pincode.length < this.limits.pincodeMin || pincode.length > this.limits.pincodeMax) {
      this.submitError = `Pincode must be between ${this.limits.pincodeMin} and ${this.limits.pincodeMax} digits.`;
      return;
    }
    if (query.length > this.limits.queryMax) {
      this.submitError = `Your query must be at most ${this.limits.queryMax} characters.`;
      return;
    }
    if (!query) {
      this.submitError = 'Please enter your query.';
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;

    const enquiryData = {
      name,
      email,
      phone: this.selectedCountry.dialCode + phone,
      country,
      state,
      city,
      pincode,
      query
    };

    this.contentService.submitContactEnquiry(enquiryData).subscribe(
      () => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.contactForm = { name: '', phone: '', email: '', country: '', state: '', city: '', pincode: '', query: '' };
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      },
      (error) => {
        this.isSubmitting = false;
        this.submitError = 'Failed to submit your enquiry. Please try again later.';
        console.error('Error submitting enquiry:', error);
      }
    );
  }

  get filteredCountries(): CountryOption[] {
    const query = this.countrySearch.trim().toLowerCase();
    if (!query) return this.countryOptions;
    return this.countryOptions.filter(
      (option) =>
        option.name.toLowerCase().includes(query) || option.dialCode.toLowerCase().includes(query)
    );
  }

  selectFaqTab(tab: FaqTab): void {
    this.activeFaqTab = tab;
  }

  toggleFaq(index: number): void {
    const current = this.expandedByTab[this.activeFaqTab];
    this.expandedByTab[this.activeFaqTab] = current === index ? null : index;
  }

  toggleCountryDropdown(): void {
    this.countryOpen = !this.countryOpen;
    if (!this.countryOpen) {
      this.countrySearch = '';
    }
  }

  onCountrySearch(event: Event): void {
    this.countrySearch = (event.target as HTMLInputElement).value;
  }

  selectCountry(option: CountryOption): void {
    this.selectedCountry = option;
    this.countryOpen = false;
    this.countrySearch = '';
  }

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cleanedValue = input.value.replace(/[^0-9]/g, '');
    input.value = cleanedValue;
    this.contactForm.phone = cleanedValue;
  }

  getWordCount(text: string): number {
    if (!text || !text.trim()) return 0;
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  private buildCountryOptions(): CountryOption[] {
    const raw = [
      ['Afghanistan', '+93'],
      ['Albania', '+355'],
      ['Algeria', '+213'],
      ['American Samoa', '+1'],
      ['Andorra', '+376'],
      ['Angola', '+244'],
      ['Anguilla', '+1'],
      ['Antigua & Barbuda', '+1'],
      ['Argentina', '+54'],
      ['Armenia', '+374'],
      ['Aruba', '+297'],
      ['Ascension Island', '+247'],
      ['Australia', '+61'],
      ['Austria', '+43'],
      ['Azerbaijan', '+994'],
      ['Bahamas', '+1'],
      ['Bahrain', '+973'],
      ['Bangladesh', '+880'],
      ['Barbados', '+1'],
      ['Belarus', '+375'],
      ['Belgium', '+32'],
      ['Belize', '+501'],
      ['Benin', '+229'],
      ['Bermuda', '+1'],
      ['Bhutan', '+975'],
      ['Bolivia', '+591'],
      ['Bosnia & Herzegovina', '+387'],
      ['Botswana', '+267'],
      ['Brazil', '+55'],
      ['British Indian Ocean Territory', '+246'],
      ['British Virgin Islands', '+1'],
      ['Brunei', '+673'],
      ['Bulgaria', '+359'],
      ['Burkina Faso', '+226'],
      ['Burundi', '+257'],
      ['Cambodia', '+855'],
      ['Cameroon', '+237'],
      ['Canada', '+1'],
      ['Cape Verde', '+238'],
      ['Caribbean Netherlands', '+599'],
      ['Cayman Islands', '+1'],
      ['Central African Republic', '+236'],
      ['Chad', '+235'],
      ['Chile', '+56'],
      ['China', '+86'],
      ['Christmas Island', '+61'],
      ['Cocos (Keeling) Islands', '+61'],
      ['Colombia', '+57'],
      ['Comoros', '+269'],
      ['Congo - Brazzaville', '+242'],
      ['Congo - Kinshasa', '+243'],
      ['Cook Islands', '+682'],
      ['Costa Rica', '+506'],
      ['Croatia', '+385'],
      ['Cuba', '+53'],
      ['Curaçao', '+599'],
      ['Cyprus', '+357'],
      ['Czech Republic', '+420'],
      ['Côte d\'Ivoire', '+225'],
      ['Denmark', '+45'],
      ['Djibouti', '+253'],
      ['Dominica', '+1'],
      ['Dominican Republic', '+1'],
      ['Ecuador', '+593'],
      ['Egypt', '+20'],
      ['El Salvador', '+503'],
      ['Equatorial Guinea', '+240'],
      ['Eritrea', '+291'],
      ['Estonia', '+372'],
      ['Eswatini', '+268'],
      ['Ethiopia', '+251'],
      ['Falkland Islands', '+500'],
      ['Faroe Islands', '+298'],
      ['Fiji', '+679'],
      ['Finland', '+358'],
      ['France', '+33'],
      ['French Guiana', '+594'],
      ['French Polynesia', '+689'],
      ['Gabon', '+241'],
      ['Gambia', '+220'],
      ['Georgia', '+995'],
      ['Germany', '+49'],
      ['Ghana', '+233'],
      ['Gibraltar', '+350'],
      ['Greece', '+30'],
      ['Greenland', '+299'],
      ['Grenada', '+1'],
      ['Guadeloupe', '+590'],
      ['Guam', '+1'],
      ['Guatemala', '+502'],
      ['Guernsey', '+44'],
      ['Guinea', '+224'],
      ['Guinea-Bissau', '+245'],
      ['Guyana', '+592'],
      ['Haiti', '+509'],
      ['Honduras', '+504'],
      ['Hong Kong', '+852'],
      ['Hungary', '+36'],
      ['Iceland', '+354'],
      ['India', '+91'],
      ['Indonesia', '+62'],
      ['Iran', '+98'],
      ['Iraq', '+964'],
      ['Ireland', '+353'],
      ['Isle of Man', '+44'],
      ['Israel', '+972'],
      ['Italy', '+39'],
      ['Jamaica', '+1'],
      ['Japan', '+81'],
      ['Jersey', '+44'],
      ['Jordan', '+962'],
      ['Kazakhstan', '+7'],
      ['Kenya', '+254'],
      ['Kiribati', '+686'],
      ['Kosovo', '+383'],
      ['Kuwait', '+965'],
      ['Kyrgyzstan', '+996'],
      ['Laos', '+856'],
      ['Latvia', '+371'],
      ['Lebanon', '+961'],
      ['Lesotho', '+266'],
      ['Liberia', '+231'],
      ['Libya', '+218'],
      ['Liechtenstein', '+423'],
      ['Lithuania', '+370'],
      ['Luxembourg', '+352'],
      ['Macau', '+853'],
      ['Madagascar', '+261'],
      ['Malawi', '+265'],
      ['Malaysia', '+60'],
      ['Maldives', '+960'],
      ['Mali', '+223'],
      ['Malta', '+356'],
      ['Marshall Islands', '+692'],
      ['Martinique', '+596'],
      ['Mauritania', '+222'],
      ['Mauritius', '+230'],
      ['Mayotte', '+262'],
      ['Mexico', '+52'],
      ['Micronesia', '+691'],
      ['Moldova', '+373'],
      ['Monaco', '+377'],
      ['Mongolia', '+976'],
      ['Montenegro', '+382'],
      ['Montserrat', '+1'],
      ['Morocco', '+212'],
      ['Mozambique', '+258'],
      ['Myanmar (Burma)', '+95'],
      ['Namibia', '+264'],
      ['Nauru', '+674'],
      ['Nepal', '+977'],
      ['Netherlands', '+31'],
      ['New Caledonia', '+687'],
      ['New Zealand', '+64'],
      ['Nicaragua', '+505'],
      ['Niger', '+227'],
      ['Nigeria', '+234'],
      ['Niue', '+683'],
      ['Norfolk Island', '+672'],
      ['North Korea', '+850'],
      ['North Macedonia', '+389'],
      ['Northern Mariana Islands', '+1'],
      ['Norway', '+47'],
      ['Oman', '+968'],
      ['Pakistan', '+92'],
      ['Palau', '+680'],
      ['Palestine', '+970'],
      ['Panama', '+507'],
      ['Papua New Guinea', '+675'],
      ['Paraguay', '+595'],
      ['Peru', '+51'],
      ['Philippines', '+63'],
      ['Poland', '+48'],
      ['Portugal', '+351'],
      ['Puerto Rico', '+1'],
      ['Qatar', '+974'],
      ['Romania', '+40'],
      ['Russia', '+7'],
      ['Rwanda', '+250'],
      ['Réunion', '+262'],
      ['Samoa', '+685'],
      ['San Marino', '+378'],
      ['Saudi Arabia', '+966'],
      ['Senegal', '+221'],
      ['Serbia', '+381'],
      ['Seychelles', '+248'],
      ['Sierra Leone', '+232'],
      ['Singapore', '+65'],
      ['Sint Maarten', '+1'],
      ['Slovakia', '+421'],
      ['Slovenia', '+386'],
      ['Solomon Islands', '+677'],
      ['Somalia', '+252'],
      ['South Africa', '+27'],
      ['South Korea', '+82'],
      ['South Sudan', '+211'],
      ['Spain', '+34'],
      ['Sri Lanka', '+94'],
      ['St Barthélemy', '+590'],
      ['St Helena', '+290'],
      ['St Kitts & Nevis', '+1'],
      ['St Lucia', '+1'],
      ['St Martin', '+590'],
      ['St Pierre & Miquelon', '+508'],
      ['St Vincent & Grenadines', '+1'],
      ['Sudan', '+249'],
      ['Suriname', '+597'],
      ['Svalbard & Jan Mayen', '+47'],
      ['Sweden', '+46'],
      ['Switzerland', '+41'],
      ['Syria', '+963'],
      ['São Tomé & Príncipe', '+239'],
      ['Taiwan', '+886'],
      ['Tajikistan', '+992'],
      ['Tanzania', '+255'],
      ['Thailand', '+66'],
      ['Timor-Leste', '+670'],
      ['Togo', '+228'],
      ['Tokelau', '+690'],
      ['Tonga', '+676'],
      ['Trinidad & Tobago', '+1'],
      ['Tunisia', '+216'],
      ['Turkey', '+90'],
      ['Turkmenistan', '+993'],
      ['Turks & Caicos Islands', '+1'],
      ['Tuvalu', '+688'],
      ['US Virgin Islands', '+1'],
      ['Uganda', '+256'],
      ['Ukraine', '+380'],
      ['United Arab Emirates', '+971'],
      ['United Kingdom', '+44'],
      ['United States', '+1'],
      ['Uruguay', '+598'],
      ['Uzbekistan', '+998'],
      ['Vanuatu', '+678'],
      ['Vatican City', '+39'],
      ['Venezuela', '+58'],
      ['Vietnam', '+84'],
      ['Wallis & Futuna', '+681'],
      ['Western Sahara', '+212'],
      ['Yemen', '+967'],
      ['Zambia', '+260'],
      ['Zimbabwe', '+263'],
      ['Åland Islands', '+358']
    ] as const;

    return raw.map(([name, dialCode]) => {
      const iso2 = this.getCountryIso2(name);
      return {
        name,
        dialCode,
        flag: this.resolveFlag(name),
        flagImage: this.getFlagImageUrl(iso2)
      };
    });
  }

  private resolveFlag(countryName: string): string {
    const alias: Record<string, string> = {
      India: 'IN',
      'Antigua & Barbuda': 'AG',
      'Bosnia & Herzegovina': 'BA',
      'British Virgin Islands': 'VG',
      'Congo - Brazzaville': 'CG',
      'Congo - Kinshasa': 'CD',
      "Côte d'Ivoire": 'CI',
      'Curaçao': 'CW',
      Eswatini: 'SZ',
      Kosovo: 'XK',
      'Myanmar (Burma)': 'MM',
      Palestine: 'PS',
      Réunion: 'RE',
      'St Barthélemy': 'BL',
      'St Helena': 'SH',
      'St Kitts & Nevis': 'KN',
      'St Lucia': 'LC',
      'St Martin': 'MF',
      'St Pierre & Miquelon': 'PM',
      'St Vincent & Grenadines': 'VC',
      'São Tomé & Príncipe': 'ST',
      Taiwan: 'TW',
      'Timor-Leste': 'TL',
      'Trinidad & Tobago': 'TT',
      'Turks & Caicos Islands': 'TC',
      'US Virgin Islands': 'VI',
      'Åland Islands': 'AX'
    };

    const code = alias[countryName];
    if (code) return this.isoToFlag(code);

    const normalizedTarget = this.normalizeCountry(countryName);
    const found = this.regionNameToIso?.[normalizedTarget];
    return found ? this.isoToFlag(found) : '🏳️';
  }

  private buildRegionNameToIsoMap(): Record<string, string> {
    if (typeof Intl === 'undefined' || typeof Intl.DisplayNames !== 'function') {
      return {};
    }

    try {
      const names = new Intl.DisplayNames(['en'], { type: 'region' });
      const regionMap: Record<string, string> = {};

      for (let first = 65; first <= 90; first++) {
        for (let second = 65; second <= 90; second++) {
          const code = String.fromCharCode(first, second);
          const label = names.of(code);

          if (!label || label.toUpperCase() === code) continue;
          regionMap[this.normalizeCountry(label)] = code;
        }
      }

      return regionMap;
    } catch {
      return {};
    }
  }

  private normalizeCountry(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private isoToFlag(iso2: string): string {
    return iso2
      .toUpperCase()
      .split('')
      .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
      .join('');
  }

  private getFlagImageUrl(iso2: string): string {
    // Using flagcdn.com CDN for reliable flag images
    // Format: https://flagcdn.com/w20/{iso2}.png (20px width)
    return `https://flagcdn.com/w20/${iso2.toLowerCase()}.png`;
  }

  private getCountryIso2(countryName: string): string {
    const alias: Record<string, string> = {
      India: 'IN',
      'Antigua & Barbuda': 'AG',
      'Bosnia & Herzegovina': 'BA',
      'British Virgin Islands': 'VG',
      'Congo - Brazzaville': 'CG',
      'Congo - Kinshasa': 'CD',
      "Côte d'Ivoire": 'CI',
      'Curaçao': 'CW',
      Eswatini: 'SZ',
      Kosovo: 'XK',
      'Myanmar (Burma)': 'MM',
      Palestine: 'PS',
      Réunion: 'RE',
      'St Barthélemy': 'BL',
      'St Helena': 'SH',
      'St Kitts & Nevis': 'KN',
      'St Lucia': 'LC',
      'St Martin': 'MF',
      'St Pierre & Miquelon': 'PM',
      'St Vincent & Grenadines': 'VC',
      'São Tomé & Príncipe': 'ST',
      Taiwan: 'TW',
      'Timor-Leste': 'TL',
      'Trinidad & Tobago': 'TT',
      'Turks & Caicos Islands': 'TC',
      'US Virgin Islands': 'VI',
      'Åland Islands': 'AX'
    };

    const code = alias[countryName];
    if (code) return code;

    const normalizedTarget = this.normalizeCountry(countryName);
    const found = this.regionNameToIso?.[normalizedTarget];
    return found || 'XX';
  }
}
