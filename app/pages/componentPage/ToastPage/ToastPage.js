import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AppRegistry } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from '../../../components/Toast/Toast';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView/CustomSafeAreaView';

const ToastPage = (props) => {
  const toastRef = useRef(null);
  let toast1 = null

  useEffect(() => {
    console.log('useEffect')
    // console.log('toast', toastRef.current)
  }, [])

  const handleCenterToast = () => {
    console.log('toast', toastRef.current)
    toastRef.current.show()
  }

  return (<View style={styles.wrapper}>
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}>
      <TouchableOpacity style={styles.linearGradient} onPress={handleCenterToast}>
        <Text style={styles.buttonText}>
          打开中间的Toast
        </Text>
      </TouchableOpacity>
    </LinearGradient>
    <Toast ref={toastRef} message={'212221'} />
  </View>)
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    // backgroundColor: 'red'
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
})

export default CustomSafeAreaView()(ToastPage);
