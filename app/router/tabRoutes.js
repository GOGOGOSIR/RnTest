import MobxPage from '../pages/mobxPage/mobxPage';
import ComponentPage from '../pages/componentPage/componentPage';
import LaboratoryPage from '../pages/laboratoryPage/laboratoryPage';
import PluginPage from '../pages/pluginPage/pluginPage';

const tabRoutes = [
  {
    name: 'LaboratoryPage',
    screen: LaboratoryPage,
    type: 'tab',
    initialParams: {
      isBottomTabNavigator: true,
    },
    options: {
      title: '实验室',
    },
  },
  {
    name: 'MobxPage',
    screen: MobxPage,
    type: 'tab',
    initialParams: {
      isBottomTabNavigator: true,
    },
    options: {
      title: '数据',
    },
  },
  {
    name: 'ComponentPage',
    screen: ComponentPage,
    type: 'tab',
    initialParams: {
      isBottomTabNavigator: true,
    },
    options: {
      title: '自定义组件',
    },
  },
  {
    name: 'PluginPage',
    screen: PluginPage,
    type: 'tab',
    initialParams: {
      isBottomTabNavigator: true,
    },
    options: {
      title: '三方插件',
    },
  },
];

export default tabRoutes;
