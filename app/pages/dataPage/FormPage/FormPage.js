import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView/CustomSafeAreaView';

@CustomSafeAreaView()
class FormPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
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
        </ScrollView>
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
    // alignItems: 'center',
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
