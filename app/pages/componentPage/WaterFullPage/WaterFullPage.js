import React, {PureComponent} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  View,
  Text,
} from 'react-native';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView/CustomSafeAreaView';
import GeneralFlatList from '../../../components/GeneralList/GeneralFlatList';

const MOCK_LIST = [
  {
    url: require('../../../assets/image/waterFull/1.jpg'),
  },
  {
    url: require('../../../assets/image/waterFull/2.jpg'),
  },
  {
    url: require('../../../assets/image/waterFull/3.jpg'),
  },
  {
    url: require('../../../assets/image/waterFull/4.jpg'),
  },
  {
    url: require('../../../assets/image/waterFull/5.jpg'),
  },
  {
    url: require('../../../assets/image/waterFull/6.jpg'),
  },
  {
    url: require('../../../assets/image/waterFull/7.jpg'),
  },
  {
    url: require('../../../assets/image/waterFull/8.jpg'),
  },
  {
    url: require('../../../assets/image/waterFull/9.jpg'),
  },
  {
    url: require('../../../assets/image/waterFull/10.jpg'),
  },
  {
    url: require('../../../assets/image/waterFull/11.jpg'),
  },
  {
    url: require('../../../assets/image/waterFull/12.jpg'),
  },
  {
    url: require('../../../assets/image/waterFull/13.jpg'),
  },
  {
    url: require('../../../assets/image/waterFull/14.jpg'),
  },
  {
    url: require('../../../assets/image/waterFull/15.jpg'),
  },
  {
    url: require('../../../assets/image/waterFull/16.jpg'),
  },
  {
    url: require('../../../assets/image/waterFull/17.jpg'),
  },
  {
    url: require('../../../assets/image/waterFull/18.jpg'),
  },
  {
    url: require('../../../assets/image/waterFull/19.jpg'),
  },
  {
    url: require('../../../assets/image/waterFull/20.jpg'),
  },
];
const MARGIN = 15;

class WaterFullPage extends PureComponent {
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
            status: 'C0000',
            result: {
              items: JSON.parse(JSON.stringify(MOCK_LIST)),
              pageCount: 60,
              pageSize: 20,
            },
          },
        });
      }, 800);
    });
  }

  handleClickItem(data) {
    console.log(data, '====');
  }

  _renderItem({item}) {
    return (
      <View style={styles.waterFullWrapper}>
        {item.map((i, index) => (
          <TouchableOpacity
            style={styles.itemWrapper}
            key={index}
            onPress={() => {
              this.handleClickItem(i);
            }}>
            <Image style={styles.image} source={i.url} />
            <Text style={styles.text}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  formateResFunc = (data) => {
    return [data];
  };

  render() {
    return (
      <GeneralFlatList
        renderData={this.asyncData}
        renderItem={this._renderItem}
        formateResFunc={this.formateResFunc}
        wrapperStyle={styles.wrapperStyle}
      />
    );
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {
    backgroundColor: '#eee',
    paddingHorizontal: MARGIN,
  },
  waterFullWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemWrapper: {
    marginTop: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: (Dimensions.get('window').width - 2 * MARGIN - MARGIN) / 2,
    borderRadius: 5,
    overflow: 'hidden',
    resizeMode: 'stretch',
  },
  text: {
    paddingVertical: 10,
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
});

export default CustomSafeAreaView(
  {},
  {
    barStyle: 'light-content',
    backgroundColor: 'rgba(0,0,0,0.5)',
    translucent: true,
  },
)(WaterFullPage);
