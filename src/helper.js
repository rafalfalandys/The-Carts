// function generating max value of a chart.
export const createPriceRange = (prices) => {
  if (!prices) return;

  const maxPrice = Math.max(...prices);
  const roundFactorDigits = [...(maxPrice + "")].map((_, i) =>
    i === 0 ? "1" : "0"
  );
  roundFactorDigits.length =
    roundFactorDigits.length > 3 ? 3 : roundFactorDigits.length;

  // division by 2 is here to fine tune the range.
  const roundFactor = +roundFactorDigits.join("") / 2;
  // division by four is here to make sure chart always displays 4 nice divisions
  const maxRange = Math.ceil(maxPrice / 4 / roundFactor) * roundFactor * 4;

  return [0, maxRange];
};
