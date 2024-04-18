<template>
  <q-page class="column w-full px-6 pb-[87px] pt-[10px]">
    <q-icon
      name="img:/images/icons/icon-awesome-exclamation-circle.svg"
      size="47px"
      class="self-center"
    ></q-icon>
    <div class="pl-[2px]">
      <h3 class="mt-10 text-lg font-medium leading-[25px] text-[#FF0000]">
        시스템에 오류가 발생되어<br />
        페이지를 정상적으로 노출하지 못했어요.
      </h3>
      <p class="mt-4 text-base leading-[25px] font-light">
        서비스 이용에 불편을 드려 죄송합니다.<br />
        <br />
        잠시후에 다시한번 시도 부탁드립니다.<br />
        <br />
        동일 오류가 반복하여 발생할 경우<br />
        고객센터로 문의 부탁드립니다.
      </p>
    </div>
    <q-card
      flat
      class="w-[327px] h-[130px] mt-10 bg-[#f4f4f4] column items-center"
    >
      <p class="mt-[15px] text-sm font-light leading-4">상세오류 코드</p>
      <p class="mt-[30px] text-base font-medium text-primary leading-[19px]">
        404 오류 입니다.
      </p>
    </q-card>
    <div class="w-screen -ml-6 p-4 fixed bottom-0 bg-white">
      <a-btn
        type="submit"
        class="w-full h-[55px]"
        label="메인화면 바로가기"
        to="/"
      />
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
