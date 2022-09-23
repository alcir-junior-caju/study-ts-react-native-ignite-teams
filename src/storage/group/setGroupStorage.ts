import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError, GROUP_COLLECTION } from '@utils/index';

import { getGroupsStorage } from './getGroupsStorage';

export async function setGroupStorage(group: string) {
  try {
    const storageGroups = await getGroupsStorage();
    const groupAlreadyExists = storageGroups.includes(group);

    if (groupAlreadyExists) {
      throw new AppError('Já existe um grupo cadastrado com esse nome!');
    }

    const storage = JSON.stringify([...storageGroups, group]);

    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
