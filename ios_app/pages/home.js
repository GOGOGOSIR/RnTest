import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  /**
   * 当启动app的时候会触发home的componentDidMount，进入Detail页面的时候触发Detail的componentDidMount
   * 当重Detail页回退回Home页的时候触发Detail的componentWillUnmount
   * 
   * 存在的问题
   * 1. 当home页面进入Detail的时候，home页面的componentWillUnmount不会被触发
   * 2. 当从Detail页面返回到home页面的时候（
   *  通过以下方法返回：
   *    navigate('Home')，
   *    goBack()，
   *    popToTop()
   * ），home页面不会触发componentDidMount
   */
  componentDidMount () {
    console.log('home componentDidMount')
    // 使用navigation lifecycle，可以解决react lifecycle的问题
    this.props.navigation.addListener('focus', () => {
      console.log('我进入了home页面')
    })
    this.props.navigation.addListener('blur', () => {
      console.log('我离开了home页面')
    })
  }

  componentWillUnmount () {
    console.log('home componentWillUnmount')
  }

  render() {
    const { navigation, route } = this.props;
    const { name } = route.params;

    return (
      <View>
        <Text> home </Text>
        <Text> { name } </Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Detail', {
            itemId: 86,
            otherParam: 'anything you want here',
          })}
        />
        <Button
          title="Go to List"
          onPress={() => navigation.navigate('List', { name: '通过route.params传递的title'})}
        />
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="Open Modal"
        />
        <Button
          onPress={() => navigation.toggleDrawer()}
          title="toggle Drawer"
        />
      </View>
    );
  }
}
