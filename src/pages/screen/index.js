
import React from 'react';
import { Button, WingBlank, Picker, DatePicker, List, InputItem  } from 'antd-mobile';
import { connect } from 'dva';
// import styles from './index.less';
class Screen extends React.PureComponent {
  state = {
    data: [
      { value: '2018', label: '2018' },
      { value: '2017', label: '2017' },
      { value: '2016', label: '2016' },
      { value: '2015', label: '2015' }
    ],
    selectValue: [],
    date: ''
  }

  constructor(props){
    super(props);
    props.dispatch({
      type: 'layout/updateTitle',
      payload: { title: "筛选", rightIcon: null },
    });
  }

  submit = () => {
   console.log(this.state.value);
  }

  setValue = (a,b) => {
    console.log(a);
    console.log(b);
    this.setState({ selectValue: b});
  }
  onInputChange = (value) => {
    console.log(value);
  }
  render() {
    const { data, selectValue, date } = this.state;
    return (
      <>
        <Picker
         data={data} 
         value={selectValue} 
         cols={1} 
         onOk={(v)=>this.setValue('11',v)}
         extra=""
         >
          <List.Item arrow="horizontal">隐患来源</List.Item>
        </Picker>
        <DatePicker
          mode="datetime"
          title="选择日期"
          extra=""
          value={date}
          onChange={date => this.setState({ date })}
        >
          <List.Item arrow="horizontal">发现时间</List.Item>
        </DatePicker>
        <InputItem
            placeholder="请输入发现者名称"
            onChange={this.onInputChange}
          />
        <WingBlank size="lg"><Button type="primary" onClick={this.submit}>提交</Button></WingBlank>
      </>
    );
  }
}

//每个组件都需要从model/ducks层获取下
function mapStateToProps(state) {
  const { title } = state.layout;
  return {
    title
  };
}
export default connect(mapStateToProps)(Screen);