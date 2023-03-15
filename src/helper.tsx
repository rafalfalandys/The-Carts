import { Cart } from "./types";

// function generating max value of a chart.
export const createPriceRange: (prices: number[]) => number[] = (prices) => {
  if (!prices) return [];

  const maxPrice = Math.max(...prices);
  const roundFactorDigits = Array.from(maxPrice + "").map((_, i) =>
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

// export const getLocalData: (
//   newCarts: string,
//   removedCarts: string
// ) => { newCarts: Cart[]; removedCarts: number[] } = (newCarts, removedCarts) => {};

export const getLocalData = () => {
  const localCartsJson = localStorage.getItem("new-carts") || "";
  const localCarts = JSON.parse(localCartsJson);
  const localRemovedCartsJson = localStorage.getItem("removed-carts") || "";
  const localRemovedCarts = JSON.parse(localRemovedCartsJson);

  return { localCarts, localRemovedCarts } as {
    localCarts: Cart[];
    localRemovedCarts: number[];
  };
};
