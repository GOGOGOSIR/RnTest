import React, {PureComponent} from 'react';
import {TouchableWithoutFeedback, StyleSheet, View, Image} from 'react-native';
import PreviewImage from '../../../components/PreviewImage/PreviewImage';
import GeneralFlatList from '../../../components/GeneralList/GeneralFlatList';
import {getAsyncStorage} from '../../../utils/storage/index';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView/CustomSafeAreaView';

const MOCK_LIST = [
  {
    url: require('../../../assets/image/swiper/1.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/2.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/3.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/4.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/5.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/6.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/7.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/8.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/9.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/1.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/2.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/3.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/4.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/5.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/6.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/7.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/8.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/9.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/1.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/2.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/3.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/4.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/5.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/6.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/7.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/8.jpg'),
  },
  {
    url: require('../../../assets/image/swiper/9.jpg'),
  },
];
const MARGIN = 2;

@CustomSafeAreaView()
class previewImage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageUrls: [],
      itemHeight: 0,
      activeIndex: 0,
    };
    this.asyncData = this.asyncData.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._getItemLayout = this._getItemLayout.bind(this);
  }

  componentDidMount() {
    this.getItemHeight();
  }

  // 设置图片的高度
  getItemHeight() {
    getAsyncStorage('@systemInfo').then((res) => {
      this.windowWidth = res.width;
      this.setState({
        itemHeight: this.windowWidth / 3,
      });
    });
  }

  // 图片预览
  previewImage(index) {
    const sourceList = this.generalFlatList.getRenderListData().map((item) => {
      return {
        url: '',
        props: {
          source: item.url,
        },
        freeHeight: true,
      };
    });
    this.setState(
      {
        activeIndex: index,
        imageUrls: sourceList,
      },
      () => {
        this.togglePreviewImageVisible(true);
      },
    );
  }

  togglePreviewImageVisible(status) {
    this.previewImageComp.toggleVisible(status);
  }

  // 模拟数据
  asyncData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            result: MOCK_LIST,
            totalCounts: 100,
            status: 'C0000',
            pageSize: 10,
          },
        });
      }, 800);
    });
  }

  _renderItem({item, index}) {
    return (
      <TouchableWithoutFeedback onPress={() => this.previewImage(index)}>
        <View
          style={[
            styles.imageContainer,
            {maxWidth: this.windowWidth / 2 - MARGIN},
          ]}>
          <Image
            style={[styles.image, {height: this.state.itemHeight}]}
            source={item.url}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _getItemLayout(data, index) {
    const {itemHeight} = this.state;
    return {length: itemHeight, offset: itemHeight * index, index};
  }

  render() {
    const {itemHeight, activeIndex, imageUrls} = this.state;
    return (
      <>
        <GeneralFlatList
          renderData={this.asyncData}
          renderItem={this._renderItem}
          flatListProps={{
            numColumns: 2,
            columnWrapperStyle: [styles.columnWrapper, {height: itemHeight}],
            getItemLayout: this._getItemLayout,
          }}
          resDataTemplate="data.result"
          resTotalTemplate="data.totalCounts"
          resPageSizeTemplate="data.pageSize"
          ref={(ref) => (this.generalFlatList = ref)}
          refreshControlConfig={{
            colors: ['#3eaf7c'],
            progressBackgroundColor: '#eee',
            tintColor: '#3eaf7c',
            title: '刷新数据',
            titleColor: '#3eaf7c',
          }}
        />
        <PreviewImage
          ref={(ref) => (this.previewImageComp = ref)}
          activeIndex={activeIndex}
          imageUrls={imageUrls}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  columnWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: MARGIN,
    marginBottom: MARGIN * 2,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    marginHorizontal: MARGIN,
    borderRadius: 4,
  },
});

export default previewImage;
