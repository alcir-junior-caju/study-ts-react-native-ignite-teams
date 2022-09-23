import {
  Button,
  Header,
  Highlight,
  ListEmpty,
  GroupCard,
  Loading
} from '@components/index';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getGroupsStorage } from '@storage/index';
import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';

import { ContainerStyled } from './Groups.styles';

// import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// type RootParamList = {
//   groups: undefined;
//   createGroup: undefined;
//   players: {
//     group: string;
//   };
// };

// type GroupsProps = {
//   navigation: NativeStackNavigationProp<RootParamList, 'groups'>;
// };

// export function Groups({ navigation }: GroupsProps) {
export function Groups() {
  const navigation = useNavigation();
  const [groups, setGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigateCreateGroup = useCallback(() => {
    navigation.navigate('createGroup');
  }, []);

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
      const data = await getGroupsStorage();
      setGroups(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigatePlayers = useCallback((group: string) => {
    navigation.navigate('players', { group });
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <ContainerStyled>
      <Header />

      <Highlight title="Turmas" subtitle="Jogue com sua turma" />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard
              title={item}
              onPress={() => handleNavigatePlayers(item)}
            />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          )}
        />
      )}

      <Button
        title="Criar nova turma"
        type="PRIMARY"
        onPress={handleNavigateCreateGroup}
      />
    </ContainerStyled>
  );
}
