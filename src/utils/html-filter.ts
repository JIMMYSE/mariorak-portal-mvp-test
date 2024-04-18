import sanitizeHtml from 'sanitize-html';

const defaultOptions = {
  // 허용 태그
  allowedTags: sanitizeHtml.defaults.allowedTags // 기본 태그
    .concat(['img']), // 추가 태그

  // 허용 속성
  allowedAttributes: {
    // 기본 속성
    ...sanitizeHtml.defaults.allowedAttributes,

    // 공통 추가 속성
    '*': ['class', 'style'],

    // 태그별 추가 속성
    table: ['border', 'cellpadding', 'cellspacing'],
    td: ['colspan', 'rowspan'],
  },

  // 허용 스타일: https://github.com/apostrophecms/sanitize-html#allowed-css-styles
  allowedStyles: {
    // 공통 추가 스타일
    '*': {
      color: [
        /^#(0x)?[0-9a-f]+$/i,
        /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
      ],
      'background-color': [
        /^#(0x)?[0-9a-f]+$/i,
        /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
      ],
      'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
      'font-size': [/^\d+(?:px|em|rem|%)$/],
    },
  },
};

/**
 * HTML 필터링
 */
export function filterHtml(html = '') {
  return sanitizeHtml(html, defaultOptions);
}

/**
 * 텍스트의 HTML 필터링 (텍스트의 \n, \r\n을 <br>로 변환 포함)
 */
export function filterHtmlWithNewLine(html = '') {
  return sanitizeHtml(html.replace(/(\n|\r\n)/g, '<br />'), defaultOptions);
}
