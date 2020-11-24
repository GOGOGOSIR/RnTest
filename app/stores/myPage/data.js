import {observable, action, computed} from 'mobx';

// export const listData = observable(
//   {
//     list: [1, 2, 4],
//     get count() {
//       return this.list.length;
//     },

//     addList(list) {
//       console.log(list, '====list==');
//       this.list = list;
//     },
//   },
//   {
//     addList: action,
//   },
// );

class MyStore {
  @observable isAdd = false;
  @observable list = [1, 2, 4];

  constructor() {
    // makeObservable(this);
  }

  @computed get operateBtnText() {
    return !this.isAdd ? '新增' : '重置';
  }
  @computed get count() {
    return this.list.length;
  }

  @action
  changeAddStatus(status) {
    this.isAdd = status;
    console.log('status', this.isAdd);
  }
  @action
  addList(list) {
    this.list = list;
    console.log(this.list, '=list=222=');
  }
}

export default new MyStore();
