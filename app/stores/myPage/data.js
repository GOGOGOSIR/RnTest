import {observable, action, computed, autorun, toJS} from 'mobx';

export const listData = observable(
  {
    list: [1, 2, 4],
    get count() {
      return this.list.length;
    },

    addList(list) {
      this.list = list;
    },
  },
  {
    addList: action,
  },
);

export default class MyStore {
  constructor() {}

  @observable isAdd = false;

  @computed get operateBtnText() {
    return !this.isAdd ? '新增' : '重置';
  }

  @action
  changeAddStatus(status) {
    this.isAdd = status;
  }
}

autorun(() => {
  console.log(listData.list, 'list change');
  console.log(toJS(listData.list), 'operateBtnText change');
});
