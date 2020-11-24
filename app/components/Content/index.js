import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { contentText, handleContentClick } = this.props;

    return (
      <TouchableOpacity onPress={handleContentClick}>
        <View>
          <Text style={styles.text}> { contentText } </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
