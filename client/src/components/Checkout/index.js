import React from "react";
import * as Input from "../Auth/Input";
import Payment from "./Payment";
import DeliveryBox from "./DeliveryBox";
import { useDispatch, useSelector } from "react-redux";
import { useFormValidation } from "../../lib/hooks/useFormValidation";
import { setDelivery } from "../../lib/state/actions";
import { selectCartTotal } from "../../lib/state/selectors";

const defaultValues = {
  delivery: "standard",
  address: "",
};

const options = ["Canada", "Russia", "United States", "India", "Afganistan"];
const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { delivery } = useSelector((state) => state.cart);
  const total = useSelector(selectCartTotal);

  const { first, last, email, city, country, gender } = user ?? {};
  const dispatch = useDispatch();
  const {
    formValues,
    register,
    validate,
    handleOnChange,
    isValid,
  } = useFormValidation({ formName: "checkout", defaultValues });

  const { address } = formValues["checkout"] ?? {};

  const handleChangeDelivery = (event, value) => {
    handleOnChange(event, value);
    dispatch(setDelivery(value));
  };

  React.useEffect(() => {
    register(defaultValues);
  }, []);

  React.useEffect(() => {
    validate(formValues["checkout"] ?? {});
  }, [formValues]);

  React.useEffect(() => {
    localStorage.setItem("total", total);
  }, [total]);

  return (
    <>
      <section
        className="section-content padding-y"
        style={{ margin: "100px auto", maxWidth: "720px" }}
      >
        <div className="container">
          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title mb-3">Delivery info</h4>

              <div className="form-row">
                <div className="form-group col-sm-6">
                  <DeliveryBox
                    title="standard"
                    message="Free by airline within 20 days"
                    value={delivery ?? formValues["checkout"].delivery}
                    onChange={(e) => handleChangeDelivery(e, "standard")}
                  />
                </div>
                <div className="form-group col-sm-6">
                  <DeliveryBox
                    title="fast"
                    message="Extra 20$ will be charged"
                    value={delivery ?? formValues["checkout"].delivery}
                    onChange={(e) => handleChangeDelivery(e, "fast")}
                  />
                </div>
              </div>

              <div className="form-row">
                <Input.Text
                  label="First name"
                  name="first"
                  value={first}
                  onChange={handleOnChange}
                />
                <Input.Text
                  label="Last name"
                  name="last"
                  value={last}
                  onChange={handleOnChange}
                />
              </div>

              <div className="form-row">
                <Input.Email
                  label="Email"
                  value={email}
                  onChange={handleOnChange}
                  col="6"
                />
              </div>
              <div className="form-row">
                <Input.Select
                  name="country"
                  options={options}
                  label="Country"
                  col="6"
                  value={country}
                  onChange={handleOnChange}
                />
                <Input.Text
                  label="City"
                  name="city"
                  value={city}
                  onChange={handleOnChange}
                />
              </div>
              <Input.TextArea
                label="Address"
                name="address"
                value={address}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-row" style={{ padding: "0 25px 30px" }}>
              <Payment isValid={!isValid} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Checkout;