import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import Checkout from "./Checkout"
import { calculateOrderCost } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { useCreateNewOrderMutation } from "../../redux/api/orderApi";
import {toast} from "react-hot-toast"

const PaymentMethod = () => {

  const [method, setMethod] = useState("")

  const navigate = useNavigate()
  
  const {shippingInfo, cartItems} = useSelector((state) => state.cart)

  const [createNewOrder, {isLoading, error, isSuccess}] = useCreateNewOrderMutation()


  const {itemsPrice, shippingPrice, taxPrice, totalPrice} = calculateOrderCost(cartItems)

    useEffect(() => {
      if(error) {
        toast.error(error?.data?.message)
      }
      if(isSuccess){
        navigate("/")
      }
    }, [error, isSuccess])

    const submitHandler = (e) => {
    e.preventDefault();

    if(method === "COD"){
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
        paymentInfo: {
          status: "Not Paid",
        },
        paymentMethod: "COD",
      }
      createNewOrder(orderData)
    }
    if(method === "Card"){
      alert("Card")
    }

  };

    return (
      <>
      <MetaData title={"Payment Method"}></MetaData>
      <Checkout shipping confrimOrder payment></Checkout>
        <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={submitHandler}
        >
          <h2 className="mb-4">Select Payment Method</h2>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="payment_mode"
              id="codradio"
              value="COD"
              onChange={(e) => setMethod("COD")}
            />
            <label className="form-check-label" htmlFor="codradio">
              Cash on Delivery
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="payment_mode"
              id="cardradio"
              value="Card"
              onChange={(e) => setMethod("Card")}
            />
            <label className="form-check-label" htmlFor="cardradio">
              Card - VISA, MasterCard
            </label>
          </div>

          <button id="shipping_btn" type="submit" className="btn py-2 w-100">
            CONTINUE
          </button>
        </form>
      </div>
    </div>
    </>
    )
}

export default PaymentMethod