
import React from 'react';
import { Switch, List, Picker } from 'antd-mobile';
import { connect } from 'dva';
// import styles from './index.less';
class DangerAssessment extends React.PureComponent {
  state = {
    value: '',
    checked: false, 
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
      payload: {title: "隐患评估", rightIcon: <span onClick={this.submit}>提交</span>},
    });
  }

  submit = () => {
   console.log(this.state.value);
  }

  onChange = (value) => {
    this.setState({ value: value});
  }

  render() {
    const { data, selectValue } = this.state;
    return (
      <>
        <List>
          <List.Item
            extra={<Switch
              checked={this.state.checked}
              onChange={() => {
                this.setState({
                  checked: !this.state.checked,
                });
              }}
            />}
          >专家评估法</List.Item>
        </List>
        <List>
          <List.Item
            extra={<Switch
              checked={this.state.checked}
              onChange={() => {
                this.setState({
                  checked: !this.state.checked,
                });
              }}
            />}
          >LEC法</List.Item>
        </List>
        <Picker
         data={data} 
         value={selectValue} 
         cols={1} 
         onOk={(v)=>this.setValue('11',v)}
         extra=""
         >
          <List.Item arrow="horizontal">L</List.Item>
        </Picker>
        <Picker
         data={data} 
         value={selectValue} 
         cols={1} 
         onOk={(v)=>this.setValue('11',v)}
         extra=""
         >
          <List.Item arrow="horizontal">E</List.Item>
        </Picker>
        <Picker
         data={data} 
         value={selectValue} 
         cols={1} 
         onOk={(v)=>this.setValue('11',v)}
         extra=""
         >
          <List.Item arrow="horizontal">C</List.Item>
        </Picker>
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
export default connect(mapStateToProps)(DangerAssessment);