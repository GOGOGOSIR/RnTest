import SnapCarouselPage from '../pages/pluginPage/snapCarousel/snapCarousel';
import TabViewPage from '../pages/pluginPage/tabView/tabView';
import PreviewImagePage from '../pages/pluginPage/previewImage/previewImage';
import CroperImagePage from '../pages/pluginPage/croperImage/croperImage';

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
];

export default viewRoutes;
