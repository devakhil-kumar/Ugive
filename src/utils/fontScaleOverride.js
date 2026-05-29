import React from 'react';
import { Text, TextInput } from 'react-native';

const OriginalText = Text.render ?? Text;
const OriginalTextInput = TextInput.render ?? TextInput;

const PatchedText = React.forwardRef((props, ref) => (
  <OriginalText maxFontSizeMultiplier={1} {...props} ref={ref} />
));

const PatchedTextInput = React.forwardRef((props, ref) => (
  <OriginalTextInput maxFontSizeMultiplier={1} {...props} ref={ref} />
));

Text.render = PatchedText.render;
TextInput.render = PatchedTextInput.render;
