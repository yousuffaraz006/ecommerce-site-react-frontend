import api from "@/api";
import Header from "@/components/common-header";
import OrdersTable from "@/components/common-table";
import { Skeleton } from "@/components/ui/skeleton";
import { ContextComponent } from "@/context";
import { useContext, useEffect } from "react";

function HomePage() {
  const { loading, setLoading, ordersList, setOrdersList, getProfile } =
    useContext(ContextComponent);
  useEffect(() => {
    getOrders();
    getProfile()
  }, []);
  const getOrders = () => {
    setLoading(true);
    api
      .get("/orders/")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        const plural = data.length > 1 ? "s" : "";
        if (data?.length > 0 ? true : false) {
          setOrdersList(data);
          console.log(data.length + ` Order${plural} fetched successfully.`);
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
      <div className="mt-5 flex flex-col">
        <div className="w-full">
          <OrdersTable ordersList={ordersList} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
