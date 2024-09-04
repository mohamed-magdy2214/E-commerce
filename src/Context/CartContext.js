import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let CartContext = createContext();

export default function CartContextProvider(props) {

    const [numOfCartItems , setNumOfCartItems] = useState(0)
    let userToken = localStorage.getItem('userToken');

    let headers = {
        token:userToken
    }

    function addToCart(productId) {

        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` ,
            {
                productId
            }, 
            {
                headers
            })
            .then((response)=> response)
            .catch((error)=> error)
    }

    function getLoggedUserCart() {

        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers
        })
        .then((response)=> response)
        .catch((error)=> error)
    }

    function removeCart(productId) {
        
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , 
            {
                headers
            }
        )
        .then((response)=> response)
        .catch((error)=> error)
    }

    function clearCart() {

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , 
            {
                headers
            }
        )
        .then((response)=> response)
        .catch((error)=> error)
    }

    function updateProductCount(productId , count) {

        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,
            {count},
            {headers}
        )
    }

    function onlinePayment(cartId , values){

        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000` ,
            {shippingAddress:values},
            {headers}
        )
        .then((response)=> response)
        .catch((error)=> error)
    }


    const [cartId, setcartId] = useState(null)

    async function getCartId() {
        let {data} = await getLoggedUserCart();
        setcartId(data?.data._id);
    }

    useEffect(()=> {
        getCartId()
    }, [])

    return <CartContext.Provider value={{addToCart , getLoggedUserCart , removeCart , clearCart , numOfCartItems , setNumOfCartItems , updateProductCount , cartId , onlinePayment}}>
        {props.children}
    </CartContext.Provider>
}