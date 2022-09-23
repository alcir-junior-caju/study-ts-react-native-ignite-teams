import { CaretLeft } from 'phosphor-react-native';
import styled from 'styled-components/native';

export const ContainerStyled = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const LogoStyled = styled.Image`
  width: 46px;
  height: 55px;
`;

export const TouchableOpacityCaretLeftStyled = styled.TouchableOpacity`
  flex: 1;
`;

export const CaretLeftStyled = styled(CaretLeft).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.WHITE
}))`
  padding: 1px;
`;
