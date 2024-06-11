<script setup lang="ts">
import { useTimeout, useTimestamp } from '@vueuse/core';
// import { MobileAuthType, useSendMobileCode } from 'src/composables/auth/auth';
import { useMobileFields } from 'src/composables/auth/useMobileFields';
import { useAlertDialog } from 'src/composables/common/dialog';
import useTryCatchWithLoading from 'src/composables/common/useTryCatchWithLoading';
import { ComputedRef } from 'vue';
import { computed, ref } from 'vue';

type Props = {
  // type: MobileAuthType;
};
const props = withDefaults(defineProps<Props>(), { type: 'R' });

const emit = defineEmits([
  'success', // 성공
  'fail', // 실패
  'timeout', // 타임아웃
  'noaccount', // 가입된 계정이 없는 경우
  'socialonly', // 소셜가입된 계정만 있는 경우
]);

/**
 * =========================================================================
 * Vee Validation
 */
const {
  mobile,
  code,
  form: { meta: formMeta, handleSubmit },
} = useMobileFields();

/**
 * =========================================================================
 * 입력 제한시간
 */
const TIME_LIMIT_MS = 3 * 60 * 1000;
const timestampAtSendCode = ref(0);

const {
  timestamp: timestampCurrent,
  pause: pauseTimestamp,
  resume: resumeTimestamp,
} = useTimestamp({
  interval: 1000, // 1초간격 timestamp 갱신
  controls: true,
});

const remainingTime = computed(() =>
  Math.max(
    TIME_LIMIT_MS - (timestampCurrent.value - timestampAtSendCode.value),
    0
  )
);

const remainingTimeStr = computed(() => {
  const ms = remainingTime.value;
  const minutes = Math.floor(ms / (60 * 1000));
  const seconds = Math.floor((ms % (60 * 1000)) / 1000);

  return (
    minutes.toString().padStart(2, '0') +
    ':' +
    seconds.toString().padStart(2, '0')
  );
});

const {
  ready: isThresholding,
  start: startThresholding,
  stop: stopThresholding,
} = useTimeout(10 * 1000, { controls: true });

const mobileCodeDesc = computed(() => {
  return remainingTime.value === 0
    ? '유효시간이 만료되었습니다'
    : code.meta.touched
    ? code.errorMessage.value
    : '';
});

/**
 * =========================================================================
 * 인증번호 전송하기
 */

// const {
//   sendMobileCode,
//   verifyMobileCodeForJoin,
//   verifyMobileCodeForFindingAccount,
// } = useSendMobileCode();

const didSendCode = ref(false);
const { tryCatchWithLoading } = useTryCatchWithLoading();
async function onSendMobileCode() {
  tryCatchWithLoading(
    async () => {
      didSendCode.value = false;
      // [Send Mobile Code]
      // await sendMobileCode(mobile.value.value.replace(/\D/g, ''), props.type);
      startThresholding();
      code.resetField({ touched: false, value: '' });

      // [Fail]
      // if (!success) {
      //   stopThresholding();
      //   // [Registering with mobile code already being used]
      //   if (props.type === 'register') {
      //     console.log('existingUserList', existingUserList.value);
      //     modalVisible.value = true;
      //   }
      //   // [Finding email or password with mobile number that not found from db]
      //   else {
      //     alert(
      //       '일치하지 않는 번호입니다. 가입 시 입력하신 휴대폰 번호를 확인해 주세요.',
      //     );
      //   }
      //   return;
      // }
      useAlertDialog({
        htmlText: '입력하신 휴대폰 번호로 인증번호를 전송했습니다.',
      });

      timestampAtSendCode.value = new Date().getTime();

      resumeTimestamp();
      didSendCode.value = true;
    },
    (error) => {
      stopThresholding();
      emit('fail', {
        code: error.response?.data?.code,
        reason: error.response?.data?.message ?? 'error.occured',
      });
    }
  );
  // showAlertModal('sendCode');
}

/**
 * =========================================================================
 * 인증번호 검증하기
 */
const mobileValidated = ref(false);
const onSubmit = handleSubmit(async (validForm) => {
  console.log('onSubmit', validForm);
  stopThresholding();
  if (remainingTime.value === 0) {
    // showAlertModal('codeExpired');
    console.log('code expired');
    emit('timeout');
    useAlertDialog({
      htmlText: `<p>유효시간이 만료된 인증번호 입니다. <br/>
인증번호 재전송 버튼을 눌러 다시 시도해주세요.</p>`,
    });
    return;
  }
  switch (props.type) {
    case 'R':
      handleSubmitForJoin();
      break;
    default:
      handleSubmitForFindingAccount();
      break;
  }
});

async function handleSubmitForJoin() {
  tryCatchWithLoading(async () => {
    //   const { data } = await verifyMobileCodeForJoin(
    //     mobile.value.value,
    //     code.value.value
    //   );
    //   if (!data.value) {
    //     console.error('data is not included');
    //     return;
    //   }
    //   const result = data.value.data;
    //   mobileValidated.value = !!result.is_success;
    //   if (mobileValidated.value) {
    //     pauseTimestamp();
    //     emit('success', {
    //       mobile: mobile.value.value,
    //       token: result.result.mobile_verified_token,
    //     });
    //   } else {
    //     emit('fail', {
    //       code: data.value.code,
    //       reason: result.reason,
    //     });
    //   }
    // },
    // (error) => {
    //   emit('fail', {
    //     code: error.response?.data?.code,
    //     reason: error.response?.data?.message ?? error.message,
    //   });
  });
}

async function handleSubmitForFindingAccount() {
  tryCatchWithLoading(
    async () => {
      //       const { error, data, response } = await verifyMobileCodeForFindingAccount(
      //         mobile.value.value,
      //         code.value.value
      //       );
      //       if (error.value) {
      //         console.error(error.value, response.value);
      //         return;
      //       }
      //       if (!data.value) {
      //         console.error('data is not included');
      //         return;
      //       }
      //       const result = data.value.data;
      //       // 아이디 찾기 인증의 경우 예외처리
      //       // 인증번호 맞지만 계정이 없는 경우
      //       if (result.is_success && !result.result) {
      //         emit('noaccount');
      //         useAlertDialog({
      //           htmlText: `<p>입력하신 휴대폰 번호로 가입된 이력이 없습니다.<br/>
      // 번호를 확인해 주세요.</p>`,
      //         });
      //         return;
      //       }
      //       mobileValidated.value = !!result.is_success;
      //       if (mobileValidated.value) {
      //         pauseTimestamp();
      //         emit('success', {
      //           ...result.result,
      //         });
      //       } else {
      //         emit('fail', { reason: result.reason });
      //       }
    },
    (error) => {
      emit('fail', { reason: error.response?.data?.message ?? error.message });
    }
  );
}

/**
 * =========================================================================
 * 외부인터페이스 정의
 */
defineExpose<MobileAuthInstance>({
  sendValidationCode: onSendMobileCode,
  didSendCode,
  stopThresholding,
  onSubmit,
  valid: computed(() => ({
    mobile: mobile.meta.valid,
    code: code.meta.valid,
    form: formMeta.value.valid,
  })),
  codeExpired: computed(() => remainingTime.value === 0),
});

export type MobileAuthInstance = {
  sendValidationCode: typeof onSendMobileCode;
  didSendCode: typeof didSendCode;
  stopThresholding: typeof stopThresholding;
  onSubmit: typeof onSubmit;
  valid: ComputedRef<{ mobile: boolean; code: boolean; form: boolean }>;
  codeExpired: ComputedRef<boolean>;
};
</script>
<template>
  <form @submit.prevent="onSubmit">
    <SField label="휴대폰 번호" class="mt-[30px]">
      <AInput
        v-model="mobile.value.value"
        name="mobile"
        mask="###-####-####"
        placeholder="휴대폰 번호를 입력해 주세요('-'제외)"
        :error="mobile.meta.touched && mobile.errors.value.length > 0"
        :error-message="mobile.meta.touched ? mobile.errorMessage.value : ''"
        clearable
        :done="mobile.meta.valid"
        inputmode="numeric"
        autofocus
        @blur="mobile.handleBlur"
      />
    </SField>
    <SField v-show="didSendCode" label="인증 번호">
      <AInput
        v-model="code.value.value"
        name="validationCode"
        placeholder="인증번호를 입력해 주세요"
        mask="######"
        :error="
          remainingTime === 0 ||
          (code.meta.touched && code.errors.value.length > 0)
        "
        :error-message="mobileCodeDesc"
        :done="code.meta.valid"
        @blur="code.handleBlur"
      />
      <template>
        <ABtn
          type="button"
          flat
          color="primary"
          class="col-auto ml-2 w-auto mt-7"
          :disable="!mobile.meta.valid || !isThresholding"
          @click="onSendMobileCode"
          >인증번호 재전송</ABtn
        >
      </template>
      <template v-if="didSendCode" #bottom>
        <div class="row justify-between">
          <div class="col">
            <span v-if="remainingTime > 0" class="text-caption text-primary"
              >남은시간: {{ remainingTimeStr }}초</span
            >
          </div>
          <q-btn
            dense
            no-caps
            class="bg-white text-primary text-caption underline"
            label="인증번호 재전송"
            flat
            :disabled="!mobile.meta.valid || !isThresholding"
            @click="onSendMobileCode"
          />
        </div>
      </template>
    </SField>
  </form>
</template>

<style scoped></style>
