import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { reportWebVitals, checkSocialLinks, monitorLoadTime, checkBrokenLinks } from '../utils/seoMonitor';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const SEOMonitor = () => {
  const [metrics, setMetrics] = useState({
    cls: 0,
    fid: 0,
    lcp: 0,
    loadTime: 0,
    socialLinks: [],
    brokenLinks: [],
    performance: {
      mobile: 0,
      desktop: 0
    }
  });

  useEffect(() => {
    // Monitor Core Web Vitals
    reportWebVitals((metric) => {
      setMetrics(prev => ({
        ...prev,
        [metric.name.toLowerCase()]: metric.value
      }));

      // Alert if metrics exceed thresholds
      if (metric.name === 'LCP' && metric.value > 2500) {
        toast.warning("Largest Contentful Paint is high. Consider optimizing images and critical resources.");
      }
      if (metric.name === 'FID' && metric.value > 100) {
        toast.warning("First Input Delay is high. Review JavaScript execution time.");
      }
      if (metric.name === 'CLS' && metric.value > 0.1) {
        toast.warning("Cumulative Layout Shift detected. Check for unstable elements.");
      }
    });

    // Check load times
    const loadMetrics = monitorLoadTime();
    setMetrics(prev => ({
      ...prev,
      loadTime: loadMetrics.totalLoadTime
    }));

    if (loadMetrics.totalLoadTime > 3000) {
      toast.warning("Page load time exceeds 3 seconds. Consider performance optimizations.");
    }

    // Monitor social links
    checkSocialLinks().then(results => {
      setMetrics(prev => ({
        ...prev,
        socialLinks: results
      }));

      const inactiveLinks = results.filter(link => !link.active);
      if (inactiveLinks.length > 0) {
        toast.warning("Some social media links are inactive!");
      }
    });

    // Check for broken links
    checkBrokenLinks().then(results => {
      setMetrics(prev => ({
        ...prev,
        brokenLinks: results.filter(link => !link.working)
      }));

      if (results.some(link => !link.working)) {
        toast.error("Broken links detected on the website!");
      }
    });

    // Add structured data for local business
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BeautySalon",
      "name": "Henna by Fathima",
      "image": "https://i.postimg.cc/T3N2Cfkz/image.png",
      "description": "Premium bridal henna services and organic henna products in India",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN",
        "addressRegion": "Kerala"
      },
      "priceRange": "₹₹₹",
      "telephone": "+918086647124"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <motion.div 
      className="space-y-4 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>SEO Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <h3 className="font-semibold">Core Web Vitals</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">CLS</p>
                  <p className="text-lg font-bold text-green-800">{metrics.cls.toFixed(3)}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">FID</p>
                  <p className="text-lg font-bold text-green-800">{metrics.fid.toFixed(1)}ms</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">LCP</p>
                  <p className="text-lg font-bold text-green-800">{metrics.lcp.toFixed(1)}ms</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg">
              <h3 className="font-semibold">Load Time</h3>
              <p className="text-lg font-bold text-green-800">{(metrics.loadTime / 1000).toFixed(2)}s</p>
            </div>

            {metrics.brokenLinks.length > 0 && (
              <Alert variant="destructive">
                <AlertTitle>Broken Links Detected</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-4">
                    {metrics.brokenLinks.map((link, index) => (
                      <li key={index} className="text-sm">{link.url}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {metrics.socialLinks.filter(link => !link.active).length > 0 && (
              <Alert>
                <AlertTitle>Inactive Social Links</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-4">
                    {metrics.socialLinks
                      .filter(link => !link.active)
                      .map((link, index) => (
                        <li key={index} className="text-sm">{link.url}</li>
                      ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SEOMonitor;