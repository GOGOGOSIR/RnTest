// 校验类型
export function validateType(target, type) {
  if (typeof type !== 'string') {
    type = type.toString();
  }
  return Object.prototype.toString.call(target) === `[object ${type}]`;
}
