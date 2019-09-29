import Cesium from "cesium/Cesium";
class CesiumApp {
  //创建
  createCesium(name) {
    return new Cesium.Viewer(name);
  }
  // ...其他操作
}
export default CesiumApp;