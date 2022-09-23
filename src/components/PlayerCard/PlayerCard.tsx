import { ButtonIcon } from '../ButtonIcon';
import {
  ContainerStyled,
  TextStyled,
  UserIconStyled
} from './PlayerCard.styles';

type PlayerCardProps = {
  name: string;
  onRemove: VoidFunction;
};

export function PlayerCard({ name, onRemove }: PlayerCardProps) {
  return (
    <ContainerStyled>
      <UserIconStyled name="person" />

      <TextStyled>{name}</TextStyled>

      <ButtonIcon icon="close" type="SECONDARY" onPress={onRemove} />
    </ContainerStyled>
  );
}
