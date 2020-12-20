import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';

export default class RenderItem extends PureComponent {
  static propTypes = {
    data: PropTypes.object,
  };

  static defaultProps = {
    data: {},
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  // 渲染播放区域内容
  renderPlayTimeArea() {
    const {timestr} = this.props.data;
    return (
      <View style={styles.playTimeWrapper}>
        <Text style={styles.playTimeText}>{timestr}</Text>
      </View>
    );
  }

  // 渲染标签区域
  renderTagArea() {
    const {status, numstr} = this.props.data;
    return (
      <View style={styles.tagWrapper}>
        <View style={styles.tagDescWrapper}>
          <Text style={styles.tagDescText}>{status}</Text>
        </View>
        <Text style={styles.tagNum}>{numstr}</Text>
      </View>
    );
  }

  render() {
    const {pic, company, desc} = this.props.data;
    return (
      <View style={styles.renderItemWrapper}>
        <ImageBackground style={styles.bgImageWrapper} source={pic}>
          {this.renderTagArea()}
          <View style={styles.maskWrapper}>
            <Text style={styles.maskText}>{company}</Text>
          </View>
          <View style={styles.maskOpacity} />
        </ImageBackground>
        <Text style={styles.descText} numberOfLines={2} ellipsizeMode="tail">
          {desc}
        </Text>
        {this.renderPlayTimeArea()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  renderItemWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgImageWrapper: {
    height: 124,
    marginBottom: 6,
    position: 'relative',
    borderRadius: 5,
    overflow: 'hidden',
  },
  descText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
  },
  maskWrapper: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  maskText: {
    fontSize: 14,
    color: '#ffffff',
  },
  playTimeWrapper: {
    marginTop: 6,
  },
  playTimeText: {
    fontSize: 12,
    color: '#FF9911',
    fontWeight: '400',
  },
  tagWrapper: {
    position: 'absolute',
    top: 7,
    left: 5,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    overflow: 'hidden',
    height: 20,
    alignItems: 'center',
    zIndex: 2,
  },
  tagDescWrapper: {
    paddingHorizontal: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9911',
    borderRadius: 10,
    alignSelf: 'stretch',
  },
  tagDescText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  tagNum: {
    paddingLeft: 5,
    paddingRight: 10,
    fontSize: 12,
    fontWeight: '400',
    color: '#fff',
  },
  maskOpacity: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    flex: 1,
  },
});
