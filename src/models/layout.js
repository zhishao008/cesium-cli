export default {
  namespace: 'layout',
  state: {
    title: '默认标题',  //默认标题
    rightIcon: null, //标题右侧按钮
    pageComeDirection: "faderight"
  },
  subscriptions: {},
  effects: {},
  reducers: {
    updateTitle(state, action) {
      return {...state, ...action.payload};
    },
    updateRightIcon(state, action) {
      return {...state, ...action.payload};
    },
    updatePageComeDirection(state, action) {
      return {...state, ...action.payload};
    },
  }
};