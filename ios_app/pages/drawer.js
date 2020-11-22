import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#6a51ae' }}>
        <StatusBar barStyle="light-content"/>
        <View>
          <Text> drawer </Text>
        </View>
      </SafeAreaView>
    );
  }
}
