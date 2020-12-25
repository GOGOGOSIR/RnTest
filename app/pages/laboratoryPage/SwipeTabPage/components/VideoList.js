import React, {PureComponent} from 'react';
import {TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import GeneralFlatList from '../../../../components/GeneralList/GeneralFlatList';
import RenderItem from './RenderItem';

const MOCK_LIST = [
  {
    coverUrl: require('../../../../assets/image/swiper/1.jpg'),
    createId: '1',
    createTime: '2020-12-23T06:07:38.159Z',
    entityId: '1',
    extranetStatus: 'ON_THE_SHELF',
    gardenName: '南山楼盘',
    id: '1',
    newhouseStatus: 'ON_THE_SHELF',
    orderNum: 0,
    secondNum: 0,
    status: 'ENABLED',
    updateId: '1',
    updateTime: '2020-12-23T06:07:38.159Z',
    videoSize: 0,
    videoTitle: '凯德经典',
    videoType: 'FIFTEEN_SECONDS_VIDEO',
    videoUrl: '',
  },
  {
    coverUrl: require('../../../../assets/image/swiper/1.jpg'),
    createId: '2',
    createTime: '2020-12-23T06:07:38.159Z',
    entityId: '2',
    extranetStatus: 'ON_THE_SHELF',
    gardenName: '南山2楼盘',
    id: '2',
    newhouseStatus: 'ON_THE_SHELF',
    orderNum: 0,
    secondNum: 0,
    status: 'ENABLED',
    updateId: '2',
    updateTime: '2020-12-23T06:07:38.159Z',
    videoSize: 0,
    videoTitle: '凯德2经典',
    videoType: 'FIFTEEN_SECONDS_VIDEO',
    videoUrl: '',
  },
  {
    coverUrl: require('../../../../assets/image/swiper/1.jpg'),
    createId: '3',
    createTime: '2020-12-23T06:07:38.159Z',
    entityId: '3',
    extranetStatus: 'ON_THE_SHELF',
    gardenName: '南山3楼盘',
    id: '3',
    newhouseStatus: 'ON_THE_SHELF',
    orderNum: 0,
    secondNum: 0,
    status: 'ENABLED',
    updateId: '3',
    updateTime: '2020-12-23T06:07:38.159Z',
    videoSize: 0,
    videoTitle: '凯德3经典',
    videoType: 'FIFTEEN_SECONDS_VIDEO',
    videoUrl: '',
  },
  {
    coverUrl: require('../../../../assets/image/swiper/1.jpg'),
    createId: '4',
    createTime: '2020-12-23T06:07:38.159Z',
    entityId: '4',
    extranetStatus: 'ON_THE_SHELF',
    gardenName: '南山4楼盘',
    id: '4',
    newhouseStatus: 'ON_THE_SHELF',
    orderNum: 0,
    secondNum: 0,
    status: 'ENABLED',
    updateId: '4',
    updateTime: '2020-12-23T06:07:38.159Z',
    videoSize: 0,
    videoTitle: '凯德4经典',
    videoType: 'FIFTEEN_SECONDS_VIDEO',
    videoUrl: '',
  },
  {
    coverUrl: require('../../../../assets/image/swiper/1.jpg'),
    createId: '5',
    createTime: '2020-12-23T06:07:38.159Z',
    entityId: '5',
    extranetStatus: 'ON_THE_SHELF',
    gardenName: '南山5楼盘',
    id: '5',
    newhouseStatus: 'ON_THE_SHELF',
    orderNum: 0,
    secondNum: 0,
    status: 'ENABLED',
    updateId: '5',
    updateTime: '2020-12-23T06:07:38.159Z',
    videoSize: 0,
    videoTitle: '凯德5经典',
    videoType: 'FIFTEEN_SECONDS_VIDEO',
    videoUrl: '',
  },
  {
    coverUrl: require('../../../../assets/image/swiper/1.jpg'),
    createId: '6',
    createTime: '2020-12-23T06:07:38.159Z',
    entityId: '6',
    extranetStatus: 'ON_THE_SHELF',
    gardenName: '南山5楼盘',
    id: '6',
    newhouseStatus: 'ON_THE_SHELF',
    orderNum: 0,
    secondNum: 0,
    status: 'ENABLED',
    updateId: '6',
    updateTime: '2020-12-23T06:07:38.159Z',
    videoSize: 0,
    videoTitle: '凯德6经典',
    videoType: 'FIFTEEN_SECONDS_VIDEO',
    videoUrl: '',
  },
  {
    coverUrl: require('../../../../assets/image/swiper/1.jpg'),
    createId: '7',
    createTime: '2020-12-23T06:07:38.159Z',
    entityId: '7',
    extranetStatus: 'ON_THE_SHELF',
    gardenName: '南山7楼盘',
    id: '7',
    newhouseStatus: 'ON_THE_SHELF',
    orderNum: 0,
    secondNum: 0,
    status: 'ENABLED',
    updateId: '7',
    updateTime: '2020-12-23T06:07:38.159Z',
    videoSize: 0,
    videoTitle: '凯德7经典',
    videoType: 'FIFTEEN_SECONDS_VIDEO',
    videoUrl: '',
  },
  {
    coverUrl: require('../../../../assets/image/swiper/1.jpg'),
    createId: '8',
    createTime: '2020-12-23T06:07:38.159Z',
    entityId: '8',
    extranetStatus: 'ON_THE_SHELF',
    gardenName: '南山8楼盘',
    id: '8',
    newhouseStatus: 'ON_THE_SHELF',
    orderNum: 0,
    secondNum: 0,
    status: 'ENABLED',
    updateId: '8',
    updateTime: '2020-12-23T06:07:38.159Z',
    videoSize: 0,
    videoTitle: '凯德8经典',
    videoType: 'FIFTEEN_SECONDS_VIDEO',
    videoUrl: '',
  },
  {
    coverUrl: require('../../../../assets/image/swiper/1.jpg'),
    createId: '9',
    createTime: '2020-12-23T06:07:38.159Z',
    entityId: '9',
    extranetStatus: 'ON_THE_SHELF',
    gardenName: '南山9楼盘',
    id: '9',
    newhouseStatus: 'ON_THE_SHELF',
    orderNum: 0,
    secondNum: 0,
    status: 'ENABLED',
    updateId: '9',
    updateTime: '2020-12-23T06:07:38.159Z',
    videoSize: 0,
    videoTitle: '凯德9经典凯德9经典凯德9经典凯德9经典凯德9经典',
    videoType: 'FIFTEEN_SECONDS_VIDEO',
    videoUrl: '',
  },
  {
    coverUrl: require('../../../../assets/image/swiper/1.jpg'),
    createId: '9',
    createTime: '2020-12-23T06:07:38.159Z',
    entityId: '9',
    extranetStatus: 'ON_THE_SHELF',
    gardenName: '南山9楼盘',
    id: '9',
    newhouseStatus: 'ON_THE_SHELF',
    orderNum: 0,
    secondNum: 0,
    status: 'ENABLED',
    updateId: '9',
    updateTime: '2020-12-23T06:07:38.159Z',
    videoSize: 0,
    videoTitle: '凯德9经典',
    videoType: 'FIFTEEN_SECONDS_VIDEO',
    videoUrl: '',
  },
];
const MARGIN = 15;

class VideoList extends PureComponent {
  static propTypes = {
    requestParams: PropTypes.object,
  };

  static defaultProps = {
    requestParams: {},
  };

  constructor(props) {
    super(props);
    this.state = {};
    this._renderItem = this._renderItem.bind(this);
  }

  // 模拟数据
  asyncData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            code: 'C0000',
            result: {
              items: JSON.parse(JSON.stringify(MOCK_LIST)),
              pageCount: 30,
              pageSize: 10,
            },
          },
        });
      }, 800);
    });
  }

  // 处理点击某项
  handleClickItem({videoUrl}) {
    console.log(videoUrl);
  }

  _renderItem({item}) {
    return (
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() => {
          this.handleClickItem(item);
        }}>
        <RenderItem data={item} />
      </TouchableOpacity>
    );
  }

  render() {
    const {requestParams} = this.props;
    return (
      <GeneralFlatList
        renderData={this.asyncData}
        requestParams={requestParams}
        renderItem={this._renderItem}
        flatListProps={{
          numColumns: 2,
          columnWrapperStyle: [styles.columnWrapper],
        }}
        resDataTemplate="data.result.items"
        resTotalTemplate="data.result.pageCount"
        resSuccessCodeTemplate="data.code"
        resPageSizeTemplate="data.result.pageSize"
        wrapperStyle={styles.wrapper}
      />
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F5F5F9',
    paddingTop: 10,
  },
  itemWrapper: {
    width: (Dimensions.get('window').width - 2 * MARGIN - MARGIN) / 2,
  },
  columnWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: MARGIN,
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 10,
  },
});

export default VideoList;
