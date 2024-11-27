import api from "@/api";
import { ACCESS_TOKEN, FULL_NAME, GROUP_NAME, REFRESH_TOKEN } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export const ContextComponent = createContext(null);
function ProviderComponent({ children }) {
  const startUrl = "http://127.0.0.1:8000";
  const [user, setUser] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [group, setGroup] = useState("");
  const [orderCustomer, setOrderCustomer] = useState({});
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [total, setTotal] = useState("");
  const [currentUpdateId, setCurrentUpdateId] = useState(null);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const [productImg, setProductImg] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productName, setProductName] = useState("");
  const [productRate, setProductRate] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productData, setProductData] = useState("");
  const [ordersList, setOrdersList] = useState([]);
  const [cusImg, setCusImg] = useState("");
  const [cusName, setCusName] = useState("");
  const [cusEmail, setCusEmail] = useState("");
  const [prevEmail, setPrevEmail] = useState("");
  const [cusPhone, setCusPhone] = useState("");
  const [cusAddress, setCusAddress] = useState("");
  const [orderItemList, setOrderItemList] = useState("");
  const [productQuantity, setProductQuantity] = useState("1");
  const [profileImg, setProfileImg] = useState("");
  const [cartProducts, setCartProducts] = useState([]);
  const formData = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
    },
  });
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    localStorage.setItem(GROUP_NAME, decoded.group);
    setGroup(decoded.group);
    localStorage.setItem(FULL_NAME, decoded.fullname);
    setCusName(decoded.fullname);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;
    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };
  const getProfile = () => {
    setLoading(true);
    api
      .get("/profile/")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setCusImg(data.profileimg);
        setCusEmail(data.email);
        setCusPhone(data.phone);
        setCusAddress(data.address);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const { slug } = useParams();
  const getOrderPage = () => {
    setLoading(true);
    api
      .get(`/orderpage/${slug}/`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setOrderCustomer(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <ContextComponent.Provider
      value={{
        startUrl,
        user,
        setUser,
        isAuthorized,
        setIsAuthorized,
        loading,
        setLoading,
        showDialog,
        setShowDialog,
        navigate,
        toast,
        getProfile,
        getOrderPage,
        orderCustomer,
        setOrderCustomer,
        status,
        setStatus,
        note,
        setNote,
        total,
        setTotal,
        firstname,
        setFirstname,
        lastname,
        setLastname,
        username,
        setUsername,
        password,
        setPassword,
        group,
        setGroup,
        currentUpdateId,
        setCurrentUpdateId,
        currentDeleteId,
        setCurrentDeleteId,
        productsList,
        setProductsList,
        productImg,
        setProductImg,
        productImage,
        setProductImage,
        productName,
        setProductName,
        productRate,
        setProductRate,
        productDesc,
        setProductDesc,
        productData,
        setProductData,
        ordersList,
        setOrdersList,
        cusImg,
        setCusImg,
        cusName,
        setCusName,
        cusEmail,
        setCusEmail,
        prevEmail,
        setPrevEmail,
        cusPhone,
        setCusPhone,
        cusAddress,
        setCusAddress,
        orderItemList,
        setOrderItemList,
        productQuantity,
        setProductQuantity,
        profileImg,
        setProfileImg,
        cartProducts,
        setCartProducts,
        formData,
        auth,
      }}
    >
      {children}
    </ContextComponent.Provider>
  );
}

export default ProviderComponent;
