import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import SingleProdForm from "../components/Form/SingleProdForm";
import "@testing-library/jest-dom";

test("changing price, qty, and discount affects other calculation", async () => {
  render(
    <MemoryRouter>
      <SingleProdForm id={2} removeProdHandler={() => {}} />
    </MemoryRouter>
  );

  const qtyInput = await screen.findByRole("spinbutton", { name: /quantity/i });

  const originalPriceInput = await screen.findByRole("spinbutton", {
    name: /original unit price/i,
  });

  const discountInput = await screen.findByRole("spinbutton", {
    name: "Discount (%)",
  });

  act(() => {
    userEvent.click(qtyInput);
    userEvent.clear(qtyInput);
    userEvent.keyboard("2");

    userEvent.click(originalPriceInput);
    userEvent.clear(originalPriceInput);
    userEvent.keyboard("200");

    userEvent.click(discountInput);
    userEvent.clear(discountInput);
    userEvent.keyboard("10");
  });

  const discUnitPrice = await screen.findByRole("textbox", {
    name: /Discounted Unit Price/i,
  });

  const totalDiscount = await screen.findByRole("textbox", {
    name: "Total Discount ($)",
  });

  const total = await screen.findByRole("textbox", {
    name: /total original price/i,
  });

  const totalDisc = await screen.findByRole("textbox", {
    name: /total discounted price/i,
  });

  expect(discUnitPrice).toHaveValue(`180.00`);
  expect(totalDiscount).toHaveValue(`40.00`);
  expect(total).toHaveValue(`400.00`);
  expect(totalDisc).toHaveValue(`360.00`);
});
