/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import AnimatedLive from '../../../../components/Live/AnimatedLive';

export default class RenderItem extends PureComponent {
  static propTypes = {
    data: PropTypes.object,
    isLive: PropTypes.bool, // 是否是直播
  };

  static defaultProps = {
    data: {},
    isLive: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  // 渲染播放区域内容
  renderPlayTimeArea({ sortType, appointTime }) {
    const time = appointTime ? dayjs(appointTime).format('MM月DD日 HH点mm分') : '';
    return (
      <>
        {
          // 判断直播状态是否是预约直播
          sortType === 'liveAppointBroad' ? (
            <View style={styles.playTimeWrapper}>
              <Text style={styles.playTimeText}>
                开播时间:
                {time}
              </Text>
            </View>
          ) : null
        }
      </>
    );
  }

  // 渲染标签区域
  renderTagArea({ sortType, ...othersProps }) {
    const valueMap = {
      liveAppointBroad: {
        name: '预约中',
        countKey: 'customerAppointNum',
        unit: '人预约',
      },
      liveBroad: {
        name: '直播中',
        countKey: '',
        unit: '人观看',
      },
      liveReplayBroad: {
        name: '回放',
        countKey: '',
        unit: '人观看',
      },
    };
    return (
      <View style={styles.tagWrapper}>
        {
          sortType === 'liveBroad' ? (
            <View style={styles.tagDescAnimateWrapper}>
              <AnimatedLive />
            </View>
          ) : (
            <View style={styles.tagDescWrapper}>
              <Text style={styles.tagDescText}>{valueMap[sortType].name}</Text>
            </View>
          )
        }
        <Text style={styles.tagNum}>
          {othersProps[valueMap[sortType].countKey]}
          {valueMap[sortType].unit}
        </Text>
      </View>
    );
  }

  render() {
    const { data, isLive } = this.props;
    const {
      coverUrl, gardenName, title, videoTitle,
    } = data;
    return (
      <View style={styles.renderItemWrapper}>
        <ImageBackground style={styles.bgImageWrapper} source={coverUrl}>
          {/* 判断是否是直播聚合项 */}
          {isLive ? this.renderTagArea(data) : null}
          <View style={styles.maskWrapper}>
            <Text style={styles.maskText}>{gardenName}</Text>
          </View>
          <View style={styles.maskOpacity} />
        </ImageBackground>
        <Text style={styles.descText} numberOfLines={2} ellipsizeMode="tail">
          {isLive ? title : videoTitle}
        </Text>
        {/* 判断是否是直播聚合项 */}
        {isLive ? this.renderPlayTimeArea(data) : null}
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
  tagDescAnimateWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9911',
    borderRadius: 10,
    alignSelf: 'stretch',
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
