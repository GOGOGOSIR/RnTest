import MobxPage from '../pages/mobxPage/mobxPage';
import ComponentPage from '../pages/componentPage/componentPage';
import LaboratoryPage from '../pages/laboratoryPage/laboratoryPage';
import PluginPage from '../pages/pluginPage/pluginPage';

const tabRoutes = [
  {
    name: 'LaboratoryPage',
    screen: LaboratoryPage,
    type: 'tab',
    initialParams: {},
    options: {
      title: '实验室',
    },
  },
  {
    name: 'MobxPage',
    screen: MobxPage,
    type: 'tab',
    initialParams: {},
    options: {
      title: 'mobx',
    },
  },
  {
    name: 'ComponentPage',
    screen: ComponentPage,
    type: 'tab',
    options: {
      title: '自定义组件',
    },
  },
  {
    name: 'PluginPage',
    screen: PluginPage,
    type: 'tab',
    initialParams: {},
    options: {
      title: '三方插件',
    },
  },
];

export default tabRoutes;
