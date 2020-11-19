import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
// import Content from './components/Content/index';
import IndexModel from './models/index';
import { screenSize } from './utils/tools';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListPage from './pages/list';
import HomePage from './pages/home';
import DetailPage from './pages/detail';
import ModalScreen from './pages/ModalScreen';

const indexModel = new IndexModel();
const { screenWidth, screenHeight } = screenSize;

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

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
      <MainStack.Screen
        name="Home"
        component={HomePage}
        options={{
          headerTitle: props => <Image style={{ width: 150, height: 50 }} source={require('./assets/image/logo.png')} />,
          // 这种方式声明的button是访问不到HomePage这个页面的instance（实例的）解决方案请看listPage页面
          headerRight: props => <Button title="按 钮" onPress={() => alert('This is a button!')} color="#fff" />,
          headerLeft: props => <Button title="left button" onPress={() => alert('left button!')} color="#fff" />
        }}
        initialParams={{ name: 'name-props' }}
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

  render() {
    return (
      // <View style={style.container}>
      //   <Text style={[style.text, style.redText]}> Txclass1 </Text>
      //   <Content contentText={this.state.contentText} handleContentClick={this.handleContentClick}/>
      // </View>
      <NavigationContainer>
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
      </NavigationContainer>
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