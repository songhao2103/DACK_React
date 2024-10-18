import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionAddCourse } from "../redux-store/actions/actions";

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courseOrder = useSelector((state) => state.courseViewed);

  //hàm xử lí khi click vào place order
  const handleClickPlaceOrder = () => {
    dispatch({
      type: actionAddCourse.type,
      payload: {
        navigate,
      },
    });
  };

  return (
    <div className="check_out">
      <div className="title_h1">Check Out</div>
      <div className="content">
        <div className="course_order">
          <div className="top">
            <img src={courseOrder.img} alt="" />
            <p className="name title_h5">{courseOrder.name}</p>
            <p className="desc">${courseOrder.price}</p>
          </div>
          <div className="subtotal">
            <p className="desc">Subtotal</p>
            <div className="box_price">
              {courseOrder.sale != 0 ? (
                <p className="desc sale">- {courseOrder.sale}%</p>
              ) : null}
              <p className="desc">
                ${(courseOrder.price * (100 - courseOrder.sale)) / 100}
              </p>
            </div>
          </div>
          <div className="total">
            <p className="desc">Total</p>
            <p className="desc">
              ${(courseOrder.price * (100 - courseOrder.sale)) / 100}
            </p>
          </div>
        </div>
        <div className="pay_course">
          <p className="title_h2">Payment</p>
          <div className="box_input">
            <input type="checkbox" name="" id="" />
            <div className="icon">
              <span>Pay</span>
              <span>Pal</span>
            </div>
          </div>
          <div className="box_input">
            <input type="checkbox" name="" id="" />
            <div className="desc">Make a payment with cash.</div>
          </div>
          <div className="box_input">
            <input type="checkbox" name="" id="" />
            <div className="desc">Post-payment debt</div>
          </div>
          <button className="btn_primary" onClick={handleClickPlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
