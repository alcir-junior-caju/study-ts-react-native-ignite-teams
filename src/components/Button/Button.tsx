import { TouchableOpacityProps } from 'react-native';

import {
  ButtonTypeStyleProps,
  ContainerStyled,
  TextStyled
} from './Button.styles';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  type?: ButtonTypeStyleProps;
};

export function Button({ title, type = 'PRIMARY', ...rest }: ButtonProps) {
  return (
    <ContainerStyled type={type} {...rest}>
      <TextStyled>{title}</TextStyled>
    </ContainerStyled>
  );
}
