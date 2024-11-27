import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ContextComponent } from "@/context";

function OrderItemsTable({ orderItemsList }) {
  const { navigate, setOrderId } = useContext(ContextComponent);
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="grid grid-cols-4 gap-4 mt-3">
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Rate</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderItemsList?.length > 0 ? (
          <>
            {orderItemsList.map((orderItem) => {
              return (
                <TableRow
                  key={orderItem.id}
                  className="grid grid-cols-4 gap-4 hover:bg-blue-200 transition duration-500 cursor-pointer"
                  onClick={() => {
                    navigate(`/product/${orderItem.product.id}`);
                  }}
                >
                  <TableCell className="text-blue-500 underline">
                    {orderItem.product.name}
                  </TableCell>
                  <TableCell>{orderItem.quantity}</TableCell>
                  <TableCell>&#8377; {orderItem.product.rate}</TableCell>
                  <TableCell>&#8377; {orderItem.price}</TableCell>
                </TableRow>
              );
            })}
            <TableRow className="grid grid-cols-4 text-2xl">
              <TableCell>Total</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="underline">
                &#8377;{" "}
                {orderItemsList.reduce(
                  (total, orderItem) => total + parseInt(orderItem.price),
                  0
                )}
              </TableCell>
            </TableRow>
          </>
        ) : (
          <caption>You have no orders.</caption>
        )}
      </TableBody>
    </Table>
  );
}

export default OrderItemsTable;
