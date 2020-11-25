import {Dimensions} from 'react-native';

const screenSize = {
  screenWidth: Math.round(Dimensions.get('window').width),
  screenHeight: Math.round(Dimensions.get('window').height),
};

export {screenSize};
