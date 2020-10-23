module.exports = (function () {
    let prevFrames = [];
    let offsetMs = 100;
  
    return function (data, api) {
        let {width, height} = api.getDimensions();
        let currentTime = api.getTime();
  
        const length = width * height;
  
        prevFrames.push({
            time: currentTime,
            data,
        });
  
        function getFrameFor(offset) {
            for (let i = prevFrames.length - 1; i > 0; i--) {
                if (currentTime - prevFrames[i].time >= offset) {
                    return prevFrames[i].data;
                }
            }
        }
        
        const arrayLength = length * 4;
        const red = getFrameFor(0);
        const green = getFrameFor(offsetMs);
        const blue = getFrameFor(2 * offsetMs);
  
        if (!blue) {
            return Uint8ClampedArray.from(data);
        }
  
        const res = new Uint8ClampedArray(data.length);
  
        for (let index = 0; index < arrayLength; index += 4) {
            res[index    ] = red  [index];
            res[index + 1] = green[index + 1];
            res[index + 2] = blue [index + 2];
            res[index + 3] = 255;
        }
  
        return Promise.resolve(res);
    };
  })();
  