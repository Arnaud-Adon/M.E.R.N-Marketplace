import React from "react";
import { useSelector } from "react-redux";
import { processPayment } from "../../lib/service";
import { selectDeliveryCost } from "../../lib/state/selectors";

function Payment({ isValid }) {
  const { items } = useSelector((state) => state.cart);
  const shippingCost = useSelector(selectDeliveryCost);
  const shipping = {
    price_data: {
      currency: "usd",
      product_data: { name: "shipping Cost" },
      unit_amount: shippingCost * 100,
    },
    quantity: 1,
  };

  const processItem = (item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  });

  const order = items.map(processItem) ?? {};
  const orderWithShipping = order.concat(shipping);

  const redirectToPayment = () => {
    processPayment(orderWithShipping);
  };
  return (
    <button
      role="link"
      className="btn btn-outline-primary btn-lg mt-3 btn-block"
      onClick={redirectToPayment}
      disabled={isValid}
    >
      Checkout
    </button>
  );
}
export default Payment;
