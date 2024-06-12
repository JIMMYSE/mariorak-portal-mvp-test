import { h } from 'vue';
import { useConfirmFullDialog } from '../common/dialog';
import { q-icon } from 'quasar';
import { goToName } from '../common/app';
import { SocialLoginType } from 'src/services/auth/model';

export async function useExistingUserDialog(
  email: string,
  provider: SocialLoginType
) {
  const icon =
    provider === 'local'
      ? h(
          'div',
          { class: 'rounded-full bg-primary flex flex-center size-[47px]' },
          [
            h(q-icon, {
              name: 'img:/images/icons/icon_email.svg',
              size: '22px',
            }),
          ]
        )
      : h(q-icon, {
          name: `img:/images/icons/btn_${provider}.svg`,
          size: '47px',
        });
  useConfirmFullDialog({
    dialogTitle: 'join.existUserDialog',
    htmlTitle: {
      key: 'join.existUserDialogDetail',
      data: {
        email,
      },
    },
    contentComponent: h(
      'div',
      {
        class: 'row justify-center pt-[115px] pb-6',
      },
      icon
    ),
    buttons: [
      //   {
      //     label: 'label.resetPassword',
      //     value: 'reset-password',
      //     color: 'white',
      //     textColor: 'black',
      //   },
      { label: 'label.login', value: true, color: 'primary' },
    ],
  })
    // .onOk((result) => {
    //   if (result === 'reset-password') {
    //     goToName('reset-password', { id, token});
    //   }
    // })
    // .onCancel(() => {
    //   console.log('onCancel');
    //   goToName('login');
    // })
    .onDismiss(() => {
      goToName('login');
    });
}
