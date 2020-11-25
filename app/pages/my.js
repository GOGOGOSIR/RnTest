import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {observer} from 'mobx-react';
import MyStore, {listData} from '../stores/myPage/data';

const myStrore = new MyStore();
@observer
class my extends Component {
  constructor(props) {
    super(props);
    this.handleChangeList = this.handleChangeList.bind(this);
  }

  //  改变列表数据
  handleChangeList() {
    const list = myStrore.isAdd ? [1, 2, 4] : [6, 7, 8, 9];
    myStrore.changeAddStatus(!myStrore.isAdd);
    listData.addList(list);
  }

  render() {
    return (
      <View>
        <Text style={styles.title}> My Page </Text>
        {listData.list.map((item) => {
          return (
            <View style={styles.listItemWrapper} key={item}>
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          );
        })}
        <Text style={styles.text}>列表数量：{listData.count}</Text>
        <Button
          title={myStrore.operateBtnText}
          onPress={this.handleChangeList}
        />
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

export default my;
