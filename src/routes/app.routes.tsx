import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Groups, CreateGroup, Players } from '@screens/index';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="groups" component={Groups} />
      <Screen name="createGroup" component={CreateGroup} />
      <Screen name="players" component={Players} />
    </Navigator>
  );
}
