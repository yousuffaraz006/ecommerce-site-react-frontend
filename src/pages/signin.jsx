import api from "@/api";
import CommonButton from "@/components/common-button";
import CommonForm from "@/components/common-form";
import { signInFormControls } from "@/config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants";
import { ContextComponent } from "@/context";
import { useContext } from "react";

function SignIn() {
  const {
    auth,
    setLoading,
    username,
    password,
    setUsername,
    setPassword,
    toast,
    navigate,
  } = useContext(ContextComponent);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/token/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, data.access);
      localStorage.setItem(REFRESH_TOKEN, data.refresh);
      await auth();
      {
        localStorage.getItem("group") === "customer" ? navigate("/products") : localStorage.getItem("group") === "admin" ? navigate("/orderspage") : console.log("No group");
      }
      toast({
        title: "Signed In Successfully",
        description: `Welcome back, Mr. ${localStorage.getItem("fullname")}!`,
      });
      setUsername("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      toast({
        title: "ERROR!",
        description: "" + error,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-auto flex-col min-h-screen h-full">
      <div className="flex flex-col h-full justify-center items-center bg-white">
        <h3 className="text-3xl font-bold">Welcome</h3>
        <div className="mt-4 w-[30%]">
          <CommonForm
            formControls={signInFormControls}
            btnText={"Sign In"}
            handleSubmit={handleSubmit}
          />
        </div>
        <div className="mt-5">
          <CommonButton
            onClick={() => navigate("/signup")}
            className="text-white mt-6 px-4 py-3 font-extralight border-none"
            buttonText={"Switch to Sign Up"}
            type={"button"}
          />
        </div>
        <div className="mt-4 text-blue-500 cursor-pointer group">
          <p>
            Wanna try a demo account? 
            <br />
            <span className="text-sm text-gray-500 group-hover:inline-block hidden">
              Username: demouser
            </span>
            <br />
            <span className="text-sm text-gray-500 group-hover:inline-block hidden group-checked:inline-block">
              Password: abcdefgh
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
