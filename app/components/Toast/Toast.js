import React, { useState, useMemo, useImperativeHandle, forwardRef, useRef, Fragment } from 'react';
import { StyleSheet, Animated, View, Text, Easing } from 'react-native';
import PropTypes from 'prop-types';

const Toast = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState('center');

  const timer = useRef(null);
  const opacityRef = useRef(new Animated.Value(0));

  const maskStyle = useMemo(() => {
    const { maskBackgroundColor } = props;
    const positionMap = {
      'center': 'center',
      'top': 'flex-start',
      'bottom': 'flex-end',
    }

    return {
      backgroundColor: maskBackgroundColor,
      justifyContent: positionMap[position],
    }
  }, [props.maskBackgroundColor, position]);

  const containerStyle = useMemo(() => {
    const { messageContainerBackgroundColor } = props;

    return {
      backgroundColor: messageContainerBackgroundColor,
    }
  }, [props.messageContainerBackgroundColor]);

  const textStyle = useMemo(() => {
    const { messageTextColor, messageTextFontSize } = props;

    return {
      color: messageTextColor,
      fontSize: messageTextFontSize
    }
  }, [props.messageTextColor, props.messageTextFontSize]);

  // 暴露给父组件使用的方法
  useImperativeHandle(ref, () => ({
    show: (data) => {
      open(data);
    },
    hide: () => {
      close();
    }
  }));

  const open = ({ message, position = 'center', duration = 1500 }) => {
    if (message) {
      if (typeof message === 'function') {
        setMessage({ render: message });
      } else {
        setMessage(message)
      }
    }
    setPosition(position);
    setVisible(true);
    Animated.timing(opacityRef.current, {
      toValue: 1,
      easing: Easing.bezier(0.25, 1, 0.5, 1),
      useNativeDriver: true,
    }).start()
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    if (duration) {
      // console.log('close')
      timer.current = setTimeout(() => {
        close();
      }, duration);
    }
  }

  const close = () => {
    Animated.timing(opacityRef.current, {
      toValue: 0,
      easing: Easing.bezier(0.25, 1, 0.5, 1),
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    })
  }

  return (
    <Fragment>
      {
        visible ? (<View style={[styles.toastMask, maskStyle]} pointerEvents="auto">
          <Animated.View style={[styles.toastTextContainer, containerStyle, { opacity: opacityRef.current }]}>
            {
              typeof message === 'object' && message.render ? message.render() : (
                <Text style={textStyle}>{message}</Text>
              )
            }
          </Animated.View>
        </View>) : null
      }
    </Fragment>
  )
});

Toast.propTypes = {
  maskBackgroundColor: PropTypes.string,
  messageTextColor: PropTypes.string,
  messageTextFontSize: PropTypes.number,
  messageContainerBackgroundColor: PropTypes.string,
}

Toast.defaultProps = {
  maskBackgroundColor: 'rgba(255,255,255,1)',
  messageTextColor: '#ffffff',
  messageContainerBackgroundColor: 'rgba(0,0,0,0.8)',
  messageTextFontSize: 15,
}

const styles = StyleSheet.create({
  toastMask: {
    position: 'absolute',
    zIndex: 999,
    elevation: 999,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    paddingVertical: 20,
  },
  toastTextContainer: {
    paddingHorizontal: 10,
    borderRadius: 4,
    paddingVertical: 8,
    alignSelf: 'center',
  }
});

export default Toast;
