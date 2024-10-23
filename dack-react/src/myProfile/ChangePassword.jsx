import { useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionChangePassword } from "../redux-store/actions/actions";

const initialState = {
  formData: {
    oldPassword: "",
    newPassword: "",
    reNewPassword: "",
  },

  checkError: {
    oldPassword: false,
    newPassword: false,
    reNewPassword: false,
  },

  textError: {
    oldPassword: "",
    newPassword: "",
    reNewPassword: "",
  },

  alert: false,
};

const changePasswordReducer = (state, action) => {
  switch (action.type) {
    case "CHANGEINPUT": {
      const { name, value } = action.payload.element;
      return { ...state, formData: { ...state.formData, [name]: value } };
    }

    case "SUBMITFORM": {
      const newCheckError = { ...state.checkError };
      const newTextError = { ...state.textError };
      //check mật khẩu cũ
      if (!state.formData.oldPassword) {
        newCheckError.oldPassword = true;
        newTextError.oldPassword = "Old password không được để trống";
      } else if (
        state.formData.oldPassword !==
        action.payload.userLogged.account.password
      ) {
        newCheckError.oldPassword = true;
        newTextError.oldPassword = "Old password không đúng";
      } else {
        newCheckError.oldPassword = false;
      }

      //check mật khẩu mới
      if (!state.formData.newPassword) {
        newCheckError.newPassword = true;
        newTextError.newPassword = "New password không được để trống";
      } else if (state.formData.newPassword.length < 6) {
        newCheckError.newPassword = true;
        newTextError.newPassword = "New password phải lớn hơn 6 ký tự";
      } else if (
        state.formData.newPassword ===
        action.payload.userLogged.account.password
      ) {
        newCheckError.newPassword = true;
        newTextError.newPassword =
          "Mật khẩu mới không được trùng với mật khẩu cũ";
      } else {
        newCheckError.newPassword = false;
      }
      //check  nhập lại mật khẩu mới
      if (!state.formData.reNewPassword) {
        newCheckError.reNewPassword = true;
        newTextError.reNewPassword = "Re-new password không được để trống";
      } else if (state.formData.newPassword !== state.formData.reNewPassword) {
        newCheckError.reNewPassword = true;
        newTextError.reNewPassword = "Mật khẩu không khớp,thử lại";
      } else {
        newCheckError.reNewPassword = false;
      }

      if (
        !newCheckError.oldPassword &&
        !newCheckError.newPassword &&
        !newCheckError.reNewPassword
      ) {
        action.payload.dispatchRedux({
          type: actionChangePassword.type,
          payload: {
            formData: state.formData,
          },
        });

        return {
          ...state,
          formData: {
            oldPassword: "",
            newPassword: "",
            reNewPassword: "",
          },

          checkError: {
            oldPassword: false,
            newPassword: false,
            reNewPassword: false,
          },

          textError: {
            oldPassword: "",
            newPassword: "",
            reNewPassword: "",
          },
          alert: true,
        };
      }

      return { ...state, checkError: newCheckError, textError: newTextError };
    }

    case "CLICKALERT": {
      return { ...state, alert: false };
    }
    default:
      return state;
  }
};

const ChangePassword = () => {
  const [state, dispatch] = useReducer(changePasswordReducer, initialState);
  const dispatchRedux = useDispatch();
  const userLogged = useSelector((state) => state.userLogged);

  //hàm xử lí thay đổi của form
  const handleChangeInput = (e) => {
    const element = e.target;
    dispatch({
      type: "CHANGEINPUT",
      payload: {
        element,
      },
    });
  };

  //Hàm xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "SUBMITFORM",
      payload: {
        userLogged,
        dispatchRedux,
      },
    });
  };

  // hàm xử lí click alert
  const handleClickAlert = () => {
    dispatch({
      type: "CLICKALERT",
    });
  };

  return (
    <div className="change_password">
      <form onSubmit={handleSubmit}>
        <div className="item_input">
          <label htmlFor="" className="desc">
            Old password:
          </label>
          <input
            type="text"
            placeholder="Enter your old password"
            value={state.formData.oldPassword}
            onChange={handleChangeInput}
            name="oldPassword"
          />
          {state.checkError.oldPassword && (
            <p className="desc error">{state.textError.oldPassword}</p>
          )}
        </div>
        <div className="item_input">
          <label htmlFor="" className="desc">
            New password:
          </label>
          <input
            type="text"
            placeholder="Enter your new password"
            value={state.formData.NewPassword}
            onChange={handleChangeInput}
            name="newPassword"
          />
          {state.checkError.newPassword && (
            <p className="desc error">{state.textError.newPassword}</p>
          )}
        </div>
        <div className="item_input">
          <label htmlFor="" className="desc">
            Re-new password:
          </label>
          <input
            type="text"
            placeholder="Enter your re-new password"
            value={state.formData.reNewPassword}
            onChange={handleChangeInput}
            name="reNewPassword"
          />
          {state.checkError.reNewPassword && (
            <p className="desc error">{state.textError.reNewPassword}</p>
          )}
        </div>

        <button className="btn_primary" type="submit">
          Update password
        </button>
      </form>

      {state.alert && (
        <div className="alert">
          <p className="desc">Bạn đã thay đổi mật khẩu thành công</p>
          <button className="btn_primary" onClick={handleClickAlert}>
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
