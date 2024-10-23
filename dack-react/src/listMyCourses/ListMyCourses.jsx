import { useSelector } from "react-redux";
import MyCourse from "./MyCourse";

const ListMyCourses = () => {
  const listCourses = useSelector((state) =>
    state.userLogged ? state.userLogged.courses : null
  );

  return (
    <div className="list_my_courses">
      <p className="title_h1">My Courses</p>
      {listCourses !== null &&
        listCourses.map((course) => (
          <MyCourse key={course.id} course={course}></MyCourse>
        ))}
    </div>
  );
};

export default ListMyCourses;
