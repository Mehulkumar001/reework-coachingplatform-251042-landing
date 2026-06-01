import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class SeoService {

    constructor(
        private titleService: Title,
        private metaService: Meta,
        @Inject(DOCUMENT) private doc: Document
    ) { }

    updateSeo(data: {
        title: string,
        description?: string,
        canonical?: string,
        robots?: string,
        keywords?: string,
        ogTitle?: string,
        ogDescription?: string,
        ogImage?: string,
        ogUrl?: string,
        ogType?: string,
        twitterCard?: string,
        twitterTitle?: string,
        twitterDescription?: string,
        twitterImage?: string,
        jsonLd?: any
    }) {
        if (data.title) {
            this.titleService.setTitle(data.title);
        }

        if (data.description) {
            this.updateTag('name="description"', { name: 'description', content: data.description });
        }

        if (data.robots) {
            this.updateTag('name="robots"', { name: 'robots', content: data.robots });
        }

        if (data.keywords) {
            this.updateTag('name="keywords"', { name: 'keywords', content: data.keywords });
        }

        // OpenGraph
        if (data.ogTitle) this.updateTag('property="og:title"', { property: 'og:title', content: data.ogTitle });
        if (data.ogDescription) this.updateTag('property="og:description"', { property: 'og:description', content: data.ogDescription });
        if (data.ogImage) this.updateTag('property="og:image"', { property: 'og:image', content: data.ogImage });
        if (data.ogUrl) this.updateTag('property="og:url"', { property: 'og:url', content: data.ogUrl });
        if (data.ogType) this.updateTag('property="og:type"', { property: 'og:type', content: data.ogType || 'website' });

        // Twitter
        if (data.twitterCard) this.updateTag('name="twitter:card"', { name: 'twitter:card', content: data.twitterCard || 'summary_large_image' });
        if (data.twitterTitle) this.updateTag('name="twitter:title"', { name: 'twitter:title', content: data.twitterTitle });
        if (data.twitterDescription) this.updateTag('name="twitter:description"', { name: 'twitter:description', content: data.twitterDescription });
        if (data.twitterImage) this.updateTag('name="twitter:image"', { name: 'twitter:image', content: data.twitterImage });

        if (data.canonical) {
            this.createLinkForCanonicalURL(data.canonical);
        }

        if (data.jsonLd) {
            this.setJsonLd(data.jsonLd);
        }
    }

    private updateTag(selector: string, tag: { name?: string, property?: string, content: string }) {
        if (!this.metaService.getTag(selector)) {
            this.metaService.addTag(tag);
        } else {
            this.metaService.updateTag(tag, selector);
        }
    }

    private setJsonLd(data: any) {
        let script = this.doc.getElementById('reecoach-jsonld') as HTMLScriptElement;
        if (script) {
            script.text = JSON.stringify(data);
        } else {
            script = this.doc.createElement('script');
            script.id = 'reecoach-jsonld';
            script.type = 'application/ld+json';
            script.text = JSON.stringify(data);
            this.doc.head.appendChild(script);
        }
    }

    private createLinkForCanonicalURL(url: string) {
        let link: HTMLLinkElement = this.doc.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (link) {
            link.setAttribute('href', url);
        } else {
            link = this.doc.createElement('link');
            link.setAttribute('rel', 'canonical');
            link.setAttribute('href', url);
            this.doc.head.appendChild(link);
        }
    }
}
