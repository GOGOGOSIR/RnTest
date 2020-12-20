import React, {PureComponent} from 'react';
import {View, Text, TextInput, Dimensions, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../../../../components/Icon/Icon';
import {throttle} from '../../../../utils/tools';

export default class SearchContainer extends PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    editable: PropTypes.bool,
    placeholderTextColor: PropTypes.string,
    returnKeyType: PropTypes.string,
    textAlign: PropTypes.string,
    containerStyle: PropTypes.object,
  };

  static defaultProps = {
    placeholder: '请输入要查找的内容',
    editable: true,
    placeholderTextColor: '#999999',
    returnKeyType: 'search',
    textAlign: 'left',
    containerStyle: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
    this.handleChangeText = this.handleChangeText.bind(this);
  }

  handleChangeText(newText) {
    console.log('changeText', newText);
    this.setState({
      searchValue: newText.trim(),
    });
  }

  render() {
    const {searchValue} = this.state;
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
          <View style={styles.searchCityWrapper}>
            <Text style={styles.cityName}>深圳</Text>
            <Icon name="show_more" size={12} color="#999" />
          </View>
          <Icon name="search" size={12} color="#333" />
          <TextInput
            style={styles.textInput}
            onChangeText={throttle(this.handleChangeText, 1000)}
            value={searchValue}
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
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 6,
    color: '#333',
  },
});
