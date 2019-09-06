
import React from 'react';
import { TextareaItem, Button, WingBlank, List } from 'antd-mobile';
import { connect } from 'dva';
// import styles from './index.less';

class ExtensionDetail extends React.PureComponent {
  state = {
    value: ''
  }

  constructor(props){
    super(props);
    props.dispatch({
      type: 'layout/updateTitle',
      payload: { title: "延期详情", rightIcon: null },
    });
  }

  submit = () => {
   console.log(this.state.value);
  }
  
  onInputChange = value => {
    this.setState({ value: value});
  }

  render() {
    return (
      <>
        <List>
          <List.Item
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            arrow="empty"
            onClick={() => {}}
            extra='原计划完成时间'
          >原计划完成时间</List.Item>
          <List.Item
            thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
            onClick={() => {}}
            arrow="empty"
            extra='2019-08-21'
          >
            延期至
          </List.Item>
        </List>
        <TextareaItem
          rows='6'
          labelNumber={5}
          placeholder='请输入审核意见【必填】'
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
export default connect(mapStateToProps)(ExtensionDetail);