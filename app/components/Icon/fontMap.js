const IconFontJson = require('../../assets/font/iconfont.json');

const IconFontMap = IconFontJson.glyphs.reduce((result, currentItem) => {
  return {
    ...result,
    [currentItem.name]: currentItem.unicode_decimal,
  };
}, {});

export default (name) => String.fromCharCode(IconFontMap[name]);
