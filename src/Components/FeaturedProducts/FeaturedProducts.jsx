import axios from "axios";
import { useContext, useEffect } from "react";
import { Audio } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from 'react-hot-toast';
import { WishlistContext } from "../../Context/WishListContext";

export default function FeaturedProducts() {

  let {addToWishlist} = useContext(WishlistContext);
  let { addToCart } = useContext(CartContext);

  async function addProductToWishlist(id) {

    let response = await addToWishlist(id);

    if(response.data.status === 'success'){

       toast.success('product successfully added to your wish list', {
           duration: 4000,
           position: 'top-center'
       })

    }
    else {
   toast.dismiss('product successfully added', {
           duration: 4000,
           position: 'top-center'
       })
    }
 }


  async function addProductToCart(id) {
     let response = await addToCart(id);

     if(response.data.status === 'success'){

        toast.success('product successfully added to your Cart', {
            duration: 4000,
            position: 'top-center'
        })
     }
     else {
    toast.dismiss('product successfully added', {
            duration: 4000,
            position: 'top-center'
        })
     }
  }

  function getFeaturedProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { isLoading, data } = useQuery("featuredProducts", getFeaturedProducts);

  // let [products, setProducts] = useState([]);
  // let [isLoading, setIsLoading] = useState(false)

  // async function getFeaturedProducts() {
  //     setIsLoading(true)
  //     let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  //     setProducts(data.data)
  //     setIsLoading(false)

  // }

  // useEffect(()=>{

  //     getFeaturedProducts()
  // }, [])
 


  return (
    <>
      <div className="container py-2">
        <div className="row g-4">
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center pt-5">
              <h1>
                <Audio
                  height="100"
                  width="100"
                  color="#4fa94d"
                  ariaLabel="audio-loading"
                  wrapperStyle={{}}
                  wrapperClass="wrapper-class"
                  visible={true}
                />
              </h1>
            </div>
          ) : (
            data?.data.data.map((product) => (
              <div className="col-md-2" key={product._id}>
                <div className="product p-2 text-center">
                  <Link to={`/productdetails/${product._id}`}>
                    <img src={product.imageCover} className="w-100" alt="" />
                    <span className="text-main">{product.category.name}</span>
                    <p>{product.title.split(" ").slice(0, 2).join(" ")}</p>
                    <div className="product-footer d-flex justify-content-between">
                      <span>{product.price} EGP</span>
                      <span>
                        <i className="fa-solid fa-star rating-color me-1"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <div className="d-flex justify-content-between align-items-center">
                  <button
                    onClick={() => addProductToCart(product._id)}
                    className="btn bg-main my-2 text-white w-75 "
                  >
                    add to cart
                  </button>
                  <i id={product._id} title="Add to Wish List" onClick={()=> addProductToWishlist(product._id)
                } 
                    className="fa-solid fa-heart fa-xl me-2 cursor-pointer"></i>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
