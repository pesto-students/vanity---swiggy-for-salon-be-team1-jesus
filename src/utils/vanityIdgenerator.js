const vanityIdgenerator = (str) => {
  return str + '-' + Math.random().toString(36);
};

module.exports = vanityIdgenerator;
