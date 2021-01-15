import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Dialog from '../../../components/Dialog/Dialog';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView/CustomSafeAreaView';

const DialogPage = () => {
  const dialogRef = useRef(null);

  const handleOpenConfirm = () => {
    dialogRef.current.show({
      message: 'hello world',
    })
  }

  return (
    <View style={styles.dialogWrapper}>
      <TouchableOpacity style={styles.btn} onPress={handleOpenConfirm}>
        <Text style={styles.btnText}>打开confirm</Text>
      </TouchableOpacity>
      <Dialog ref={dialogRef} />
    </View>
  )
}

const styles = StyleSheet.create({
  dialogWrapper: {
    flex: 1,
    position: 'relative',
  },
  btn: {
    height: 40,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'orange',
    marginHorizontal: 10,
  },
  btnText: {
    fontSize: 16,
    color: 'white',
  }
})

export default CustomSafeAreaView()(DialogPage);
