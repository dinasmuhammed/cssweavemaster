export const getOptimizedImageUrl = (url, width = 800) => {
  // If it's already an optimized URL, return as is
  if (url.includes('format=webp')) {
    return url;
  }

  // For postimg.cc images
  if (url.includes('postimg.cc')) {
    return `${url}?format=webp&w=${width}`;
  }

  // For ibb.co images
  if (url.includes('ibb.co')) {
    return `${url}?format=webp&w=${width}`;
  }

  // Return original URL if no optimization is possible
  return url;
};

export const preloadImage = (url) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = getOptimizedImageUrl(url);
  document.head.appendChild(link);
};

export const preloadCriticalImages = () => {
  const criticalImages = [
    'https://i.postimg.cc/T3N2Cfkz/image.png', // Logo
    'https://i.postimg.cc/wBxJsq1n/image.png', // About section image
  ];

  criticalImages.forEach(preloadImage);
};