import { useState } from "react";
import Curriculum from "./Curriculum";
import FAQs from "./FAQs";
import Instructor from "./Instructor";
import Overview from "./Overview";
import Reviews from "./Reviews";

const CourseContent = () => {
  const [hiddenContent, setHiddenContent] = useState(() => {
    let arr = new Array(5).fill(false);
    arr[0] = true;
    return arr;
  });

  const handleHiddenContent = (value) => {
    setHiddenContent(new Array(5).fill(false));
    setHiddenContent((prevHiddenContent) =>
      prevHiddenContent.map((item, index) => (index === value ? !item : item))
    );
  };

  return (
    <div className="course_content">
      <div className="nav_content">
        <ul>
          <li
            className={`title_h4 ${hiddenContent[0] ? "active" : ""}`}
            onClick={() => handleHiddenContent(0)}
          >
            Overview
          </li>
          <li
            className={`title_h4 ${hiddenContent[1] ? "active" : ""}`}
            onClick={() => handleHiddenContent(1)}
          >
            Curriculum
          </li>
          <li
            className={`title_h4 ${hiddenContent[2] ? "active" : ""}`}
            onClick={() => handleHiddenContent(2)}
          >
            Instructor
          </li>
          <li
            className={`title_h4 ${hiddenContent[3] ? "active" : ""}`}
            onClick={() => handleHiddenContent(3)}
          >
            FAQs
          </li>
          <li
            className={`title_h4 ${hiddenContent[4] ? "active" : ""}`}
            onClick={() => handleHiddenContent(4)}
          >
            Reviews
          </li>
        </ul>
      </div>
      <div
        className={`box_content box_overview ${
          hiddenContent[0] ? "active" : ""
        }`}
      >
        <Overview></Overview>
      </div>
      <div className={`box_content ${hiddenContent[1] ? "active" : ""}`}>
        <Curriculum></Curriculum>
      </div>
      <div className={`box_content ${hiddenContent[2] ? "active" : ""}`}>
        <Instructor></Instructor>
      </div>
      <div className={`box_content ${hiddenContent[3] ? "active" : ""}`}>
        <FAQs></FAQs>
      </div>
      <div className={`box_content ${hiddenContent[4] ? "active" : ""}`}>
        <Reviews></Reviews>
      </div>
    </div>
  );
};

export default CourseContent;
