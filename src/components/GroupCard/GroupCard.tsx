import { TouchableOpacityProps } from 'react-native';

import {
  ContainerStyled,
  TitleStyled,
  UsersThreeStyled
} from './GroupCard.styles';

type GroupCardProps = TouchableOpacityProps & {
  title: string;
};

export function GroupCard({ title, ...rest }: GroupCardProps) {
  return (
    <ContainerStyled {...rest}>
      <UsersThreeStyled />
      <TitleStyled>{title}</TitleStyled>
    </ContainerStyled>
  );
}
