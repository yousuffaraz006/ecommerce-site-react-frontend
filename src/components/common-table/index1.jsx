import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import CommonButton from "../common-button";
import { useContext, useEffect, useState } from "react";
import { ContextComponent } from "@/context";

function CartTable() {
  const { startUrl, cusEmail, setCartProducts } = useContext(ContextComponent);
  const cartList = JSON.parse(localStorage.getItem(`CART_PRODUCTS_${cusEmail}`)) || [];
  const handleRemoveFromCart = (id) => {
    const products = JSON.parse(localStorage.getItem(`CART_PRODUCTS_${cusEmail}`)) || [];
    const updatedProducts = products.filter(
      (product) => product.id !== id
    );
    localStorage.setItem(`CART_PRODUCTS_${cusEmail}`, JSON.stringify(updatedProducts));
    setCartProducts(updatedProducts);
  };
  console.log(cartList);
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow
          className="grid grid-cols-5 gap-4 mt-3"
          style={{
            gridTemplateColumns: "2fr 1.5fr 1fr 2fr 1fr",
          }}
        >
          <TableHead>Product</TableHead>
          <TableHead className="flex justify-center">Rate</TableHead>
          <TableHead className="flex justify-center">Quantity</TableHead>
          <TableHead className="flex justify-center">Price</TableHead>
          <TableHead>Remove</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartList?.length > 0 ? (
          <>
            {cartList.map((cartProduct) => {
              return (
                <TableRow
                  key={cartProduct.id}
                  className="grid grid-cols-5 gap-4 text-xl "
                  style={{
                    gridTemplateColumns: "2fr 1.5fr 1fr 2fr 1fr",
                  }}
                >
                  <a href={`/product/${cartProduct.id}`}>
                  <TableCell className="flex items-center gap-4 underline text-blue-600">
                    <img
                      src={`${startUrl}${cartProduct.image}`}
                      className="w-11 h-11 rounded-xl"
                    />
                    {cartProduct.name}
                  </TableCell>
                  </a>
                  <TableCell className="flex justify-center">&#8377; {cartProduct.rate}</TableCell>
                  <TableCell className="flex justify-center">{cartProduct.quantity}</TableCell>
                  <TableCell className="flex justify-center">&#8377; {cartProduct.price}</TableCell>
                  <TableCell>
                    <CommonButton
                      buttonText={"Remove"}
                      onClick={() => handleRemoveFromCart(cartProduct.id)}
                      extraStyles={"bg-red-700"}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow className="grid grid-cols-4 gap-4 mt-3 text-3xl">
              <TableHead>Total :</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead className="text-right">
                &#8377;{" "}
                {cartList.reduce(
                  (total, cartProduct) => total + cartProduct.price,
                  0
                )}
              </TableHead>
            </TableRow>
          </>
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-2xl">
              It is not advisable to leave your cart empty. &#x1F61C;
              <br />
              Add <a href="/products" className="text-blue-500 underline">here</a>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      {/* <tfoot>
        <tr>
          <td>
            <hr />
          </td>
        </tr>
      </tfoot> */}
    </Table>
  );
}

export default CartTable;
