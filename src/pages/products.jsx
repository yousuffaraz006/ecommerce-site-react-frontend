import api from "@/api";
import CommonAddEdit from "@/components/common-add-edit";
import CommonButton from "@/components/common-button";
import Header from "@/components/common-header";
import CommonProductCard from "@/components/common-product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ContextComponent } from "@/context";
import { useContext, useEffect } from "react";

function Products() {
  const {
    setLoading,
    loading,
    productsList,
    setProductsList,
    group,
    setShowDialog,
    getProfile,
  } = useContext(ContextComponent);
  useEffect(() => {
    getProducts();
    {
      group === "customer" ? getProfile() : "";
    }
  }, []);
  const getProducts = () => {
    setLoading(true);
    api
      .get("/products/")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        const plural = data.length > 1 ? "s" : "";
        if (data?.length > 0 ? true : false) {
          setProductsList(data);
          console.log(data.length + ` Product${plural} fetched successfully.`);
        } else {
          console.log("You have no orders yet.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  if (loading) {
    return (
      <Skeleton
        className={`w-full h-screen  rounded-[6px] bg-black opacity-50`}
      />
    );
  }
  return (
    <div className="px-5">
      <Header />
      <div className="my-5 flex flex-col">
        {group === "admin" ? (
          <div>
            <CommonButton
              buttonText={"Add New Product"}
              onClick={() => setShowDialog(true)}
            />
          </div>
        ) : (
          ""
        )}
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-3">
          {productsList?.length > 0 ? (
            productsList?.map((product) => (
              <CommonProductCard key={product.id} produc={product} />
            ))
          ) : (
            <h3>Sorry! No Products right now.</h3>
          )}
        </div>
        <CommonAddEdit getProducts={getProducts} />
      </div>
    </div>
  );
}

export default Products;
