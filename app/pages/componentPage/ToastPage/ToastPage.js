import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from '../../../components/Toast/Toast';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView/CustomSafeAreaView';

const ToastPage = (props) => {
  const toastRef = useRef(null);

  const handleNormalToast = () => {
    toastRef.current.show({
      message: 'hello world',
      position: 'center'
    })
  }

  const handleManualToast = () => {
    toastRef.current.show({
      message: () => {
        return (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={styles.loadingText}>数据提交中...</Text>
          </View>
        )
      },
      position: 'bottom',
      duration: 0
    })

    setTimeout(() => {
      console.log('手动关闭')
      toastRef.current.hide()
    }, 3000)
  }

  return (<View style={styles.wrapper}>
    <LinearGradient style={styles.buttomWrapper} colors={['#4c669f', '#3b5998', '#192f6a']}>
      <TouchableOpacity style={styles.linearGradient} onPress={handleNormalToast}>
        <Text style={styles.buttonText}>
          自动关闭Toast
        </Text>
      </TouchableOpacity>
    </LinearGradient>
    <LinearGradient style={styles.buttomWrapper} colors={['red', 'orange']}>
      <TouchableOpacity style={styles.linearGradient} onPress={handleManualToast}>
        <Text style={styles.buttonText}>
          手动关闭Toast
        </Text>
      </TouchableOpacity>
    </LinearGradient>
    <Toast ref={toastRef} />
  </View>)
}

const styles = StyleSheet.create({
  buttomWrapper: {
    marginBottom: 10,
  },
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  loadingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  }
})

export default CustomSafeAreaView()(ToastPage);
