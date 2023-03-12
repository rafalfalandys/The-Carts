// function generating max value of a chart. To avoid chart hitting maximum value
export const createPriceRange = (prices) => {
  if (!prices) return;

  const maxPrice = Math.max(...prices);
  const roundFactorDigits = [...(maxPrice + "")].map((_, i) =>
    i === 0 ? "1" : "0"
  );

  roundFactorDigits.length =
    roundFactorDigits.length > 3 ? 3 : roundFactorDigits.length;

  const roundFactor = +roundFactorDigits.join("");

  const maxRange = Math.ceil((maxPrice * 1.4) / roundFactor) * roundFactor;
  return [0, maxRange];
};
