import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@utils/storage';

import { getGroupsStorage } from './getGroupsStorage';

export async function deleteGroupStorage(group: string) {
  try {
    const storageGroups = await getGroupsStorage();
    const groups = storageGroups.filter(storageGroup => storageGroup !== group);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${group}`);
  } catch (error) {
    throw error;
  }
}
