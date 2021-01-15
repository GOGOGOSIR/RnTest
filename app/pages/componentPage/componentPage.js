import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import CustomSafeAreaView from '../../components/CustomSafeAreaView/CustomSafeAreaView';
import GeneralFlatList from '../../components/GeneralList/GeneralFlatList';
import Icon from '../../components/Icon/Icon';
class componentPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          label: 'icon',
          path: 'IconPage',
        },
        {
          label: '瀑布流组件',
          path: 'WaterFullPage',
        },
        {
          label: 'toast',
          path: 'ToastPage',
        },
        {
          label: 'dialog',
          path: 'DialogPage',
        },
      ],
    };
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem ({ item }) {
    return (
      <TouchableOpacity onPress={() => this.handleNavigateTo(item.path)}>
        <View style={styles.listItemWrapper}>
          <Text style={styles.listItemText}>{item.label}</Text>
          <Icon name="arrow_right" />
        </View>
      </TouchableOpacity>
    );
  }

  handleNavigateTo (path) {
    if (!path) {
      return;
    }
    this.props.navigation.navigate(path);
  }

  render () {
    const { list } = this.state;
    return (
      <GeneralFlatList
        renderData={list}
        renderItem={this._renderItem}
        pullUp={false}
        pullDown={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  listItemWrapper: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 65,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  listItemText: {
    fontSize: 18,
    color: '#666666',
    fontWeight: '500',
  },
});

export default CustomSafeAreaView()(componentPage);
