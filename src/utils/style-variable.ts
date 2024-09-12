const { width } = useWindowSize();

export const barStyle = ref({
  // 스크롤바 안보이게
  opacity: width.value <= 512 ? 0 : 1,
});
export const thumbStyle = ref({
  // 스크롤바 색상
  backgroundColor: width.value <= 512 ? 'transparent' : 'black',
});
