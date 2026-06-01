import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export enum WebsiteType {
  REEWORK = 'REEWORK',
  REECOACH = 'REECOACH',
  SHARED = 'SHARED'
}

export enum PageType {
  ABOUT_US = 'ABOUT_US',
  CONTACT_US = 'CONTACT_US',
  BLOGS = 'BLOGS',
  CAREERS = 'CAREERS',
  OPEN_POSITIONS = 'OPEN_POSITIONS'
}

export enum ContentType {
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  TERMS_CONDITIONS = 'TERMS_CONDITIONS',
  REFUND_CANCELLATION = 'REFUND_CANCELLATION',
  SHIPPING_POLICY = 'SHIPPING_POLICY'
}

export interface StaticContent {
  id: number;
  websiteType: string;
  contentType: string;
  title: string;
  content: string;
  slug: string;
  metaTitle?: string;
  metaKeywords?: string[];
}

export interface StaticContentResponse {
  isSuccess: boolean;
  message: string;
  data: StaticContent;
  statusCode: number;
  totalCount?: number;
  page?: number;
  pageSize?: number;
}

export interface LandingWebsiteContent {
  id?: number;
  websiteType: WebsiteType;
  pageType: PageType;
  sectionType: string;
  content: any;
  order: number;
  isActive: boolean;
}

export interface BlogPost {
  id?: number;
  websiteType: WebsiteType;
  title: string;
  slug: string;
  categoryId?: number;
  category: string;
  author: string;
  authorImage?: string;
  date: string;
  readTime: string;
  image: string;
  description: string;
  content: string;
  references?: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  tags?: string[];
  isPublished: boolean;
}

export interface BlogCategory {
  id: number;
  name: string;
  isActive: boolean;
}

interface BlogListResponseDto {
  id: number;
  title: string;
  slug: string;
  websiteType: string;
  thumbnailUrl?: string;
  authorName: string;
  authorImage?: string;
  categoryId: number;
  categoryName?: string;
  createdAt?: string;
  isActive: boolean;
  // Short text for cards (backend-computed from Description)
  summary?: string | null;
}

interface BlogResponseDto {
  id: number;
  title: string;
  slug: string;
  websiteType: string;
  description: string;
  thumbnailUrl?: string;
  bannerUrl?: string;
  authorName: string;
  authorImage?: string;
  categoryId: number;
  categoryName?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  tags?: string[];
  isActive: boolean;
  expiryAt?: string | null;
  createdAt?: string;
}

interface BlogDetailWithSuggestionsDto {
  blog: BlogResponseDto;
  relatedBlogs: BlogListResponseDto[];
  youMayAlsoLike: BlogListResponseDto[];
}

export interface Testimonial {
  id: number;
  name: string;
  designation?: string;
  companyName?: string;
  message: string;
  profileImageUrl?: string;
  websiteType: string;
  rating: number;
  sortOrder: number;
  isFeatured: boolean;
  isActive: boolean;
  yearsOfExperience?: number;
}

export interface TestimonialsApiResponse {
  isSuccess: boolean;
  message: string;
  data: Testimonial[];
  statusCode: number;
  totalCount?: number;
  page?: number;
  pageSize?: number;
}

export interface Career {
  id: number;
  title: string;
  department?: string;
  location?: string;
  employmentType?: string;
  experienceRequired?: string;
  description?: string;
  responsibilities?: string;
  requirements?: string;
  websiteType: string;
  isFeatured: boolean;
  isActive: boolean;
  expiryDate?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LandingContentService {
  // Backend base URL: environment.apiUrl (dev: /api for proxy; prod: full URL)
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Legacy: LandingWebsiteContent/GetContent API does not exist in backend.
   * Returns empty array; components use fallback data (FAQs, contact info, etc.).
   */
  getContent(_pageType: PageType): Observable<LandingWebsiteContent[]> {
    return of([]);
  }

  getBlogs(filters?: { category?: string; categoryId?: number; published?: boolean }): Observable<BlogPost[]> {
    let params = new HttpParams()
      .set('websiteType', WebsiteType.REECOACH)
      .set('page', '1')
      .set('pageSize', '100');

    if (filters?.categoryId != null) {
      params = params.set('categoryId', String(filters.categoryId));
    }

    // Helper to strip any HTML tags from summary/description so cards show clean text
    const stripHtml = (value?: string | null): string =>
      value ? String(value).replace(/<[^>]+>/g, '').trim() : '';

    // Simple estimated read time based on word count (approx 200 wpm)
    const getReadTime = (text: string): string => {
      if (!text) return '';
      const words = text.trim().split(/\s+/).length;
      const minutes = Math.max(1, Math.round(words / 200));
      return `${minutes} min read`;
    };

    return this.http.get(`${this.apiUrl}/blogs`, { params, responseType: 'json' }).pipe(
      map((response: unknown) => {
        const r = response as Record<string, unknown> | null;
        const data = (r?.['data'] ?? (r as any)?.Data) as unknown;

        // Backend may return either ApiResponse<List<BlogListResponse>>
        // or a bare array. Support both shapes.
        let list: BlogListResponseDto[] = [];
        if (Array.isArray(data)) {
          list = data as BlogListResponseDto[];
        } else if (Array.isArray(response)) {
          list = response as BlogListResponseDto[];
        }

        const mapped = list.map(dto => {
          const created = dto.createdAt ? String(dto.createdAt) : '';
          const plainSummary = stripHtml(dto.summary) || '';
          // Try to get category name from dto.categoryName, fallback to empty string if not present
          const categoryName = (dto as any).categoryName || '';
          // Map authorImage from backend if present
          const authorImage = (dto as any).authorImage || undefined;
          return {
            id: dto.id,
            websiteType: (dto.websiteType as WebsiteType) ?? WebsiteType.REECOACH,
            title: dto.title ?? '',
            slug: dto.slug ?? '',
            categoryId: dto.categoryId,
            category: categoryName,
            author: dto.authorName ?? '',
            authorImage,
            date: created ? created.split('T')[0] : '',
            readTime: getReadTime(plainSummary || dto.title || ''),
            image: dto.thumbnailUrl || '/image/blog-placeholder.png',
            description: plainSummary,
            content: '',
            references: [],
            isPublished: dto.isActive ?? true,
          } as BlogPost;
        });

        // Optional category filter – relies on front-end metadata if ever added
        if (filters?.category) {
          return mapped.filter(b => b.category === filters.category);
        }
        return mapped;
      }),
      catchError(error => {
        console.error('Error fetching blogs:', error);
        return of([]);
      })
    );
  }

  /** Platform header value for web (backend expects 1 = Web). */
  private static readonly PLATFORM_WEB = '1';

  /**
   * Fetch public blog categories from GET /api/blog-categories.
   */
  getBlogCategories(): Observable<BlogCategory[]> {
    const params = new HttpParams()
      .set('isActive', 'true')
      .set('page', '1')
      .set('pageSize', '100');
    // For platform, you can just set it or omit if not required by backend.
    const url = `${this.apiUrl}/blog-categories`;
    return this.http.get(url, { params, responseType: 'json' }).pipe(
      map((response: unknown) => {
        const r = response as Record<string, unknown> | null;
        if (!r) return [];
        const arr = (r['data'] ?? r['Data']) as unknown;
        if (!Array.isArray(arr)) return [];
        const mapItem = (c: Record<string, unknown>) => ({
          id: (c['id'] ?? c['Id']) as number,
          name: ((c['name'] ?? c['Name']) as string) ?? '',
          isActive: (c['isActive'] ?? c['IsActive'] ?? true) as boolean
        });
        return arr.map((item: unknown) => mapItem((item as Record<string, unknown>) ?? {}));
      }),
      catchError(error => {
        console.error('Error fetching blog categories:', error);
        return of([]);
      })
    );
  }

  getBlogBySlug(slug: string): Observable<BlogPost | null> {
    const cleanSlug = (slug ?? '').trim();
    if (!cleanSlug) {
      return of(null);
    }

    const params = new HttpParams().set('websiteType', WebsiteType.REECOACH);
    const stripHtml = (value?: string | null): string =>
      value ? String(value).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
    const getReadTime = (text: string): string => {
      if (!text) return '';
      const words = text.trim().split(/\s+/).length;
      const minutes = Math.max(1, Math.round(words / 200));
      return `${minutes} min read`;
    };

    return this.http.get(`${this.apiUrl}/blogs/${encodeURIComponent(cleanSlug)}`, { params, responseType: 'json' }).pipe(
      map((response: unknown) => {
        const r = response as Record<string, unknown> | null;
        const data = (r?.['data'] ?? (r as any)?.Data) as BlogDetailWithSuggestionsDto | undefined;
        const dto = data?.blog ?? (data as any)?.Blog;
        if (!dto) return null;

        const fullContent = dto.description ?? '';
        const plainContent = stripHtml(fullContent);

        return {
          id: dto.id,
          websiteType: (dto.websiteType as WebsiteType) ?? WebsiteType.REECOACH,
          title: dto.title ?? '',
          slug: dto.slug ?? '',
          categoryId: dto.categoryId,
          category: dto.categoryName ?? '',
          author: dto.authorName ?? '',
          authorImage: dto.authorImage || undefined,
          date: dto.createdAt ? String(dto.createdAt).split('T')[0] : '',
          readTime: getReadTime(plainContent || dto.title || ''),
          image: dto.bannerUrl || dto.thumbnailUrl || '/image/blog-placeholder.png',
          description: plainContent,
          content: fullContent,
          references: dto.metaKeywords ?? [],
          metaTitle: dto.metaTitle,
          metaDescription: dto.metaDescription,
          metaKeywords: dto.metaKeywords ?? [],
          tags: dto.tags ?? [],
          isPublished: dto.isActive ?? true,
        } as BlogPost;
      }),
      catchError(error => {
        console.error('Error fetching blog:', error);
        return of(null);
      })
    );
  }

  getBlogById(id: number): Observable<BlogPost | null> {
    return this.http.get<BlogPost>(`${this.apiUrl}/BlogManagement/GetBlogById/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching blog:', error);
          return of(null);
        })
      );
  }

  submitContactEnquiry(enquiry: {
    name: string;
    email: string;
    phone?: string;
    country?: string;
    state?: string;
    city?: string;
    pincode?: string;
    query: string;
    websiteType?: WebsiteType;
  }): Observable<any> {
    // Backend Create API expects: name, email, phoneNumber (required), message, websiteType
    const rawPhone = (enquiry.phone ?? '').trim();
    let phoneNumber = rawPhone || 'N/A';
    let countryCode: string | undefined;

    const phoneMatch = rawPhone.match(/^(\+\d{1,4})(\d+)$/);
    if (phoneMatch) {
      countryCode = phoneMatch[1];
      phoneNumber = phoneMatch[2];
    }

    const payload = {
      name: enquiry.name,
      phoneNumber,
      countryCode,
      email: enquiry.email,
      country: enquiry.country,
      state: enquiry.state,
      city: enquiry.city,
      pincode: enquiry.pincode,
      message: enquiry.query,
      websiteType: enquiry.websiteType ?? WebsiteType.REECOACH
    };
    
    return this.http.post(`${this.apiUrl}/contact-enquiry`, payload)
      .pipe(
        catchError(error => {
          console.error('Error submitting enquiry:', error);
          throw error;
        })
      );
  }

  /**
   * Submit feedback from landing page.
   * POST /api/feedback - name, email, phoneNumber (optional), rating (1-5), message, websiteType
   */
  submitFeedback(feedback: {
    name: string;
    email: string;
    phone?: string;
    rating: number;
    message: string;
    websiteType?: WebsiteType;
  }): Observable<any> {
    const payload = {
      name: feedback.name,
      email: feedback.email,
      phoneNumber: (feedback.phone ?? '').trim() || undefined,
      rating: Math.max(1, Math.min(5, feedback.rating)),
      message: feedback.message,
      websiteType: feedback.websiteType ?? WebsiteType.REECOACH
    };
    return this.http.post(`${this.apiUrl}/feedback`, payload, { withCredentials: false }).pipe(
      catchError(error => {
        console.error('Error submitting feedback:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch static content by website type and content type
   * Public API - no auth required. Backend handles SHARED fallback.
   */
  getStaticContent(websiteType: WebsiteType, contentType: ContentType): Observable<StaticContent | null> {
    const url = `${this.apiUrl}/contents/${websiteType}/${contentType}`;

    return this.http.get<StaticContentResponse>(url).pipe(
      map(response =>
        response.isSuccess && response.data ? response.data : null
      ),
      catchError(error => {
        console.error('Error fetching static content:', error);
        return of(null);
      })
    );
  }

  /**
   * Fetch testimonials from public API.
   * GET /api/testimonials?websiteType=X&featured=Y&page=1&pageSize=100
   */
  getTestimonials(
    websiteType: WebsiteType,
    options?: { featured?: boolean; page?: number; pageSize?: number }
  ): Observable<Testimonial[]> {
    let params = new HttpParams()
      .set('websiteType', websiteType)
      .set('page', String(options?.page ?? 1))
      .set('pageSize', String(options?.pageSize ?? 100));
    if (options?.featured !== undefined) {
      params = params.set('featured', String(options.featured));
    }
    const url = `${this.apiUrl}/testimonials`;
    return this.http.get<TestimonialsApiResponse>(url, { params }).pipe(
      map(response => {
        const arr = (response as any)?.data ?? (response as any)?.Data;
        if (Array.isArray(arr)) return arr as Testimonial[];
        if (Array.isArray(response)) return response as Testimonial[];
        return [];
      }),
      catchError(error => {
        console.error('Error fetching testimonials:', error);
        return of([]);
      })
    );
  }

  /**
   * Fetch public career openings for a website.
   * GET /api/careers?websiteType=X&page=1&pageSize=100
   */
  getCareers(
    websiteType: WebsiteType,
    options?: { page?: number; pageSize?: number; featured?: boolean; location?: string; department?: string }
  ): Observable<Career[]> {
    let params = new HttpParams()
      .set('websiteType', websiteType)
      .set('page', String(options?.page ?? 1))
      .set('pageSize', String(options?.pageSize ?? 100));

    if (options?.featured !== undefined) {
      params = params.set('featured', String(options.featured));
    }
    if (options?.location) {
      params = params.set('location', options.location);
    }
    if (options?.department) {
      params = params.set('department', options.department);
    }

    const url = `${this.apiUrl}/careers`;
    return this.http.get(url, { params }).pipe(
      map((response: any) => {
        const arr = response?.data ?? response?.Data;
        if (Array.isArray(arr)) return arr as Career[];
        if (Array.isArray(response)) return response as Career[];
        return [];
      }),
      catchError(error => {
        console.error('Error fetching careers:', error);
        return of([]);
      })
    );
  }
}

