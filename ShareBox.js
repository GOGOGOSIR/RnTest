/* eslint-disable react/forbid-prop-types */
import React, { PureComponent, Fragment } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../../../../components/Icon';
import { QFReactHelper } from '../../../../common/NativeHelper';

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const IPADPRO11_WIDTH = 834;
const IPADPRO11_HEIGHT = 1194;
const IPADPRO129_HEIGHT = 1024;
const IPADPRO129_WIDTH = 1366;

const getResolvedDimensions = () => {
  const { width, height } = Dimensions.get('window');
  if (width === 0 && height === 0) return Dimensions.get('screen');
  return { width, height };
};

const { height: D_HEIGHT, width: D_WIDTH } = getResolvedDimensions();
const isIPhoneX = (() => {
  if (Platform.OS === 'web') return false;

  return (
    (Platform.OS === 'ios'
      && ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH)
        || (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT)))
    || ((D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH)
      || (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT))
  );
})();

const isNewIPadPro = (() => {
  if (Platform.OS !== 'ios') return false;

  return (
    (D_HEIGHT === IPADPRO11_HEIGHT && D_WIDTH === IPADPRO11_WIDTH)
    || (D_HEIGHT === IPADPRO11_WIDTH && D_WIDTH === IPADPRO11_HEIGHT)
    || ((D_HEIGHT === IPADPRO129_HEIGHT && D_WIDTH === IPADPRO129_WIDTH)
      || (D_HEIGHT === IPADPRO129_WIDTH && D_WIDTH === IPADPRO129_HEIGHT))
  );
})();

const safePaddingBottom = (() => {
  if (isIPhoneX) {
    return 34;
  }

  if (isNewIPadPro) {
    return 20;
  }

  return 0;
})();

class ShareBox extends PureComponent {
  static propTypes = {
    data: PropTypes.object,
  };

  static defaultProps = {
    data: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.shareWechatMini = this.shareWechatMini.bind(this);
    this.shareChatCircleWeb = this.shareChatCircleWeb.bind(this);
    this.onCopyLink = this.onCopyLink.bind(this);
  }

  onCopyLink () { }

  toggleVisibleStatus (status) {
    this.setState({
      visible: status,
    });
  }

  shareWechatMini () {
    const { data } = this.props;
    const { coverUrl, title, remark } = data;

    QFReactHelper.shareWechatMini(
      'http://www.qq.com',
      'gh_d75b10e09083',
      'http://m.qfang.com/beijing/livebroad/appoint/32f76dbb-23bc-4c52-adbc-551eb46c1dbd',
      title,
      remark,
      `${coverUrl}-w400x300`,
    );
  }

  shareChatCircleWeb () { }

  render () {
    const { visible } = this.state;
    return (
      <Fragment>
        {
          visible ? (
            <View style={styles.mackContainer}>
              <View style={styles.containerWrapper}>
                <View style={styles.operateContainer}>
                  <TouchableOpacity style={styles.operateItem} onPress={this.shareWechatMini}>
                    <View style={styles.circularGreen}>
                      <Icon name="fenxiang-weixinhaoyou" size={20} color="#fff" />
                    </View>
                    <Text style={styles.text}>微信好友</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.operateItem} onPress={this.shareChatCircleWeb}>
                    <View style={styles.circularGreen}>
                      <Icon name="fenxiang-pengyouquan" size={20} color="#fff" />
                    </View>
                    <Text style={styles.text}>朋友圈</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.operateItem} onPress={this.onCopyLink}>
                    <View style={[styles.circularRed]}>
                      <Icon name="fangke-fangwenfangshi" size={20} color="#fff" />
                    </View>
                    <Text style={styles.text}>复制链接</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => { this.toggleVisibleStatus(false); }}>
                  <Text style={styles.cancelText}>取消</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null
        }
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  mackContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    elevation: 999,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  containerWrapper: {
    backgroundColor: '#fff',
    paddingBottom: safePaddingBottom,
  },
  operateContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-around',
  },
  cancelBtn: {
    height: 46,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 14,
    color: '#666',
  },
  operateItem: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularGreen: {
    width: 40,
    height: 40,
    backgroundColor: '#38BA34',
    borderRadius: 20,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularRed: {
    width: 40,
    height: 40,
    backgroundColor: '#FF5353',
    borderRadius: 20,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: '#666',
  },
});

export default ShareBox;
