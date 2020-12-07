import React, {PureComponent} from 'react';
import {
  View,
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
    resDataTemplate: PropTypes.string, // 列表数据的解构的字符串的集合
    resTotalTemplate: PropTypes.string, // 列表数据总数的解构的字符串的集合
    formateResFunc: PropTypes.func, // 格式化res结果的函数
    renderItem: PropTypes.elementType, // flatList的renderItem
    flatListConfig: PropTypes.object, // 其他配置项
    wrapperStyle: PropTypes.object, // 容器的样式
    pullDown: PropTypes.bool,
    pullUp: PropTypes.bool,
    // customListFooterComponent: PropTypes.elementType, // 自定义上拉加载更多footer组件
    loadMoreText: PropTypes.string, // 上拉加载更多footer组件加载更多的文案
    loadOverText: PropTypes.string, // 上拉加载更多footer组件全部加载完成时的文案
  };

  static defaultProps = {
    pullDown: true,
    pullUp: true,
    loadMoreText: '加载中...',
    loadOverText: '到底了~',
  };

  constructor(props) {
    super(props);
    this.state = {
      renderList: [], // 渲染的列表
      isReloadData: false, // 是否加载完成首屏的异步的数据
      refreshStatus: false, // 刷新的状态
    };

    this.loadMore = this.loadMore.bind(this);
    this.refreshList = this.refreshList.bind(this);

    // 分页的一些默认配置项
    this.currentPage = 1;
    this.totalCounts = 0;
    this.hasMoreFlag = true; // 是否还有更多数据
  }

  componentDidMount() {
    console.log('GeneralFlatList componentDidMount');
    this.initFlatList();
    this.getRenderList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.renderData !== prevProps.renderData) {
      console.log('GeneralFlatList componentDidUpdate');
      this.getRenderList();
    }
  }

  // 初始化FlatList的一些配置
  initFlatList() {
    const {flatListConfig, requestParams, wrapperStyle} = this.props;
    this.wrapperStyle = {
      ...DEFAULT_WRAPPER_STYLE,
      ...wrapperStyle,
    };
    this.flatListProps = {
      horizontal: false,
      onEndReachedThreshold: 0.1,
      showsVerticalScrollIndicator: false,
      ...flatListConfig,
    };
    this.requestParams = {
      pageSize: 20,
      ...requestParams,
    };
  }

  // 获取渲染数据
  async getRenderList() {
    const {
      renderData,
      resDataTemplate,
      resTotalTemplate,
      formateResFunc,
      pullUp,
    } = this.props;
    let list = [];
    let isReloadData = false;
    // 判断是否可以加载更多
    if (pullUp && this.isLoadMore) {
      if (this.hasMoreFlag) {
        console.log('currentPage change');
        this.currentPage++;
        const currentTotal = this.requestParams.pageSize * this.currentPage;
        this.hasMoreFlag = this.totalCounts > currentTotal;
      }
      this.isLoadMore = false;
    }
    if (Array.isArray(renderData)) {
      list = renderData;
    } else {
      const res = renderData({
        currentPage: this.currentPage,
        ...this.requestParams,
      });
      if (res.then) {
        try {
          const result = await res;
          let data = null;
          if (!resDataTemplate) {
            data = result;
          } else {
            data = this.findEffectData(resDataTemplate, result, []);
            if (formateResFunc && validateType(formateResFunc, 'Function')) {
              data = formateResFunc(data);
            }
          }
          if (resTotalTemplate && pullUp) {
            this.totalCounts = this.findEffectData(resTotalTemplate, result, 0);
          }
          list = data;
        } catch (err) {
          isReloadData = true;
          console.log('err:', err);
        }
      } else {
        list = Array.isArray(res) ? res : [];
      }
    }
    isReloadData = true;
    const prevRenderList = this.currentPage === 1 ? [] : this.state.renderList;
    this.setState({
      renderList: [...prevRenderList, ...list],
      isReloadData,
      refreshStatus: false,
    });
  }

  // 解构出想要的数据
  findEffectData(temp, data, defaultData) {
    return temp.split('.').reduce((resultData, currentData) => {
      return resultData[currentData] || defaultData;
    }, data);
  }

  // 加载更多
  loadMore() {
    if (this.hasMoreFlag && !this.isLoadMore) {
      this.isLoadMore = true;
      console.log('load-more');
      this.getRenderList();
    }
  }

  // 下拉刷新列表
  refreshList() {
    console.log('refreshList');
    this.currentPage = 1;
    this.hasMoreFlag = true;
    this.setState(
      {
        refreshStatus: true,
      },
      this.getRenderList,
    );
  }

  render() {
    console.log('GeneralFlatList render');
    const {state, props, wrapperStyle, flatListProps, hasMoreFlag} = this;
    const {
      renderItem,
      pullDown,
      pullUp,
      loadMoreText,
      loadOverText,
      // customListFooterComponent,
    } = props;
    const {renderList, isReloadData, refreshStatus} = state;

    // flatList的props
    const listProps = {
      ...flatListProps,
      refreshing: refreshStatus,
      keyExtractor: (item, index) => index.toString(),
    };
    pullUp && (listProps.onEndReached = this.loadMore);
    pullDown && (listProps.onRefresh = this.refreshList);
    console.log('g-render', renderList);
    return (
      <View style={[styles.listWrapper, wrapperStyle]}>
        {renderList.length ? (
          <FlatList
            data={renderList}
            renderItem={renderItem}
            {...listProps}
            ListFooterComponent={
              pullUp ? (
                <ListFooter
                  hasMoreFlag={hasMoreFlag}
                  loadMoreText={loadMoreText}
                  loadOverText={loadOverText}
                />
              ) : null
            }
          />
        ) : (
          <StatusView isReload={isReloadData} />
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
