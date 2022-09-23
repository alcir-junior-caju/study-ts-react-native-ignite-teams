import { getPlayersByGroupStorage } from './getPlayersByGroupStorage';

export async function getPlayersByGroupAndTeamStorage(
  group: string,
  team: string
) {
  try {
    const storage = await getPlayersByGroupStorage(group);
    const players = storage.filter(player => player.team === team);

    return players;
  } catch (error) {
    throw error;
  }
}
