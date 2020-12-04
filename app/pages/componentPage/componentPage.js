import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

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
