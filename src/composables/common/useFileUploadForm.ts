import { QFile, QRejectedEntry, useQuasar } from 'quasar';
import { ref } from 'vue';

export function useFileUploadForm({
  useThumbnails = false,
  maxFileCount = 1,
  maxFileSize = 10485760,
  fileExtentions = ['.jpg', '.jpeg', '.png'],
}) {
  const fileSlots = ref([0]);
  const fileEl = ref<QFile | undefined>();
  const selectedFiles = ref<
    (File | { id: number; url: string; name: string })[]
  >([]);
  const allowedFileExtentions = fileExtentions.join(',');
  const newFile = ref<File | undefined>();
  const thumbnails = ref<string[]>([]);

  let selectSlotIdx = 0;
  const $q = useQuasar();

  function setSelectSlotIdx(idx: number) {
    selectSlotIdx = idx;
    console.log('selectSlotIdx : ', selectSlotIdx);
  }

  function onPickNewFile(ev: Event) {
    if (!fileEl.value) return;
    if (selectedFiles.value.length - 1 < maxFileCount)
      fileEl.value.pickFiles(ev);
    else if (maxFileCount > 0)
      $q.notify({
        type: 'negative',
        message: `최대 ${maxFileCount}장까지 등록 가능합니다.`,
      });
  }

  function onNewFileChoosen(file: File) {
    selectedFiles.value.push(file);
    newFile.value = undefined;
    if (useThumbnails) addThumbnailOf(file);

    if (fileSlots.value.length < maxFileCount) fileSlots.value.push(0);

    console.log('## fileSlots:', fileSlots.value);
    console.log('## files:', selectedFiles.value);
  }

  function onFileChoosen(file: File, idx = 0) {
    console.log('file info : ', file);
    selectedFiles.value[idx] = file;
    newFile.value = undefined;
    if (useThumbnails) changeThumbnailOf(file, idx);
    if (fileSlots.value.length < maxFileCount) fileSlots.value.push(0);
    console.log('## files:', selectedFiles.value);
  }

  function onNewFileChoosenExcludeLast(file: File) {
    console.log('onNewFileChoosenExcludeLast selectSlotIdx : ', selectSlotIdx);
    if (selectSlotIdx === maxFileCount - 1) {
      console.log('onFileChoosen');
      onFileChoosen(file, selectSlotIdx);
    } else {
      console.log('onNewFileChoosen');
      onNewFileChoosen(file);
    }
  }

  function changeThumbnailOf(file: File, idx: number) {
    thumbnails.value[idx] = URL.createObjectURL(file);
    console.log('thumbnail changed : ', file.name);
  }

  function addThumbnailOf(file: File) {
    thumbnails.value.push(URL.createObjectURL(file));
    console.log('thumbnail added : ', file.name);
  }

  const readableBytes = (bytes: number) => {
    const i = Math.floor(Math.log(bytes) / Math.log(1024)),
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    return +(bytes / Math.pow(1024, i)).toFixed(1) * 1 + ' ' + sizes[i];
  };
  /* 첨부파일 end */
  function onRejected(rejectedEntries: QRejectedEntry[]) {
    // https://quasar.dev/vue-components/file-picker#qfile-api
    const { failedPropValidation } = rejectedEntries[0];
    if (failedPropValidation === 'accept') {
      $q.notify({
        type: 'negative',
        message: allowedFileExtentions + ' 파일만 업로드 가능합니다.',
      });
    } else if (failedPropValidation === 'max-file-size') {
      $q.notify({
        type: 'negative',
        message: readableBytes(maxFileSize) + ' 이하의 파일을 등록해주세요.',
      });
    } else {
      $q.notify({
        type: 'negative',
        message: failedPropValidation,
      });
    }
  }

  function deleteFile(index = 0) {
    console.log('deleteFile index : ', index);
    if (selectedFiles.value.length === 0) return;
    const removedFile = selectedFiles.value.at(index);
    selectedFiles.value = selectedFiles.value.filter((x) => x !== removedFile);
    console.log('file removed : ', removedFile?.name ?? '');

    if (useThumbnails) {
      const removedThumbnail = thumbnails.value.at(index);
      thumbnails.value = thumbnails.value.filter((x) => x !== removedThumbnail);
      if (removedThumbnail) URL.revokeObjectURL(removedThumbnail);
      console.log('thumbnail removed : ', removedFile?.name ?? '');
    }

    fileSlots.value = fileSlots.value.filter((_, i) => i !== index);
    if (fileSlots.value.length === 0) fileSlots.value = [0];
  }

  return {
    maxFileCount,
    maxFileSize,
    allowedFileExtentions,
    fileSlots,
    newFile,
    fileEl,
    selectedFiles,
    thumbnails,
    setSelectSlotIdx,
    onPickNewFile,
    onNewFileChoosen,
    onFileChoosen,
    onNewFileChoosenExcludeLast,
    addThumbnailOf,
    onRejected,
    deleteFile,
  };
}
