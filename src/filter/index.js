/**
 * 模板注册的全局 filter
 */

/**
 * 默认值
 * 假值（'', null, undefined, NaN, false, 不包括 数字 0）返回 defaults 值
 * @example {{ xxx | default 'ooo'}}
 * @expect xxx 是假值 返回 'ooo'
 */
export function dft(value, defaults) {
  /* eslint no-unneeded-ternary: 0 */
  return value ? value : 0 === value ? value : defaults
}
