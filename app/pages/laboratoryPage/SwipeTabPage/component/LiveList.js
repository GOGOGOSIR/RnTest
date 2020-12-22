import React, {PureComponent} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import GeneralFlatList from '../../../../components/GeneralFlatList/GeneralFlatList';
import RenderItem from './RenderItem';

const MOCK_LIST = [
  {
    title: '直播中',
    data: [
      {
        timestr: '开播时间：1月1号 13点30分',
        status: '预约中',
        numstr: '52人预约',
        pic: require('../../../../assets/image/swiper/1.jpg'),
        company: '泰丰贝悦汇',
        desc: '踩盘日记：再访大运地标旁 的优质公寓再访大运地...',
      },
      {
        timestr: '开播时间：1月1号 13点30分',
        status: '预约中',
        numstr: '52人预约',
        pic: require('../../../../assets/image/swiper/2.jpg'),
        company: '泰丰贝悦汇',
        desc: '踩盘日记：再访大运地标旁 的优质公寓再访大运地...',
      },
      {
        timestr: '开播时间：1月1号 13点30分',
        status: '预约中',
        numstr: '52人预约',
        pic: require('../../../../assets/image/swiper/3.jpg'),
        company: '泰丰贝悦汇',
        desc: '踩盘日记：再访大运地标旁 的优质公寓再访大运地...',
      },
    ],
  },
  {
    title: '直播预约',
    data: [
      {
        timestr: '开播时间：1月1号 13点30分',
        status: '预约中',
        numstr: '52人预约',
        pic: require('../../../../assets/image/swiper/4.jpg'),
        company: '泰丰贝悦汇',
        desc: '踩盘日记：再访大运地标旁 的优质公寓再访大运地...',
      },
      {
        timestr: '开播时间：1月1号 13点30分',
        status: '预约中',
        numstr: '52人预约',
        pic: require('../../../../assets/image/swiper/5.jpg'),
        company: '泰丰贝悦汇',
        desc: '踩盘日记：再访大运地标旁 的优质公寓再访大运地...',
      },
    ],
  },
  {
    title: '直播回放',
    data: [
      {
        timestr: '开播时间：1月1号 13点30分',
        status: '预约中',
        numstr: '52人预约',
        pic: require('../../../../assets/image/swiper/6.jpg'),
        company: '泰丰贝悦汇',
        desc: '踩盘日记：再访大运地',
      },
    ],
  },
];
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
    this._renderItem = this._renderItem.bind(this);
    this.margeDataFunc = this.margeDataFunc.bind(this);
  }

  // 模拟数据
  asyncData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            result: JSON.parse(JSON.stringify(MOCK_LIST)),
            totalCounts: 5,
          },
        });
      }, 800);
    });
  }

  _renderItem({item: {title, data}}) {
    return (
      <View>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>{title}</Text>
        </View>
        <View style={styles.itemContainer}>
          {data.map((i, index) => {
            return (
              <TouchableOpacity
                style={styles.itemWrapper}
                key={index}
                onPress={() => {
                  Alert.alert('播放视频');
                }}>
                <RenderItem data={i} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  margeDataFunc(prevData, data) {
    if (!prevData.length) {
      return data;
    }

    return data.map((item, index) => {
      if (item.title === '直播回放') {
        const prevDataList = prevData[index].data;
        item.data = [...prevDataList, ...item.data];
      }
      return item;
    });
  }

  render() {
    const {requestParams} = this.props;
    return (
      <GeneralFlatList
        renderData={this.asyncData}
        requestParams={requestParams}
        renderItem={this._renderItem}
        margeDataFunc={this.margeDataFunc}
        wrapperStyle={styles.wrapperStyle}
        resDataTemplate="data.result"
        resTotalTemplate="data.totalCounts"
        pageSize={1}
        refreshControlConfig={{
          colors: ['#3eaf7c'],
          progressBackgroundColor: '#eee',
          tintColor: '#3eaf7c',
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {
    backgroundColor: '#F5F5F9',
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: MARGIN,
    backgroundColor: '#fff',
  },
  itemWrapper: {
    width: (Dimensions.get('window').width - 2 * MARGIN - MARGIN) / 2,
    paddingBottom: 20,
  },
  columnWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: MARGIN,
    justifyContent: 'space-between',
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
