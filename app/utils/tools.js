import {Dimensions} from 'react-native';

const screenSize = {
  screenWidth: Math.round(Dimensions.get('window').width),
  screenHeight: Math.round(Dimensions.get('window').height),
};

function throttle(fn, delay) {
  let t = null,
    beginDate = new Date().getTime();

  return function () {
    // eslint-disable-next-line consistent-this
    let _self = this,
      args = arguments,
      currentDate = new Date().getTime();

    t && clearTimeout(t);

    if (currentDate - beginDate >= delay) {
      fn.apply(_self, args);
      beginDate = currentDate;
    } else {
      t = setTimeout(function () {
        fn.apply(_self, args);
      }, delay);
    }
  };
}

export {screenSize, throttle};
