import { useState, useRef, useEffect } from "react";
import { listDataCourses } from "../listDataCourses";
import Course from "./Course";

// Tính số trang của danh sách courses
let countPage = listDataCourses.length / 4;
Number.isInteger(countPage) ? countPage : (countPage = countPage + 1);
countPage = Math.floor(countPage);

//Component==================================================================

const ListCourses = () => {
  const [indexPageList, setIndexPageList] = useState(0); //Lưu vị trí trang khi click vào các số chuyển trang
  const list = useRef(null); //lấy element list
  const [changeArrangement, setChangeArrangement] = useState("rows");

  //Hàm xử lí khi click vào danh sách trang
  const handleClickCountPage = (value) => {
    setIndexPageList(value);
    // setIndexPageList(0);
  };

  // Hàm xử lí khi click vào mũi tên chuyển trang
  const handleClickArrow = (value) => {
    if (
      (indexPageList > 0 && value === -1) ||
      (indexPageList < countPage - 1 && value === 1)
    ) {
      setIndexPageList((prevIndex) => prevIndex + value);
    }
  };

  //xử lí translateY khi indexPageList thay đổi
  useEffect(() => {
    if (changeArrangement === "rows") {
      list.current.style.transform = `translateY(${-indexPageList * 1130}px)`;
    } else {
      list.current.style.transform = `translateY(${-indexPageList * 1015}px)`;
    }
  }, [indexPageList, changeArrangement]);

  //hàm xử lí đổi cách sắp xếp các danh sách courses
  const handleChangeArrangement = (value) => {
    setChangeArrangement(value);
  };

  return (
    <div className="list_coursesC">
      <div className="top">
        <div className="left">
          <p className="title_h2">All Coueses</p>
        </div>

        <div className="right">
          <div className="search">
            <input type="text" placeholder="Search" />
            <div className="icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          <div className="icon_menu">
            <i
              onClick={() => handleChangeArrangement("table")}
              className={`fa-solid fa-table-cells-large ${
                changeArrangement === "table" ? "active" : ""
              }`}
            ></i>
            <i
              onClick={() => handleChangeArrangement("rows")}
              className={`fa-solid fa-list ${
                changeArrangement === "rows" ? "active" : ""
              }`}
            ></i>
          </div>
        </div>
      </div>

      <div className={`box_list ${changeArrangement}`}>
        <div className={`list ${changeArrangement}`} ref={list}>
          {listDataCourses.map((course, index) => (
            <Course
              key={index}
              course={course}
              changeArrangement={changeArrangement}
            ></Course>
          ))}
        </div>
      </div>

      <div className="list_page">
        <div
          className={`icon ${indexPageList === 0 ? "block" : ""}`}
          onClick={() => handleClickArrow(-1)}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </div>

        {Array.from({ length: countPage }, (_, i) => i).map((_, index) => (
          <p
            className={`stt ${index === indexPageList ? "active" : ""}`}
            key={index}
            onClick={() => handleClickCountPage(index)}
          >
            {index + 1}
          </p>
        ))}

        <div
          className={`icon ${indexPageList === countPage - 1 ? "block" : ""}`}
          onClick={() => handleClickArrow(1)}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    </div>
  );
};

export default ListCourses;
