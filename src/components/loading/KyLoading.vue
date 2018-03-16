<template>
<div class="loading">
  <div class="loading-wrapper"></div>

  <div class="loading-container">
    <img class="icon-loading" src="../../assets/loading.png">
  </div>
</div>
</template>

<script>
export default {
  name: 'KyLoading'
};
</script>

<style scoped lang="css">
.loading {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateZ(0);
  z-index: 9000;
  width: 100%;
  height: 100%;
}

.loading .loading-wrapper {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.loading .loading-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loading .loading-container .icon-loading {
  display: inline-block;
  width: 0.749625rem;
  height: 0.749625rem;
  animation: linear mRrotating 1.1s infinite;
}
@-webkit-keyframes mRrotating {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}
</style>