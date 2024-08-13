const BEversion: Ref<string> = ref('0.0.0');

export function useVersion() {
  //TODO API 공통 경로 수정 필요
  if (BEversion.value === '0.0.0')
    useGet({ url: 'https://api-airforce.coardevelop.com/version' }).then(
      (res: any) => {
        BEversion.value = res.data.data.version;
      }
    );

  return { BEversion };
}
