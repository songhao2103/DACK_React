import CourseContent from "./CourseContent";
import InfoCourse from "./InfoCourse";
// import { listDataCourses } from "../listDataCourses";

const InfoCoursePage = () => {
  return (
    <div className="info_course_page">
      <InfoCourse></InfoCourse>
      <CourseContent></CourseContent>
    </div>
  );
};

export default InfoCoursePage;
