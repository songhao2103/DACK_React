import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const InfoCourse = () => {
  //Tính giá của course
  const course = useSelector((state) => state.courseViewed);
  const displayPrice = ((course.price * (100 - course.sale)) / 100).toFixed(1);
  console.log(course);

  return (
    <div className="info_course">
      <div className="info">
        <p className="desc">
          by <span>Determined-Poitras</span>
        </p>
        <p className="title_h2">{course.name}</p>
        <div className="bottom">
          <div className="item">
            <div className="icon">
              <i className="fa-solid fa-clock"></i>
            </div>
            <p className="desc">2Weeks</p>
          </div>
          <div className="item">
            <div className="icon">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <p className="desc">{course.students} Studens</p>
          </div>
          <div className="item">
            <div className="icon">
              <i className="fa-solid fa-chart-simple"></i>
            </div>
            <p className="desc">All Levels</p>
          </div>
          <div className="item">
            <div className="icon">
              <i className="fa-solid fa-clipboard"></i>
            </div>
            <p className="desc">{course.lessons} Lessons</p>
          </div>
        </div>
      </div>
      <div className="media">
        <div className="image">
          <img src={course.img} alt="" />
        </div>

        <div className="bottom">
          <div className="price">
            <p className={`old desc ${course.sale !== 0 ? "sale" : ""}`}>
              ${course.price}
            </p>
            {course.sale !== 0 && (
              <p className={`new desc ${displayPrice == 0 ? "free" : ""}`}>
                {displayPrice == 0 ? "Free" : `$${displayPrice}`}
              </p>
            )}
          </div>
          <Link to={"/check-out"} className="btn_primary">
            Start Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoCourse;
