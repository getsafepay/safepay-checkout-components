import webpack from "webpack";

function jsonifyPrimitives(item) {
  if (Array.isArray(item)) {
    return JSON.stringify(item);
  } else if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean' || item === null || item === undefined) {
    return JSON.stringify(item);
  } else if (typeof item === 'function') {
    return item();
  } else if (typeof item === 'object' && item !== null) {
    if (item.hasOwnProperty('__literal__')) {
      return item.__literal__;
    }
    const result = {};
    for (const key of Object.keys(item)) {
      result[key] = jsonifyPrimitives(item[key]);
    }
    return result;
  } else {
    throw new TypeError(`Unrecognized type: ${ typeof item }`);
  }
}

export function define(vars) {
  return new webpack.DefinePlugin(jsonifyPrimitives(vars))
}