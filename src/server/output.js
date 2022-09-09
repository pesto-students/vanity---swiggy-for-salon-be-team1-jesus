const { assoc } = require('ramda');

module.exports = () => {
  const defaultResponse = (success = true, pagination) => {
    return {
      success,
      pagination,
    };
  };

  const accessResponse = (success = true, acceessToken) => {
    return {
      success,
      acceessToken,
    };
  };

  const success = (data, pagination) => {
    return assoc('data', data, defaultResponse(true, pagination));
  };

  const access = (data, acceessToken) => {
    return assoc('data', data, accessResponse(true, acceessToken));
  };

  const fail = (data) => {
    return assoc('data', data, defaultResponse(false));
  };

  const loginFail = (data) => {
    return assoc('data', data, defaultResponse(false));
  };

  return {
    success,
    access,
    fail,
    loginFail,
  };
};
