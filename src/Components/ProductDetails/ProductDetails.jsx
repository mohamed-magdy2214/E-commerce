import axios from "axios";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { useContext } from "react";
import Slider from "react-slick";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let { addToCart } = useContext(CartContext);

  let params = useParams();

  async function addProductToCart(id) {
    let response = await addToCart(id);

    if(response.data.status === 'success'){

      toast.success('product successfully added to your cart', {
          duration: 4000,
          position: 'top-center'
      })
   }
   else {
  toast.dismiss('product not added to your cart', {
          duration: 4000,
          position: 'top-center'
      })
   }
  }

  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data } = useQuery("productDetails", () => getProductDetails(params.id));

  console.log(data?.data.data.images);

  return (
    <>
      <div className="container p-5">
        {data?.data.data ? (
          <div className="row p-3 align-items-center">
            <Helmet>
              <title>{data?.data.data.title}</title>
            </Helmet>
            <div className="col-md-3 ">
              <Slider {...settings}>
              {data?.data.data.images.map((src)=> <img
                  src={src}
                  className="w-100"
                  alt=""
                />)}
                
              </Slider>
            </div>
            <div className="col-md-9 mt-4">
              <h2 className="h4">{data?.data.data.title}</h2>
              <p>{data?.data.data.description}</p>
              <span className="mt-3 text-main">
                {data?.data.data.category.name}
              </span>
              <div className="d-flex justify-content-between mt-1">
                <span>price : {data?.data.data.price} EGP</span>
                <span>
                  <i className="fa-solid fa-star rating-color me-2"></i>
                  {data?.data.data.ratingsAverage}
                </span>
              </div>
              <button
                onClick={() => addProductToCart(data?.data.data._id)}
                className="btn bg-main w-100 text-white mt-2"
              >
                Add to cart
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
