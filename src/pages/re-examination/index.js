
import React from 'react';
import { TextareaItem, ImagePicker, Button, WingBlank  } from 'antd-mobile';
import { connect } from 'dva';
import styles from './index.less';
const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];
class Reexamination extends React.PureComponent {
  state = {
    files: data,
    value: ''
  }

  constructor(props){
    super(props);
    props.dispatch({
      type: 'layout/updateTitle',
      payload: { title: "复检", rightIcon: null },
    });
  }

  submit = () => {
   console.log(this.state.value);
  }

  
  onImageChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }
  
  onInputChange = value => {
    this.setState({ value: value});
  }

  render() {
    const { files } = this.state;
    return (
      <>
        <TextareaItem
          rows='6'
          labelNumber={5}
          placeholder='请填写复检意见'
          onChange={this.onInputChange}
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
export default connect(mapStateToProps)(Reexamination);