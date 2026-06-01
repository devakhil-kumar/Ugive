import React from 'react';
import { TextInput as RNTextInput, TextInputProps } from 'react-native';

const AppTextInput = React.forwardRef(({ children, style, ...props }, ref) => (
  <RNTextInput ref={ref} maxFontSizeMultiplier={1} style={style} {...props} />
));

AppTextInput.displayName = 'AppTextInput';

export default AppTextInput;