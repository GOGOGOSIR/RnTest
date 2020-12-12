import {ScaleFromCenterAndroid} from '@react-navigation/stack/src/TransitionConfigs/TransitionPresets';
// 三方插件
import SnapCarouselPage from '../pages/pluginPage/snapCarousel/snapCarousel';
import TabViewPage from '../pages/pluginPage/tabView/tabView';
import PreviewImagePage from '../pages/pluginPage/previewImage/previewImage';
import CroperImagePage from '../pages/pluginPage/croperImage/croperImage';
// 实验室
import ImmersivePage from '../pages/laboratoryPage/ImmersivePage/ImmersivePage';
// 自定义组件
import IconPage from '../pages/componentPage/IconPage/IconPage';

const viewRoutes = [
  {
    name: 'SnapCarouselPage',
    screen: SnapCarouselPage,
    type: 'view',
  },
  {
    name: 'TabViewPage',
    screen: TabViewPage,
    type: 'view',
  },
  {
    name: 'PreviewImagePage',
    screen: PreviewImagePage,
    type: 'view',
  },
  {
    name: 'CroperImagePage',
    screen: CroperImagePage,
    type: 'view',
  },
  {
    name: 'ImmersivePage',
    screen: ImmersivePage,
    type: 'view',
  },
  {
    name: 'IconPage',
    screen: IconPage,
    type: 'view',
    options: {
      ...ScaleFromCenterAndroid,
    },
  },
];

export default viewRoutes;
