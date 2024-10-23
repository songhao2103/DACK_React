import { useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionUserLogged } from "../redux-store/actions/actions";

const initialState = {
  formData: { email: "", password: "" },
  checkedError: {
    email: false,
    password: false,
  },

  textError: {
    email: "",
    password: "",
  },

  hiddenPassword: false,
};

const logInReducer = (state, action) => {
  switch (action.type) {
    case "CHANGEINPUT": {
      const element = action.payload.element;
      const { name, value } = element;
      return { ...state, formData: { ...state.formData, [name]: value } };
    }

    case "SUBMITFORM": {
      let newCheckedError = { ...state.checkedError };
      let newTextError = { ...state.textError };

      //check lỗi email
      if (!state.formData.email) {
        (newCheckedError.email = true),
          (newTextError.email = "Email không được để trống");
      } else {
        if (
          action.payload.listUsers === null
            ? true
            : !action.payload.listUsers.find(
                (user) => user.account.email === state.formData.email
              )
        ) {
          (newCheckedError.email = true),
            (newTextError.email = "Email không đúng, thử lại");
        } else {
          newCheckedError.email = false;

          //check lỗi password
          if (!state.formData.password) {
            (newCheckedError.password = true),
              (newTextError.password = "Password không được để trống");
          } else {
            if (
              !action.payload.listUsers.find(
                (user) => user.account.password === state.formData.password
              )
            ) {
              (newCheckedError.password = true),
                (newTextError.password = "Password không đúng, thử lại");
            } else {
              newCheckedError.password = false;
            }
          }
        }
      }

      if (!newCheckedError.email && !newCheckedError.password) {
        action.payload.dispatchRedux({
          type: actionUserLogged.type,
          payload: {
            formData: state.formData,
          },
        });

        // Nếu không có lỗi, điều hướng đến trang home
        setTimeout(() => {
          action.payload.navigate("/");
        }, 100);

        return {
          ...state,
          formData: {
            email: "",
            password: "",
          },
          checkedError: newCheckedError,
          textError: newTextError,
        };
      } else {
        return {
          ...state,
          checkedError: newCheckedError,
          textError: newTextError,
        };
      }
    }

    case "HIDDENPASSWORD":
      return { ...state, hiddenPassword: !state.hiddenPassword };

    default:
      return state;
  }
};

const LogIn = () => {
  const [state, dispatch] = useReducer(logInReducer, initialState);
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();
  const listUsers = JSON.parse(localStorage.getItem("listUsers"));

  //Hàm xử lí change input
  const handleChangeInput = (e) => {
    const element = e.target;
    dispatch({
      type: "CHANGEINPUT",
      payload: {
        element,
      },
    });
  };

  //hàm xử lý submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "SUBMITFORM",
      payload: {
        listUsers,
        navigate,
        dispatchRedux,
      },
    });
  };

  //Hàm xử lí xem mật khẩu
  const handleHiddenPassword = () => {
    dispatch({
      type: "HIDDENPASSWORD",
    });
  };

  return (
    <div className="log_in">
      <div className="media">
        <img
          src="https://songhao2103.github.io/IMG_du_an_REACT/img_/img_media/studen_post_comment.png"
          alt=""
        />
      </div>
      <form action="" className="form_log_in" onSubmit={handleSubmit}>
        <p className="title_h2">Log In</p>
        <label htmlFor="">Email:</label>
        <input
          type="text"
          onChange={handleChangeInput}
          value={state.formData.email}
          name="email"
        />
        <p className={`error ${state.checkedError.email ? "active" : ""}`}>
          {state.textError.email}
        </p>

        <label htmlFor="">Password</label>
        <div className="box_input">
          <input
            type={state.hiddenPassword ? "text" : "password"}
            onChange={handleChangeInput}
            value={state.formData.password}
            name="password"
          />
          <div
            className="box_eye"
            onClick={() => handleHiddenPassword("rePassword")}
          >
            <i className="fa-solid fa-eye"></i>
            <i
              className={`fa-solid fa-eye-slash ${
                state.hiddenPassword ? "active" : ""
              }`}
            ></i>
          </div>
        </div>

        <p className={`error ${state.checkedError.password ? "active" : ""}`}>
          {state.textError.password}
        </p>
        <div className="bottom">
          <Link to="/register" className="desc">
            Don't have an account yet
          </Link>
          <button className="btn_primary" type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
