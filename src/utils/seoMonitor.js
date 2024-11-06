import { onCLS, onFID, onLCP } from 'web-vitals';

// Track Core Web Vitals
export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onLCP(onPerfEntry);
  }
};

// Track last content update
export const trackContentUpdate = () => {
  const lastUpdate = new Date().toISOString();
  localStorage.setItem('lastContentUpdate', lastUpdate);
  
  // Send to analytics if available
  if (window.gtag) {
    window.gtag('event', 'content_update', {
      'event_category': 'Content',
      'event_label': 'Content Updated',
      'value': lastUpdate
    });
  }
};

// Monitor social media links
export const checkSocialLinks = async () => {
  const socialLinks = [
    'https://www.instagram.com/hennabyfathima__/',
    'https://www.facebook.com/FathimaShamsudheen001',
    'https://www.linkedin.com/company/henna-by-fathima/',
    'https://youtu.be/qUKTRihRkkc'
  ];

  return Promise.all(
    socialLinks.map(async url => {
      try {
        const response = await fetch(url, { 
          method: 'HEAD',
          mode: 'no-cors' // Added to handle CORS issues
        });
        return {
          url,
          status: response.status,
          active: true // If we get here, the link is accessible
        };
      } catch (error) {
        console.warn(`Failed to check ${url}:`, error);
        return {
          url,
          status: 'error',
          active: false
        };
      }
    })
  );
};

// Check for broken links
export const checkBrokenLinks = async () => {
  const links = Array.from(document.getElementsByTagName('a'));
  const results = [];

  for (const link of links) {
    try {
      const url = new URL(link.href);
      // Only check internal links and external links that we control
      if (url.hostname === window.location.hostname || 
          url.hostname.includes('hennabyfathima.com')) {
        const response = await fetch(link.href, { 
          method: 'HEAD',
          mode: 'no-cors'
        });
        results.push({
          url: link.href,
          status: response.status,
          working: response.ok
        });
      }
    } catch (error) {
      console.warn(`Failed to check ${link.href}:`, error);
      results.push({
        url: link.href,
        status: 'error',
        working: false
      });
    }
  }

  return results;
};

// Monitor load times
export const monitorLoadTime = () => {
  const timing = window.performance.timing;
  const loadTime = timing.loadEventEnd - timing.navigationStart;
  const domLoadTime = timing.domContentLoadedEventEnd - timing.navigationStart;
  const firstPaint = performance.getEntriesByType('paint')[0]?.startTime || 0;

  return {
    totalLoadTime: loadTime,
    domLoadTime: domLoadTime,
    firstPaint: firstPaint,
    timestamp: new Date().toISOString()
  };
};

// Generate sitemap
export const generateSitemap = () => {
  const pages = [
    '/',
    '/about',
    '/services',
    '/shop',
    '/workshop',
    '/contact'
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map(page => `
        <url>
          <loc>https://hennabyfathima.com${page}</loc>
          <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>${page === '/' ? '1.0' : '0.8'}</priority>
        </url>
      `).join('')}
    </urlset>`;

  return sitemap;
};