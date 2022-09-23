import { RefObject } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import { ContainerStyled } from './Input.styles';

type InputProps = TextInputProps & {
  inputRef?: RefObject<TextInput>;
};

export function Input({ inputRef, ...rest }: InputProps) {
  const { COLORS } = useTheme();

  return (
    <ContainerStyled
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  );
}
