import { Routes, Route, json } from "react-router-dom";
import Header from "./header/Header";
import "./App.css";
import "./style/main.scss";
import Footer from "./footer/Footer";
import HomePage from "./homePage/HomePage";
import CoursesPage from "./coursesPage/CoursesPage";
import InfoCoursePage from "./infoCoursePage/InfoCoursePage";
import Register from "./register/Register";
import LogIn from "./logIn/LogIn";
import CheckOut from "./checkOut/CheckOut";

function App() {
  //Khởi tạo đổi hoặc đặt lại đối tượng dùng để lưu tài khoản đang đăng nhập về null
  // useEffect(() => {
  //   const userLogged = null;
  //   localStorage.setItem("userLogged", JSON.stringify(userLogged));
  // }, []);

  return (
    <div className="main_content">
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/courses_page" element={<CoursesPage></CoursesPage>} />
        <Route
          path="/info_course"
          element={<InfoCoursePage></InfoCoursePage>}
        />
        <Route path="/register" element={<Register></Register>} />
        <Route path="/log-in" element={<LogIn></LogIn>} />
        <Route path="/check-out" element={<CheckOut></CheckOut>} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
