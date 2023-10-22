import axios from "axios";
import { createContext } from "react";


export let WishlistContext = createContext();
let userToken = localStorage.getItem('userToken');
    let headers = {
        token : userToken
    }


function getUserWishlist(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
        headers: headers
    })
    .then((response)=> response)
    .catch((error)=> error)
}

function addToWishlist(id){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        productId: id
    }, {
        headers: headers
    })
    .then((response)=> response)
    .catch((error)=> error)
}

function removeItem(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
        headers: headers
    })
    .then((response)=> response)
    .catch((error)=> error)
}

export default function WishlistContextProvider(props){

    return <WishlistContext.Provider value={{getUserWishlist , removeItem , addToWishlist}}>
        {props.children}
    </WishlistContext.Provider>
}

