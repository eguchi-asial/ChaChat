<template>
  <div class="debatefeed">
    <div class="chat-items">
      <h2 class="room-length">{{ title }}({{ roomLength }}人)</h2>
      <a :href="`#${title}`" @click="showWEB">WEBで詳しく見る >></a>
      <div v-if="!isShowDebate" class="article" v-html="content" />
      <template v-else>
        <chat-messages :chats="chats" :is-auto-scroll="isAutoScroll" />
        <chat-input
          :name="name"
          :body="body"
          @change-name="changedName"
          @change-body="changedBody"
          @send-chat="sendChat"
          @send-image="sendImage"
        />
      </template>
    </div>
    <div class="debate-button">
      <button
        v-if="!isShowDebate"
        class="debate-on"
        @click="isShowDebate = true"
      >
        討論参加
        <span class="material-icons">
          comment
        </span>
      </button>
      <button v-else class="debate-off" @click="isShowDebate = false">
        退室
        <span class="material-icons">
          directions_run
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  Ref,
  ref,
  watch
} from 'vue';
import Chat from '@/types/chat';
import ChatMessages from '@/components/ChatMessages.vue';
import ChatInput from '@/components/ChatInput.vue';
import moment from 'moment';
import io from 'socket.io-client';
import { sendEvent } from '@/lib/analytics';
import router from '@/router';

export default defineComponent({
  name: 'DebateFeed',
  components: {
    ChatMessages,
    ChatInput
  },
  setup() {
    // title
    const titleRef: Ref<string> = ref('');
    const pTitle: string | string[] = router.currentRoute.value.params['title'];
    titleRef.value = Array.isArray(pTitle) ? pTitle[0] : pTitle;
    if (!titleRef.value) {
      router.replace('/');
      return;
    }

    // link
    const linkRef: Ref<string> = ref('');
    const pLink: string | string[] = router.currentRoute.value.params['link'];
    linkRef.value = Array.isArray(pLink) ? pLink[0] : pLink;

    // content
    const contentRef: Ref<string> = ref('');
    const pContent: string | string[] =
      router.currentRoute.value.params['content'];
    contentRef.value = Array.isArray(pContent) ? pContent[0] : pContent;

    // debateを開くかどうか
    const isShowDebate: Ref<boolean> = ref(false);

    /** チャット表示名 */
    const nameRef: Ref<string> = ref('');

    /** チャット投稿メッセージ */
    const bodyRef: Ref<string> = ref('');
    const roomLengthRef: Ref<number> = ref(0);
    const chatsReact: Chat[] = reactive<Chat[]>([]);
    const roomName = titleRef.value.substr(0, 10) + '...';
    const socket = reactive<SocketIOClient.Socket>(
      io(
        `
        ${process.env.VUE_APP_CHAT_PROTCOL}://${process.env.VUE_APP_CHAT_WS}?room=${roomName}
      `.trim(),
        {
          transports: ['websocket']
        }
      )
    );

    /** 表示時処理 */
    onMounted(() => {
      sendEvent('showDebateFeed', {
        title: titleRef.value
      });
      socket.on('connect', () => {
        /* サーバからpush受信したメッセージ */
        socket.on('receive-message', (msg: Chat) => {
          chatsReact.push({
            name: msg.name,
            type: msg.type,
            body: msg.body,
            postId: msg.postId,
            postedAt: msg.postedAt
          });
        });
        socket.on('room-length', (roomLength: number) => {
          roomLengthRef.value = roomLength;
        });
      });
    });

    // 表示用chats
    const dispChats = computed({
      get: () =>
        chatsReact.map(chat => {
          chat.postedAt = chat.postedAt
            ? moment(chat.postedAt, 'YYYY-MM-DD h:m:s').format('HH:mm:ss')
            : undefined;
          return chat;
        }),
      set: () => {
        //
      }
    });

    /** 表示名変更 */
    const changedName = (changedName: string): void => {
      nameRef.value = changedName;
    };

    /** 本文変更 */
    const changedBody = (changedBody: string): void => {
      bodyRef.value = changedBody;
    };

    /** チャット送信 */
    const sendChat = (inputData: Chat): void => {
      sendEvent('sendChat', inputData);
      socket.emit('post-message', {
        ...inputData,
        // clientからは特定できなくて良いのでnull
        postId: null,
        postedAt: moment().format('YYYY-MM-DD H:mm:ss')
      });
    };

    /** 画像送信 */
    const sendImage = (inputData: Chat): void => {
      socket.emit('post-message', {
        ...inputData,
        // clientからは特定できなくて良いのでnull
        postId: null,
        postedAt: moment().format('YYYY-MM-DD H:mm:ss')
      });
    };

    /** NEWS記事をwebで見る */
    const showWEB = () => {
      window.open(linkRef.value, '_blank');
    };

    // 監視
    watch(
      () => isShowDebate,
      flg => {
        console.log(flg);
      }
    );

    return {
      title: titleRef,
      link: linkRef,
      content: contentRef,
      isShowDebate,
      chats: dispChats,
      name: nameRef,
      body: bodyRef,
      changedName,
      changedBody,
      showWEB,
      sendChat,
      sendImage,
      roomLength: roomLengthRef
    };
  }
});
</script>
<style scoped lang="scss">
.debatefeed {
  width: 100%;
  height: calc(100% - #{$header-height + $footer-height});
  overflow: scroll;

  .room-length {
    font-size: 18px;
    padding: 2px;
  }

  .chat-items {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .article {
      height: 100%;
      overflow-y: scroll;
      margin-bottom: $footer-height;
      border-top: 2px dashed;
      margin-top: 10px;
    }
  }

  .debate-button {
    z-index: 19999;
    position: absolute;
    bottom: 25px;
    width: 100%;

    button {
      width: 100%;
      height: 50px;
      font-size: 16px;
      font-weight: bold;
      display: flex;
      border-radius: 0;
      justify-content: center;
      align-items: center;
      color: #fff;

      span {
        padding: 5px;
      }

      &.debate-on {
        background: $positive;
      }

      &.debate-off {
        background: $negative;
      }
    }
  }
}
</style>
