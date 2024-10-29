import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionClearUserLogged } from "../redux-store/actions/actions";

const BoxRight = () => {
  const [clickSearch, setClickSearch] = useState(false); //Click hiện thị ô input search
  const [clickIconUser, setClickIconUser] = useState(false);
  const userLogged = useSelector((state) => state.userLogged);
  const dispatch = useDispatch();

  //Hàm hiển thị ô input search
  const handleClickSearch = () => {
    setClickSearch(!clickSearch);
  };

  //Hàm hiện thị options của user
  const handleClickIconUser = () => {
    setClickIconUser(!clickIconUser);
  };

  //Hàm xóa tài khoản đang đăng nhập khi log out

  const handleClearUserLogged = () => {
    dispatch({
      type: actionClearUserLogged.type,
    });
  };
  return (
    <div className="box_right">
      {userLogged === null && (
        <div className={`sign ${clickSearch ? "" : "active"}`}>
          <Link to={"/log-in"} className="desc">
            Log In /
          </Link>
          <Link to={"/register"} className="desc">
            Register
          </Link>
        </div>
      )}

      <div className="search">
        <input
          type="text"
          placeholder="Search"
          className={clickSearch ? "active" : ""}
        />
        <div className="icon" onClick={handleClickSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>

      {userLogged !== null && (
        <div className="box_user" onClick={handleClickIconUser}>
          <div className="icon">
            <i className="fa-regular fa-user"></i>
          </div>
          {clickIconUser && (
            <ul className="options_user">
              <p className="desc">{userLogged.account.email}</p>
              <Link to={"/my-profile"} className="option">
                Profile
              </Link>
              <Link to={"/my-courses"} className="option">
                My courses
              </Link>
              {userLogged.account.id === "admin" && (
                <Link to={"/list-courses-of-page"} className="option">
                  List courses of page
                </Link>
              )}

              <Link
                to={"/register"}
                className="option"
                onClick={handleClearUserLogged}
              >
                Log out
              </Link>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default BoxRight;
