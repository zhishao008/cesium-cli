
import React from 'react';
import { TextareaItem, ImagePicker, Picker, DatePicker, List, Toast } from 'antd-mobile';
import { connect } from 'dva';
import styles from './index.less';
import Request from '../../services';
class DangerAdd extends React.PureComponent {
  state = { 
    inputValue: '',
    files: [],
    date: '',
    listName: [
      { name: '隐患来源', extra:'', data: [], selectValue: []},
      { name: '隐患类型', extra:'', data: [], selectValue: []},
      { name: '隐患原因', extra:'', data: [], selectValue: []},
      { name: '隐患设备', extra:'(选填)请选择', data: [], selectValue: []}
    ]
  }
  constructor(props){
    super(props);
    props.dispatch({
      type: 'layout/updateTitle',
      payload: {title: "隐患登记", rightIcon: <span onClick={this.submit}>提交</span>},
    });
  }
  
  componentDidMount() {
    const source = Request.httpPost("GetHazardSource");
    const type = Request.httpPost("GetHazardType");
    const reason = Request.httpPost("GetHazardReason");
    const device = Request.httpPost("GetDevice");
    source.then(v=>{
      // this.setState({listName[]})
    })
    
    console.log(source);
    console.log(type);
    console.log(reason);
    console.log(device);
  }

  submit = () => {
   console.log(this.state.inputValue);
  }

  onChange = (value) => {
    this.setState({ inputValue: value});
  }

  onImageChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }

  setValue = (a,b) => {
    console.log(a);
    console.log(b);
    this.setState({ selectValue: b});
  }
  
  render() {
    const { files, date, listName } = this.state;
    
    return (
      <>
        <TextareaItem
          rows='6'
          labelNumber={5}
          placeholder='请输入隐患内容【必填】'
          onChange={this.onChange}
        />
        <div className={styles.imagePicker}>
        <ImagePicker
          multiple
          files={files}
          onChange={this.onImageChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 20}
          accept="image/gif,image/jpeg,image/jpg,image/png/"
        />
        </div>
        <List>
          { listName.map(v => <Picker
            key={v.name}
            data={v.data} 
            value={v.selectValue} 
            cols={1} 
            onOk={(v)=>this.setValue('11',v)}
            extra={v.extra}
            >
            <List.Item arrow="horizontal">{v.name} <span className={styles.warnx}>*</span></List.Item>
          </Picker>
          )}
          <DatePicker
            mode="datetime"
            title="选择时间"
            extra=""
            value={date}
            onChange={date => this.setState({ date })}
          >
            <List.Item arrow="horizontal">发现时间</List.Item>
          </DatePicker>
        </List>
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
export default connect(mapStateToProps)(DangerAdd);