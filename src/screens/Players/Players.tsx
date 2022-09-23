import {
  Button,
  ButtonIcon,
  Filter,
  Header,
  Highlight,
  Input,
  ListEmpty,
  Loading,
  PlayerCard
} from '@components/index';
import { useNavigation, useRoute } from '@react-navigation/native';
import { deleteGroupStorage } from '@storage/group';
import {
  deletePlayerByGroupStorage,
  getPlayersByGroupAndTeamStorage,
  setPlayerByGroupStorage
} from '@storage/player';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { AppError } from '@utils/index';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';

import {
  ContainerStyled,
  FormStyled,
  HeaderListStyled,
  NumbersOfPlayers
} from './Players.styles';

type RouteParams = {
  group: string;
};

export function Players() {
  const route = useRoute();
  const navigation = useNavigation();
  const { group } = route.params as RouteParams;
  const [isLoading, setIsLoading] = useState(true);
  const [player, setPlayer] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const playerInputRef = useRef<TextInput>(null);

  const handleAddPlayer = async () => {
    if (player.trim().length === 0) {
      return Alert.alert(
        'Nova Pessoa',
        'Informe o nome da pessoa para adicionar!'
      );
    }

    const newPlayer = {
      name: player,
      team
    };

    try {
      await setPlayerByGroupStorage(newPlayer, group);
      playerInputRef.current?.blur();
      setPlayer('');
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message);
      } else {
        Alert.alert('Nova pessoa', 'Não foi possível adicionar!');
        console.error(error);
      }
    }
  };

  const fetchPlayersByTeam = useCallback(async () => {
    try {
      setIsLoading(true);
      const playersByTeam = await getPlayersByGroupAndTeamStorage(group, team);
      setPlayers(playersByTeam);
      setIsLoading(false);
    } catch (error) {
      Alert.alert(
        'Pessoas',
        'Não foi possível carregar as pessoas do time selecionado!'
      );
      console.error(error);
    }
  }, [group, team]);

  const handleRemovePlayer = useCallback(
    async (player: string) => {
      try {
        await deletePlayerByGroupStorage(player, group);
        fetchPlayersByTeam();
      } catch (error) {
        Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa!');
        console.error(error);
      }
    },
    [player]
  );

  const onRemoveGroup = useCallback(async () => {
    try {
      await deleteGroupStorage(group);
      navigation.navigate('groups');
    } catch (error) {
      throw error;
    }
  }, []);

  const handleGroupRemove = () => {
    Alert.alert('Remover', 'Deseja remover o grupo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => onRemoveGroup() }
    ]);
  };

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <ContainerStyled>
      <Header isBackButton />

      <Highlight title={group} subtitle="Adicione a galera e separe os times" />

      <FormStyled>
        <Input
          inputRef={playerInputRef}
          onChangeText={setPlayer}
          value={player}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </FormStyled>

      <HeaderListStyled>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderListStyled>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
            />
          )}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 }
          ]}
          ListEmptyComponent={() => (
            <ListEmpty message="Você ainda não escolheu seus craques." />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </ContainerStyled>
  );
}
