export const checkNetworkSpeed = () => {
  return new Promise((resolve, reject) => {
    // Use a smaller image for speed test
    const imageAddr = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Snake_River_%285mb%29.jpg/320px-Snake_River_%285mb%29.jpg";
    const downloadSize = 150000; // bytes (approximately)

    let startTime, endTime;
    const download = new Image();
    
    const timeout = setTimeout(() => {
      resolve(1); // Default to assuming decent connection after timeout
    }, 3000);

    download.onload = function () {
      clearTimeout(timeout);
      endTime = (new Date()).getTime();
      const duration = (endTime - startTime) / 1000;
      const bitsLoaded = downloadSize * 8;
      const speedBps = (bitsLoaded / duration).toFixed(2);
      const speedMbps = (speedBps / (1024 * 1024)).toFixed(2);
      resolve(speedMbps);
    };

    download.onerror = function () {
      clearTimeout(timeout);
      resolve(1); // Default to assuming decent connection on error
    };

    startTime = (new Date()).getTime();
    download.src = imageAddr;
  });
};