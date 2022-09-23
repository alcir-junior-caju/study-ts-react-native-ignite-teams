import { ContainerStyled, TextStyled } from './ListEmpty.styles';

type ListEmptyProps = {
  message?: string;
};

export function ListEmpty({
  message = 'Esta listagem está vazia!'
}: ListEmptyProps) {
  return (
    <ContainerStyled>
      <TextStyled>{message}</TextStyled>
    </ContainerStyled>
  );
}
