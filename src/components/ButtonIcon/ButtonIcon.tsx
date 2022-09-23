import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacityProps } from 'react-native';

import {
  ButtonIconTypeStyleProps,
  ContainerStyled,
  MaterialIconStyled
} from './ButtonIcon.styles';

type ButtonIconProps = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconTypeStyleProps;
};

export function ButtonIcon({
  icon,
  type = 'PRIMARY',
  ...rest
}: ButtonIconProps) {
  return (
    <ContainerStyled {...rest}>
      <MaterialIconStyled name={icon} type={type} />
    </ContainerStyled>
  );
}
