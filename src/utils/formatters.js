export const getDecimalValue = value => {
    const decimal = value - Math.trunc(value);
    return decimal.toFixed(2).split('.')[1];
  };