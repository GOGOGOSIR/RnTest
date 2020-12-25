import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from '../../components/Icon/Icon';
import CustomSafeAreaView from '../../components/CustomSafeAreaView/CustomSafeAreaView';
import GeneralFlatList from '../../components/GeneralList/GeneralFlatList';
class pluginPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pluginList: [
        {
          label: 'swiper',
          path: 'SnapCarouselPage',
        },
        {
          label: 'tabView',
          path: 'TabViewPage',
        },
        {
          label: 'previewImage',
          path: 'PreviewImagePage',
        },
        {
          label: 'croperImage',
          path: 'CroperImagePage',
        },
      ],
    };
    this.renderListItem = this.renderListItem.bind(this);
  }

  handleNavigateTo(path) {
    if (!path) {
      return;
    }
    this.props.navigation.navigate(path);
  }

  renderListItem({item}) {
    return (
      <TouchableOpacity onPress={() => this.handleNavigateTo(item.path)}>
        <View style={styles.listItemWrapper}>
          <Text style={styles.listItemText}>{item.label}</Text>
          <Icon name="arrow_right" />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {pluginList} = this.state;
    console.log('render', pluginList);
    return (
      <GeneralFlatList
        renderData={pluginList}
        renderItem={this.renderListItem}
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

export default CustomSafeAreaView()(pluginPage);
