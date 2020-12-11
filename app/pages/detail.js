import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('detail componentDidMount');
  }

  componentWillUnmount() {
    console.log('detail componentWillUnmount');
  }

  render() {
    const {navigation, route} = this.props;
    const {itemId, otherParam} = route.params || {};
    return (
      <View>
        <Text> Detail </Text>
        <Text> {itemId} </Text>
        <Text> {otherParam} </Text>
        <Button
          title="Go to Details... again"
          onPress={() => navigation.push('Detail')}
        />
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
        <Button
          title="Go to Home of push"
          onPress={() => navigation.push('Home')}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <Button
          title="Go back to first screen in stack"
          onPress={() => navigation.popToTop()}
        />
      </View>
    );
  }
}
