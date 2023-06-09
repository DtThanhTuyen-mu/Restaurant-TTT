import { useEffect, useState } from "react";
import OrderListItem from "./OrderListItem";
import Success from "../../products/Success";
import OrderItem from "../OrderItem";
import OrderDetail from "./OrderDetail";
import ReviewOrderInfo from "../ReviewOrderInfo";
import axios from "axios";
import VND from "../../../components/currency";
import { Typography } from "@mui/material";
function OrderList() {
  const json = localStorage.getItem("infoStaff");
  const valuejson = JSON.parse(json);
  const [infoStaff, setInfoStaff] = useState(valuejson);
  // setInfoStaff(valuejson);
  // console.log("localho Storage: ", valuejson._id);
  /**
   * Static data, this can be replaced with data fetched from servers;
   */
  // var [orderList, setOrderList] = useState([
  //     {
  //         "table": "107",
  //         "total": "80000",
  //         "details": [
  //             {
  //                 "id": "1",
  //                 "prod_name": "com ga xoi mo",
  //                 "qty": "2",
  //                 "unit_price": "25000",
  //                 "status": "dadat"
  //             },
  //             {
  //                 "id": "2",
  //                 "prod_name": "nuoc mia",
  //                 "qty": "3",
  //                 "unit_price": "10000",
  //                 "status": "dangphucvu",
  //             }
  //         ],
  //         "order_at": "13:10:45 4/6/2023 ",
  //         "bill_at": "",
  //         "status": "dadat",
  //     },
  //     {
  //         "table": "201",
  //         "total": "95000",
  //         "details": [
  //             {
  //                 "id": "3",
  //                 "prod_name": "bun rieu cua dong",
  //                 "qty": "2",
  //                 "unit_price": "25000",
  //                 "status": "dadat"
  //             },
  //             {
  //                 "id": "4",
  //                 "prod_name": "ca phe sua da",
  //                 "qty": "3",
  //                 "unit_price": "15000",
  //                 "status": "dadat"
  //             }
  //         ],
  //         "order_at": "15:10:45 4/6/2023 ",
  //         "bill_at": "",
  //         "status": "dadat",
  //     },
  //     {
  //         "table": "603",
  //         "total": "75000",
  //         "details": [
  //             {
  //                 "id": "3",
  //                 "prod_name": "bun rieu cua dong",
  //                 "qty": "2",
  //                 "unit_price": "25000",
  //                 "status": "dangphucvu",
  //             },
  //             {
  //                 "id": "4",
  //                 "prod_name": "ca phe sua da",
  //                 "qty": "3",
  //                 "unit_price": "15000",
  //                 "status": "dangchebien",
  //             }
  //         ],
  //         "order_at": "15:10:45 4/6/2023 ",
  //         "bill_at": "",
  //         "status": "dadat",
  //     }

  // ]);

  /**
   * Data;
   */

  const [ordersList, setOrdersList] = useState([]);
  const [info, setInfo] = useState([]);
  const [table, setTable] = useState();
  const [selectedOrder, setSelectedOrder] = useState("");
  const [products, setProducts] = useState([]);
  const [orderStatus, setOrderStatus] = useState(["dangchebien", "daphucvu"]);
  // const [selectedStatus, setSelectedStatus] = useState(selectedOrder.status);
  const [selectedStatus, setSelectedStatus] = useState();

  useEffect(() => {
    getOrderList();
  }, []);
  const getOrderList = async () => {
    await axios.get("http://localhost:4000/api/tabledetails").then((res) => {
      const tempPs = res?.data.array;
      setOrdersList(tempPs);
      console.log(" danh sach nguoi ngoi: ", tempPs);
    });
  };

  /**
   * For popup notification banner;
   * This is temporarily unused;
   */
  const [success, setSuccess] = useState(false);
  const [successClass, setSuccessClass] = useState("");
  const [message, setMessage] = useState({});

  const [user, setUser] = useState({});
  const [restaurant, setRestaurant] = useState({});
  const getAllOrders = () => {};

  /**
   * Get the order selected;
   */
  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    const products = order.products;
    console.log("danh sach san pham: ", order.products)
    setProducts(products);
    setTable(order.table.tbl_id);
    setInfo(order.total);
    setSelectedStatus(order.total.status);
    // setSelectedStatus(order.status);
    // console.log(orderList);
  };

  /**
   * Update product quantity;
   */
  const updateQty = (product) => {
    const index = products.indexOf(product);
    products[index] = product;
    setProducts(products);
  };

  // If delete request is approved, then delete;
  const changeStatus = (status) => {
    setSelectedStatus(status);
  };
  useEffect(() => {
    if (selectedStatus == "huydon") {
      deleteOrder();
    }
  }, [selectedStatus]);

  // Show a popup banner for confirmation of cancelling order;
  const confirmDeleteOrder = () => {
    setSuccess(true);
    setSuccessClass("opacity-success");
    const message = {
      noti: "Bạn có chắc muốn xóa đơn hàng này không?",
      icon: "faTrash"
    };
    setMessage(message);
  };

  // Delete order;
  const deleteOrderById = () => {};
  const deleteOrder = () => {
    deleteOrderById();
    const message = {
      noti: "Đơn hàng đã được xóa thành công",
      icon: "faCheckCircle"
    };
    setMessage(message);
    getAllOrders();
    setSelectedOrder("");
    setTimeout(() => {
      setSuccess(false);
      setSuccessClass("");
    }, 3000);
  };

  /**
   * Show popup notification banner when an action is done;
   */
  const showModal = (message) => {
    setSuccess(true);
    setSuccessClass("opacity-success");
    setMessage(message);
    setTimeout(() => {
      setSuccess(false);
      setSuccessClass("");
    }, 3000);
  };

  /**
   * Discard any changes made previously;
   */
  const discardQtyChanges = () => {
    // getOrderById();
    let message = {
      noti: "Các thay đổi đã được loại bỏ",
      icon: "faCheckCircle"
    };
    showModal(message);
  };

  // Update order;
  const updateOrder = () => {};

  // Pay order;
  const payOrder = () => {};

  /**
   * HTML template;
   */

  return (
    <>
      {success && (
        <Success
          setSuccess={setSuccess}
          setSuccessClass={setSuccessClass}
          message={message}
          functioner={changeStatus}
        />
      )}
      <div className={`order-container ${successClass}`}>
        {selectedOrder ? (
          <div className="order-left">
            <div className="order-left-content">
              {ordersList ? (
                ordersList.map((order) => (
                  <OrderListItem
                    order={order}
                    handleSelectOrder={handleSelectOrder}
                  />
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            {ordersList ? (
              ordersList.map((order) => (
                <OrderListItem
                  order={order}
                  handleSelectOrder={handleSelectOrder}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        )}
        {selectedOrder && (
          <div className="order-right">
            <div className="order-right-content">
              <>
                <ReviewOrderInfo
                  user={info.user}
                  restaurant={info.restaurant}
                  table={table}
                />
                <h3 style={{ fontSize: "25px", fontWeight: "bold" }}>
                  CHI TIẾT GỌI MÓN
                  {/* {products.map((product, index) => (
                    <Typography> {product.prod_name}</Typography>
                  ))} */}
                </h3>
                <table>
                  <tr style={{ borderRadius: "10px 10px 0 0" }}>
                    <td>STT</td>
                    <td>Món</td>
                    <td>Số lượng</td>
                    <td>Đơn giá</td>
                    <td style={{ width: "100px" }}>Tổng</td>
                    {infoStaff.role === "2" ? null : <td> Trạng thái</td>}
                  </tr>
                  {products.map((product, index) => (
                    <OrderDetail
                      // stt={products.indexOf(product) + 1}
                      stt={index+ 1}
                      key={index}
                      item={product}
                      updateQty={updateQty}
                      infoStaff={infoStaff}
                    />
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Tổng hóa đơn:</td>
                    <td>{VND.format(selectedOrder.total.total)}</td>
                    {infoStaff.role === "2" ? null : <td> </td>}
                  </tr>
                </table>
                <div className="order-actions">
                  <div className="content">
                    <button className="updateButton" onClick={updateOrder}>
                      Cập nhật yêu cầu
                    </button>
                    <button
                      className="updateButton"
                      onClick={discardQtyChanges}
                    >
                      Hoàn tác
                    </button>
                    <button className="updateButton" onClick={payOrder}>
                      Thanh toán
                    </button>
                    <button onClick={confirmDeleteOrder}>Hủy đơn</button>
                  </div>
                </div>
              </>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default OrderList;
