function pick(object: object, keys: string[]) {
  return keys.reduce((obj, key) => {
    if (object && object.hasOwnProperty(key)) {
      // @ts-expect-error
      obj[key] = object[key];
    }
    return obj;
  }, {});
}
export { pick };
