import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  InteractionManager,
} from 'react-native';
import PropTypes from 'prop-types';
import {validateType} from '../../utils/validate/tools';
import StatusView from './StatusView';
import ListFooter from './ListFooter';

const DEFAULT_WRAPPER_STYLE = {
  backgroundColor: '#fff',
};
class GeneralFlatList extends PureComponent {
  static propTypes = {
    requestParams: PropTypes.object, // 接口的请求参数
    renderData: PropTypes.oneOfType([PropTypes.func, PropTypes.array]), // 渲染数据（可以使数组或是Promise函数）
    resTemplate: PropTypes.string, // res解构的字符串的集合
    formateResFunc: PropTypes.func, // 格式化res结果的函数
    renderItem: PropTypes.elementType, // flatList的renderItem
    flatListConfig: PropTypes.object, // 其他配置项
    wrapperStyle: PropTypes.object, // 容器的样式
    pullDown: PropTypes.bool,
    pullUp: PropTypes.bool,
  };

  static defaultProps = {
    pullDown: true,
    pullUp: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      renderList: [], // 渲染的列表
      isOver: false, // 是否到底了
      refreshStatus: false, // 刷新的状态
    };
    this.wrapperStyle = {
      ...DEFAULT_WRAPPER_STYLE,
      ...props.wrapperStyle,
    };
    this.flatListProps = {
      horizontal: false,
      onEndReachedThreshold: 0.1,
      // ListFooterComponent: <ListFooter />,
      showsVerticalScrollIndicator: false,
      ...props.flatListConfig,
    };
    this.loadMore = this.loadMore.bind(this);
    this.refreshList = this.refreshList.bind(this);
  }

  componentDidMount() {
    console.log('GeneralFlatList componentDidMount');
    this.getRenderList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.renderData !== prevProps.renderData) {
      console.log('GeneralFlatList componentDidUpdate');
      this.getRenderList();
    }
  }

  // 获取渲染数据
  async getRenderList() {
    const {requestParams, renderData, resTemplate, formateResFunc} = this.props;
    let list = [];
    if (Array.isArray(renderData)) {
      list = renderData;
    } else {
      const res = renderData(requestParams);
      if (res.then) {
        try {
          const result = await res;
          let data = null;
          if (!resTemplate) {
            data = result;
          } else {
            data = resTemplate.split('.').reduce((resultData, currentData) => {
              return resultData[currentData];
            }, result);
            if (formateResFunc && validateType(formateResFunc, 'Function')) {
              data = formateResFunc(data);
            }
          }
          list = data;
        } catch (err) {
          console.log('err:', err);
        }
      } else {
        list = Array.isArray(res) ? res : [];
      }
    }
    this.setState({
      renderList: list,
    });
  }

  // 加载更多
  loadMore() {}

  // 下拉刷新列表
  refreshList() {}

  render() {
    console.log('GeneralFlatList render');
    const {state, props, wrapperStyle, flatListProps} = this;
    const {renderItem, pullDown, pullUp} = props;
    const {renderList, refreshStatus} = state;

    // flatList的props
    const listProps = {
      ...flatListProps,
      refreshing: refreshStatus,
      keyExtractor: (item, index) => index.toString(),
    };
    pullDown && (listProps.onEndReached = this.loadMore);
    pullUp && (listProps.onRefresh = this.refreshList);

    return (
      <View style={[styles.listWrapper, wrapperStyle]}>
        {renderList.length ? (
          <FlatList data={renderList} renderItem={renderItem} {...listProps} />
        ) : (
          <StatusView />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listWrapper: {
    flex: 1,
  },
});

export default GeneralFlatList;
