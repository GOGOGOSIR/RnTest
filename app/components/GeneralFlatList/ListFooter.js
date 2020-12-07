import React, {PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class ListFooter extends PureComponent {
  static propTypes = {
    hasMoreFlag: PropTypes.bool,
    visible: PropTypes.bool,
    loadMoreText: PropTypes.string,
    loadOverText: PropTypes.string,
  };

  static defaultProps = {
    hasMoreFlag: true,
    visible: true,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {hasMoreFlag, visible, loadMoreText, loadOverText} = this.props;
    return (
      <>
        {visible ? (
          <View style={styles.footerWrapper}>
            <Text style={styles.footerText}>
              {hasMoreFlag ? loadMoreText : loadOverText}
            </Text>
          </View>
        ) : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  footerWrapper: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
  },
});
