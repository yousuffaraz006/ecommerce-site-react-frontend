import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { ContextComponent } from "@/context";

function CommonLayout() {
  const { isAuthorized, setIsAuthorized, auth, group, getProfile }  = useContext(ContextComponent)
  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);
  if (isAuthorized === null) {
    return (
      <Skeleton
        className={`w-full h-[740px]  rounded-[6px] bg-black opacity-50`}
      />
    );
  }
  return <div>{isAuthorized ? <Outlet /> : (
    <Navigate to="/signin" />
  )}</div>;
}

export default CommonLayout;
