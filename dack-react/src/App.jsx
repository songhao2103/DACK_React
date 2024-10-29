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
import MyCourseContent from "./myCourseContent/MyCourseContent";
import ListCoursesOfPage from "./listCoursesOfPage/ListCoursesOfPage";

function App() {
  const listUsers = JSON.parse(localStorage.getItem("listUsers"));
  if (!listUsers) {
    const newListUsers = [
      { account: { email: "admin", password: "123456", id: "admin" } },
      {
        account: { email: "kennyWhite", password: "123456", id: "kennyWhite" },
      },
      { account: { email: "johnDoe", password: "123456", id: "johnDoe" } },
    ];
    localStorage.setItem("listUsers", JSON.stringify(newListUsers));
  }

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
        <Route
          path={"/course-content"}
          element={<MyCourseContent></MyCourseContent>}
        />
        <Route
          path="/list-courses-of-page"
          element={<ListCoursesOfPage></ListCoursesOfPage>}
        />
      </Routes>
      <ScrollToTop></ScrollToTop>
      <Footer></Footer>
    </div>
  );
}

export default App;
