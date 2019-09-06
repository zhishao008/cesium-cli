
import React from 'react';
import ReactDOM from 'react-dom'; 
import { Icon, Tabs, Badge, Toast, PullToRefresh, ListView } from 'antd-mobile';
import { connect } from 'dva';
import styles from './index.less';
import Request from '../services';
import DangerItem from '../common/dangerItem/dangerItem';
const tabs = [
  { title: <Badge>我的待办</Badge> },
  { title: <Badge>全部隐患</Badge> }
];

const NUM_ROWS = 5;
let pageIndex = 0;
//计算行数
function genData(pIndex = 0) {
  const dataArr = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
  }
  return dataArr;
}

class DangerList extends React.PureComponent {
  state = {
    myNeedDo: [],
    allDanger: [],
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    refreshing: true,
    isLoading: true,
    height: document.documentElement.clientHeight,
    useBodyScroll: false,
    hasMore: true
  }
  constructor(props){
    super(props);
    this.rightIcon = <Icon key="1" type="ellipsis" onClick={() => this.handleChange(props)}/>;
    props.dispatch({
      type: 'layout/updateTitle',
      payload: {title: "隐患管理" ,rightIcon: this.rightIcon}
    });
  }

  handleChange = (props) => {
    window.changePageIn(props, 'faderight');
    window.goRoute('danger-list');
  }
  componentDidUpdate() {
    document.body.style.overflow = 'hidden';
  }
  componentDidMount() {
    Toast.loading('加载中...', 0);
    const allDangerHeight = this.state.height - ReactDOM.findDOMNode(this.alldanger).offsetTop;
    const myNeedDo = Request.httpPost("GetHazardInfo");
    myNeedDo.then(v=>{
      this.setState({myNeedDo: v.Data});
      Toast.hide();
    })
    const allDanger = Request.httpPost("GetHazardInfoOnFilter", {
      "RecordFilter" : [
        {
          "Key" : "HazardStatus",
          "Expression" : "NotEqual",
          "Value" : 0
        }
      ],
      "MaxResult" : NUM_ROWS,
      "FirstResult" : pageIndex
    });
    allDanger.then(v=>{

      if(v.Data.length >= NUM_ROWS) {
        this.setState({allDanger: v.Data, hasMore: true});
      } else {
        this.setState({allDanger: v.Data, hasMore: false});
      }
      
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(genData()),
        height: allDangerHeight,
        refreshing: false,
        isLoading: false,
      });
      Toast.hide();
    }).catch(error => {
      console.log(error);
    })
    // console.log(myNeedDo);
    // console.log(allDanger);
  }
  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    const allDangerHeight = this.state.height - ReactDOM.findDOMNode(this.alldanger).offsetTop;
    const allDanger = Request.httpPost("GetHazardInfoOnFilter", {
      "RecordFilter" : [
        {
          "Key" : "HazardStatus",
          "Expression" : "NotEqual",
          "Value" : 0
        }
      ],
      "MaxResult" : NUM_ROWS,
      "FirstResult" : pageIndex
    });
    allDanger.then(v=>{
      let { allDanger } = this.state;
      const newAllDanger = Object.assign([],allDanger,v.Data);
      if(v.Data.length >= NUM_ROWS) {
        this.setState({allDanger: newAllDanger, hasMore: true});
      } else {
        this.setState({allDanger: newAllDanger, hasMore: false});
      }
      console.log(allDanger);
      console.log(newAllDanger);
      // this.rData = genData();
      // this.setState({
      //   dataSource: this.state.dataSource.cloneWithRows(genData()),
      //   height: allDangerHeight,
      //   refreshing: false,
      //   isLoading: false,
      // });
      Toast.hide();
    }).catch(error => {
      console.log(error);
    })
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    // setTimeout(() => {
    //   this.rData = [...this.rData, ...genData(++pageIndex)];
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(this.rData),
    //     isLoading: false,
    //   });
    // }, 3000);
  };
  render() {
    const { myNeedDo, allDanger } = this.state;
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      if (allDanger.length < 0) {
        
      }
      console.log(allDanger);
      console.log(rowID);
      const obj = allDanger[rowID];
      return (
        <div key={rowID}
          style={{
            padding: '0 15px',
            backgroundColor: 'white',
          }}
        >
          <DangerItem {...obj} key={obj.ID}/>
        </div>
      );
    };
    return (
      <>
        <Tabs tabs={tabs}
          initialPage={1}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div className={styles.content}>
            {myNeedDo.map(v => <DangerItem {...v} key={v.ID}/>)}
          </div>
          <div className={styles.content}>
            {/* {allDanger.map(v => <DangerItem {...v} key={v.ID}/>)} */}
            <ListView
              key={'1'}
              ref={el => this.alldanger = el}
              dataSource={this.state.dataSource}
              // renderHeader={() => <span>Pull to refresh</span>}
              renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                {this.state.isLoading ? 'Loading...' : 'Loaded'}
              </div>)}
              renderRow={row}
              renderSeparator={separator}
              useBodyScroll={false}
              style={{
                height: this.state.height,
                border: '1px solid #ddd',
                margin: '5px 0',
              }}
              pullToRefresh={<PullToRefresh
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />}
              onEndReached={this.onEndReached}
              pageSize={5}
            />
          </div>  
        </Tabs>
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
export default connect(mapStateToProps)(DangerList);