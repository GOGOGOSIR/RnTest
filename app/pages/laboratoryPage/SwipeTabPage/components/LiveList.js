import React, {PureComponent} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import GeneralFlatList from '../../../../components/GeneralList/GeneralFlatList';
import RenderItem from './RenderItem';

const MOCK = {
  liveAppointBroad: {
    currentPage: 1,
    currentPageStartIndex: 0,
    items: [
      {
        appointTime: '2020-12-23T03:02:20.957Z',
        brokerAppointNum: 0,
        chatRoomId: '0',
        createId: '0',
        createName: '熊爱明',
        createTime: '2020-12-23T03:02:20.957Z',
        customerAppointNum: 0,
        extranetStatus: 'ON_THE_SHELF',
        gardenCityCode: 'x0000',
        gardenCityName: '广东',
        gardenId: '1',
        gardenName: '南山楼盘',
        id: 'xo001',
        liveActualTime: '2020-12-23T03:02:20.957Z',
        liveAnchorId: '1',
        liveAnchorName: '小爱',
        liveRecordUrl: require('../../../../assets/image/swiper/1.jpg'),
        coverUrl: require('../../../../assets/image/swiper/1.jpg'),
        liveRoomUrl: 'https://www.baidu.com/room',
        liveStatus: 'NOT_PUBLISH',
        liveStopTime: '2020-12-23T03:02:20.957Z',
        liveTime: '2020-12-23T03:02:20.957Z',
        liveType: 'NEWHOUSE_LIVE',
        newhouseStatus: 'ON_THE_SHELF',
        status: 'ENABLED',
        title: '南山金牌楼盘',
      },
    ],
    nextPage: 0,
    pageCount: 1,
    pageSize: 10,
    previousPage: 0,
    recordCount: 1,
  },
  liveBroad: {
    currentPage: 1,
    currentPageStartIndex: 0,
    items: [
      {
        appointTime: '2020-12-23T03:02:20.957Z',
        brokerAppointNum: 0,
        chatRoomId: '0',
        createId: '0',
        createName: '熊明',
        createTime: '2020-12-23T03:02:20.957Z',
        customerAppointNum: 0,
        extranetStatus: 'ON_THE_SHELF',
        gardenCityCode: 'x0000',
        gardenCityName: '广东',
        gardenId: '1',
        gardenName: '宝安楼盘',
        id: 'xo0012121',
        liveActualTime: '2020-12-23T03:02:20.957Z',
        liveAnchorId: '1',
        liveAnchorName: '小s',
        liveRecordUrl: require('../../../../assets/image/swiper/1.jpg'),
        coverUrl: require('../../../../assets/image/swiper/1.jpg'),
        liveRoomUrl: 'https://www.baidu.com/room',
        liveStatus: 'NOT_PUBLISH',
        liveStopTime: '2020-12-23T03:02:20.957Z',
        liveTime: '2020-12-23T03:02:20.957Z',
        liveType: 'NEWHOUSE_LIVE',
        newhouseStatus: 'ON_THE_SHELF',
        status: 'ENABLED',
        title: '华坞楼盘',
      },
      {
        appointTime: '2020-12-23T03:02:20.957Z',
        brokerAppointNum: 0,
        chatRoomId: '0',
        createId: '0',
        createName: '钱旭旭',
        createTime: '2020-12-23T03:02:20.957Z',
        customerAppointNum: 0,
        extranetStatus: 'ON_THE_SHELF',
        gardenCityCode: 'x0000',
        gardenCityName: '深圳市',
        gardenId: '1',
        gardenName: '龙岗楼盘',
        id: 'xo001222',
        liveActualTime: '2020-12-23T03:02:20.957Z',
        liveAnchorId: '1',
        liveAnchorName: 'koss',
        liveRecordUrl: require('../../../../assets/image/swiper/1.jpg'),
        coverUrl: require('../../../../assets/image/swiper/1.jpg'),
        liveRoomUrl: 'https://www.baidu.com/room',
        liveStatus: 'NOT_PUBLISH',
        liveStopTime: '2020-12-23T03:02:20.957Z',
        liveTime: '2020-12-23T03:02:20.957Z',
        liveType: 'NEWHOUSE_LIVE',
        newhouseStatus: 'ON_THE_SHELF',
        status: 'ENABLED',
        title: '宝华楼盘',
      },
    ],
    nextPage: 0,
    pageCount: 1,
    pageSize: 10,
    previousPage: 0,
    recordCount: 2,
  },
  liveReplayBroad: {
    currentPage: 1,
    currentPageStartIndex: 0,
    items: [
      {
        appointTime: '2020-12-23T03:02:20.957Z',
        brokerAppointNum: 0,
        chatRoomId: '0',
        createId: '0',
        createName: '熊21明',
        createTime: '2020-12-23T03:02:20.957Z',
        customerAppointNum: 0,
        extranetStatus: 'ON_THE_SHELF',
        gardenCityCode: 'x0000',
        gardenCityName: '广东',
        gardenId: '1',
        gardenName: '宝安楼盘',
        id: '21221',
        liveActualTime: '2020-12-23T03:02:20.957Z',
        liveAnchorId: '1',
        liveAnchorName: '小s',
        liveRecordUrl: require('../../../../assets/image/swiper/1.jpg'),
        coverUrl: require('../../../../assets/image/swiper/1.jpg'),
        liveRoomUrl: 'https://www.baidu.com/room',
        liveStatus: 'NOT_PUBLISH',
        liveStopTime: '2020-12-23T03:02:20.957Z',
        liveTime: '2020-12-23T03:02:20.957Z',
        liveType: 'NEWHOUSE_LIVE',
        newhouseStatus: 'ON_THE_SHELF',
        status: 'ENABLED',
        title: '华坞楼盘',
      },
      {
        appointTime: '2020-12-23T03:02:20.957Z',
        brokerAppointNum: 0,
        chatRoomId: '0',
        createId: '0',
        createName: '钱旭旭',
        createTime: '2020-12-23T03:02:20.957Z',
        customerAppointNum: 0,
        extranetStatus: 'ON_THE_SHELF',
        gardenCityCode: 'x0000',
        gardenCityName: '深圳市',
        gardenId: '1',
        gardenName: '龙岗楼盘',
        id: 'xo0033',
        liveActualTime: '2020-12-23T03:02:20.957Z',
        liveAnchorId: '1',
        liveAnchorName: 'koss',
        liveRecordUrl: require('../../../../assets/image/swiper/1.jpg'),
        coverUrl: require('../../../../assets/image/swiper/1.jpg'),
        liveRoomUrl: 'https://www.baidu.com/room',
        liveStatus: 'NOT_PUBLISH',
        liveStopTime: '2020-12-23T03:02:20.957Z',
        liveTime: '2020-12-23T03:02:20.957Z',
        liveType: 'NEWHOUSE_LIVE',
        newhouseStatus: 'ON_THE_SHELF',
        status: 'ENABLED',
        title: '宝华楼盘',
      },
      {
        appointTime: '2020-12-23T03:02:20.957Z',
        brokerAppointNum: 0,
        chatRoomId: '0',
        createId: '0',
        createName: '钱旭旭',
        createTime: '2020-12-23T03:02:20.957Z',
        customerAppointNum: 0,
        extranetStatus: 'ON_THE_SHELF',
        gardenCityCode: 'x0000',
        gardenCityName: '深圳市',
        gardenId: '1',
        gardenName: '飞毯楼盘',
        id: 'xo002',
        liveActualTime: '2020-12-23T03:02:20.957Z',
        liveAnchorId: '1',
        liveAnchorName: 'koss',
        liveRecordUrl: require('../../../../assets/image/swiper/1.jpg'),
        coverUrl: require('../../../../assets/image/swiper/1.jpg'),
        liveRoomUrl: 'https://www.baidu.com/room',
        liveStatus: 'NOT_PUBLISH',
        liveStopTime: '2020-12-23T03:02:20.957Z',
        liveTime: '2020-12-23T03:02:20.957Z',
        liveType: 'NEWHOUSE_LIVE',
        newhouseStatus: 'ON_THE_SHELF',
        status: 'ENABLED',
        title: '徐康楼盘',
      },
    ],
    nextPage: 0,
    pageCount: 1,
    pageSize: 3,
    previousPage: 0,
    recordCount: 9,
  },
};
const MARGIN = 15;

class LiveList extends PureComponent {
  static propTypes = {
    requestParams: PropTypes.object,
  };

  static defaultProps = {
    requestParams: {},
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.renderItem = this.renderItem.bind(this);
    this.formateResData = this.formateResData.bind(this);
    this.getTotalValue = this.getTotalValue.bind(this);
    this.getPageSizeValue = this.getPageSizeValue.bind(this);
  }

  getTotalValue(res) {
    return res.data.result.liveReplayBroad.recordCount || 0;
  }

  getPageSizeValue(res) {
    return res.data.result.liveReplayBroad.pageSize || 0;
  }

  // 模拟数据
  asyncData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            result: JSON.parse(JSON.stringify(MOCK)),
            status: 'C0000',
          },
        });
      }, 1800);
    });
  }

  // 格式化接口返回的数据
  formateResData(res) {
    const data = res.data.result;
    const liveNameMap = {
      liveAppointBroad: '直播预约',
      liveBroad: '直播中',
      liveReplayBroad: '直播回放',
    };
    const result = [];
    for (const [key, value] of Object.entries(data)) {
      const title = liveNameMap[key];
      const {items} = value;
      const list = items.map((item) => ({
        ...item,
        sortType: key,
      }));
      if (list.length) {
        result.push({
          title,
          sortType: key,
          data: list,
        });
      }
    }
    return result;
  }

  // 处理加载更多的数据合并操作
  handleMergeData(prevData, data) {
    if (!prevData.length) {
      return data;
    }
    return data.map((item, index) => {
      const {sortType} = item;
      if (sortType === 'liveReplayBroad') {
        const prevDataArr = prevData[index].data;
        item.data = [...prevDataArr, ...item.data];
      }
      return item;
    });
  }

  handleClickItem(data) {
    console.log(data);
  }

  renderItem({item: {title, data}}) {
    return (
      <View>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>{title}</Text>
        </View>
        <View style={styles.listWrapper}>
          {data.map((dataItem, index) => (
            <TouchableOpacity
              style={styles.itemWrapper}
              onPress={() => {
                this.handleClickItem(dataItem);
              }}
              key={index}>
              <RenderItem isLive data={dataItem} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  render() {
    const {requestParams} = this.props;
    return (
      <GeneralFlatList
        renderData={this.asyncData}
        requestParams={requestParams}
        renderItem={this.renderItem}
        handleMergeData={this.handleMergeData}
        wrapperStyle={styles.wrapperStyle}
        formateResData={this.formateResData}
        getTotalValue={this.getTotalValue}
        getPageSizeValue={this.getPageSizeValue}
      />
    );
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {
    backgroundColor: '#F5F5F9',
  },
  listWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: MARGIN,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  itemWrapper: {
    width: (Dimensions.get('window').width - 2 * MARGIN - MARGIN) / 2,
    paddingBottom: 20,
  },
  sectionTitle: {
    paddingHorizontal: MARGIN,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 15,
    marginTop: 10,
  },
  sectionTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default LiveList;
