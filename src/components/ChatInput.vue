<template>
  <div class="input-area">
    <div class="upper">
      <input
        v-model.trim="nameModel"
        class="name"
        type="text"
        placeholder="コテハン"
        maxlength="15"
      />
      <span class="material-icons" @click="showSelectImageInput">
        image
      </span>
      <span class="material-icons" @click="isShowTextModalRef = true">
        comment
      </span>
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
  <input-text-modal
    v-if="isShowTextModalRef"
    class="input-text-modal"
    :body="bodyModel"
    @cancel-body="cancelBody"
    @decide-body="decideBody"
  />
</template>
<script lang="ts">
import { computed, defineComponent, ref, SetupContext } from 'vue';
import Jimp from 'jimp';
import InputTextModal from './InputTextModal.vue';

type Props = {
  name: string;
  body: string;
};
export default defineComponent({
  components: { InputTextModal },
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

    const isShowTextModalRef = ref<boolean>(false);

    const cancelBody = (): void => {
      isShowTextModalRef.value = false;
    };

    const decideBody = (val: string): void => {
      isShowTextModalRef.value = false;
      bodyModel.value = val;
      if (val.length > 0) {
        context.emit('send-chat', {
          name: nameModel.value,
          body: val,
          type: 'chat'
        });
        bodyModel.value = '';
      }
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
      isShowTextModalRef,
      dummyImageInputRef,
      cancelBody,
      decideBody,
      emitImage,
      changeImageFile,
      showSelectImageInput
    };
  }
});
</script>
<style scoped lang="scss">
$icon-size: 24px;
.material-icons {
  width: $icon-size;
  height: $icon-size;
  font-size: $icon-size;
}

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
      width: calc(100% - (#{$icon-size} * 3));
      height: auto;
      min-height: 25px;
      background: $app-bgcolor;
      border: solid 1px #aaa;
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
