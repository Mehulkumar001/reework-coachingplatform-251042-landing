import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    LucideAngularModule, Sprout, ClipboardList, Smartphone,
    BookOpenCheck, FileText, PlayCircle
} from 'lucide-angular';
import { SeoService } from '../../services/seo.service';

@Component({
    selector: 'app-knowledge-repository',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './knowledge-repository.component.html',
    styleUrl: './knowledge-repository.component.css',
})
export class KnowledgeRepositoryComponent implements OnInit {

    constructor(private seoService: SeoService) { }

    ngOnInit() {
        this.seoService.updateSeo({
            title: 'Knowledge Repository | Scientific Resources for Dietitians',
            description: 'Access 1000+ clinical nutrition guidelines, ingredient databases, and patient education templates. Stay evidence-based with ReeCoach.',
            keywords: 'nutrition database, clinical guidelines, dietitian resources, patient education templates, evidence-based nutrition',
            canonical: 'https://reecoach.in/knowledge-repository/',
            robots: 'index, follow',
            ogTitle: 'ReeCoach Knowledge Repository | Authority Scientific Data',
            ogDescription: 'Your one-stop library for clinical guidelines, nutrient databases, and patient education videos.',
            ogImage: 'https://reecoach.in/logo.png',
            ogUrl: 'https://reecoach.in/knowledge-repository/',
            ogType: 'website',
            jsonLd: {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "WebPage",
                        "@id": "https://reecoach.in/knowledge-repository/#webpage",
                        "url": "https://reecoach.in/knowledge-repository/",
                        "name": "Knowledge Repository - ReeCoach",
                        "description": "Scientific and evidence-based nutrition resources for qualified dietitians.",
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
                                    "name": "Knowledge Repository",
                                    "item": "https://reecoach.in/knowledge-repository/"
                                }
                            ]
                        }
                    }
                ]
            }
        });
    }
    resources = [
        {
            image: "/KnowledgeRepositoryImg-1.png",
            title: "INGREDIENT DATABASE",
            description: "Uniquely tagged ingredients for quick reference and use."
        },
        {
            image: "/KnowledgeRepositoryImg-2.png",
            title: "NUTRIENT DATABASE",
            description: "At a glance choose optimal nutrients for your clients."
        },
        {
            image: "/KnowledgeRepositoryImg-3.png",
            title: "PATIENT EDUCATION TEMPLATES",
            description: "Pre-made lifestyle guides for patient education."
        },
        {
            image: "/KnowledgeRepositoryImg-4.png",
            title: "UP-TO-DATE EVIDENCE BASED GUIDELINES",
            description: "Clinical Nutrition and Medical Condition insights for effective management."
        },
        {
            image: "/KnowledgeRepositoryImg-5.png",
            title: "PATIENT EDUCATION BLOGS",
            description: "Healthy Living Blogs covering a wide array of topics on health and wellness."
        },
        {
            image: "/KnowledgeRepositoryImg-6.png",
            title: "HEALTH AND VIDEO LIBRARY",
            description: "A diverse and engaging collection of books and videos on exercise, nutrition, health and wellness."
        }
    ];
}
