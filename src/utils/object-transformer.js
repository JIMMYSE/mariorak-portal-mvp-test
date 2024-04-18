/** @param {any[]} source */
export function cloneArray(source) {
  return source.map(JSON.stringify).map(JSON.parse);
}

/** @param {any} source */
export function cloneObject(source) {
  return JSON.parse(JSON.stringify(source));
}

/** @param {Map<string, string>} source */
export function mapCodeMapListToSelectItems(source) {
  return mapArrayToSelectItems(
    Array.from(source.entries()).map(([a, b]) => [b, a])
  );
}

/** @param {any[][]} source */
export function mapArrayToSelectItems(source) {
  return source.map((kv) => ({
    text: kv[0],
    label: kv[0],
    value: kv[1],
  }));
}

/** @param {{label: string; value: string}[]} source */
export function withDefaultOptions(
  source,
  defaultOption = { label: '-- 선택 --', value: '' }
) {
  return [defaultOption, ...source];
}

/** @param {{text:string; value: string}[]} source
 * @param {number|string|undefined|null} value */
export function getTextFromSelectItemsWithValue(source, value) {
  if (!value) return '';
  return getTextFromTypeArray(
    source.map(({ text, value }) => [text, value]),
    value
  );
}

/** @param {string[][]} source
 * @param {number|string|undefined|null} value */
export function getTextFromTypeArray(source, value) {
  if (!value) return '';
  return (source.find(([, v]) => v === value) ?? [])[0];
}
