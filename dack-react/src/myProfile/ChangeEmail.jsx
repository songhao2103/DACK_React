import { useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionChangeEmail } from "../redux-store/actions/actions";
const initialState = {
  formData: {
    email: "",
    password: "",
  },

  checkError: {
    email: false,
    password: false,
  },

  textError: {
    email: "",
    password: "",
  },
};

const changeEmailReducer = (state, action) => {
  switch (action.type) {
    case "CHANGEINPUT": {
      const { name, value } = action.payload.element;
      return { ...state, formData: { ...state.formData, [name]: value } };
    }

    case "SUBMIT": {
      const { email, password } = state.formData;
      const newCheckError = { ...state.checkError };
      const newTextError = { ...state.textError };
      const listUsers = JSON.parse(localStorage.getItem("listUsers"));
      let hasError = true;

      if (!email) {
        newCheckError.email = true;
        newTextError.email = "Email không được để trống";
        hasError = false;
      } else if (listUsers.some((user) => user.account.email === email)) {
        newCheckError.email = true;
        newTextError.email = "Email này đã được đăng ký, thử lại";
        hasError = false;
      } else if (!password) {
        newCheckError.email = false;
        newCheckError.password = true;
        newTextError.password = "Password không được để trống";
        hasError = false;
      } else if (password !== action.payload.userLogged.account.password) {
        newCheckError.password = true;
        newCheckError.email = false;
        newTextError.password = "Password không đúng, thử lại";
        hasError = false;
      } else {
        newCheckError.password = false;
        hasError = true;
      }

      if (hasError) {
        //đưa lên reducer của redux để cập nhật thông tin người dùng đang đăng nhập
        action.payload.dispatchRedux({
          type: action.payload.actionChangeEmail.type,
          payload: {
            email: state.formData.email,
          },
        });
      }

      if (hasError) {
        return {
          ...state,
          formData: {
            email: "",
            password: "",
          },

          checkError: {
            email: false,
            password: false,
          },

          textError: {
            email: "",
            password: "",
          },
        };
      }

      return {
        ...state,
        checkError: newCheckError,
        textError: newTextError,
      };
    }
    default:
      return state;
  }
};
const ChangeEmail = () => {
  const [state, dispatch] = useReducer(changeEmailReducer, initialState);
  const userLogged = useSelector((state) => state.userLogged);
  const dispatchRedux = useDispatch();

  //Hàm theo dõi sự thay đổi của input
  const handleChangeInput = (e) => {
    const element = e.target;
    dispatch({
      type: "CHANGEINPUT",
      payload: {
        element,
      },
    });
  };

  //Hàm xử lý submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "SUBMIT",
      payload: {
        userLogged,
        dispatchRedux,
        actionChangeEmail,
      },
    });
  };

  return (
    <form className="change_email" onSubmit={handleSubmit}>
      <div className="item_input">
        <label htmlFor="" className="desc">
          New email:
        </label>
        <input
          type="email"
          placeholder="Enter your new email"
          id="email"
          name="email"
          value={state.formData.email}
          onChange={handleChangeInput}
        />
        {state.checkError.email && (
          <p className="desc error">{state.textError.email}</p>
        )}
      </div>
      <div className="item_input">
        <label htmlFor="" className="desc">
          Password:
        </label>
        <input
          type="text"
          placeholder="Enter your password"
          id="password"
          name="password"
          value={state.formData.password}
          onChange={handleChangeInput}
        />
        {state.checkError.password && (
          <p className="desc error">{state.textError.password}</p>
        )}
      </div>

      <button className="btn_primary">Update email</button>
    </form>
  );
};

export default ChangeEmail;
