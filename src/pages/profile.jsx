import api from "@/api";
import CommonForm from "@/components/common-form";
import Header from "@/components/common-header";
import { Skeleton } from "@/components/ui/skeleton";
import { profileFormControls } from "@/config";
import { ContextComponent } from "@/context";
import { useContext, useEffect } from "react";

function ProfilePage() {
  const {
    startUrl,
    toast,
    setLoading,
    loading,
    cusImg,
    cusName,
    cusEmail,
    cusPhone,
    cusAddress,
    profileImg,
    getProfile,
    prevEmail,
    setPrevEmail,
  } = useContext(ContextComponent);
  const profileImage = `${startUrl}${cusImg}`;
  useEffect(() => {
    setPrevEmail(cusEmail);
    getProfile()
  }, []);
  const cartList = JSON.parse(localStorage.getItem(`CART_PRODUCTS_${prevEmail}`));
  const setProfile = (e) => {
    e.preventDefault();
    setLoading(true);
    localStorage.setItem(
      `CART_PRODUCTS_${cusEmail}`,
      JSON.stringify(cartList)
    );
    const profileimg = profileImg ? profileImg : null;
    const name = cusName;
    const email = cusEmail;
    const phone = cusPhone;
    const address = cusAddress;
    api
      .put(
        "/profile/",
        {
          profileimg,
          name,
          email,
          phone,
          address,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: "Profile updated successfully",
          });
          getProfile();
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
      <div className="mt-5 flex justify-between w-full">
        <div className="w-[20%] flex justify-evenly mt-8">
          <img
            src={profileImage}
            alt="profile-image"
            className="w-40 h-40 rounded"
          />
        </div>
        <div className="w-[80%]">
          <CommonForm
            formControls={profileFormControls}
            btnText={"Save"}
            handleSubmit={setProfile}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
