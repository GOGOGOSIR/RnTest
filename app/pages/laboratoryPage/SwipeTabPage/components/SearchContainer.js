import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../../../../components/Icon/Icon';

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
      cityCode: '',
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.onSubmitEditing = this.onSubmitEditing.bind(this);
  }

  componentDidMount() {
    this.initCityData();
  }

  componentDidUpdate(prevProps) {
    const {cityName} = this.props;
    if (prevProps.cityName !== cityName) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        cityName,
      });
    }
  }

  // 初始化城市数据（取当前登入用户所在城市信息）
  initCityData() {
    this.setState({
      cityName: '深圳',
      cityCode: '',
    });
  }

  handleChangeText(text) {
    this.setState({searchValue: text.trim()});
  }

  // 处理用户点击搜素按钮事件
  onSubmitEditing({nativeEvent: {text}}) {
    const {handleSearch} = this.props;
    const {cityCode, cityName} = this.state;
    if (handleSearch) {
      handleSearch({cityCode, cityName, searchValue: text.trim()});
    }
  }

  render() {
    const {cityName, searchValue} = this.state;
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
          <TouchableOpacity style={styles.searchCityWrapper}>
            <Text style={styles.cityName}>{cityName}</Text>
            <Icon name="show_more" size={12} color="#999" />
          </TouchableOpacity>
          <Icon name="search" size={12} color="#333" />
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
