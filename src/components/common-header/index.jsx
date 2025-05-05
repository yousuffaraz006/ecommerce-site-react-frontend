import { ContextComponent } from "@/context";
import { LogOut } from "lucide-react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  const {
    startUrl,
    toast,
    navigate,
    setOrdersList,
    cusImg,
    setCusImg,
    cusName,
    setCusName,
    cusEmail,
    setCusEmail,
    setCusPhone,
    setCusAddress,
    auth,
    setIsAuthorized,
    group,
  } = useContext(ContextComponent);
  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, [navigate]);
  const cartList =
    JSON.parse(localStorage.getItem(`CART_PRODUCTS_${cusEmail}`)) || [];
  async function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("group");
    localStorage.removeItem("fullname");
    setOrdersList([]);
    navigate("/signin");
    setCusImg("");
    setCusName("");
    setCusEmail("");
    setCusPhone("");
    setCusAddress("");
    toast({
      title: "Logging Out",
      description: "You have been logged out successfully.",
    });
  }
  const userimg =
    group === "customer" ? cusImg : "/static/base/admin.png";
  const username = group === "customer" ? cusName : "Admin";
  const profileImg = `${startUrl}${userimg}`;
  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto h-16">
        <div className="flex h-[64px] items-center w-full justify-between ">
          <div className="flex items-center">
            <img
              src={profileImg}
              alt={`${cusName}'s profile`}
              className="w-8 h-8 rounded-full"
            />
            <h1 className="text-xl ml-4">{username}</h1>
          </div>
          <div className="flex gap-4">
            <Link className="text-black text-xl font-bold" to={"/products"}>
              Products
            </Link>
            {group === "customer" ? (
              <>
                |
                <Link className="text-black text-xl font-bold" to={"/orders"}>
                  Your Orders
                </Link>
                |
                <Link className="text-black text-xl font-bold" to={"/cart"}>
                  Cart
                  {cartList?.length > 0 ? (
                    <sup className="text-blue-500">{cartList.length}</sup>
                  ) : (
                    ""
                  )}
                </Link>
                |
                <Link className="text-black text-xl font-bold" to={"/profile"}>
                  Profile
                </Link>
              </>
            ) : (
              <>
                |
                <Link
                  className="text-black text-xl font-bold"
                  to={"/orderspage"}
                >
                  Orders
                </Link>
              </>
            )}
          </div>
          <div>
            <LogOut
              onClick={handleLogout}
              color="#000"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
