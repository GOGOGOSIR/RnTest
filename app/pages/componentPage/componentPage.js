import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default class componentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text> componentPage </Text>
        </View>
      </SafeAreaView>
    );
  }
}
