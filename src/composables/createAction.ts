/**
 * action 생성
 * @param setup
 * @returns
 */
export const createAction = <T>(setup: () => T): T => {
  return setup();
};
