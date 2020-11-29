<template>
  <div class="input-area">
    <div class="upper">
      <input
        v-model.trim="nameModel"
        class="name"
        type="text"
        placeholder="表示名(15文字)"
        maxlength="15"
      />
      <img
        class="image-file"
        @click="showSelectImageInput"
        src="@/assets/add_photo.svg"
      />
    </div>
    <div class="message">
      <textarea
        v-model.trim="bodyModel"
        maxlength="120"
        placeholder="120文字まで"
      />
      <button @click="emitSend" :disabled="bodyModel.length === 0">送信</button>
    </div>
    <div v-if="isShowPreviewRef" class="preview">
      <div class="modal">
        <img v-if="sendImageFileRef" :src="sendImageFileRef" class="image" />
        <button @click="emitImage" class="send-image-button">送信</button>
      </div>
    </div>
  </div>
  <div class="dummy">
    <input
      ref="dummyImageInputRef"
      @change="changeImageFile"
      accept="image/*"
      type="file"
    />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, SetupContext } from 'vue';
import Jimp from 'jimp';

type Props = {
  name: string;
  body: string;
};
export default defineComponent({
  props: {
    name: {
      type: String,
      required: false,
      default: ''
    },
    body: {
      type: String,
      required: false,
      default: ''
    }
  },
  name: 'ChatInput',
  emits: ['change-name', 'change-body', 'send-chat', 'send-image'],
  setup(props: Props, context: SetupContext) {
    const nameModel = computed({
      get: () => props.name,
      set: changedValue => context.emit('change-name', changedValue)
    });

    const bodyModel = computed({
      get: () => props.body,
      set: changedValue => context.emit('change-body', changedValue)
    });

    const sendImageFileRef = ref<string>('');
    const sendImageFileName = ref<string>('');

    const isShowPreviewRef = ref<boolean>(false);

    const emitSend = (): void => {
      context.emit('send-chat', {
        name: nameModel.value,
        body: bodyModel.value,
        type: 'chat'
      });
      bodyModel.value = '';
    };

    const emitImage = (): void => {
      context.emit('send-image', {
        name: nameModel.value,
        body: sendImageFileRef.value,
        type: 'image'
      });
      isShowPreviewRef.value = false;
      sendImageFileRef.value = '';
      sendImageFileName.value = '';
    };

    const dummyImageInputRef = ref<HTMLInputElement>();

    const showSelectImageInput = (): void => {
      dummyImageInputRef.value?.click();
    };

    interface HTMLElementEvent<T extends HTMLElement> extends Event {
      target: T;
    }

    const readFileBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        try {
          const fileReader = new FileReader();
          fileReader.onloadend = async () => {
            const lenna: Jimp = await Jimp.read(fileReader.result);
            console.log(lenna);
            const resizedImage: Jimp = await lenna.resize(200, Jimp.AUTO);
            resizedImage.getBase64(Jimp.MIME_PNG, (err, src) => {
              if (err) {
                reject(err);
              } else {
                resolve(src);
              }
            });
          };
          fileReader.readAsDataURL(file);
        } catch (e) {
          reject(e);
        }
      });
    };

    const changeImageFile = async (
      event: HTMLElementEvent<HTMLInputElement>
    ) => {
      const files = event?.target?.files || [];
      if (files.length === 0) return;
      const imageFile = files[0];
      const imageBase64: string = await readFileBase64(imageFile);
      sendImageFileName.value = imageFile.name;
      sendImageFileRef.value = imageBase64;
      isShowPreviewRef.value = true;
    };

    return {
      nameModel,
      bodyModel,
      sendImageFileRef,
      sendImageFileName,
      isShowPreviewRef,
      dummyImageInputRef,
      emitSend,
      emitImage,
      changeImageFile,
      showSelectImageInput
    };
  }
});
</script>
<style scoped lang="scss">
.input-area {
  margin: 10px;
  text-align: left;

  .upper {
    display: flex;
    justify-content: left;
    align-items: center;
    min-height: 25px;
    margin-bottom: 5px;

    .name {
      min-width: 28%;
      height: auto;
      min-height: 25px;
    }

    .image-file {
      min-height: 25px;
      margin-left: 5px;
    }
  }

  .message {
    height: 25%;
    display: flex;
    justify-content: center;
    align-items: center;

    textarea {
      width: 80%;
      height: 25%;
      margin-right: 10px;
    }

    button {
      width: 20%;
      height: 25%;
    }
  }
}

.preview {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  .modal {
    width: 100%;
    height: 100%;
    background: rgba($color: #000, $alpha: 0.5);

    .image {
      position: absolute;
      // resize imageが200x200なので、半分の100pxずらす
      left: calc(50% - 100px);
      top: calc(50% - 100px);
    }

    .send-image-button {
      position: absolute;
      left: calc(50% - 50px);
      top: calc(50% + 120px);
      min-width: 100px;
      min-height: 30px;
      font-size: 16px;
      font-weight: bold;
      background: #000;
      color: #fff;
      border-color: #fff;
    }
  }
}

.dummy {
  display: none;
}
</style>
