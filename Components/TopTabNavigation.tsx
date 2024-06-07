import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Posts from "../src/components/UserPosts"

const Tab = createMaterialTopTabNavigator();

function TopTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Posts" component={Posts} />
   

    </Tab.Navigator>
  );
}
export default TopTabNavigation;