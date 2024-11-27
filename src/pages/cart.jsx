import api from "@/api";
import CommonButton from "@/components/common-button";
import Header from "@/components/common-header";
import CartTable from "@/components/common-table/index1";
import { ContextComponent } from "@/context";
import { useContext, useEffect } from "react";

function CartPage() {
  const { setLoading, toast, cusEmail, navigate, getProfile } =
    useContext(ContextComponent);
  useEffect(() => {
    getProfile()
  }, []);
  const cartList = JSON.parse(
    localStorage.getItem(`CART_PRODUCTS_${cusEmail}`)
  );
  const total = cartList?.reduce((acc, product) => {
    return acc + product.price;
  }, 0);
  const createOrder = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .post("/orders/", {
        items: cartList?.map((product) => ({
          product: product.id,
          quantity: product.quantity,
          price: product.price,
        })),
        total: total,
      })
      .then((res) => {
        if (res.status === 201) {
          localStorage.removeItem(`CART_PRODUCTS_${cusEmail}`);
          navigate("/orders");
          toast({
            title: "Order placed successfully!",
          });
        } else {
          toast({
            title: "Error",
            description: "Order not created : " + res.status,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "" + err,
        });
        setLoading(false);
      });
  };
  return (
    <div className="px-5">
      <Header />
      <div className="mt-5 flex flex-col">
        <div className="w-full">
          <CartTable />
          {cartList?.length > 0 ? (
            <div className="flex justify-end mt-5">
              <CommonButton buttonText={"Buy Now"} onClick={createOrder} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
