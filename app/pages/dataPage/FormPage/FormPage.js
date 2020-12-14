import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Picker from 'react-native-picker';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView/CustomSafeAreaView';
import Icon from '../../../components/Icon/Icon';

const DEFAULT_PICKER_CONFIG = {
  pickerConfirmBtnText: '确认',
  pickerCancelBtnText: '取消',
  pickerTitleText: '',
  pickerConfirmBtnColor: [62, 175, 124, 1],
  pickerCancelBtnColor: [102, 102, 102, 1],
  pickerToolBarBg: [255, 255, 255, 1],
  pickerBg: [255, 255, 255, 1],
  pickerToolBarFontSize: 16,
  pickerFontSize: 16,
  pickerFontColor: [3, 3, 3, 1],
};
const SEX_OPTIONS = [
  {
    value: 0,
    label: '男',
  },
  {
    value: 1,
    label: '女',
  },
];
@CustomSafeAreaView()
class FormPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sex: '',
    };
    this.handleSexPicker = this.handleSexPicker.bind(this);
  }

  handleSexPicker() {
    const sexPickerData = SEX_OPTIONS.map((item) => item.label);
    Picker.init({
      ...DEFAULT_PICKER_CONFIG,
      pickerData: sexPickerData,
    });
    Picker.show();
  }

  render() {
    const {sex} = this.state;
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={0}>
          <View style={styles.formItem}>
            <Text style={styles.labelText}>姓名:</Text>
            <TextInput
              style={styles.formInput}
              maxLength={5}
              placeholder="请输入姓名"
              placeholderTextColor="#ccc"
              selectionColor="#3eaf7c"
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.labelText}>密码:</Text>
            <TextInput
              style={styles.formInput}
              placeholder="请输入密码"
              placeholderTextColor="#ccc"
              secureTextEntry={true}
              selectionColor="#3eaf7c"
            />
          </View>

          <View style={styles.formItem}>
            <Text style={styles.labelText}>性别:</Text>
            <TouchableOpacity
              style={styles.formSelect}
              onPress={this.handleSexPicker}>
              <Text style={sex ? styles.selectText : styles.selectHolder}>
                {sex || '请选择性别'}
              </Text>
              <Icon name="arrow_right" color="#ccc" />
            </TouchableOpacity>
          </View>
          <View style={styles.formItem}>
            <Text style={styles.labelText}>备注:</Text>
            <TextInput
              style={styles.formTextArea}
              multiline
              textAlignVertical="top"
              placeholder="请输入备注"
              placeholderTextColor="#ccc"
              selectionColor="#3eaf7c"
            />
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.submitWrapper}>
          <TouchableOpacity>
            <View style={styles.submitBtn}>
              <Text style={styles.submitText}>提交</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formItem: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  labelText: {
    marginTop: 9,
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  formInput: {
    flex: 1,
    height: 40,
    borderColor: '#999',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 3,
    paddingHorizontal: 10,
  },
  formTextArea: {
    flex: 1,
    height: 100,
    borderColor: '#999',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 3,
    paddingHorizontal: 10,
  },
  formSelect: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    borderColor: '#999',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 3,
  },
  selectText: {
    fontSize: 14,
    color: '#333',
  },
  selectHolder: {
    fontSize: 14,
    color: '#ccc',
  },
  submitWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  submitBtn: {
    width: 220,
    height: 40,
    borderRadius: 6,
    flexDirection: 'row',
    backgroundColor: '#3eaf7c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default FormPage;
