import api from "@/api";
import Header from "@/components/common-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ContextComponent } from "@/context";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { setLoading, loading, startUrl, productData, setProductData, group, getProfile } =
    useContext(ContextComponent);
  const { slug } = useParams();
  useEffect(() => {
    getProduct();
    {
      group === "customer" ? getProfile() : "";
    }
  }, []);
  const getProduct = () => {
    setLoading(true);
    api
      .get(`/product/${slug}/`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setProductData(data);
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
      <div className="mt-5 w-full">
        <Card className="flex gap-6 cursor-pointer">
          <CardHeader className="p-0">
            <div className="">
              <img
                className="w-96 h-w-96 object-cover rounded-s-xl"
                src={`${startUrl}${productData?.prodimg}`}
                alt="product-image"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <CardTitle className="text-xl font-bold">
              {productData.name}
            </CardTitle>
            <CardDescription className="text-xl">
              &#8377; {productData.rate}
            </CardDescription>
            <CardDescription>
              <p>{productData?.description}</p>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ProductDetails;
