/**
 * 展示组件
 */
import React, { Component } from 'react';
//引入Cesium
import CesiumApp from "../../logic/index";
//使用组件的antd的时候要引入对应的antd组件
import { Button } from 'antd';
const CesiumInstance = new CesiumApp();
export default class Cesium extends Component {
    componentDidMount(){
      CesiumInstance.createCesium("cesiumContainer");
    }
    render(){
        return <div>
            <div id="cesiumContainer"></div>
            <hr />
            <Button type="primary" onClick={this.FuncCesium}>Primary</Button>
        </div>
    }

    FuncCesium = () => {
      console.log("send cesium for cesium");
    }
}
