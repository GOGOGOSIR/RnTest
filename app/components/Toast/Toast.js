import React, { useState, useMemo, useImperativeHandle, forwardRef } from 'react';
import { StyleSheet, Animated, View, Text } from 'react-native';
import PropTypes from 'prop-types';

const Toast = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const maskStyle = useMemo(() => {
    const { maskBackgroundColor, position } = props;
    const positionMap = {
      'center': 'center',
      'top': 'flex-start',
      'bottom': 'flex-end',
    }
    console.log('maskStyle')

    return {
      backgroundColor: maskBackgroundColor,
      justifyContent: positionMap[position],
      display: visible ? 'flex' : 'none',
    }
  }, [props.maskBackgroundColor, props.position, visible]);

  const containerStyle = useMemo(() => {
    const { messageContainerBackgroundColor } = props;
    console.log('containerStyle')

    return {
      backgroundColor: messageContainerBackgroundColor,
    }
  }, [props.messageContainerBackgroundColor]);

  const textStyle = useMemo(() => {
    const { messageTextColor, messageTextFontSize } = props;
    console.log('textStyle')

    return {
      color: messageTextColor,
      fontSize: messageTextFontSize
    }
  }, [props.messageTextColor, props.messageTextFontSize]);

  // 暴露给父组件使用的方法
  useImperativeHandle(ref, () => ({
    show: () => {
      console.log(ref);
      open();
    },
    hide: () => {
      close();
    }
  }));

  const open = () => {
    const { duration } = props;
    setVisible(true);
    if (duration) {
      console.log('close')
      setTimeout(close, duration);
    }
  }

  const close = () => {
    setVisible(false);
  }

  return (
    <View style={[styles.toastMask, maskStyle]} pointerEvents="auto">
      <Animated.View style={[styles.toastTextContainer, containerStyle]}>
        <Text style={textStyle}>{props.message}</Text>
      </Animated.View>
    </View>
  )
});

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  maskBackgroundColor: PropTypes.string,
  messageTextColor: PropTypes.string,
  messageTextFontSize: PropTypes.number,
  messageContainerBackgroundColor: PropTypes.string,
  position: PropTypes.oneOf(['center', 'top', 'bottom']),
  duration: PropTypes.number,
}

Toast.defaultProps = {
  maskBackgroundColor: 'rgba(255,255,255,0)',
  messageTextColor: '#ffffff',
  messageContainerBackgroundColor: 'rgba(0,0,0,0.8)',
  messageTextFontSize: 15,
  position: 'center',
  duration: 1500,
}

const styles = StyleSheet.create({
  toastMask: {
    position: 'absolute',
    zIndex: 999,
    elevation: 999,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 15,
  },
  toastTextContainer: {
    paddingHorizontal: 10,
    borderRadius: 4,
    paddingVertical: 5,
    alignSelf: 'center'
  }
});

export default Toast;
