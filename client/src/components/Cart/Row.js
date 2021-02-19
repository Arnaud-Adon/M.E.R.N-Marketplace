import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCart } from "../../lib/state/actions";

const Row = ({ id, name, price, quantity }) => {
  const dispatch = useDispatch();

  const removeFromCartAction = () => {
    dispatch(removeFromCart(id));
  };

  const updateCartAction = (e) => {
    e.preventDefault();
    dispatch(updateCart(id, e.target.value));
  };

  return (
    <tr>
      <td>
        <figure className="itemside">
          <div className="aside">
            <img src={`images/items/${id}.jpg`} className="img-sm" />
          </div>
          <figcaption className="info">
            <a href="#" className="title text-dark">
              {name}
            </a>
          </figcaption>
        </figure>
      </td>
      <td>
        <select
          className="form-control"
          value={quantity}
          onChange={updateCartAction}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </td>
      <td>
        <div className="price-wrap">
          <var className="price">${(quantity * price).toFixed(2)}</var>
        </div>
      </td>
      <td className="text-right">
        <button
          data-original-title="Save to Wishlist"
          className="btn btn-light"
          data-toggle="tooltip"
          onClick={() => null}
        >
          {" "}
          <i className="fa fa-heart"></i>
        </button>
        <button
          className="btn btn-light btn-round"
          onClick={removeFromCartAction}
        >
          {" "}
          Remove
        </button>
      </td>
    </tr>
  );
};
export default Row;
