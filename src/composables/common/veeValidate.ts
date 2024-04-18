import { PublicPathState } from 'vee-validate';

export const quasarVeeConfig = <T>(state: PublicPathState<T>) => ({
  props: {
    validateOnInput: true,
    error: !!state.errors[0],
    'error-message': state.errors[0],
  },
});
