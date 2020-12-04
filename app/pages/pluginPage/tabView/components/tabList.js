import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GeneralFlatList from '../../../../components/GeneralFlatList/GeneralFlatList';

export default class tabList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    this.renderListItem = this.renderListItem.bind(this);
    this.mockAsyncData = this.mockAsyncData.bind(this);
  }

  componentDidMount() {
    this.getList();
  }

  getList() {
    const result = [];
    const {tabLabel} = this.props;
    for (let i = 0; i < 20; i++) {
      result.push({
        label: `${tabLabel}${i + 1}`,
      });
    }
    this.setState({
      list: result,
    });
  }

  // mock async data
  mockAsyncData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = [];
        const {tabLabel} = this.props;
        for (let i = 0; i < 20; i++) {
          result.push({
            label: `${tabLabel}${i + 1}`,
          });
        }
        return result;
      }, 500);
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
    console.log(list);
    return (
      <GeneralFlatList
        renderData={this.mockAsyncData}
        renderItem={this.renderListItem}
        pullUp={false}
        pullDown={false}
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
