module.exports = (() => {
  const counters = {};

  return {
    set: counterName => {
      if (typeof counterName === "string") {
        counters[counterName] = 0;
      }
    },
    //increment
    tick: counterName => {
      if (typeof counters[counterName] === "number") {
        ++counters[counterName];
      }
    },
    get: counterName => counters[counterName],
    getStr: counterName => `Name: ${counterName} - count: ${counters[counterName]}`,
    getAll: () => counters
  };
})();
