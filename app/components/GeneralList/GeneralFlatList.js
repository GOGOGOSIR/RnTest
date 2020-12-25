import React, {PureComponent} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import {validateType} from '../../utils/validate/index';
import StatusView from '../StatusView/StatusView';
import ListFooter from './ListFooter';

class GeneralFlatList extends PureComponent {
  static propTypes = {
    renderData: PropTypes.oneOfType([PropTypes.func, PropTypes.array]), // 渲染数据（可以使数组或是Promise函数）
    requestParams: PropTypes.object, // 接口的请求参数
    resDataTemplate: PropTypes.string, // 列表数据的解构的字符串的集合
    resTotalTemplate: PropTypes.string, // 列表数据总数的解构的字符串的集合
    resSuccessCodeTemplate: PropTypes.string, // 列表数据请求成功的code码的解构的字符串的集合
    resPageSizeTemplate: PropTypes.string, // pageSize解构的字符串
    resSuccessCodeValue: PropTypes.string, // 数据请求成功的code码
    formateResFunc: PropTypes.func, // 格式化res结果的函数
    mergeDataFunc: PropTypes.func, // 处理数据合并的函数（应用场景：v2.37.0直播聚合页需求，需要特殊处理数据合并的逻辑）
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
    resDataTemplate: 'data.result.items',
    resTotalTemplate: 'data.result.pageCount',
    resPageSizeTemplate: 'data.reults.pageSize',
    resSuccessCodeTemplate: 'data.status',
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

  // 解构出想要的数据
  findEffectData(temp, data, defaultData) {
    return !temp
      ? defaultData
      : temp
          .split('.')
          .reduce(
            (resultData, currentData) => resultData[currentData] || defaultData,
            data,
          );
  }

  // 获取渲染数据
  async getRenderList() {
    const {
      renderData,
      resDataTemplate,
      resTotalTemplate,
      formateResFunc,
      pullUp,
      requestParams,
      resSuccessCodeValue,
      resSuccessCodeTemplate,
      resPageSizeTemplate,
      mergeDataFunc,
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
          const resSuccessCode = this.findEffectData(
            resSuccessCodeTemplate,
            response,
            '',
          );
          if (resSuccessCodeValue === resSuccessCode) {
            if (!resDataTemplate) {
              data = response;
            } else {
              data = this.findEffectData(resDataTemplate, response, []);
              if (formateResFunc && validateType(formateResFunc, 'Function')) {
                data = formateResFunc(data);
              }
            }
            if (resTotalTemplate && pullUp) {
              this.totalCounts = this.findEffectData(
                resTotalTemplate,
                response,
                0,
              );
            }
            if (resPageSizeTemplate && pullUp) {
              this.pageSize = this.findEffectData(
                resPageSizeTemplate,
                response,
                0,
              );
            }
            list = Array.isArray(data) ? data : [];
            // 判断是否还有更多数据
            if (pullUp) {
              // list数量小于pageSize数，将其认定所有数据加载完成
              this.hasMoreFlag = !(list.length < this.pageSize);
              if (this.isLoadMore) {
                // 如果当前累计数小于总数，将其认定所有数据加载完成
                if (this.hasMoreFlag) {
                  const currentTotal = this.pageSize * this.currentPage;
                  console.log('load More');
                  this.hasMoreFlag = this.totalCounts > currentTotal;
                }
                this.isLoadMore = false;
              }
            }
            !list.length && (status = 'no-data-found');
          } else {
            status = 'request-failed';
          }
        } catch (err) {
          status = 'network-error';
          console.log('err:', err);
        }
      } else {
        list = Array.isArray(res) ? res : [];
        !list.length && (status = 'no-data-found');
      }
    }
    const prevRenderList = this.currentPage === 1 ? [] : this.state.renderList;
    let mergeData = [...prevRenderList, ...list];
    if (mergeDataFunc) {
      // 处理特殊的合并规则
      mergeData = mergeDataFunc(prevRenderList, list);
      console.log(mergeData, '处理后的mergeData');
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
