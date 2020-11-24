import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';

export default class list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.addCount = this.addCount.bind(this)
  }

  addCount () {
    let count = this.state.count
    count++
    this.setState({
      count
    })
  }

  componentDidMount () {
    this.props.navigation.setOptions({
      headerRight: () => <Button title="add count" onPress={this.addCount}/>
    })
    const { navigation } = this.props
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      Alert.alert(
        '警告',
        '是否离开列表页',
        [
          {
            text: '离开',
            onPress: () => {
              console.log('离开')
              navigation.dispatch(e.data.action)
            }
          }, {
            text: '不离开',
            onPress: () => {
              console.log('不离开')
            }
          }
        ]
      )
    })
  }

  render() {
    const { navigation } = this.props
    const { count } = this.state
    // 不可以这样更新组件, 需要在componentDidMount中调用
    // navigation.setOptions({
    //   headerRight: () => <Button title="add count" onPress={this.addCount}/>
    // })
    return (
      <View>
        <Text> list </Text>
        <Text> 当前count的值为： {count} </Text>
        <Button
          title="Update the title"
          onPress={() => navigation.setOptions({ title: 'Updated!' })}
        />
      </View>
    );
  }
}
