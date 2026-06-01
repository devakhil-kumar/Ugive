import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

const AppText = React.forwardRef(({ children, style, ...props }, ref) => (
  <RNText ref={ref} allowFontScaling={false} style={style} {...props}>
    {children}
  </RNText>
));

AppText.displayName = 'AppText';

export default AppText;