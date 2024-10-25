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
export const checkSocialLinks = () => {
  const socialLinks = [
    'https://www.instagram.com/hennabyfathima__/',
    'https://www.facebook.com/FathimaShamsudheen001',
    'https://www.linkedin.com/company/henna-by-fathima/',
    'https://youtu.be/qUKTRihRkkc'
  ];

  return Promise.all(
    socialLinks.map(url =>
      fetch(url, { method: 'HEAD' })
        .then(response => ({
          url,
          status: response.status,
          active: response.ok
        }))
        .catch(() => ({
          url,
          status: 'error',
          active: false
        }))
    )
  );
};

// Check for broken links
export const checkBrokenLinks = async () => {
  const links = document.getElementsByTagName('a');
  const results = [];

  for (let link of links) {
    try {
      const response = await fetch(link.href, { method: 'HEAD' });
      results.push({
        url: link.href,
        status: response.status,
        working: response.ok
      });
    } catch (error) {
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
  return {
    totalLoadTime: timing.loadEventEnd - timing.navigationStart,
    domLoadTime: timing.domContentLoadedEventEnd - timing.navigationStart,
    firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
  };
};