import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Audio } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";


export default function Cart() {
  let navigate = useNavigate();
  let { getLoggedUserCart, removeSpecificItem , updateCartQuantity , clearCart} = useContext(CartContext);
  let [cartDetails, setCartDetails] = useState(null);

  async function displayCart() {
    let { data } = await getLoggedUserCart();
    setCartDetails(data);
  }

  async function removeItem(id) {
    let { data } = await removeSpecificItem(id);
    setCartDetails(data);
  }

  async function updateQuantity(id , count){
    let {data} = await updateCartQuantity(id , count)
    setCartDetails(data);
  }

  async function clearUserCart(){
    let response = await clearCart();
    setCartDetails(response.message);
    console.log(response.message);
    navigate('/')
  }

  useEffect(() => {
    displayCart();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartDetails ? (
        <div className="container my-3 p-3">
          <h3>Shop Cart :</h3>
          <h2 className="h6 text-main">
            Total Cart Items : {cartDetails.numOfCartItems}
          </h2>
          <h2 className="h6 text-main mb-4">
            Total Cart Price : {cartDetails.data.totalCartPrice} EGP
          </h2>

          {cartDetails.data.products.map((product) => (
            <>
              <div key={product.product.id} className="row py-2 border-bottom">
                <div className="col-md-1">
                  <img
                    src={product.product.imageCover}
                    className="w-100"
                    alt=""
                  />
                </div>
                <div className="col-md-11 pt-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 className="h6">
                        {product.product.title
                          .split(" ")
                          .slice(0, 15)
                          .join(" ")}
                      </h4>
                      <h6 className="text-main">price : {product.price}</h6>
                    </div>
                    <div>
                      <button onClick={()=> updateQuantity(product.product.id , product.count + 1)} className="btn border-btn p-2">+</button>
                      <span className="mx-2">{product.count}</span>
                      <button onClick={()=> updateQuantity(product.product.id , product.count - 1)} className="btn border-btn p-2">-</button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(product.product.id)}
                    className="btn p-0"
                  >
                    <i className="fa-solid fa-trash-can text-danger me-2"></i>
                    Remove
                  </button>
                </div>
              </div>
            </>
          ))}
          <div className="d-flex justify-content-center">
            <button onClick={()=> clearUserCart()} className="btn bg-main text-white mt-3 w-50 ">Clear Cart</button>
          </div>
          <div className="payment mt-3 d-flex justify-content-center">
            <Link to={'/adress'} className="btn bg-main w-25 me-2 text-white">Online Payment</Link>
            <Link className="btn bg-main w-25 text-white">Cash Payment</Link>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <Audio
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
          />
        </div>
      )}
    </>
  );
}
