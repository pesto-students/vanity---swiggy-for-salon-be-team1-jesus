const { assoc } = require('ramda');

module.exports = () => {
  const defaultResponse = (success = true, pagination) => {
    return {
      success,
      pagination,
    };
  };

  const success = (data, pagination) => {
    return assoc('data', data, defaultResponse(true, pagination));
  };

  const fail = (data) => {
    return assoc('data', data, defaultResponse(false));
  };

  const loginFail = (data) => {
    return assoc('data', data, defaultResponse(false));
  };

  return {
    success,
    fail,
    loginFail,
  };
};
