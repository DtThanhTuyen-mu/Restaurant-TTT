import { useState } from "react";
import VND from "../../components/currency";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import '../../outline/Outline.scss';
function OrderDetailCheff(props) {
  const [itemP, setItemP] = useState(props.item.Product);
  const [qty, setQty] = useState(props.item.qty);
  const [statusO, setStatusO] = useState(props.item.status);
  const [isShow, setisShow] = useState(false);
  // console.log("item: ", props.item);
  // console.log("staff: ", props.infoStaff);
  /**
   * Increase product quantity by 1 unit;
   */
  const increaseOne = (e) => {
    // console.log("props.item[qty]: ", props.item);
    props.item["qty"] = parseInt(props.item.qty) + 1;
    props.updateQty(itemP);
    setQty(qty + 1);
  };

  /**
   * Decrease product quantity by 1 unit;
   */
  const decreaseOne = (e) => {
    if (qty > 1) {
      props.item["qty"] = parseInt(props.item.qty) - 1;
      props.updateQty(itemP);
      setQty(qty - 1);
    }
  };
  const handleCancel = () => {
    if (props.item.status === 'dadat') {
      props.handleCancel({ isShow: !isShow, item: props.item });
   }
  };

  /**
   * HTML template;
   */
  return (
    <>
      {props.item.status === "xoa" ? (
        <tr>
          <td>
            <del>{props.stt}</del>
          </td>
          <td>
            <del>{props.item.Product.prod_name}</del>
          </td>
          <td>
            <div className="image align-center">
              <img src={props.item.Product.prod_img} />
            </div>
          </td>
          <td>
            <div className="flex justify-center items-center">
              <button onClick={decreaseOne}>-</button>
             
              <input value={props.item.qty} />
              
              <button className="right-btn" onClick={increaseOne}>
                +
              </button>
            </div>
          </td>
          <td>
            <del>{VND.format(props.item.Product.prod_price)}</del>
          </td>
          <td>
            <del>{VND.format(qty * props.item.Product.prod_price)}</del>
          </td>
          <td>
            <select
              disabled
              className="slbtn"
              value={props.item.status}
              onChange={(e) => setStatusO(e.target.value)}
            >
              <option value="dadat" disable>
                Đã gửi bếp
              </option>
              <option value="chebien">Đang chế biến</option>
              <option value="xuatmon">Xuất món</option>
              <option value="hetmon">Hết món</option>
            </select>
          </td>
          <td>
            <DeleteForeverIcon color="disabled" />
          </td>
        </tr>
      ) : (
        <tr>
          <td>{props.stt}</td>
          <td>{props.item.Product.prod_name}</td>
          <td>
            <div className="image align-center">
              <img src={props.item.Product.prod_img} />
            </div>
          </td>
          <td>
            <div className="flex justify-center items-center">
              <button onClick={decreaseOne}>-</button>
              
                <input value={props.item.qty} />
              
              <button className="right-btn" onClick={increaseOne}>
                +
              </button>
            </div>
          </td>
          <td>{VND.format(props.item.Product.prod_price)}</td>
          <td>{VND.format(qty * props.item.Product.prod_price)}</td>
          <td>
            <select
              className="slbtn"
              value={statusO}
              onChange={(e) => setStatusO(e.target.value)}
            >
              <option value="dadat" disable selected>
                Đã gửi bếp
              </option>
              <option value="chebien">Đang chế biến</option>
              <option value="xuatmon">Xuất món</option>
              <option value="hetmon">Hết món</option>
            </select>
          </td>
        </tr>
      )}
    </>
  );
}

export default OrderDetailCheff;
