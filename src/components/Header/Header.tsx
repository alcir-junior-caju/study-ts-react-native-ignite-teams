import logoImg from '@assets/logo.png';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

import {
  CaretLeftStyled,
  ContainerStyled,
  LogoStyled,
  TouchableOpacityCaretLeftStyled
} from './Header.styles';

type HeaderProps = {
  isBackButton?: boolean;
};

export function Header({ isBackButton = false }: HeaderProps) {
  const navigation = useNavigation();

  const handleNavigate = useCallback(() => {
    navigation.navigate('groups');
  }, []);

  return (
    <ContainerStyled>
      {isBackButton && (
        <TouchableOpacityCaretLeftStyled onPress={handleNavigate}>
          <CaretLeftStyled />
        </TouchableOpacityCaretLeftStyled>
      )}

      <LogoStyled source={logoImg} />
    </ContainerStyled>
  );
}
