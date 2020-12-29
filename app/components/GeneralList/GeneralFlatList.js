import React, {PureComponent} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import StatusView from '../StatusView/StatusView';
import ListFooter from './ListFooter';

class GeneralFlatList extends PureComponent {
  static propTypes = {
    renderData: PropTypes.oneOfType([PropTypes.func, PropTypes.array]), // 渲染数据（可以使数组或是Promise函数）
    requestParams: PropTypes.object, // 接口的请求参数
    resSuccessCodeValue: PropTypes.string, // 数据请求成功的code码
    formateResData: PropTypes.func, // 格式化res结果的函数
    getResCodeValue: PropTypes.func, // 获取res状态码
    getTotalValue: PropTypes.func, // 获取总条数的值
    getPageSizeValue: PropTypes.func, // 获取单页展示的条数
    handleMergeData: PropTypes.func, // 处理数据合并的函数（应用场景：v2.37.0直播聚合页需求，需要特殊处理数据合并的逻辑）
    renderItem: PropTypes.elementType, // flatList的renderItem
    generalFlatListFooterComponent: PropTypes.func, // 自定义footer组件
    flatListProps: PropTypes.object, // 其他配置项
    wrapperStyle: PropTypes.object, // 容器的样式
    pullDown: PropTypes.bool, // 是否开启下拉刷新
    pullUp: PropTypes.bool, // 是否开启上拉加载更多
    loadMoreText: PropTypes.string, // 上拉加载更多footer组件加载更多的文案
    loadOverText: PropTypes.string, // 上拉加载更多footer组件全部加载完成时的文案
    refreshControlConfig: PropTypes.shape({
      // 下拉刷新的样式配置
      colors: PropTypes.array,
      enabled: PropTypes.bool,
      progressBackgroundColor: PropTypes.string,
      progressViewOffset: PropTypes.number,
      size: PropTypes.oneOf([
        RefreshControl.SIZE.DEFAULT,
        RefreshControl.SIZE.LARGE,
      ]),
      tintColor: PropTypes.string,
      title: PropTypes.string,
      titleColor: PropTypes.string,
    }),
  };

  static defaultProps = {
    pullDown: true,
    pullUp: true,
    loadMoreText: '加载数据中...',
    loadOverText: '没有更多数据了',
    resSuccessCodeValue: 'C0000',
    // 格式化处理res的默认函数
    formateResData: (res) => res.data.result.items || [],
    // 获取请求返回的code码的默认函数
    getResCodeValue: (res) => res.data.status || '',
    // 获取列表总条数的默认函数
    getTotalValue: (res) => res.data.result.pageCount || 0,
    // 获取单页的展示条数的默认函数
    getPageSizeValue: (res) => res.data.result.pageSize || 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      renderList: [], // 渲染的列表
      refreshStatus: false, // 刷新的状态
      status: '', // 当前组件的状态
    };

    this.loadMore = this.loadMore.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.renderFooterComponent = this.renderFooterComponent.bind(this);
    this.handleToggleEndReached = this.handleToggleEndReached.bind(this);

    // 分页的一些默认配置项
    this.currentPage = 1;
    this.totalCounts = 0;
    this.hasMoreFlag = true; // 是否还有更多数据
    // fix: 由于页面进入后会自动触发一次onEndReached事件，这与componentDidMount配合会造成重复请求数据
    this.isToggleEndReached = false; // 是否可以触发上拉加载更多事件

    /*
     * fix: Can't perform a React state update on an unmounted component
     * 当在componentDidMount请求数据还没有setState时,当用户退出页面，此时页面以卸载，此时异步请求在setState时就会出现内存泄漏
     */
    this._isMounted = false;
  }

  componentDidMount() {
    console.log('GeneralFlatList componentDidMount');
    this._isMounted = true;
    this.getRenderList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.renderData !== prevProps.renderData) {
      console.log('GeneralFlatList componentDidUpdate');
      this.getRenderList();
    }
    if (this.props.requestParams !== prevProps.requestParams) {
      console.log('参数变了，重新刷新');
      if (this.flatList) {
        this.flatList.scrollToOffset({
          offset: 0,
          animated: false,
        });
      }
      this.refreshList();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // 切换是否可以触发上拉加载更多事件的状态
  handleToggleEndReached() {
    this.isToggleEndReached = true;
  }

  // 获取渲染数据
  async getRenderList() {
    const {
      renderData,
      formateResData,
      getResCodeValue,
      getTotalValue,
      pullUp,
      requestParams,
      resSuccessCodeValue,
      getPageSizeValue,
      handleMergeData,
    } = this.props;
    let list = [];
    let status = '';
    if (Array.isArray(renderData)) {
      list = renderData;
      !list.length && (status = 'no-data-found');
    } else {
      const params = {
        currentPage: this.currentPage,
        ...requestParams,
      };
      const res = renderData(params);
      console.log(params, '=========params========');
      // 如果返回值是Promise
      if (res.then) {
        try {
          const response = await res;
          console.log(response, '===response==');
          let data = null;
          const resSuccessCode = getResCodeValue(response);
          if (resSuccessCodeValue === resSuccessCode) {
            data = formateResData(response);
            if (pullUp) {
              this.totalCounts = getTotalValue(response);
              this.pageSize = getPageSizeValue(response);
            }
            list = Array.isArray(data) ? data : [];
            // 判断是否还有更多数据
            if (pullUp) {
              // 如果当前累计数小于总数，将其认定所有数据加载完成
              const currentTotal = this.pageSize * this.currentPage;
              this.hasMoreFlag = this.totalCounts > currentTotal;
            }
            !list.length && (status = 'no-data-found');
          } else {
            status = 'request-failed';
          }
        } catch (err) {
          status = 'network-error';
          console.log('err:', err);
        } finally {
          this.isLoadMore = false;
        }
      } else {
        list = Array.isArray(res) ? res : [];
        !list.length && (status = 'no-data-found');
      }
    }
    const prevRenderList = this.currentPage === 1 ? [] : this.state.renderList;
    let mergeData = [];
    if (handleMergeData) {
      // 处理特殊的合并规则
      mergeData = handleMergeData(prevRenderList, list);
      console.log(mergeData, '处理后的mergeData');
    } else {
      mergeData = [...prevRenderList, ...list];
    }
    if (this._isMounted) {
      this.setState({
        renderList: mergeData,
        refreshStatus: false,
        status,
      });
    }
  }

  // 加载更多
  loadMore() {
    if (this.isToggleEndReached && this.hasMoreFlag && !this.isLoadMore) {
      this.isLoadMore = true;
      this.currentPage++;
      this.getRenderList();
    }
  }

  // 下拉刷新列表
  refreshList(isChangeRefreshStatus = true) {
    console.log('refreshList');
    this.currentPage = 1;
    this.hasMoreFlag = true;
    if (isChangeRefreshStatus) {
      this.setState(
        {
          refreshStatus: true,
        },
        this.getRenderList,
      );
    } else {
      this.getRenderList();
    }
  }

  // 提供给外部获取数据的
  getRenderListData() {
    return JSON.parse(JSON.stringify(this.state.renderList));
  }

  // 渲染footer组件
  renderFooterComponent() {
    const {
      generalFlatListFooterComponent,
      loadMoreText,
      loadOverText,
    } = this.props;
    return (
      <>
        {generalFlatListFooterComponent ? (
          generalFlatListFooterComponent(this.hasMoreFlag)
        ) : (
          <ListFooter
            hasMoreFlag={this.hasMoreFlag}
            loadMoreText={loadMoreText}
            loadOverText={loadOverText}
          />
        )}
      </>
    );
  }

  render() {
    const {
      renderItem,
      pullDown,
      pullUp,
      flatListProps,
      wrapperStyle,
      refreshControlConfig,
    } = this.props;
    const {renderList, status, refreshStatus} = this.state;
    // flatList的props
    const listProps = {
      horizontal: false,
      onEndReachedThreshold: 0.1,
      showsVerticalScrollIndicator: false,
      keyExtractor: (item, index) => index.toString(),
      ...flatListProps,
    };
    if (pullUp) {
      listProps.onEndReached = this.loadMore;
      listProps.onMomentumScrollBegin = this.handleToggleEndReached;
    }
    if (pullDown) {
      listProps.refreshControl = (
        <RefreshControl
          refreshing={refreshStatus}
          onRefresh={this.refreshList}
          {...refreshControlConfig}
        />
      );
    }
    console.log('GeneralFlatList render');
    return (
      <View style={[styles.listWrapper, wrapperStyle]}>
        {renderList.length ? (
          <FlatList
            ref={(ref) => (this.flatList = ref)}
            data={renderList}
            renderItem={renderItem}
            {...listProps}
            ListFooterComponent={pullUp ? this.renderFooterComponent() : null}
          />
        ) : (
          <StatusView status={status} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listWrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default GeneralFlatList;
