/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import GeneralFlatList from '../../../../components/GeneralList/GeneralFlatList';
import { QFReactHelper } from '../../../../common/NativeHelper';
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
        liveRecordUrl: require('../../../../assets/img/weixin.png'),
        coverUrl: require('../../../../assets/img/weixin.png'),
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
        liveRecordUrl: require('../../../../assets/img/weixin.png'),
        coverUrl: require('../../../../assets/img/weixin.png'),
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
        liveRecordUrl: require('../../../../assets/img/weixin.png'),
        coverUrl: require('../../../../assets/img/weixin.png'),
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
        liveRecordUrl: require('../../../../assets/img/weixin.png'),
        coverUrl: require('../../../../assets/img/weixin.png'),
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
        liveRecordUrl: require('../../../../assets/img/weixin.png'),
        coverUrl: require('../../../../assets/img/weixin.png'),
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
        liveRecordUrl: require('../../../../assets/img/weixin.png'),
        coverUrl: require('../../../../assets/img/weixin.png'),
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
    updateLiveUrl: PropTypes.func, // 传递liveUrl给父组件更新
  }

  static defaultProps = {
    requestParams: {},
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.renderItem = this.renderItem.bind(this);
    this.formateResFunc = this.formateResFunc.bind(this);
  }

  // 模拟数据
  asyncData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            result: JSON.parse(JSON.stringify(MOCK)),
            code: 'c0000',
          },
        });
      }, 1800);
    });
  }

  // 格式化接口返回的数据
  formateResFunc(data) {
    const liveNameMap = {
      liveAppointBroad: '直播预约',
      liveBroad: '直播中',
      liveReplayBroad: '直播回放',
    };
    const result = [];
    for (const [key, value] of Object.entries(data)) {
      const title = liveNameMap[key];
      const { items } = value;
      const list = items.map((item) => ({
        ...item,
        sortType: key,
      }));
      result.push({
        title,
        sortType: key,
        data: list,
      });
    }
    return result;
  }

  // 处理加载更多的数据合并操作
  mergeDataFunc (prevData, data) {
    if (!prevData.length) {
      return data;
    }
    return data.map((item, index) => {
      const { sortType } = item;
      if (sortType === 'liveReplayBroad') {
        const prevDataArr = prevData[index].data;
        // eslint-disable-next-line no-param-reassign
        item.data = [
          ...prevDataArr,
          ...item.data,
        ];
      }
      return item;
    });
  }

  handleClickItem(data) {
    console.log(data);
    const {
      sortType, liveRecordUrl, liveRoomUrl, liveReplayUrl,
    } = data;
    const { navigation, updateLiveUrl } = this.props;
    if (sortType === 'liveAppointBroad') {
      // 直播预约 进入预约详情页
      navigation.navigate('ReserveInfo', {
        liveUrl: liveRoomUrl,
      });
    } else if (sortType === 'liveBroad') {
      // 直播中 进入直播间
      if (liveRoomUrl) {
        navigation.navigate('LiveFullScreen', {
          liveUrl: liveRoomUrl,
        });
        if (updateLiveUrl) {
          updateLiveUrl(liveRoomUrl);
        }
      }
    } else {
      // 直播回放 打开对应的视频
      const videoUrl = liveReplayUrl || liveRecordUrl;
      liveRecordUrl && QFReactHelper.playVideo(videoUrl);
    }
  }

  renderItem({ item: { title, data } }) {
    return (
      <View>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>{title}</Text>
        </View>
        <View style={styles.listWrapper}>
          {
            data.map((dataItem, index) => (
              <TouchableOpacity
                style={styles.itemWrapper}
                onPress={() => { this.handleClickItem(dataItem); }}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
              >
                <RenderItem isLive data={dataItem} />
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    );
  }

  render() {
    const { requestParams } = this.props;
    return (
      <GeneralFlatList
        renderData={this.asyncData}
        requestParams={requestParams}
        renderItem={this.renderItem}
        mergeDataFunc={this.mergeDataFunc}
        formateResFunc={this.formateResFunc}
        wrapperStyle={styles.wrapperStyle}
        resDataTemplate="data.result"
        resTotalTemplate="data.result.liveReplayBroad.recordCount"
        resPageSizeTemplates="data.result.liveReplayBroad.pageSize"
        resSuccessCodeTemplate="data.code"
        pageSize={1}
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
