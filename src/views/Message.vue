<template>
  <div class="message">
    <div class="message-title">
      <h3><i class="el-icon-s-comment"></i>留言</h3>
    </div>
    <el-divider class="message-divider" content-position="left"
      >留言区</el-divider
    >
    <div class="message-content">
      <el-alert title="友善发言，维护良好的互联网环境" type="warning">
      </el-alert>
      <div class="message-content-show">
        <div class="infinite-list-wrapper" style="overflow: auto">
          <ul
            :class="['infinite-list', 'message-content-show-ul']"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled"
          >
            <li
              class="message-content-show-ul-list"
              v-for="item in publishMessage"
              :key="item._id"
            >
              <div class="message-content-show-ul-list-content">
                <!-- 头像 -->
                <div class="message-content-show-ul-list-content-avatar">
                  <img
                    v-if="item.userAbout"
                    :src="'/node/' + item.userAbout.userAvatar"
                    alt=""
                  />
                  <img
                    v-else
                    :src="'/node/' + $store.state.userInfo.userAvatar"
                    alt=""
                  />
                </div>
                <!-- 其他内容 -->
                <div class="message-content-show-ul-list-content-message">
                  <div>
                    <span class="name">{{
                      item.userAbout.username
                        ? item.userAbout.username
                        : $store.state.userInfo.username
                    }}</span>
                    <span class="time">{{ item.publishDate | timer }}</span>
                  </div>
                  <p>{{ item.guestbook }}</p>
                </div>
              </div>
            </li>
          </ul>
          <p v-if="loading" class="tip">加载中...</p>
          <p v-if="noMore" class="tip">没有更多了~</p>
        </div>
      </div>
      <div class="message-content-write">
        <i :class='["el-icon-chat-dot-round","hidden-xs-only"]'></i>
        <input
          class="message-content-write-input"
          v-model="inputMessage"
          ref="inputbox"
          placeholder="说点好听的..."
        />
        <el-popover placement="bottom-end" width="200" trigger="click">
          <el-button slot="reference"><b>😀</b></el-button>
          <el-tabs v-model="activeName" style="cursor: pointer">
            <el-tab-pane label="😀" name="first">
              <Emoji :emoji="emoji" @chooseEmoji="chooseEmoji" />
            </el-tab-pane>
            <el-tab-pane label="⚽️" name="second">
              <Emoji :emoji="movement" @chooseEmoji="chooseEmoji" />
            </el-tab-pane>
            <el-tab-pane label="🐶" name="third">
              <Emoji :emoji="animal" @chooseEmoji="chooseEmoji" />
            </el-tab-pane>
            <el-tab-pane label="🍏" name="fourth">
              <Emoji :emoji="eat" @chooseEmoji="chooseEmoji" />
            </el-tab-pane>
            <el-tab-pane label="🚗" name="fourth1">
              <Emoji :emoji="traffic" @chooseEmoji="chooseEmoji" />
            </el-tab-pane>
          </el-tabs>
        </el-popover>
        <i class="el-icon-position" @click="sendMessage"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Emoji from "@/components/Emoji/Emoji.vue";
import { postMessage, getAllMessage } from "@/assets/api/index";
import { mapState } from "vuex";
export default {
  name: "Message",
  data() {
    return {
      inputMessage: "",
      activeName: "first",
      publishMessage: [],
      count: 0,
      loading: false,
    };
  },
  mounted() {
    // 获取留言数据
    this.showAllMessage();
  },
  methods: {
    // 获取对应的表情
    chooseEmoji(item) {
      // const emo = event.target.innerText
      // 确定光标的位置
      const index = this.$refs.inputbox.selectionStart;
      // 把表情添加到留言板
      this.inputMessage =
        this.inputMessage.substring(0, index) +
        item +
        this.inputMessage.substring(index);
      this.$refs.inputbox.focus();
      // const start = this.inputMessage.indexOf(item)
      // setTimeout(() => {
      //   this.$refs.inputbox.setSelectionRange(start + 1, start + 1)
      // }, 0)
    },
    // 发送留言事件
    async sendMessage() {
      if (!this.$store.state.userInfo._id)
        return this.$message.error("请先登录账号");
      if (!this.inputMessage.trim())
        return this.$message.warning("请输入留言内容");
      const { data } = await postMessage({
        id: this.$store.state.userInfo._id,
        message: this.inputMessage,
      });
      data.data.userAbout = this.$store.state.userInfo;
      this.publishMessage.unshift(data.data);
      this.inputMessage = "";
    },
    // 获取留言数据
    async showAllMessage(val = 0) {
      if (!this.$store.state.userInfo._id) {
        return this.tips = '登录账号才能查看'
      }
      const { data } = await getAllMessage(val);
      this.publishMessage.push(...data.data);
      this.loading = false;
    },
    // 滚动加载数据
    load() {
      this.loading = true;
      this.count += 10;
      this.showAllMessage(this.count);
    },
  },
  computed: {
    ...mapState(["emoji", "movement", "animal", "eat", "traffic", "userInfo"]),
    noMore() {
      return this.count >= this.publishMessage.length;
    },
    // 能否禁止执行滚动加载
    disabled() {
      return this.loading || this.noMore;
    },
  },
  components: { Emoji },
};
</script>

<style lang="scss" scoped>
.message {
  padding: 20px;
  &-title {
    font-size: 24px;
    .el-icon-s-comment {
      margin-right: 15px;
    }
  }
  &-divider {
    margin: 30px 0;
    font-size: 16px;
  }
  &-content {
    &-show {
      width: 100%;
      height: 600px;
      margin-top: 30px;
      border: 1px solid #333;
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
      background-color: #eee;
      padding: 30px 20px;
      box-sizing: border-box;
      overflow: hidden;
      overflow-y: auto;
      // 留言框的样式
      .infinite-list-wrapper {
        height: 100%;
      }
      &-ul {
        &-list {
          border: 1px solid rgb(16, 16, 16);
          border-radius: 20px;
          background-color: #fff;
          padding: 10px;
          min-height: 30px;
          width: 100%;
          box-sizing: border-box;
          margin-bottom: 15px;
          &-content {
            display: flex;
            flex-wrap: nowrap;
            align-items: flex-start;
            width: 100%;
            &-avatar {
              min-width: 40px;
              min-height: 40px;
              max-width: 40px;
              max-height: 40px;
              border-radius: 50%;
              overflow: hidden;
              text-align: center;
              line-height: 30px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            &-message {
              margin-left: 30px;
              max-width: 800px;
              min-width: 200px;
              div {
                width: 375px;
              }
              span {
                font-size: 14px;
                color: #ccc;
              }
              p {
                font-size: 18px;
                color: #333;
                margin-top: 20px;
              }
              .name {
                margin-right: 20px;
              }
            }
          }
        }
      }
    }
    &-write {
      width: 100%;
      // min-width: 375px;
      height: 60px;
      background-color: #fff;
      border: 2px solid #ccc;
      display: flex;
      font-size: 24px;
      align-items: center;
      box-sizing: border-box;
      .el-icon-chat-dot-round,
      .el-icon-position {
        margin: 20px;
      }
      &-input {
        flex-grow: 1;
        height: 30px;
        padding-left: 15px;
      }
      &-emoji {
        margin: 20px;
      }
    }
  }
  .tip {
    font-size: 14px;
    text-align: center;
    color: #999;
    line-height: 20px;
  }
}
</style>