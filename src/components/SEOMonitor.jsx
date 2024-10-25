import React, { useEffect, useState } from 'react';
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
    brokenLinks: []
  });

  useEffect(() => {
    // Monitor Core Web Vitals
    reportWebVitals((metric) => {
      setMetrics(prev => ({
        ...prev,
        [metric.name.toLowerCase()]: metric.value
      }));
    });

    // Check load times
    const loadMetrics = monitorLoadTime();
    setMetrics(prev => ({
      ...prev,
      loadTime: loadMetrics.totalLoadTime
    }));

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
  }, []);

  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>SEO Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <h3 className="font-semibold">Core Web Vitals</h3>
              <p>CLS: {metrics.cls.toFixed(3)}</p>
              <p>FID: {metrics.fid.toFixed(1)}ms</p>
              <p>LCP: {metrics.lcp.toFixed(1)}ms</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Load Time</h3>
              <p>{(metrics.loadTime / 1000).toFixed(2)}s</p>
            </div>

            {metrics.brokenLinks.length > 0 && (
              <Alert variant="destructive">
                <AlertTitle>Broken Links Detected</AlertTitle>
                <AlertDescription>
                  {metrics.brokenLinks.map((link, index) => (
                    <div key={index}>{link.url}</div>
                  ))}
                </AlertDescription>
              </Alert>
            )}

            {metrics.socialLinks.filter(link => !link.active).length > 0 && (
              <Alert>
                <AlertTitle>Inactive Social Links</AlertTitle>
                <AlertDescription>
                  {metrics.socialLinks
                    .filter(link => !link.active)
                    .map((link, index) => (
                      <div key={index}>{link.url}</div>
                    ))}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOMonitor;