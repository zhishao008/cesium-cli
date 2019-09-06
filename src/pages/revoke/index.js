
import React from 'react';
import { TextareaItem } from 'antd-mobile';
import { connect } from 'dva';
// import styles from './index.less';
class Revoke extends React.PureComponent {
  state = { value: '' }
  constructor(props){
    super(props);
    props.dispatch({
      type: 'layout/updateTitle',
      payload: {title: "撤销", rightIcon: <span onClick={this.submit}>提交</span>},
    });
  }

  submit = () => {
   console.log(this.state.value);
  }

  onChange = (value) => {
    this.setState({ value: value});
  }

  render() {
    return (
      <>
        <TextareaItem
          rows='6'
          labelNumber={5}
          placeholder='请填写撤销备注'
          onChange={this.onChange}
        />
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
export default connect(mapStateToProps)(Revoke);