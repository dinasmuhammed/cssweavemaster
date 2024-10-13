export const checkNetworkSpeed = () => {
  return new Promise((resolve, reject) => {
    const imageAddr = "https://upload.wikimedia.org/wikipedia/commons/2/2d/Snake_River_%285mb%29.jpg";
    const downloadSize = 5245329; // bytes

    let startTime, endTime;
    const download = new Image();
    download.onload = function () {
      endTime = (new Date()).getTime();
      const duration = (endTime - startTime) / 1000;
      const bitsLoaded = downloadSize * 8;
      const speedBps = (bitsLoaded / duration).toFixed(2);
      const speedKbps = (speedBps / 1024).toFixed(2);
      const speedMbps = (speedKbps / 1024).toFixed(2);
      resolve(speedMbps);
    };
    download.onerror = function (err, msg) {
      reject('Invalid image, or error downloading');
    };
    startTime = (new Date()).getTime();
    download.src = imageAddr;
  });
};