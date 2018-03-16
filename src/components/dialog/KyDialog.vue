<template>
<div class="module">
  <div class="module-wrapper"></div>

  <main class="module-container">
    <a class="module-close" v-if="isClose" @click="close(null)"></a>
    <p class="title">{{ title }}</p>
    <div class="content">
      <p class="message" v-html="msg"></p>
      <div class="btns flex-row">
        <a class="btn-normal" v-for="(item, key) in btns" :key="key" @click="close(item.callback || null)">{{ item.text }}</a>
      </div>
      <div class="if-remind" v-if="nextRemind.show" @click="nextRemind.select = !nextRemind.select"><i class="icon-select" v-show="nextRemind.select"></i><i class="icon-unselect" v-show="!nextRemind.select"></i><span class="remind-text">下次不再提醒</span></div>
    </div>
  </main>
</div>
</template>

<script>
export default {
  name: 'KyDialog',
  props: {
    title: {
      type: [String, Number],
      default: ''
    },
    msg: {
      type: [String, Number],
      default: ''
    },
    isClose: {
      type: Boolean,
      default: false
    },
    btns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    nextRemind: {
      type: Object,
      default: () => {
        return {
          show: false,
          select: false,
          dialogName: ''
        };
      }
    }
  }
};
</script>

<style scoped lang="css">
.module {
  z-index: 1000;
  transform: translateZ(0);
}

.module .module-close {
  transform: scale(0.8);
  transform-origin: 100% 0;
}

.module .module-container .title {
  height: 0.449775rem;
  line-height: 0.449775rem;
  font-size: 20px;
}

.module .module-container .content {
  min-width: auto;
  width: 5.247376rem;
  min-height: auto;
  padding: 0.449775rem 0.074963rem 0.374813rem;
}

.module .content .message {
  margin: 0;
  padding: 0 0.389805rem;
  color: #52ccdf;
  text-align: center;
  font-size: 18px;
}

.module .content .btns {
  -webkit-justify-content: space-around;
  justify-content: space-around;
  width: 100%;
  margin-top: 0.35982rem;
}

.module .content .btns .btn-normal {
  -webkit-transform: scale(0.95);
  transform: scale(0.95);
}

.module .content .if-remind {
  margin-top: 0.149925rem;
  color: #52ccdf;
  text-align: center;
  font-size: 12px;
}

.module .content .if-remind .remind-text {
  margin-left: 0.082459rem;
  vertical-align: middle;
}
</style>