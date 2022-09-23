import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '@utils/storage';

import { getPlayersByGroupStorage } from './getPlayersByGroupStorage';

export async function deletePlayerByGroupStorage(
  player: string,
  group: string
) {
  try {
    const storage = await getPlayersByGroupStorage(group);
    const filtered = storage.filter(
      playerByGroup => playerByGroup.name !== player
    );
    const players = JSON.stringify(filtered);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);
  } catch (error) {
    throw error;
  }
}
