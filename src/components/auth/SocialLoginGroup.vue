<script setup lang="ts">
import { isIOS } from '@vueuse/core';
import {
  SocialLoginType,
  useJoinService,
  useLogin,
} from 'src/composables/auth/auth';
import { goToName } from 'src/composables/common/app';
import { DeviceEvent, useBridge } from 'src/composables/common/useBridge';
import { useJoinStore } from 'src/stores/join-store';
import { onBeforeUnmount } from 'vue';
type Props = {
  type: 'join' | 'login';
};
const props = defineProps<Props>();
const emit = defineEmits(['report', 'login', 'join', 'error']);
const authList: { type: SocialLoginType; disabled: boolean }[] = [
  {
    type: 'kakao',
    disabled: false,
  },
  {
    type: 'naver',
    disabled: false,
  },
  {
    type: 'google',
    disabled: false,
  },
  {
    type: 'apple',
    disabled: !isIOS,
  },
  {
    type: 'jeonju',
    disabled: true,
  },
  {
    type: 'iksan',
    disabled: true,
  },
];

const { loginSocial, addEventListener } = useBridge();
const { socialLogin } = useLogin();
const { setSocialAccessToken } = useJoinStore();

function onSelect(type: SocialLoginType) {
  console.log('socialLogin', type);
  // 1. Call Bridge API first
  loginSocial(type);
  // 2. On succeed, call API Server from the event listener
}

// add event listener for login_social event
const removeEventListener = addEventListener(
  'login_social',
  (data: DeviceEvent) => {
    const { access_token, provider } = data.detail ?? {};
    console.log(
      '**login_social result**\n',
      '- access_token',
      access_token,
      '- provider:',
      provider
    );

    if (access_token) {
      console.log('* succeed to loginSocial with BridgeAPI', {
        access_token,
        provider,
      });

      if (props.type === 'login') {
        socialLogin(access_token, provider)
          .then((data) => {
            console.log('** succeed to login with API');
            emit('login', data);
          })
          .catch((err) => {
            console.log('** failed to socialLogin with API', err);
            emit('error', err);
          });
      } else if (props.type === 'join') {
        emit('join', { accessToken: access_token, provider });
      }
    } else {
      console.log('* failed to loginSocial with BridgeAPI');
    }
  }
);

// remove event listener when component is unmounted
onBeforeUnmount(() => removeEventListener());
</script>
<template>
  <div class="row justify-evenly items-center px-[17px]">
    <q-btn
      class="size-[35px]"
      v-for="auth in authList"
      :key="auth.type"
      :icon="'img:/images/icons/btn_' + auth.type + '.svg'"
      @click="onSelect(auth.type)"
      flat
      size="lg"
      round
      v-show="!auth.disabled"
    />
  </div>
</template>
