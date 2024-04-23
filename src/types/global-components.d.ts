// src/global-components.d.ts
// --- form ---
import ABtn from '../components/form/ABtn.vue';
import ABtnIcon from '../components/form/ABtnIcon.vue';
import ABtnIconEnter from '../components/form/ABtnIconEnter.vue';
import ABtnOutlineAmall from '../components/form/ABtnOutlineAmall.vue';
import AInput from '../components/form/AInput.vue';
import AInputVee from '../components/form/AInputVee.vue';
import ACheckbox from '../components/form/ACheckbox.vue';
import AField from '../components/form/AField.vue';

// --- common ---
import ADialog from '../components/common/ADialog.vue';
import ADialogFull from 'src/components/common/ADialogFull.vue';
import AItem from '../components/common/AItem.vue';
import InfoItem from '../components/common/InfoItem.vue';
import ACarousel from '../components/common/ACarousel.vue';
import ASvg from '../components/common/ASvg.vue';
import ATitle from '../components/common/ATitle.vue';
import ASubtitle from '../components/common/ASubtitle.vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    // --- form
    ['ABtn']: typeof ABtn;
    ['a-btn']: typeof ABtn;
    ['ABtnIcon']: typeof ABtnIcon;
    ['a-btn-icon']: typeof ABtnIcon;
    ['ABtnIconEnter']: typeof ABtnIconEnter;
    ['a-btn-outline-small']: typeof ABtnOutlineAmall;
    ['ABtnOutlineAmall']: typeof ABtnOutlineAmall;
    ['a-btn-icon-enter']: typeof ABtnIconEnter;
    ['AInput']: typeof AInput;
    ['a-input-vee']: typeof AInputVee;
    ['AInputVee']: typeof AInputVee;
    ['a-input']: typeof AInput;
    ['ACheckbox']: typeof ACheckbox;
    ['a-checkbox']: typeof ACheckbox;
    ['AField']: typeof AField;
    ['a-field']: typeof AField;
    // --- common
    ['ADialog']: typeof ADialog;
    ['a-dialog']: typeof ADialog;
    ['ADialogFull']: typeof ADialogFull;
    ['a-dialog-full']: typeof ADialogFull;
    ['AItem']: typeof AItem;
    ['a-item']: typeof AItem;
    ['InfoItem']: typeof InfoItem;
    ['info-item']: typeof InfoItem;
    ['ACarousel']: typeof ACarousel;
    ['a-carousel']: typeof ACarousel;
    ['ASvg']: typeof ASvg;
    ['a-svg']: typeof ASvg;
    ['ATitle']: typeof ATitle;
    ['a-title']: typeof ATitle;
    ['ASubtitle']: typeof ASubtitle;
    ['a-subtitle']: typeof ASubtitle;
  }
}
