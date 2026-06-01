import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { LucideAngularModule, User, Calendar, ChevronLeft, FileText } from 'lucide-angular';
import { LandingContentService, BlogPost, BlogCategory } from '../../services/landing-content.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-blogs',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './blogs.component.html',
    styleUrl: './blogs.component.css',
})
export class BlogsComponent implements OnInit {
    private readonly siteBaseUrl = 'https://reecoach.in';

    // Format a date string (yyyy-mm-dd or ISO) to dd-mm-yyyy
    formatDate(dateStr: string): string {
        if (!dateStr) return '';
        // Accepts yyyy-mm-dd or yyyy-mm-ddTHH:mm:ss
        const [y, m, d] = dateStr.split('T')[0].split('-');
        if (!y || !m || !d) return dateStr;
        return `${d}-${m}-${y}`;
    }

    @ViewChild('categoryCarousel') categoryCarouselRef!: ElementRef<HTMLDivElement>;

    categories: BlogCategory[] = [];
    selectedCategoryId: number | null = null;
    isLoadingCategories = true;
    useApiCategories = false;

    constructor(
        private seoService: SeoService,
        private contentService: LandingContentService,
        private cdr: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            const slug = paramMap.get('slug');

            if (!slug) {
                this.selectedPost = null;
                this.isDetailLoading = false;
                this.updateSeo();
                this.cdr.detectChanges();
                return;
            }

            const fallbackPost = this.posts.find(post => post.slug === slug) ?? (this.selectedPost?.slug === slug ? this.selectedPost : null);
            this.loadSelectedPostBySlug(slug, fallbackPost);
        });

        this.loadCategories();
    }

    private updateSeo(): void {
        if (this.selectedPost) {
            const post = this.selectedPost;
            const postUrl = `${this.siteBaseUrl}/blogs/${post.slug || post.id}`;
            const title = post.metaTitle || post.title || 'ReeCoach Blog';
            const description = post.metaDescription || post.description || 'Read the latest insights from ReeCoach.';
            const keywords = post.metaKeywords?.length
                ? post.metaKeywords.join(', ')
                : 'dietitian blog, nutrition practice management, meal planning technology, dietitian vs nutritionist, nutrition research India';

            this.seoService.updateSeo({
                title,
                description,
                keywords,
                canonical: postUrl,
                robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
                ogTitle: title,
                ogDescription: description,
                ogImage: post.image || `${this.siteBaseUrl}/logo.png`,
                ogUrl: postUrl,
                ogType: 'article',
                twitterCard: 'summary_large_image',
                twitterTitle: title,
                twitterDescription: description,
                twitterImage: post.image || `${this.siteBaseUrl}/logo.png`,
                jsonLd: {
                    '@context': 'https://schema.org',
                    '@type': 'BlogPosting',
                    headline: post.title,
                    description,
                    image: post.image || `${this.siteBaseUrl}/logo.png`,
                    datePublished: post.date || undefined,
                    author: { '@type': 'Person', name: post.author || 'ReeCoach' },
                    mainEntityOfPage: postUrl,
                    url: postUrl
                }
            });
            return;
        }

        this.seoService.updateSeo({
            title: 'ReeCoach Blog | Insights for Dietitians & Nutritionists',
            description: 'Stay updated with the latest in nutrition technology, practice management mistakes, and clinical nutrition research. Expert insights for the modern dietitian.',
            keywords: 'dietitian blog, nutrition practice management, meal planning technology, dietitian vs nutritionist, nutrition research India',
            canonical: `${this.siteBaseUrl}/blogs/`,
            robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
            ogTitle: 'ReeCoach Blog | Expert Nutrition Insights',
            ogDescription: 'Expert articles on nutrition care, technology integration, and growing your private practice.',
            ogImage: `${this.siteBaseUrl}/logo.png`,
            ogUrl: `${this.siteBaseUrl}/blogs/`,
            ogType: 'website',
            twitterCard: 'summary_large_image',
            twitterTitle: 'ReeCoach Blog | Practice Management & Nutrition',
            twitterDescription: 'Latest insights for dietitians and nutritionists.',
            twitterImage: `${this.siteBaseUrl}/logo.png`,
            jsonLd: {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "Blog",
                        "@id": `${this.siteBaseUrl}/blogs/#webpage`,
                        "name": "ReeCoach Insights Blog",
                        "description": "Expert insights and research for the dietetic community.",
                        "publisher": { "@id": `${this.siteBaseUrl}/#organization` },
                        "blogPost": this.posts.map(post => ({
                            "@type": "BlogPosting",
                            "headline": post.title,
                            "datePublished": post.date,
                            "author": { "@type": "Person", "name": post.author },
                            "image": post.image,
                            "url": `${this.siteBaseUrl}/blogs/${post.slug || post.id}`
                        }))
                    }
                ]
            }
        });
    }
    readonly UserIcon = User;
    readonly CalendarIcon = Calendar;
    readonly ChevronLeft = ChevronLeft;
    readonly FileTextIcon = FileText;

    selectedPost: BlogPost | null = null;
    posts: BlogPost[] = [];
    isLoading = true;
    isDetailLoading = false;

    // Simple client-side pagination over the loaded public blogs
    page = 1;
    pageSize = 6;

    get totalCount(): number {
        return this.posts.length;
    }

    get totalPages(): number {
        return Math.max(1, Math.ceil(this.totalCount / this.pageSize));
    }

    get paginationStart(): number {
        return this.totalCount === 0 ? 0 : (this.page - 1) * this.pageSize + 1;
    }

    get paginationEnd(): number {
        return Math.min(this.page * this.pageSize, this.totalCount);
    }

    get pagedPosts(): BlogPost[] {
        const start = (this.page - 1) * this.pageSize;
        return this.posts.slice(start, start + this.pageSize);
    }

    loadCategories(): void {
        this.isLoadingCategories = true;
        this.contentService.getBlogCategories().pipe(
            finalize(() => {
                this.isLoadingCategories = false;
                this.cdr.detectChanges();
            })
        ).subscribe({
            next: (cats) => {
                if (Array.isArray(cats) && cats.length > 0) {
                    this.categories = cats;
                    this.useApiCategories = true;
                    this.selectedCategoryId = null;
                } else {
                    this.categories = [];
                    this.useApiCategories = false;
                }
                this.loadBlogs();
            },
            error: () => {
                this.categories = [];
                this.useApiCategories = false;
                this.loadBlogs();
            }
        });
    }

    private loadBlogs(): void {
        this.isLoading = true;
        const filters: { published?: boolean; categoryId?: number } = { published: true };
        if (this.useApiCategories && this.selectedCategoryId != null) {
            filters.categoryId = this.selectedCategoryId;
        }

        this.contentService.getBlogs(filters).subscribe({
            next: (blogs) => {
                this.posts = blogs || [];
                this.page = 1;
                this.isLoading = false;
                this.updateSeo();
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Error loading blogs:', error);
                this.isLoading = false;
                this.updateSeo();
                this.cdr.detectChanges();
            }
        });
    }

    selectPost(post: BlogPost) {
        this.selectedPost = post;
        window.scrollTo(0, 0);

        if (post.slug) {
            this.router.navigate(['/blogs', post.slug]);
        }
    }

    deselectPost() {
        this.selectedPost = null;
        this.isDetailLoading = false;
        window.scrollTo(0, 0);
        this.router.navigate(['/blogs']);
    }

    private loadSelectedPostBySlug(slug: string, fallbackPost: BlogPost | null = null): void {
        this.isDetailLoading = true;

        if (fallbackPost) {
            this.selectedPost = fallbackPost;
        }

        this.contentService.getBlogBySlug(slug).pipe(
            finalize(() => {
                this.isDetailLoading = false;
                this.updateSeo();
                this.cdr.detectChanges();
            })
        ).subscribe({
            next: (blog) => {
                if (blog) {
                    this.selectedPost = {
                        ...(fallbackPost ?? {}),
                        ...blog,
                        image: blog.image || fallbackPost?.image || '/image/blog-placeholder.png',
                        description: blog.description || fallbackPost?.description || '',
                        content: blog.content || fallbackPost?.content || ''
                    };
                } else if (!fallbackPost) {
                    this.selectedPost = null;
                }
            },
            error: (error) => {
                console.error('Error loading blog detail:', error);
                if (!fallbackPost) {
                    this.selectedPost = null;
                }
            }
        });
    }

    get latestPosts() {
        return this.posts.filter(p => p.id !== this.selectedPost?.id).slice(0, 3);
    }

    get displayCategories(): { id: number | null; name: string }[] {
        if (this.useApiCategories && this.categories.length > 0) {
            return [{ id: null, name: 'All' }, ...this.categories];
        }
        return [{ id: null, name: 'All' }];
    }

    get showCarouselArrows(): boolean {
        return this.displayCategories.length > 4;
    }

    setFilterByCategoryId(categoryId: number | null): void {
        this.selectedCategoryId = categoryId;
        this.page = 1;
        this.loadBlogs();
    }

    setFilter(cat: { id: number | null; name: string }): void {
        if (this.useApiCategories) {
            this.setFilterByCategoryId(cat.id);
        }
    }

    isFilterActive(cat: { id: number | null; name: string }): boolean {
        if (this.useApiCategories) {
            return this.selectedCategoryId === cat.id;
        }
        return true;
    }

    scrollCarousel(direction: 'left' | 'right'): void {
        const el = this.categoryCarouselRef?.nativeElement;
        if (!el) return;
        const scrollAmount = 200;
        el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }

    getBlogCategoryName(blog: BlogPost): string {
        if (blog.category) return blog.category;
        if (blog.categoryId != null && this.useApiCategories) {
            const cat = this.categories.find(c => c.id === blog.categoryId);
            return cat?.name ?? '';
        }
        return '';
    }
}
