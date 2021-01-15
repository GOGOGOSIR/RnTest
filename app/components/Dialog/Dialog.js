import React, { useImperativeHandle, forwardRef, useRef, useState, Fragment } from 'react';
import { View, StyleSheet, Text, Animated, Easing, TouchableOpacity, InteractionManager } from 'react-native';
import PropTypes from 'prop-types';

const Dialog = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('confirm');
  const [dialogOptions, setDialogOptions] = useState({});

  const scaleRef = useRef(new Animated.Value(0.6));

  // 暴露给父组件使用的方法
  useImperativeHandle(ref, () => ({
    show: (data) => {
      open(data);
    },
    hide: () => {
      close();
    }
  }));

  const open = ({ message, type = 'confirm', dialogOptions = {} }) => {
    if (message) {
      if (typeof message === 'function') {
        setMessage({ render: message });
      } else {
        setMessage(message)
      }
    }
    setVisible(true);
    setType(type);
    setDialogOptions(dialogOptions);
    Animated.timing(scaleRef.current, {
      toValue: 1,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      useNativeDriver: true,
      duration: 200,
    }).start()
  }

  const close = () => {
    Animated.timing(scaleRef.current, {
      toValue: 0.6,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      useNativeDriver: true,
      duration: 200,
    })
    InteractionManager.runAfterInteractions(() => {
      setVisible(false);
    })
  }

  // 处理type为confirm的cancel回调
  const handleConfirmCancel = () => {
    const { onCancel } = dialogOptions;
    try {
      close();
      onCancel && onCancel();
    } catch (err) {
      console.log('err:', err);
    }
  }

  // 处理type为confirm的confirm的回调
  const handleConfirm = () => {
    const { onConfirm } = dialogOptions;
    try {
      close();
      onConfirm && onConfirm();
    } catch (err) {
      console.log('err:', err);
    }
  }

  // 渲染信息
  const renderMessage = (defaultElement) => {
    if (typeof message === 'object' && message.render) {
      return message.render()
    } else {
      return defaultElement
    }
  }

  // 渲染具体内容
  const renderContent = () => {
    const {
      confirmBtnText = '确定',
      cancelBtnText = '取消',
      confirmBtnTextColor = 'orange',
      cancelBtnTextColor = '#999'
    } = dialogOptions;
    if (type === 'confirm') {
      return (
        <Animated.View style={[styles.dialogContainer, {
          transform: [{
            scale: scaleRef.current
          }],
          width: '70%'
        }]}>
          <View style={styles.messageWrapper}>
            {
              renderMessage(<Text style={styles.confirmMessage}>{message}</Text>)
            }
          </View>
          <View style={styles.operateWrapper}>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmCancel}>
              <Text style={[styles.confirmBtnText, { color: cancelBtnTextColor }]}>{cancelBtnText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
              <Text style={[styles.confirmBtnText, { color: confirmBtnTextColor }]}>{confirmBtnText}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )
    }
  }

  return (
    <Fragment>
      {
        visible ? (
          <Animated.View style={styles.dialogMaskContainer}>
            {
              renderContent()
            }
          </Animated.View>
        ) : null
      }
    </Fragment>
  )
})

Dialog.propTypes = {
  containerWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}

Dialog.defaultProps = {
  containerWidth: '70%'
}

const styles = StyleSheet.create({
  dialogMaskContainer: {
    position: 'absolute',
    zIndex: 999,
    elevation: 999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  dialogContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  messageWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  confirmMessage: {
    fontSize: 14,
    color: '#333',
  },
  operateWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderTopColor: '#eee',
    borderStyle: 'solid',
  },
  confirmBtn: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBtnText: {
    fontSize: 14,
  }
})

export default Dialog;
