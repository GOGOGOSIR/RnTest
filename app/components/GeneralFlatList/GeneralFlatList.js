import React, {PureComponent} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import {validateType} from '../../utils/validate/tools';
import StatusView from '../StatusView/StatusView';
import ListFooter from './ListFooter';
class GeneralFlatList extends PureComponent {
  static propTypes = {
    requestParams: PropTypes.object, // 接口的请求参数
    renderData: PropTypes.oneOfType([PropTypes.func, PropTypes.array]), // 渲染数据（可以使数组或是Promise函数）
    resDataTemplate: PropTypes.string, // 列表数据的解构的字符串的集合
    resTotalTemplate: PropTypes.string, // 列表数据总数的解构的字符串的集合
    margeDataFunc: PropTypes.func,
    formateResFunc: PropTypes.func, // 格式化res结果的函数
    renderItem: PropTypes.elementType, // flatList的renderItem
    flatListProps: PropTypes.object, // 其他配置项
    wrapperStyle: PropTypes.object, // 容器的样式
    pullDown: PropTypes.bool, // 是否开启下拉刷新
    pullUp: PropTypes.bool, // 是否开启上拉加载更多
    loadMoreText: PropTypes.string, // 上拉加载更多footer组件加载更多的文案
    loadOverText: PropTypes.string, // 上拉加载更多footer组件全部加载完成时的文案
    pageSize: PropTypes.number, // 每页加载多少条数据
    refreshControlConfig: PropTypes.shape({
      // 下拉刷新的样式配置
      colors: PropTypes.Array,
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
    loadMoreText: '加载中...',
    loadOverText: '到底了~',
    pageSize: 20,
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
    this.getRenderList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.renderData !== prevProps.renderData) {
      console.log('GeneralFlatList componentDidUpdate');
      this.getRenderList();
    }
    if (this.props.requestParams !== prevProps.requestParams) {
      console.log('重置');
      this.flatList.scrollToOffset({
        offset: 0,
        animated: false,
      });
      this.refreshList();
    }
  }

  // 获取渲染数据
  async getRenderList() {
    const {
      renderData,
      resDataTemplate,
      resTotalTemplate,
      formateResFunc,
      pullUp,
      pageSize,
      requestParams,
      margeDataFunc,
    } = this.props;
    let list = [];
    let isReloadData = false;
    // 判断是否可以加载更多
    if (pullUp && this.isLoadMore) {
      if (this.hasMoreFlag) {
        console.log('currentPage change');
        this.currentPage++;
        const currentTotal = pageSize * this.currentPage;
        this.hasMoreFlag = this.totalCounts > currentTotal;
      }
      this.isLoadMore = false;
    }
    if (Array.isArray(renderData)) {
      list = renderData;
    } else {
      const res = renderData({
        currentPage: this.currentPage,
        pageSize,
        ...requestParams,
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
          list = Array.isArray(data) ? data : [];
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
    let margeData = [...prevRenderList, ...list];
    if (margeDataFunc) {
      margeData = margeDataFunc(prevRenderList, list);
      console.log('合成后的data', margeData);
    }
    this.setState({
      renderList: margeData,
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

  // 提供给外部获取数据的
  getRenderListData() {
    return JSON.parse(JSON.stringify(this.state.renderList));
  }

  render() {
    const {hasMoreFlag} = this;
    const {
      renderItem,
      pullDown,
      pullUp,
      loadMoreText,
      loadOverText,
      flatListProps,
      wrapperStyle,
      refreshControlConfig,
      // customListFooterComponent,
    } = this.props;
    const {renderList, isReloadData, refreshStatus} = this.state;
    // flatList的props
    const listProps = {
      horizontal: false,
      onEndReachedThreshold: 0.1,
      showsVerticalScrollIndicator: false,
      keyExtractor: (item, index) => index.toString(),
      ...flatListProps,
    };
    pullUp && (listProps.onEndReached = this.loadMore);
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
    backgroundColor: '#ffffff',
  },
});

export default GeneralFlatList;
