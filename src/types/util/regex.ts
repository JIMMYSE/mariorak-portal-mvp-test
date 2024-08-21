/**
 * 비밀번호 정규식
 * @description 영문, 숫자 조합. 10자리 이상, 16자리 이하.
 */
export const REGEX_PASSWORD =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()-=_+/?]{10,16}$/;

/**
 * 수강생 이름 정규식
 * @description 한글만 허용. 2자 이상, 19자 이하.
 */
export const REGEXP_TRAINEE_NAME = /^[가-힣]{2,19}$/;

/**
 * 닉네임 정규식
 * @description 영문, 한글, 숫자 조합. 2자 이상, 8자 이하.
 */
export const REGEXP_NICKNAME = /^[a-zA-Z가-힣0-9]{1,8}$/;

/**
 * 이메일 정규식
 * @description 일반적인 이메일 형식 검사.
 */
export const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * 휴대전화 번호 정규식
 * @description 대한민국 휴대전화 번호 형식 검사. 010, 016, 017, 018, 019로 시작.
 */
export const REGEX_MOBILE = /^01[016789]-?[0-9]{3,4}-?[0-9]{4}$/;
