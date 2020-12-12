/* eslint-disable react-native/no-inline-styles */
/**
 * @description 创建导航栏的路由
 */
import React from 'react';
// Navigation
// 设置过度动画
import {SlideFromRightIOS} from '@react-navigation/stack/src/TransitionConfigs/TransitionPresets';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from '../../components/Icon/Icon';
// 页面
import Routes from '../../router/index';

const RootStack = createStackNavigator();
const TabStack = createBottomTabNavigator();

const TabNavigation = Routes.filter((route) => route.type === 'tab');
const ViewNavigation = Routes.filter((route) => route.type === 'view');

// 底部导航栏
function TabStackScreen() {
  return (
    <TabStack.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          const iconMap = {
            LaboratoryPage: 'experiment',
            ComponentPage: 'comp',
            PluginPage: 'international',
            MobxPage: 'data',
          };
          const iconName = iconMap[route.name];

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#3eaf7c',
        inactiveTintColor: '#666666',
        labelStyle: {
          marginBottom: 5,
        },
      }}
      sceneContainerStyle={{
        backgroundColor: '#fff',
      }}
      backBehavior="none">
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
export function RootStackScreen() {
  return (
    <RootStack.Navigator>
      {/* tab 导航 */}
      <RootStack.Screen
        name="Tab"
        options={{
          header: () => null,
        }}
        component={TabStackScreen}
      />
      {ViewNavigation.map(({name, options, screen}) => {
        return (
          <RootStack.Screen
            key={name}
            name={name}
            options={{
              ...SlideFromRightIOS,
              header: () => null,
              ...options,
            }}
            component={screen}
          />
        );
      })}
    </RootStack.Navigator>
  );
}
