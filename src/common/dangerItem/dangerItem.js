
import React from 'react';
import styles from './dangerItem.less';
class DangerItem extends React.PureComponent {

  handleClick = () => {
    console.log('clcik')
  }

  componentDidMount() {

  }

  render() {
    const { FindDate, Finder, HazardContent, HazardLevel, HazardStatus} = this.props;
    return (
      <div className={styles.container} onClick={this.handleClick}>
        <div className={styles.title}>
          <span className={styles.date}>上报时间 {FindDate}</span>
          <span className={styles.name}>发现人 {Finder}</span>
        </div>
        <div className={styles.content}>
          <div className={styles.item}>隐患内容 <span className={styles.name}>{HazardContent}</span></div>
          <div className={styles.item}>隐患等级 <span className={styles.name}>{HazardLevel}</span></div>
          <div className={styles.item}>隐患状态 <span className={styles.name}>{HazardStatus}</span></div>
        </div>
      </div>
    );
  }
}

export default DangerItem;