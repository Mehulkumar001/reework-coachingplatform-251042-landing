import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { BecomeACoachComponent } from './pages/become-a-coach/become-a-coach.component';
import { ReeworkComponent } from './pages/reework/reework.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';

import { FeaturesPageComponent } from './pages/features/features.component';
import { CommunityPageComponent } from './pages/community/community.component';
import { KnowledgeRepositoryComponent } from './pages/knowledge-repository/knowledge-repository.component';

import { SignUpComponent } from './pages/signup/signup.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { RefundPolicyComponent } from './pages/refund-policy/refund-policy.component';
import { ShippingPolicyComponent } from './pages/shipping-policy/shipping-policy.component';
import { CareersComponent } from './pages/careers/careers.component';
import { OpenPositionsComponent } from './pages/open-positions/open-positions.component';
import { ApplyFormComponent } from './pages/apply-form/apply-form.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'about-us', component: AboutUsComponent },
            { path: 'become-a-reecoach', component: BecomeACoachComponent },
            { path: 'reework', component: ReeworkComponent },
            { path: 'blogs/:slug', component: BlogsComponent },
            { path: 'blogs', component: BlogsComponent },
            { path: 'contact', component: ContactUsComponent },
            { path: 'feedback', component: FeedbackComponent },

            { path: 'features', component: FeaturesPageComponent },
            { path: 'community', component: CommunityPageComponent },
            { path: 'knowledge-repository', component: KnowledgeRepositoryComponent },
            { path: 'signup', component: SignUpComponent },
            { path: 'privacy-policy', component: PrivacyPolicyComponent },
            { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
            { path: 'refund-cancellation-policy', component: RefundPolicyComponent },
            { path: 'shipping-policy', component: ShippingPolicyComponent },
            { path: 'careers', component: CareersComponent },
            { path: 'open-positions', component: OpenPositionsComponent },
            { path: 'apply', component: ApplyFormComponent },
        ]
    },

    { path: '**', redirectTo: '' }
];
