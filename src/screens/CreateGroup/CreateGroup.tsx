import { Button, Header, Highlight, Input } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { setGroupStorage } from '@storage/index';
import { AppError } from '@utils/errors';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import {
  ContainerStyled,
  ContentStyled,
  UsersThreeStyled
} from './CreateGroup.styles';

export function CreateGroup() {
  const navigation = useNavigation();
  const [group, setGroup] = useState('');

  const handleNavigate = useCallback(async () => {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo Grupo', 'Informe o nome da turma!');
      }

      await setGroupStorage(group);
      navigation.navigate('players', { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message);
      } else {
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo!');
        console.error(error);
      }
    }
  }, [group]);

  return (
    <ContainerStyled>
      <Header isBackButton />

      <ContentStyled>
        <UsersThreeStyled />

        <Highlight
          title="Nova turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />

        <Input placeholder="Nome da turma" onChangeText={setGroup} />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNavigate}
        />
      </ContentStyled>
    </ContainerStyled>
  );
}
