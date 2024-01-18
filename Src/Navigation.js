import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from './Pages/Home';
import CheckIn from './Pages/Checkinlist';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="CheckIn_Data" component={CheckIn} />
    </Tab.Navigator>
  );
}

export default MyTabs;
