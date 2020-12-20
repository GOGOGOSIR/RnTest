import React, {PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class StatusView extends PureComponent {
  static propTypes = {
    isReload: PropTypes.bool, // 接口的请求参数
  };

  static defaultProps = {
    isReload: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {isReload} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}> {!isReload ? 'loading' : '暂无数据'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
