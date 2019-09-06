
import React from 'react';
import Link from 'umi/link';
import { Icon, Tabs, Badge  } from 'antd-mobile';
import { connect } from 'dva';
const tabs = [
  { title: <Badge>隐患信息</Badge> },
  { title: <Badge>处理记录</Badge> }
];
class DangerRecordDetail extends React.PureComponent {
  constructor(props){
    super(props);
    this.rightIcon = <Icon key="1" type="ellipsis" onClick={() => this.handleChange(props)}/>;
    props.dispatch({
      type: 'layout/updateTitle',
      payload: {title: "隐患详情" ,rightIcon: this.rightIcon}
    });
  }

  handleChange = (props) => {
    window.changePageIn(props, 'faderight');
    window.goRoute('danger-list');
  }

  handleTabClick = (tab) => {
    // this.props.dispatch({
    //   type: 'layout/updateTitle',
    //   payload: {title: tab.title.props.children ,rightIcon: this.rightIcon}
    // });
  }

  render() {
    return (
      <>
        <Tabs tabs={tabs}
          initialPage={0}
          // onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={this.handleTabClick}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            Content of first tab
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            Content of second tab
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            Content of third tab
          </div>
        </Tabs>
        <Link to="/danger">
          <div>page Index</div>
        </Link>
      </>
    );
  }
}

//每个组件都需要从model/ducks层获取下
function mapStateToProps(state) {
  const { title, rightIcon } = state.layout;
  return {
    title,
    rightIcon
  };
}
export default connect(mapStateToProps)(DangerRecordDetail);