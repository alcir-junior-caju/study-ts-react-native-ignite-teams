import { TouchableOpacityProps } from 'react-native';

import {
  ContainerStyled,
  FilterStyleProps,
  TitleStyled
} from './Filter.styles';

type FilterProps = TouchableOpacityProps &
  FilterStyleProps & {
    title: string;
  };

export function Filter({ title, isActive = false, ...rest }: FilterProps) {
  return (
    <ContainerStyled isActive={isActive} {...rest}>
      <TitleStyled>{title}</TitleStyled>
    </ContainerStyled>
  );
}
