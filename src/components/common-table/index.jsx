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

function OrdersTable({ ordersList }) {
  const { navigate } = useContext(ContextComponent);
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="grid grid-cols-5 gap-4 mt-3">
          <TableHead>Order Confirmed</TableHead>
          <TableHead>Order ID</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Comments</TableHead>
        </TableRow>
      </TableHeader>
      {ordersList?.length > 0 ? (
        <TableBody>
          {ordersList.map((order) => {
            const dateTime = order.date_created.split("T"); // Splitting into date and time
            const date = dateTime[0];
            return (
              <TableRow
                key={order.id}
                className="grid grid-cols-5 gap-4 hover:bg-blue-200 transition duration-500 cursor-pointer"
                onClick={() => {
                  navigate(`/order/${order.id}`)
                }}
              >
                <TableCell>{date}</TableCell>
                <TableCell>{order.slug}</TableCell>
                <TableCell>&#8377; {order.total}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.note ? order.note : "---"}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      ) : (
        <caption>You have no orders.</caption>
      )}
    </Table>
  );
}

export default OrdersTable;
