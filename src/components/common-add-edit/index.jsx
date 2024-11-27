import { useContext } from "react";
import { ContextComponent } from "@/context";
import CommonDialog from "../common-dialog";
import { productsFormControls } from "@/config";
import api from "@/api";

function CommonAddEdit({ getProducts }) {
  const {
    showDialog,
    setShowDialog,
    productImg,
    productImage,
    setProductImg,
    productName,
    setProductName,
    productRate,
    setProductRate,
    productDesc,
    setProductDesc,
    currentUpdateId,
    setCurrentUpdateId,
    currentDeleteId,
    setCurrentDeleteId,
    toast,
    setLoading,
  } = useContext(ContextComponent);

  const createProduct = (e) => {
    e.preventDefault();
    setLoading(true);
    const prodimg = productImage;
    const name = productName;
    const rate = productRate;
    const description = productDesc;
    api
      .post(
        "/products/",
        {
          prodimg,
          name,
          rate,
          description,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          toast({
            title: "Product created successfully",
          });
          getProducts();
        } else {
          toast({
            title: "Error",
            description: "Product not created: " + res.status,
          });
        }
        setProductImg("");
        setProductName("");
        setProductRate("");
        setProductDesc("");
        setLoading(false);
        setShowDialog(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const updateProduct = (e) => {
    e.preventDefault();
    setLoading(true);
    const prodimg = productImage ? productImage : null;
    const name = productName;
    const rate = productRate;
    const description = productDesc;
    console.log(prodimg, name, rate, description);
    api
      .put(
        `/product/${currentUpdateId}/`,
        {
          prodimg,
          name,
          rate,
          description,
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
            title: "Product updated successfully",
          });
          getProducts();
        } else {
          toast({
            title: "Error",
            description: "Product not updated: " + res.status,
          });
        }
        setCurrentUpdateId(null);
        setProductImg("");
        setProductName("");
        setProductRate("");
        setProductDesc("");
        setLoading(false);
        setShowDialog(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const deleteProduct = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .delete(`/product/${currentDeleteId}/`)
      .then((res) => {
        if (res.status === 204) {
          toast({
            title: "Product deleted successfully",
          });
          getProducts();
        } else {
          toast({
            title: "Error",
            description: "Product not deleted: " + res.status,
          });
        }
        setCurrentDeleteId(null);
        setLoading(false);
        setShowDialog(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleSubmit = (e) => {
    currentUpdateId
      ? updateProduct(e)
      : currentDeleteId
      ? deleteProduct(e)
      : createProduct(e);
  };
  return (
    <CommonDialog
      formControls={currentDeleteId ? null : productsFormControls}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      title={
        currentUpdateId
          ? "Update Product"
          : currentDeleteId
          ? "Delete Product"
          : "Add Product"
      }
      btnText={currentUpdateId ? "Update" : currentDeleteId ? "Delete" : "Add"}
      handleSubmit={handleSubmit}
    />
  );
}

export default CommonAddEdit;
