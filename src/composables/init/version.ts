const BEversion: Ref<string> = ref('0.0.0');

export function useVersion() {
  if (BEversion.value === '0.0.0')
    useGet({ url: 'https://api-airforce.coardevelop.com/version' }).then((res: any) => {
      BEversion.value = res.data.data.version;
    });

  return { BEversion };
}
