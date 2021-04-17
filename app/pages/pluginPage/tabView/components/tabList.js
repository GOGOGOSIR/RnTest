import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GeneralFlatList from '../../../../components/GeneralList/GeneralFlatList';
export default class tabList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    this.renderListItem = this.renderListItem.bind(this);
    this.mockAsyncData = this.mockAsyncData.bind(this);
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
  mockAsyncData({currentPage}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = [];
        const {tabLabel} = this.props;
        for (let i = (currentPage - 1) * 20; i < currentPage * 20; i++) {
          result.push({
            label: `${tabLabel}${i + 1}`,
          });
        }
        resolve({
          data: {
            result,
            totalCounts: 100,
            pageSize: 20,
            status: 'C0000',
          },
        });
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

  formateResData = (res) => res.data.result || [];

  getTotalValue = (res) => res.data.totalCounts || 0;

  getPageSizeValue = (res) => res.data.pageSize || 0;

  render() {
    const {list} = this.state;
    console.log(list);
    return (
      <GeneralFlatList
        renderData={this.mockAsyncData}
        renderItem={this.renderListItem}
        formatResData={this.formateResData}
        getTotalValue={this.getTotalValue}
        getPageSizeValue={this.getPageSizeValue}
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
