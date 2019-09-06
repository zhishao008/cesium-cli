
import React from 'react';
import { TextareaItem, Button, WingBlank, Picker, List } from 'antd-mobile';
import { connect } from 'dva';
// import styles from './index.less';

class Report extends React.PureComponent {
  state = {
    value: '',
    data: [
      { value: '2018', label: '2018' },
      { value: '2017', label: '2017' },
      { value: '2016', label: '2016' },
      { value: '2015', label: '2015' }
    ],
    selectValue: [],
  }

  constructor(props){
    super(props);
    props.dispatch({
      type: 'layout/updateTitle',
      payload: { title: "隐患上报", rightIcon: null },
    });
  }

  submit = () => {
   console.log(this.state.value);
  }
  
  onInputChange = value => {
    this.setState({ value: value});
  }

  render() {
    const { data, selectValue } = this.state;
    return (
      <>
        <Picker
         data={data} 
         value={selectValue} 
         cols={1} 
         onOk={(v)=>this.setValue('11',v)}
         extra=""
         >
          <List.Item arrow="horizontal">上报至</List.Item>
        </Picker>
        <TextareaItem
          rows='6'
          labelNumber={5}
          placeholder='请输入备注内容'
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
export default connect(mapStateToProps)(Report);