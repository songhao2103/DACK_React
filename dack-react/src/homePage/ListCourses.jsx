import { useState } from "react";
import { listDataCourses } from "../listDataCourses";
import Course from "./Course";

const ListCourses = () => {
  const [clickAllCourses, setClickAllCourses] = useState(false);

  const handleClickAllCourses = () => {
    setClickAllCourses(!clickAllCourses);
  };

  return (
    <div className="box_list_courses">
      <div className="top">
        <div className="left">
          <p className="title_h2">Featured courses</p>
          <p className="desc">Explore our Popular Courses</p>
        </div>
        <div className="right">
          <button className="btn_white" onClick={handleClickAllCourses}>
            {clickAllCourses ? "Close All" : "All courses"}
          </button>
        </div>
      </div>
      <div className={`list_courses ${clickAllCourses ? "all" : ""}`}>
        {listDataCourses.map((course, index) => (
          <Course key={index} course={course}></Course>
        ))}
      </div>
    </div>
  );
};

export default ListCourses;
