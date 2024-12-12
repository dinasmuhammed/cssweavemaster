const FALLBACK_WIDTH = 800;
const MOBILE_BREAKPOINT = 640;

export const getOptimizedImageUrl = (url, width = FALLBACK_WIDTH) => {
  try {
    // If it's already an optimized URL, return as is
    if (url.includes('format=webp')) {
      return url;
    }

    // Determine if we're on mobile
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    const targetWidth = isMobile ? Math.min(width, window.innerWidth) : width;

    // For postimg.cc images
    if (url.includes('postimg.cc')) {
      return `${url}?format=webp&w=${targetWidth}&quality=${isMobile ? 75 : 90}`;
    }

    // For ibb.co images
    if (url.includes('ibb.co')) {
      return `${url}?format=webp&w=${targetWidth}&quality=${isMobile ? 75 : 90}`;
    }

    // Return original URL if no optimization is possible
    return url;
  } catch (error) {
    console.warn('Image optimization failed:', error);
    return url;
  }
};

export const preloadImage = (url) => {
  if (typeof window === 'undefined') return; // Skip during SSR

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = getOptimizedImageUrl(url);
  
  // Only preload if the user's connection is fast enough
  if (navigator.connection) {
    const { effectiveType } = navigator.connection;
    if (['4g', '3g'].includes(effectiveType)) {
      document.head.appendChild(link);
    }
  } else {
    document.head.appendChild(link);
  }
};

export const preloadCriticalImages = () => {
  const criticalImages = [
    'https://i.postimg.cc/T3N2Cfkz/image.png', // Logo
    'https://i.postimg.cc/wBxJsq1n/image.png', // About section image
  ];

  // Use Intersection Observer to lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          preloadImage(entry.target.dataset.src);
          observer.unobserve(entry.target);
        }
      });
    });

    criticalImages.forEach(url => {
      const img = document.createElement('img');
      img.dataset.src = url;
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support Intersection Observer
    criticalImages.forEach(preloadImage);
  }
};

// New utility function for responsive images
export const getResponsiveImageSizes = (baseWidth = FALLBACK_WIDTH) => {
  return {
    small: Math.round(baseWidth * 0.25),
    medium: Math.round(baseWidth * 0.5),
    large: baseWidth,
    xl: Math.round(baseWidth * 1.5),
  };
};