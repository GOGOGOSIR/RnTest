import React, { Component } from 'react';
import { StyleSheet, Image, Button } from 'react-native';
import IndexModel from './models/index';
import { screenSize } from './utils/tools';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// icon
import Ionicons from 'react-native-vector-icons/Ionicons';

// 页面
import ListPage from './pages/list';
import HomePage from './pages/home';
import DetailPage from './pages/detail';
import ModalScreen from './pages/ModalScreen';
import MyPage from './pages/my';
import DrawerPage from './pages/drawer';

// 安全区域组件 （搭配drawer.JS）
import { SafeAreaProvider } from 'react-native-safe-area-context';

const indexModel = new IndexModel();
const { screenWidth, screenHeight } = screenSize;

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// fix: Ionicons Unrecognized font family
Ionicons.loadFont();

// 侧划导航
function DrawerStackScreen () {
  return (
    <Drawer.Navigator initialRouteName="Root">
      <Drawer.Screen name="Root" component={RootStackScreen} />
      <Drawer.Screen name="Drawer" component={DrawerPage} />
    </Drawer.Navigator>
  )
}

// tab 导航栏
function TabStackScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
          } else if (route.name === 'My') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        initialParams={{ name: 'name-props' }}
        options={{ tabBarBadge: 3 }}
      />
      <Tab.Screen name="My" component={MyPage} />
    </Tab.Navigator>
  )
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
      }}
    >
      {/* tab 导航 */}
      <MainStack.Screen
        name="Tab"
        options={{
          headerTitle: props => <Image style={{ width: 150, height: 50 }} source={require('./assets/image/logo.png')} />,
          // 这种方式声明的button是访问不到HomePage这个页面的instance（实例的）解决方案请看listPage页面
          headerRight: props => <Button title="按 钮" onPress={() => alert('This is a button!')} color="#fff" />,
          headerLeft: props => <Button title="left button" onPress={() => alert('left button!')} color="#fff" />
        }}
        component={ TabStackScreen }
      />
      <MainStack.Screen
        name="Detail"
        component={DetailPage}
        options={{
          title: '详情页',
          headerBackImage: () => <Image style={{ width: 30, height: 30 }} source={require('./assets/image/logo.png')} />,
          headerBackTitle: '自定义back title',
          // 显示隐藏backbtn的title
          headerBackTitleVisible: true,
          // 当headerBackTitle不合适屏幕（文本内容过长）就会显示headerTruncatedBackTitle的内容作为标题
          headerTruncatedBackTitle: 'default'
        }}
      />
      <MainStack.Screen
        name="List"
        component={ListPage}
        options={({ route }) => ({
          title: route.params.name,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'blue'
          },
        })}
      />
    </MainStack.Navigator>
  );
}

// 根导航
function RootStackScreen () {
  return (
    <RootStack.Navigator
      mode="modal"
    >
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="MyModal" component={ModalScreen} />
    </RootStack.Navigator>
  )
}

export default class Txclass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentText: 'content component text'
    };
    this.handleContentClick = this.handleContentClick.bind(this)
  }

  componentDidMount() {
    this.getCourseDatas()
  }

  handleContentClick() {
    this.setState({
      contentText: 'content component text change'
    })
  }

  getCourseDatas() {
    indexModel.getCourseDatas().then(res => {
      console.log(res)
    })
  }

  handleStateChange () {
    console.log('handleStateChange')
  }

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer onStateChange={this.handleStateChange} documentTitle={{
          formatter:  (options, route) =>
          `${options?.title ?? route?.name} - My Cool App`,
        }}>
          {DrawerStackScreen()}
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}


const style = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 50
  },
  redText: {
    color: 'red'
  }
})
