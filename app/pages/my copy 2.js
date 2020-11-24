/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {computed} from 'mobx';
import MyStore from '../stores/myPage/data';

export default class my extends Component {
  constructor(props) {
    super(props);
    this.handleChangeList = this.handleChangeList.bind(this);
  }
  @computed get list() {
    return MyStore.list;
  }
  //  改变列表数据
  handleChangeList() {
    const {addList} = MyStore;
    const list = [6, 7, 8, 9];
    addList(list);
  }

  render() {
    // console.log(list, 'render');
    return (
      <View>
        <Text style={styles.title}> My Page </Text>
        {this.list.map((item) => {
          return (
            <View style={styles.listItemWrapper} key={item}>
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          );
        })}
        {/* <Text style={styles.text}>列表数量：{count}</Text> */}
        <Button title="新增" onPress={this.handleChangeList} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 14,
    color: '#333',
    alignItems: 'center',
  },
  listItemWrapper: {
    height: 60,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 6,
  },
  listItemText: {
    fontSize: 18,
    color: 'white',
  },
});
