import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

export default class tabList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    this.renderListItem = this.renderListItem.bind(this);
  }

  componentDidMount() {
    this.getList();
  }

  getList() {
    const result = [];
    const {tabLabel} = this.props;
    for (let i = 0; i < 10; i++) {
      result.push({
        label: `${tabLabel}${i + 1}`,
      });
    }
    this.setState({
      list: result,
    });
  }

  renderListItem({item}) {
    return (
      <View style={styles.listItemWrapper}>
        <Text style={styles.listItemText}>{item.label}</Text>
      </View>
    );
  }

  render() {
    const {list} = this.state;
    return (
      <FlatList
        style={styles.listWrapper}
        data={list}
        renderItem={this.renderListItem}
        keyExtractor={(item) => item.label}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  listWrapper: {
    flex: 1,
  },
  listItemWrapper: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'flex-start',
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
