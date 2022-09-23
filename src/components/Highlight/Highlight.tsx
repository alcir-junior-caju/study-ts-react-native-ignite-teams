import {
  ContainerStyled,
  SubTitleStyled,
  TitleStyled
} from './Highlight.styles';

type HighlightProps = {
  title: string;
  subtitle: string;
};

export function Highlight({ title, subtitle }: HighlightProps) {
  return (
    <ContainerStyled>
      <TitleStyled>{title}</TitleStyled>
      <SubTitleStyled>{subtitle}</SubTitleStyled>
    </ContainerStyled>
  );
}
