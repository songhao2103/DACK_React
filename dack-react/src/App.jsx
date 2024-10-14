import Header from "./header/Header";
import "./App.css";
// import "./style/main.css";
import "./style/main.scss";
import Footer from "./footer/Footer";
import HomePage from "./homePage/HomePage";
import CoursesPage from "./coursesPage/CoursesPage";
import InfoCoursePage from "./infoCoursePage/InfoCoursePage";
function App() {
  return (
    <div className="main_content">
      <Header></Header>
      {/* <HomePage></HomePage> */}
      {/* <CoursesPage></CoursesPage> */}
      <InfoCoursePage></InfoCoursePage>
      <Footer></Footer>
    </div>
  );
}

export default App;
