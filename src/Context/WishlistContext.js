import axios from "axios";

const { createContext } = require("react");


export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {

    let userToken = localStorage.getItem('userToken');
    let headers = {
        token:userToken
    }

function addToWishlist(productId) {

    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , 
        {productId},
        {headers}
    )
    .then((response)=> response)
    .catch((error)=> error)
}

function displayWislist() {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {headers})
    .then((response)=> response)
    .catch((error)=> error)
}



    return <WishlistContext.Provider value={{addToWishlist , displayWislist}}>
        {props.children}
    </WishlistContext.Provider>
}