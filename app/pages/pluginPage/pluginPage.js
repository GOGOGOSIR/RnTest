import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

export default class pluginPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pluginList: [
        {
          label: 'react-native-snap-carousel',
          path: 'snapCarouselPage',
        },
      ],
    };
    this.renderListItem = this.renderListItem.bind(this);
  }

  handleNavigateTo(path) {
    if (!path) {
      return;
    }
    console.log(path, 'path');
    this.props.navigation.navigate(path);
  }

  renderListItem({item}) {
    return (
      <TouchableOpacity onPress={() => this.handleNavigateTo(item.path)}>
        <View style={styles.listItemWrapper}>
          <Text style={styles.listItemText}>{item.label}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {pluginList} = this.state;
    return (
      <FlatList
        style={styles.listWrapper}
        data={pluginList}
        renderItem={this.renderListItem}
        keyExtractor={(item) => item.path}
      />
    );
  }
}

const styles = StyleSheet.create({
  listWrapper: {
    backgroundColor: '#fff',
  },
  listItemWrapper: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  listItemText: {
    fontSize: 18,
    color: '#666666',
    fontWeight: '500',
  },
});
