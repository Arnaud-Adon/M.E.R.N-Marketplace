import React from "react";
import { useSelector } from "react-redux";

const CartTotal = () => {
  const { items, delivery: shipping } = useSelector((state) => ({
    ...state.cart,
  }));
  const [subTotal, setSubTotal] = React.useState(0.0);
  const [total, setTotal] = React.useState(0.0);

  const delivery = shipping === "standard" ? 10.0 : 20.0;

  React.useEffect(() => {
    let subTotalItems = items.map((item) => item.price * item.quantity);

    setSubTotal(
      !!items.length
        ? subTotalItems.reduce((item1, item2) => item1 + item2)
        : 0.0
    );

    setTotal(subTotal + delivery);
  }, [items, subTotal, total]);

  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Have coupon?</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name=""
                  placeholder="Coupon code"
                />
                <span className="input-group-append">
                  <button className="btn btn-primary">Apply</button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <dl className="dlist-align">
            <dt>SubTotal:</dt>
            <dd className="text-right">
              ${!!items.length ? subTotal.toFixed(2) : "0.00"}
            </dd>
          </dl>
          <dl className="dlist-align">
            <dt>Delivery:</dt>
            <dd className="text-right">
              ${!!items.length ? delivery.toFixed(2) : "0.00"}
            </dd>
          </dl>
          <dl className="dlist-align">
            <dt>Discount:</dt>
            <dd className="text-right">---</dd>
          </dl>
          <dl className="dlist-align">
            <dt>Total:</dt>
            <dd className="text-right  h5">
              <strong>${!!items.length ? total.toFixed(2) : "0.00"}</strong>
            </dd>
          </dl>
          <hr />
          <p className="text-center mb-3">
            <img src="images/misc/payments.png" height="26" />
          </p>
        </div>
      </div>
    </>
  );
};
export default CartTotal;
