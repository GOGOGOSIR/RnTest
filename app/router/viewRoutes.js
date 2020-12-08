import SnapCarouselPage from '../pages/pluginPage/snapCarousel/snapCarousel';
import TabViewPage from '../pages/pluginPage/tabView/tabView';
import PreviewImagePage from '../pages/pluginPage/previewImage/previewImage';

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
];

export default viewRoutes;
