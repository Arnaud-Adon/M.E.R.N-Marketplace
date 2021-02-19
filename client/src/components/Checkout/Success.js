import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuthentication from "../../lib/hooks/useAuthentication";
import { saveOrder } from "../../lib/state/actions";

const styles = {
  height: "100vh",
  fontSize: 20,
};
function Success({ history }) {
  const dispatch = useDispatch();
  const { handleAuthentification } = useAuthentication();

  const { items } = useSelector((state) => state.cart);
  const total = localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total")).toFixed(2)
    : 0;

  const dispatchAndSaveOrder = (user) => {
    return new Promise((resolve) => {
      const order = { user: user, items: items, total: total };
      dispatch(saveOrder(order));
      resolve();
    });
  };

  const clearStorage = () => {
    return new Promise((resolve) => {
      localStorage.setItem("items", JSON.stringify([]));
      localStorage.removeItem("total");
      resolve();
    });
  };

  const redirectHome = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        history.push("/");
      }, 4000);
      resolve();
    });
  };

  useEffect(() => {
    (async () => {
      const userProfile = await handleAuthentification();
      await dispatchAndSaveOrder(userProfile);
      await clearStorage();
      await redirectHome();
    })();
  }, []);
  return (
    <>
      <div
        style={styles}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="alert alert-success mt-3 mb-3">
          <p className="icontext">
            <i className="icon text-success fa fa-thumbs-up"></i>Thank you for
            your order &amp; your payment
          </p>
        </div>
      </div>
    </>
  );
}
export default Success;
