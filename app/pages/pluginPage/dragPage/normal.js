import React, { PureComponent } from 'react';
import { Text, View, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { AutoDragSortableView } from 'react-native-drag-sort';

const { width } = Dimensions.get('window');

const parentWidth = width;
const childrenWidth = width - 60;
const childrenHeight = 48;

const AUTO_TEST_DATA = [
    {txt: 1},
    {txt: 2},
    {txt: 3},
    {txt: 4},
    {txt: 5},
    {txt: 6},
    {txt: 7},
    {txt: 8},
    {txt: 9},
    {txt: 10},
    {txt: 11},
    {txt: 12},
    {txt: 13},
    {txt: 14},
    {txt: 15},
    {txt: 16},
    {txt: 17},
    {txt: 18},
    {txt: 19},
    {txt: 20},
    {txt: 21},
    {txt: 22},
    {txt: 23},
    {txt: 24},
    {txt: 25},
    {txt: 26},
]

@CustomSafeAreaView()
export class normal extends PureComponent {
  constructor(props) {
    super()

    this.state = {
        data: AUTO_TEST_DATA,
    }
  }
  renderItem(item,index) {
    return (
      <View style={styles.item}>
        <Text style={styles.item_text}>{item.txt}</Text>
      </View>
    )
  }
  render() {
    return (
      <View style={{ flex: 1}}>
        <View style={styles.header}>
            <Text style={styles.header_title}>单行拖动</Text>
        </View>
        <AutoDragSortableView
          dataSource={this.state.data}
          parentWidth={parentWidth}
          childrenWidth= {childrenWidth}
          marginChildrenBottom={10}
          marginChildrenRight={30}
          marginChildrenLeft = {30}
          marginChildrenTop={10}
          childrenHeight={childrenHeight}

          onDataChange = {(data)=>{
              if (data.length != this.state.data.length) {
                  this.setState({
                      data: data
                  })
              }
          }}
          keyExtractor={(item,index)=> item.txt} // FlatList作用一样，优化
          renderItem={(item,index)=>{
              return this.renderItem(item,index)
          }}
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#2ecc71',
        borderBottomWidth: 2,
    },
    header_title: {
        color: '#333',
        fontSize: 24,
        fontWeight: 'bold',
    },
    item: {
        width: childrenWidth,
        height: childrenHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2ecc71',
        borderRadius: 4,
    },
    item_icon_swipe: {
        width: childrenHeight-10,
        height: childrenHeight-10,
        backgroundColor: '#fff',
        borderRadius: (childrenHeight - 10) / 2,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item_icon: {
        width: childrenHeight-20,
        height: childrenHeight-20,
        resizeMode: 'contain',
    },
    item_text: {
        color: '#fff',
        fontSize: 20,
        marginRight: 20,
        fontWeight: 'bold',
    }
})

export default normal
