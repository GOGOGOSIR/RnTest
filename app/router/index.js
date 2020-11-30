/* eslint-disable react-native/no-inline-styles */
import tabRoutes from './tabRoutes';
import viewRoutes from './viewRoutes';
// import React from 'react';
// import {Image} from 'react-native';
// import ListPage from '../pages/list';
// import HomePage from '../pages/home';
// import DetailPage from '../pages/detail';
// import ModalScreen from '../pages/ModalScreen';
// import DrawerPage from '../pages/drawer';

// const Routes = [
// view 组件
// {
//   name: 'ListPage',
//   screen: ListPage,
//   type: 'view',
//   options: ({route}) => ({
//     title: route.params.name,
//     headerStyle: {
//       backgroundColor: '#f4511e',
//     },
//     headerTintColor: '#fff',
//     headerTitleStyle: {
//       fontWeight: 'bold',
//       color: 'blue',
//     },
//   }),
// },
// {
//   name: 'Detail',
//   screen: DetailPage,
//   type: 'view',
//   options: {
//     title: '详情页',
//     headerBackImage: () => (
//       <Image
//         style={{width: 30, height: 30}}
//         source={require('../assets/image/logo.png')}
//       />
//     ),
//     headerBackTitle: '自定义back title',
//     // 显示隐藏backbtn的title
//     headerBackTitleVisible: true,
//     // 当headerBackTitle不合适屏幕（文本内容过长）就会显示headerTruncatedBackTitle的内容作为标题
//     headerTruncatedBackTitle: 'default',
//   },
// },
// {
//   name: 'ModalScreen',
//   screen: ModalScreen,
//   type: 'modal',
// },

// tab组件
// {
//   name: 'Home',
//   screen: HomePage,
//   type: 'tab',
//   initialParams: {
//     name: 'name-props',
//   },
//   options: {
//     tabBarBadge: 3,
//     title: '首页',
//   },
// },

// drawer 组件
// {
//   name: 'DrawerPage',
//   screen: DrawerPage,
//   type: 'drawer',
// },
// ];

const routes = [...tabRoutes, ...viewRoutes];

export default routes;
