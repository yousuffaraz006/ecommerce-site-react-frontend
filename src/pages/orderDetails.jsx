import api from "@/api";
import CommonForm from "@/components/common-form";
import Header from "@/components/common-header";
import OrderItemsTable from "@/components/common-table/index2";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { orderPageFormControls } from "@/config";
import { ContextComponent } from "@/context";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

function OrderDetails() {
  const {
    orderItemList,
    setOrderItemList,
    loading,
    setLoading,
    startUrl,
    navigate,
    group,
    orderCustomer,
    setOrderCustomer,
    setStatus,
    status,
    setNote,
    note,
    toast,
    getProfile,
  } = useContext(ContextComponent);
  const { slug } = useParams();
  useEffect(() => {
    getOrder();
    getOrderPage();
    {
      group === "customer" ? getProfile() : "";
    }
  }, []);
  const getOrder = () => {
    setLoading(true);
    api
      .get(`/order/${slug}/`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        const plural = data.length > 1 ? "s" : "";
        if (data?.length > 0 ? true : false) {
          setOrderItemList(data);
          console.log(
            data.length + ` Order item${plural} fetched successfully.`
          );
        } else {
          console.log("You have no orders items.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const getOrderPage = () => {
    setLoading(true);
    api
      .get(`/orderpage/${slug}/`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setOrderCustomer(data);
        setStatus(data?.status);
        setNote(data?.note);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const setOrderPage = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .put(`/orderpage/${slug}/`, {
        status,
        note,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/orderspage");
          toast({
            title: "Customer updated successfully",
          });
          getOrderPage();
        } else {
          toast({
            title: "Error",
            description: "Customer not updated: " + res.status,
          });
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
      {group === "admin" ? (
        <div className="mt-5">
          <Card className="flex gap-2 cursor-pointer">
            <CardHeader className="p-3 w-[20%]">
              <img
                className="w-60 h-60 object-cover rounded-xl"
                src={`${startUrl}${orderCustomer?.customer?.profileimg}`}
                alt="product-image"
              />
            </CardHeader>
            <CardContent className="p-0 w-[50%]">
              <CardTitle className="text-2xl py-2">
                {orderCustomer?.customer?.name}
              </CardTitle>
              <CardDescription className="text-xl py-2">
                {orderCustomer?.customer?.email}
              </CardDescription>
              <CardDescription className="text-xl py-2">
                {orderCustomer?.customer?.phone}
              </CardDescription>
              <CardDescription className="text-xl py-2">
                {orderCustomer?.customer?.address}
              </CardDescription>
            </CardContent>
            <CardContent className="py-0 w-[30%]">
              <CommonForm
                formControls={orderPageFormControls}
                btnText={"Save"}
                handleSubmit={setOrderPage}
              />
            </CardContent>
          </Card>
        </div>
      ) : (
        ""
      )}
      <div className="mt-5 w-full flex">
        <OrderItemsTable orderItemsList={orderItemList} />
      </div>
    </div>
  );
}

export default OrderDetails;
