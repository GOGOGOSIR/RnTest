/* eslint-disable react-native/no-inline-styles */
/**
 * @description 创建导航栏的路由
 */
import React from 'react';
import {Image, Button} from 'react-native';
// Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// icon
import Ionicons from 'react-native-vector-icons/Ionicons';
// 页面
import Routes from '../../router/index';

// fix: Ionicons Unrecognized font family
Ionicons.loadFont();

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const TabStack = createBottomTabNavigator();
// const DrawerStack = createDrawerNavigator();

const TabNavigation = Routes.filter((route) => route.type === 'tab');
const ViewNavigation = Routes.filter((route) => route.type === 'view');
console.log(ViewNavigation);

// 侧滑导航
// function DrawerStackScreen() {
//   return (
//     <DrawerStack.Navigator initialRouteName="Root">
//       <DrawerStack.Screen name="Root" component={RootStackScreen} />
//       <DrawerStack.Screen name="Drawer" component={DrawerPage} />
//     </DrawerStack.Navigator>
//   );
// }

// 底部导航栏
function TabStackScreen() {
  return (
    <TabStack.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'My') {
            iconName = focused ? 'ios-list' : 'ios-list';
          } else {
            iconName = focused ? 'ios-list' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      {TabNavigation.map(({name, screen, initialParams, options}) => {
        return (
          <TabStack.Screen
            key={name}
            name={name}
            component={screen}
            initialParams={initialParams}
            options={options}
          />
        );
      })}
    </TabStack.Navigator>
  );
}

// 主导航栏
function MainStackScreen() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'rgba(0,0,0,0.8)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {/* tab 导航 */}
      <MainStack.Screen
        name="Tab"
        options={{
          headerTitle: (props) => (
            <Image
              style={{width: 150, height: 50}}
              source={require('../../assets/image/logo.png')}
            />
          ),
          // 这种方式声明的button是访问不到HomePage这个页面的instance（实例的）解决方案请看listPage页面
          headerRight: (props) => (
            <Button
              title="按 钮"
              onPress={() => alert('This is a button!')}
              color="#fff"
            />
          ),
          headerLeft: (props) => (
            <Button
              title="left button"
              onPress={() => alert('left button!')}
              color="#fff"
            />
          ),
        }}
        component={TabStackScreen}
      />
      {ViewNavigation.map(({name, options, screen}) => {
        return (
          <MainStack.Screen
            key={name}
            name={name}
            options={options}
            component={screen}
          />
        );
      })}
    </MainStack.Navigator>
  );
}

// 根导航
export function RootStackScreen() {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
}
