import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError, PLAYER_COLLECTION } from '@utils/index';

import { PlayerStorageDTO } from './PlayerStorageDTO';
import { getPlayersByGroupStorage } from './getPlayersByGroupStorage';

export async function setPlayerByGroupStorage(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storagePlayers = await getPlayersByGroupStorage(group);
    const playerAlreadyExists = await storagePlayers.filter(
      player => player.name === newPlayer.name
    );

    if (playerAlreadyExists.length > 0) {
      throw new AppError('Essa pessoa já está adicionada em um time aqui!');
    }

    const storage = JSON.stringify([...storagePlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}
