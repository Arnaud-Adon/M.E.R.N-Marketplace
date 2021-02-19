import React from "react";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import Row from "./Row";

const Cart = () => {
  const { items } = useSelector((state) => ({ ...state.cart }));
  return (
    <>
      <Layout>
        {!items.length && (
          <p
            className="d-flex justify-content-center align-items-center"
            style={{ fontSize: 20 }}
          >
            Your Cart is Empty
          </p>
        )}
        {!!items.length && items.map((item) => <Row key={item.id} {...item} />)}
      </Layout>
    </>
  );
};
export default Cart;
