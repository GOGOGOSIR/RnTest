/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StatusBar, SafeAreaView} from 'react-native';

export default class drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#6a51ae',
        }}>
        <StatusBar barStyle="light-content" />
        <View>
          <Text> drawer </Text>
        </View>
      </SafeAreaView>
    );
  }
}
