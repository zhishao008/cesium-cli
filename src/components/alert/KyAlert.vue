<template>
<div class="alert">
  <div class="alert-wrapper"></div>
  <span class="alert-container">{{ msg }}</span>
</div>
</template>

<script>
export default {
  name: 'KyAlert',
  props: {
    msg: {
      type: [String, Number],
      default: ''
    },
    timeout: {
      type: Number,
      default: 1500
    }
  }
};
</script>

<style scoped lang="css">
.alert {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateZ(0);
  z-index: 9999;
  width: 100%;
  height: 100%;
}

.alert .alert-wrapper {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.alert .alert-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  padding: 0.209895rem 0.674663rem;
  border: 1px solid #3cb8e0;
  border-radius: 4px;
  background-color: rgba(29, 31, 40, 0.8);
  color: #fdffff;
  text-align: center;
  font-size: 14px;
}
</style>