import api from "@/api";
import Header from "@/components/common-header";
import OrdersTable from "@/components/common-table";
import { Skeleton } from "@/components/ui/skeleton";
import { ContextComponent } from "@/context";
import { useContext, useEffect } from "react";

function OrdersPage() {
  const { setLoading, loading, ordersList, setOrdersList } = useContext(ContextComponent);
  useEffect(() => {
    getOrdersPage();
  }, []);
  const getOrdersPage = () => {
    setLoading(true);
    api
      .get("/orderspage/")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setOrdersList(data);
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
          <OrdersTable ordersList={ordersList}/>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
