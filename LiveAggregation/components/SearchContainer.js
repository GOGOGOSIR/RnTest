/* eslint-disable react/sort-comp */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import {
  View, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity, DeviceEventEmitter,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../../../../components/Icon/index';
import PublicStore from '../../../../common/PublicStore';

export default class SearchContainer extends PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    editable: PropTypes.bool,
    placeholderTextColor: PropTypes.string,
    returnKeyType: PropTypes.string,
    textAlign: PropTypes.string,
    containerStyle: PropTypes.object,
    handleSearch: PropTypes.func,
    cityName: PropTypes.string,
  };

  static defaultProps = {
    placeholder: '请输入要查找的内容',
    editable: true,
    placeholderTextColor: '#999999',
    returnKeyType: 'search',
    textAlign: 'left',
    containerStyle: {},
    handleSearch: null,
    cityName: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      cityName: '',
      // eslint-disable-next-line react/no-unused-state
      cityCode: '',
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.onSubmitEditing = this.onSubmitEditing.bind(this);
    this.goCityPage = this.goCityPage.bind(this);
    this.updateCityData = this.updateCityData.bind(this);
  }

  componentDidMount () {
    this.initCityData();
    this.subscription = DeviceEventEmitter.addListener('refeshGardenList', this.updateCityData);
  }

  componentWillUnmount () {
    this.subscription.remove();
  }

  componentDidUpdate (prevProps) {
    const { cityName } = this.props;
    if (prevProps.cityName !== cityName) {
      this.setState({
        cityName,
      });
    }
  }

  // 初始化城市数据（取当前登入用户所在城市信息）
  initCityData() {
    const { personalInfo } = PublicStore;
    const cityNameArr = personalInfo.cuLocalCityName || [];
    const cityCodeArr = personalInfo.cuLocalCity.split(',') || [];
    this.setState({
      cityName: cityNameArr[0] || '',
      cityCode: cityCodeArr[0] || '',
    });
  }

  // 更新城市数据
  updateCityData (data) {
    const { handleSearch } = this.props;
    const { searchValue } = this.state;
    const { cityCode, cityName } = data;
    this.setState({
      cityCode,
      cityName,
    });
    if (handleSearch) {
      handleSearch({ cityCode, cityName, searchValue });
    }
  }

  handleChangeText(text) {
    this.setState({ searchValue: text.trim() });
  }

  // 处理用户点击搜素按钮事件
  onSubmitEditing({ nativeEvent: { text } }) {
    const { handleSearch } = this.props;
    const { cityCode, cityName } = this.state;
    if (handleSearch) {
      handleSearch({ cityCode, cityName, searchValue: text.trim() });
    }
  }

  // 跳转至城市页面
  goCityPage () {
    const { navigation } = this.props;
    navigation.navigate('CityList');
  }

  render() {
    const { cityName, searchValue } = this.state;
    const {
      placeholder,
      editable,
      placeholderTextColor,
      returnKeyType,
      textAlign,
      containerStyle,
    } = this.props;

    return (
      <View style={[styles.wrapper, containerStyle]}>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchCityWrapper} onPress={this.goCityPage}>
            <Text style={styles.cityName}>{cityName}</Text>
            <Icon name="xiajiantou" size={8} color="#999" />
          </TouchableOpacity>
          <Icon name="sousuo" size={12} color="#333" />
          <TextInput
            style={styles.textInput}
            value={searchValue}
            onChangeText={this.handleChangeText}
            onSubmitEditing={this.onSubmitEditing}
            editable={editable}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            returnKeyType={returnKeyType}
            textAlign={textAlign}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  searchContainer: {
    flex: 1,
    height: 37,
    backgroundColor: '#fff',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#eee',
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchCityWrapper: {
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#eee',
    borderStyle: 'solid',
    marginRight: 16,
  },
  cityName: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
    marginRight: 4,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 6,
    color: '#333',
  },
});
