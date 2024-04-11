import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Posts from "../Components/Posts"
import Videos from './VideosComponents';
const Tab = createMaterialTopTabNavigator();

function TopTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Posts" component={Posts} />
      <Tab.Screen name="Videos" component={Videos} />

    </Tab.Navigator>
  );
}
export default TopTabNavigation;