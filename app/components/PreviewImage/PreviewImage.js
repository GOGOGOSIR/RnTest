import React, {PureComponent} from 'react';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import PropTypes from 'prop-types';

export default class PreviewImage extends PureComponent {
  static propTypes = {
    // modal 的props
    visible: PropTypes.bool,
    onShow: PropTypes.func,
    onDismiss: PropTypes.func, // modal 关闭时调用
    transparent: PropTypes.bool,
    animationType: PropTypes.oneOf(['slide', 'fade', 'none']),
    // ImageViewer 的props
    imageUrls: PropTypes.array,
    activeIndex: PropTypes.number,
    options: PropTypes.object,
  };

  static defaultProps = {
    visible: false,
    transparent: false,
    animationType: 'none',
    imageUrls: [],
    activeIndex: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handlePreviewCancel = this.handlePreviewCancel.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.toggleVisible(this.props.visible);
    }
  }

  toggleVisible(visible) {
    this.setState({
      modalVisible: visible,
    });
  }

  //onRequestClose回调会在用户按下 Android 设备上的后退按键或是 Apple TV 上的菜单键时触发
  handleRequestClose() {
    this.toggleVisible(false);
  }

  handlePreviewCancel() {
    this.toggleVisible(false);
  }

  render() {
    const {
      onShow,
      onDismiss,
      transparent,
      animationType,
      imageUrls,
      activeIndex,
      options,
    } = this.props;
    const {modalVisible} = this.state;
    const modalProps = {
      onShow,
      onDismiss,
      transparent,
      animationType,
    };
    const previewConfigProps = {
      enableSwipeDown: true,
      onCancel: this.handlePreviewCancel,
      ...options,
    };
    return (
      <Modal
        visible={modalVisible}
        onRequestClose={this.handleRequestClose}
        {...modalProps}>
        <ImageViewer
          imageUrls={imageUrls}
          index={activeIndex}
          {...previewConfigProps}
        />
      </Modal>
    );
  }
}
