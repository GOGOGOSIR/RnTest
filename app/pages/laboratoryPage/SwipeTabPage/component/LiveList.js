import React, {PureComponent} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  View,
  Text,
} from 'react-native';
import GeneralSectionList from '../../../../components/GeneralSectionList/GeneralSectionList';
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
  constructor(props) {
    super(props);
    this.state = {};
    this._renderItem = this._renderItem.bind(this);
    this._renderList = this._renderList.bind(this);
    this._renderSectionHeader = this._renderSectionHeader.bind(this);
  }

  // 模拟数据
  asyncData() {
    return new Promise((resolve) => {
      const Data = MOCK_LIST.map((item) => ({
        title: item.title,
        data: [
          {
            data: item.data,
          },
        ],
      }));
      setTimeout(() => {
        resolve({
          data: {
            result: Data,
            totalCounts: 5,
          },
        });
      }, 800);
    });
  }

  _renderItem({item}) {
    return (
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() => {
          Alert.alert('播放视频');
        }}>
        <RenderItem data={item} />
      </TouchableOpacity>
    );
  }

  _renderList({section: {data}}) {
    console.log(data, 'item');
    return (
      <View style={styles.sectionItemWrapper}>
        <GeneralFlatList
          renderData={data[0].data}
          renderItem={this._renderItem}
          flatListProps={{
            numColumns: 2,
            columnWrapperStyle: [styles.columnWrapper],
          }}
          pullUp={false}
          pullDown={false}
        />
      </View>
    );
  }

  _renderSectionHeader({section: {title}}) {
    return (
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>{title}</Text>
      </View>
    );
  }

  render() {
    return (
      <GeneralSectionList
        renderData={this.asyncData}
        renderItem={this._renderList}
        renderSectionHeader={this._renderSectionHeader}
        sectionListProps={{
          stickySectionHeadersEnabled: false,
          removeClippedSubviews: true,
        }}
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
