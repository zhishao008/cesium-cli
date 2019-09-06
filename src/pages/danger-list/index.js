
import React from 'react';
// import Link from 'umi/link';
import { Button } from 'antd-mobile';
import { connect } from 'dva';
// import styles from './index.less';
import Request from '../../services/index';
import ListContainer from '../../common/listContainer';
class Danger extends React.PureComponent {
  constructor(props){
    super(props);
    props.dispatch({
      type: 'layout/updateTitle',
      payload: {title: "隐患1", rightIcon: null },
    });
  }
  handleChange = (props, name) => {
    window.changePageIn(props, 'faderight');
    window.goRoute(name);
  }
  testPost = async () => {
    const url = 'GetHazardInfoOnFilter';
    const params = {
      "FirstResult":0,
      "MaxResult":10,
      "RecordFilter":[
        {
          "Expression":"NotEqual",
          "Key":"HazardStatus",
          "Value":0
        }
      ]
    };
    const res = await Request.httpPost(url, params);
    console.log(res);
  }
  render() {
    return (
      <div>
        {/* <Button onClick={()=>this.handleChange(this.props, 'revoke')}>revoke</Button>
        <Button onClick={()=>this.handleChange(this.props, 're-examination')}>re-examination</Button>
        <Button onClick={()=>this.handleChange(this.props, 'screen')}>screen</Button>
        <Button onClick={()=>this.handleChange(this.props, 'report')}>report</Button>
        <Button onClick={()=>this.handleChange(this.props, 'extension-detail')}>extension-detail</Button>
        <Button onClick={()=>this.handleChange(this.props, 'danger-assessment')}>danger-assessment</Button>
        <Button onClick={()=>this.handleChange(this.props, 'danger-record-detail')}>danger-record-detail</Button>
        <Button onClick={()=>this.handleChange(this.props, 'danger-add')}>danger-add</Button>
        <Button onClick={this.testPost}>post 接口测试</Button> */}
        <ListContainer />
      </div>
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
export default connect(mapStateToProps)(Danger);