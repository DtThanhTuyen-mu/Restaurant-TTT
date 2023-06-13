import { useEffect, useState } from "react"
import '../products/this.css'
import './modal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import VND from "../../components/currency";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
const OrderModal = (props) => {
    const [orderId, setOrderId] = useState(props.order.Order);
    const [order, setOrder] = useState("");
    const [user, setUser] = useState("");
    const [orderDetails, setOrderDetails] = useState([]);
    const [tables, setTables] = useState([]);
    const [money, setMoneyReceived] = useState(0); //for calculating the left money;
    const [documentTitle, setDocumentTitle] = useState("");
    const [rest, setRest] = useState("");

     const json = localStorage.getItem("infoRestaurant");
     const valuejson = JSON.parse(json);
    console.log(valuejson);
     const [infoStaff, setInfoStaff] = useState(valuejson);
    // Set criteria to 1 and set display status of modal to false;
    const handlePay = () => {
        props.changeCriteria();
        props.functioner();
        // generateBillPDF();
    }
    const [billExportStatus, setBillExportStatus] = useState(true);
    const getRestInfo = async () => {
        const id = localStorage.getItem("RestaurantID");
        const url = `http://localhost:4000/api/info/id=${infoStaff._id}`;
        await axios
            .get(url)
            .then((res) => {
                console.log("user: ", res?.data.info);
                setRest(res?.data.info[0]);
            })
    }
    const getDetails = async () => {
        const url = `http://localhost:4000/api/order/${orderId}/details`;
        try {
            await axios
                .get(url)
                .then((res) => {
                    console.log(res?.data.details);
                    setOrderDetails(res?.data.details);
                })
        } catch (error) {
            console.log(error);
        }
    }
    const getTables = async () => {
        const url = `http://localhost:4000/api/order/${orderId}/tables`;
        await axios
            .get(url)
            .then((res) => {
                setTables(res?.data.tables);
            })
    }
    const getOrderInfo = async () => {
        const url = `http://localhost:4000/api/order/${orderId}`;
        await axios
            .get(url)
            .then((res) => {
                console.log(res?.data.order);
                const data = res?.data.order;
                setOrder(data[0]);
                setUser(data[0].user[0]);
                // console.log("order: ", data);
            })
    }
    // Get order info when orderId changes;
    useEffect(() => {
        getRestInfo();
        getOrderInfo();
        getTables();
        getDetails();
        setDocumentTitle(orderId);
    }, [orderId]);


    const style = {}
    const styleTable = {
        margin: "10px 0",
        border: "solid 1px lightgrey!important",
        fontSize: "16px",
    };

    const componentPDF = useRef("null");
    const generateBillPDF = useReactToPrint(
        {
            content: () => componentPDF.current,
            documentTitle: documentTitle,
        }
    );
    // HTML template;
    return (
        <>
            <div style={props.style ? props.style : style}>
                <div className="update-modal order-modal">
                    <div className="order-modal-title">
                        <div>HOÁ ĐƠN THANH TOÁN</div>
                        <span style={{ top: "1px", right: "1px" }}
                            onClick={() => {
                                props.functioner()
                                setBillExportStatus(true);
                            }}
                        >
                            <FontAwesomeIcon icon={faClose} />
                        </span>
                    </div>
                    <div className="order-modal-content">
                        <div ref={componentPDF} className="order-table-info order-container">
                            <table style={styleTable} className="styleTable">
                                <tr>
                                    <td colSpan={2} style={{ fontSize: "20px", fontWeight: "bold" }}>{rest.rest_name}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>{rest.rest_addr}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>{rest.rest_phone}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{ fontWeight: "bold", fontSize: "25px", color: "crimson" }}>
                                        HOÁ ĐƠN
                                    </td>
                                </tr>
                                <tr><td>Mã hóa đơn:</td><td>{order._id}</td></tr>
                                <tr><td>Đặt lúc:</td><td>{order.order_at}</td></tr>
                                <tr><td>Thanh toán lúc:</td><td>{new Date().toLocaleString("vi-VN", { hour12: false })}</td></tr>
                                <tr>
                                    <td>Bàn:</td>
                                    <td>{
                                        tables.map((tbl) =>
                                            <>{tbl.tables[0].tbl_id}, </>)
                                    }</td>
                                </tr>
                                <tr><td>Nhân viên:</td><td>{user.staff_name}</td></tr>
                            </table>
                            <table style={{ fontSize: "16px" }}>
                                <tr>
                                    <td style={{ borderRadius: "10px 0 0 0!important" }}>STT</td>
                                    <td>Tên sản phẩm</td>
                                    <td>Số lượng</td>
                                    <td>Đơn giá</td>
                                    <td>Tổng</td>
                                </tr>
                                {orderDetails.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.product[0].prod_name}</td>
                                        <td>{item.qty}</td>
                                        <td>{VND.format(item.unit_price)}</td>
                                        <td>{VND.format(item.unit_price * item.qty)}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={4}>Tổng:</td>
                                    <td>{VND.format(order.total)}</td>
                                </tr>
                            </table>
                        </div>
                        <div style={{ fontSize: "16px" }}>
                            <div>
                                Tiền khách đưa:
                                <input
                                    style={{ border: "solid 1px lightgrey", borderRadius: "10px", padding: "5px 7px", margin: "0 7px" }}
                                    onChange={(e) => setMoneyReceived(e.target.value)} />
                            </div>
                            <div>
                                Tiền thối: {VND.format(money - order.total)}
                            </div>
                        </div>
                    </div>
                    <div className="order-modal-footer">
                        <button disabled={billExportStatus} onClick={() => handlePay()}>Thanh toán hoá đơn</button>
                        <button
                            onClick={() => {
                                generateBillPDF()
                                setBillExportStatus(false);
                            }
                            }
                        >Xuất hóa đơn</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderModal;