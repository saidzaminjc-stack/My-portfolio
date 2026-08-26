import { SeoSettings, SiteProfile, Project } from '../types';

export function injectStructuredData(profile: SiteProfile, seo: SeoSettings, projects: Project[]) {
  const existingScript = document.getElementById('jsonld-structured-data');
  if (existingScript) {
    existingScript.remove();
  }

  const baseUrl = seo.canonicalUrl || 'https://riveradev.com';

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": profile.name,
        "jobTitle": seo.personSchemaJobTitle || profile.title,
        "description": profile.bio,
        "url": baseUrl,
        "image": profile.avatarUrl,
        "email": profile.email,
        "telephone": profile.phone,
        "sameAs": [
          profile.githubUrl,
          profile.linkedinUrl,
          profile.twitterUrl
        ].filter(Boolean),
        "knowsAbout": [
          "Web Development",
          "React.js",
          "Next.js",
          "TypeScript",
          "E-Commerce",
          "WordPress",
          "UI/UX Design",
          "Search Engine Optimization (SEO)"
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": `${baseUrl}/#service`,
        "name": `${profile.name} - Web Development & Digital Solutions`,
        "url": baseUrl,
        "logo": profile.avatarUrl,
        "image": seo.ogImage,
        "description": seo.metaDescription,
        "priceRange": "$$$",
        "areaServed": seo.serviceSchemaAreaServed || "Worldwide",
        "telephone": profile.phone,
        "founder": {
          "@id": `${baseUrl}/#person`
        }
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": seo.siteTitle,
        "description": seo.metaDescription,
        "publisher": {
          "@id": `${baseUrl}/#person`
        }
      }
    ]
  };

  const script = document.createElement('script');
  script.id = 'jsonld-structured-data';
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schemaData);
  document.head.appendChild(script);

  // Update title & basic meta tags
  document.title = seo.siteTitle;
  updateMeta('description', seo.metaDescription);
  updateMeta('keywords', seo.keywords.join(', '));
  updateMeta('og:title', seo.siteTitle, 'property');
  updateMeta('og:description', seo.metaDescription, 'property');
  updateMeta('og:image', seo.ogImage, 'property');
  updateMeta('og:url', baseUrl, 'property');
}

function updateMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  if (!content) return;
  let element = document.querySelector(`meta[${attr}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}
