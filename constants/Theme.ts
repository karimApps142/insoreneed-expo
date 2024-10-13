import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const CONTENT_SPACING = 15;


export const COLORS = {
  background: '#e4ebf7',
  primary: '#1c25a6',
  primary_second: '#525969',
  bg_Color: '#FCFCFC',
  primary_third: '#FEB700',
  blue: '#00A3FF',
  secondary: '#ffffff',
  black: '#1E1F20',
  white: '#FFFFFF',
  lightGray: '#EFF2F5',
  gray: '#8B9097',
  borderColor: '#D4D4D4',
  error: 'red',
  success: 'green',
  pending: '#FFD700',
  approved: '#4CAF50',
  rejected: '#F44336',
};



export const SIZES = {
  // global sizes
  base: 10,
  font: 14,
  radius: 12,
  padding: 24,
  tabSize: 60,

  headerHeight: 300,

  //font sizezs
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,

  //app diementions
  width,
  height,
};

export const FONTS = {
  h1: {
    fontSize: SIZES.h1,
    fontFamily: Platform.select({
      ios: 'Jost-Bold',
      android: 'Jost-Bold',
    }),
    lineHeight: 45,
  },
  enH2: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: Platform.select({
      ios: 'Jost-Bold',
      android: 'Jost-Bold',
    }),
  },
  h2: {
    fontSize: SIZES.h2,
    lineHeight: 30,
    fontFamily: Platform.select({
      ios: 'Jost-Bold',
      android: 'Jost-Bold',
    }),
  },
  h3: {
    fontSize: SIZES.h3,
    lineHeight: 28,
    fontFamily: Platform.select({
      ios: 'Jost-Bold',
      android: 'Jost-Bold',
    }),
  },
  h4: {
    fontSize: SIZES.h4,
    lineHeight: 22,
    fontFamily: Platform.select({
      ios: 'Jost-SemiBold',
      android: 'Jost-SemiBold',
    }),
  },

  body1: {
    fontSize: SIZES.body1,
    lineHeight: 36,
    fontFamily: Platform.select({
      ios: 'Jost-SemiBold',
      android: 'Jost-SemiBold',
    }),
  },
  body2: {
    fontSize: SIZES.body2,
    lineHeight: 30,
    fontFamily: Platform.select({
      ios: 'Jost-SemiBold',
      android: 'Jost-SemiBold',
    }),
  },
  body3: {
    fontSize: SIZES.body3,
    lineHeight: 22,
    fontFamily: Platform.select({
      ios: 'Jost-Regular',
      android: 'Jost-Regular',
    }),
  },
  enBody4: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Platform.select({
      ios: 'Jost-Regular',
      android: 'Jost-Regular',
    }),
  },
  body4: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: Platform.select({
      ios: 'Jost-Regular',
      android: 'Jost-Regular',
    }),
  },
  body5: {
    fontSize: SIZES.body4,
    lineHeight: 22,
    fontFamily: Platform.select({
      ios: 'Jost-Regular',
      android: 'Jost-Regular',
    }),
  },
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;