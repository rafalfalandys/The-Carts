// function generating max value of a chart.
export const createPriceRange = (prices) => {
  if (!prices) return;

  const maxPrice = Math.max(...prices);
  const roundFactorDigits = [...(maxPrice + "")].map((_, i) =>
    i === 0 ? "1" : "0"
  );

  roundFactorDigits.length =
    roundFactorDigits.length > 3 ? 3 : roundFactorDigits.length;

  const roundFactor = +roundFactorDigits.join("");

  // the .ceil, and 1.2 factor is there to avoid chart hitting maximum value
  const maxRange = Math.ceil((maxPrice * 1.2) / roundFactor) * roundFactor;
  return [0, maxRange];
};
