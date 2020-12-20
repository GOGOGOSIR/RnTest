import React, {PureComponent} from 'react';
import {TouchableOpacity, StyleSheet, Dimensions, Alert} from 'react-native';
import GeneralFlatList from '../../../../components/GeneralFlatList/GeneralFlatList';
import RenderItem from './RenderItem';

const MOCK_LIST = [
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
];
const MARGIN = 15;

class VideoList extends PureComponent {
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
            result: MOCK_LIST,
            totalCounts: 100,
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

  render() {
    return (
      <GeneralFlatList
        renderData={this.asyncData}
        renderItem={this._renderItem}
        flatListProps={{
          numColumns: 2,
          columnWrapperStyle: [styles.columnWrapper],
        }}
        resDataTemplate="data.result"
        resTotalTemplate="data.totalCounts"
        pageSize={5}
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
  itemWrapper: {
    width: (Dimensions.get('window').width - 2 * MARGIN - MARGIN) / 2,
  },
  columnWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: MARGIN,
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default VideoList;
