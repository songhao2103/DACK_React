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
import ScrollToTop from "./scrollToTop/ScrollToTop";
import ListMyCourses from "./listMyCourses/ListMyCourses";
import MyProfilePage from "./myProfile/MyProfilePage";

function App() {
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
        <Route path="/my-courses" element={<ListMyCourses></ListMyCourses>} />
        <Route path={"my-profile"} element={<MyProfilePage></MyProfilePage>} />
      </Routes>
      <ScrollToTop></ScrollToTop>

      <Footer></Footer>
    </div>
  );
}

export default App;
