/**这个页面相当于是一个根路由组件 */

import React from 'react';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import 'antd-mobile/dist/antd-mobile.css';
import styles from './index.less';
import { NavBar, Icon } from 'antd-mobile';
import router from 'umi/router';

window.goRoute = (routerName) => {
  router.push(routerName);
}

window.goBack = (props) => {
  window.changePageIn(props, 'fadeleft');
  router.goBack();
}

window.changePageIn = (props, direction) => {
  props.dispatch({
    type: 'layout/updatePageComeDirection',
    payload: {pageComeDirection: direction}
  });
}

class BasicLayout extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  // [
  //   <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
  //   <Icon key="1" type="ellipsis" />,
  // ]

  render() {
    const { children, title, rightIcon, location, pageComeDirection } = this.props;
    return (
          <>
            <TransitionGroup className={styles.transitionContainer}>
              <CSSTransition key={location.key} classNames={pageComeDirection} timeout={200}>
                <div className={styles.container}>
                  <div className={styles.header}>
                    <NavBar
                      mode="dark"
                      icon={<Icon type="left" />}
                      onLeftClick={() => window.goBack(this.props)}
                      rightContent={rightIcon}
                    >
                      {title}
                    </NavBar>
                  </div>
                  <div className={styles.content}>
                    {children}
                  </div>
                </div>
              </CSSTransition>
            </TransitionGroup>
          </>
    );
  }
}


function mapStateToProps(state) {
  const { title, rightIcon, pageComeDirection } = state.layout;
  return {
    title,
    rightIcon,
    pageComeDirection
  };
}

const BassicLayoutContainer = connect(mapStateToProps)(BasicLayout);
export default withRouter(BassicLayoutContainer);
