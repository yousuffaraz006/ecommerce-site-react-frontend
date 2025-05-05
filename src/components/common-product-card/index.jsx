import CommonButton from "../common-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useContext, useEffect, useState } from "react";
import { ContextComponent } from "@/context";
import { ACCESS_TOKEN } from "@/constants";
import axios from "axios";

function CommonProductCard({ produc }) {
  const {
    startUrl,
    toast,
    cusEmail,
    cusPhone,
    cusAddress,
    navigate,
    group,
    setShowDialog,
    setProductImg,
    setProductName,
    setProductRate,
    setProductDesc,
    setCurrentUpdateId,
    setCurrentDeleteId,
  } = useContext(ContextComponent);
  const [productQuantity, setProductQuantity] = useState("1");
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  useEffect(() => {
    const existingProducts =
      JSON.parse(localStorage.getItem(`CART_PRODUCTS_${cusEmail}`)) || [];
    const newProduct = produc?.id;
    const productExists = existingProducts.some(
      (existingProduct) => existingProduct.id === newProduct
    );
    if (productExists) {
      setIsAddedToCart(true);
    }
  }, []);
  const handleAddToCart = () => {
    if (!cusEmail || !cusPhone || !cusAddress) {
      toast({
        title: "Profile Incomplete",
        description: (
          <span>
            Please complete your profile before creating an order. Go to your{" "}
            <a href="/profile" className="underline text-blue-500">
              Profile
            </a>
            .
          </span>
        ),
      });
      return;
    }
    const existingProducts =
      JSON.parse(localStorage.getItem(`CART_PRODUCTS_${cusEmail}`)) || [];
    const productPrice = +produc?.rate * +productQuantity;
    const newProduct = {
      id: produc?.id,
      image: produc?.prodimg,
      name: produc?.name,
      quantity: productQuantity,
      rate: produc?.rate,
      price: productPrice,
    };
    existingProducts.push(newProduct);
    localStorage.setItem(
      `CART_PRODUCTS_${cusEmail}`,
      JSON.stringify(existingProducts)
    );
    setIsAddedToCart(true);
    toast({
      title: "Product Added to Cart",
      description: (
        <span>
          View your cart{" "}
          <a href="/cart" className="text-blue-500 underline">
            here
          </a>
          .
        </span>
      ),
    });
  };
  const fetchProductDetail = async (id) => {
    try {
      const apiResponse = await axios.get(
        `${startUrl}/product/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        }
      );
      setProductImg(apiResponse.data.prodimg);
      setProductName(apiResponse.data.name);
      setProductRate(apiResponse.data.rate);
      setProductDesc(apiResponse.data.description);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card
      key={produc?.id}
      className="flex flex-col gap-2 p-3 rounded-2xl bg-blue-300 transition-all duration-700 hover:p-0 hover:gap-3 cursor-pointer"
    >
      <CardHeader
        className="p-0 mb-0 transition-all duration-700 hover:p-0"
        onClick={() => navigate(`/product/${produc?.id}`)}
      >
        <div className="w-full">
          <img
            className="w-full h-40 object-cover rounded-t-2xl"
            src={`${startUrl}${produc?.prodimg}`}
            alt="product-image"
          />
        </div>
      </CardHeader>
      <CardTitle
        className="text-2xl max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap font-semibold px-2 text-blue-500 underline"
        onClick={() => navigate(`/product/${produc?.id}`)}
      >
        {produc?.name}
      </CardTitle>
      {group === "customer" ? (
        <>
          <CardContent
            className="px-3 pb-0"
            onClick={() => navigate(`/product/${produc?.id}`)}
          >
            <CardDescription className="text-black text-base">
              <p className="font-bold">&#8377; {produc?.rate}</p>
            </CardDescription>
          </CardContent>
          <CardFooter className="px-3 pb-1">
            <div className="w-full">
              {isAddedToCart ? (
                <br />
              ) : (
                <div>
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Quantity :
                  </label>
                  <select
                    id={`quantity-${produc?.id}`}
                    className="rounded-xl mx-1 bg-blue-300"
                    // style={{ height: "40px" }}
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              )}
              <CommonButton
                onClick={handleAddToCart}
                extraStyles={"mt-2 w-full"}
                buttonText={isAddedToCart ? "Added" : "Add to cart"}
                disabled={isAddedToCart}
              />
            </div>
          </CardFooter>
        </>
      ) : (
        <CardFooter className="px-3 pb-1">
          <div className="w-full flex justify-between">
            <div className="">
              <CommonButton
                onClick={() => {
                  fetchProductDetail(produc?.id);
                  setCurrentUpdateId(produc?.id);
                  setShowDialog(true);
                }}
                extraStyles={"mt-2"}
                buttonText={"Update"}
              />
            </div>
            <div className="">
              <CommonButton
                onClick={() => {
                  setCurrentDeleteId(produc?.id);
                  setShowDialog(true);
                }}
                extraStyles={"mt-2"}
                buttonText={"Delete"}
              />
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

export default CommonProductCard;
