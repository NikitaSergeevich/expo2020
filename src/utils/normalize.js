import { Dimensions, Platform, PixelRatio, StyleSheet } from 'react-native';

// platform constant
export const IS_IOS = Platform.OS === 'ios';
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const isIphone5 = () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (SCREEN_HEIGHT <= 568 || SCREEN_WIDTH <= 320);

const HEIGHT_PROP = [
  'height',
  'marginVertical',
  'marginTop',
  'marginBottom',
  'paddingVertical',
  'paddingTop',
  'paddingBottom',
  'minHeight'
];

const WIDTH_PROP = [
  'width',
  'marginHorizontal',
  'marginLeft',
  'marginRight',
  'paddingHorizontal',
  'paddingLeft',
  'paddingRight',
  'fontSize'
];

// based on design scale
export const TARGET_WIDTH = 375;

const TARGET_HEIGHT = 667;

export const scale = (value, param) => {
  let newSize = 1;
  if (param === 'width') {
    newSize = (SCREEN_WIDTH / TARGET_WIDTH) * value;
  } else if (param === 'height') {
    newSize = (SCREEN_HEIGHT / TARGET_HEIGHT) * value;
  }
  if (IS_IOS) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const transformStyle = styles => {
  const newStyles = { ...styles };
  for (const style in styles) {
    let innerStyle = styles[style];
    const newInnerStyle = { ...innerStyle };
    for (const property in innerStyle) {
      if (!style.includes('circle')) {
        if (typeof innerStyle[property] === 'number') {
          if (WIDTH_PROP.includes(property)) {
            newInnerStyle[property] = scale(innerStyle[property], 'width');
            newStyles[style] = newInnerStyle;
          } else if (HEIGHT_PROP.includes(property)) {
            newInnerStyle[property] = scale(innerStyle[property], 'height');
            newStyles[style] = newInnerStyle;
          } else if (property.includes('_u')) {
            const validPropertyName = property.slice(2, property.length);
            delete newInnerStyle[property];
            newInnerStyle[validPropertyName] = innerStyle[property];
            newStyles[style] = newInnerStyle;
          }
        }
      }
    }
  }
  return newStyles;
};

export const createStyle = styles => {
  const transformedStyle = transformStyle(styles);
  return StyleSheet.create(transformedStyle);
};
