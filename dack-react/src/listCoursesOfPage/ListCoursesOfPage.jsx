import { useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import Course from "./Course";
import { actionAdminAddCourse } from "../redux-store/actions/actions";
import { actionAdminDeleteCourse } from "../redux-store/actions/actions";
import { actionAdminUpdateCourse } from "../redux-store/actions/actions";
import LostsOfEditing from "./LostsOfEditing";

const initialState = {
  listDataCourses: [], //Danh sách courses

  listDataCoursesFiltered: [], //Danh sách course khi được filter
  //Lấy dữ liệu của form thêm mới course
  formData: {
    img: "",
    name: "",
    price: "",
    sale: "",
    instructor: "",
  },

  //lưu trạng thái hiển thị box add course
  hiddenAddCourse: "",

  //lưu id của course được update
  idCourseUpdate: "",

  //lưu danh sách chọn của các ô in put check box
  listChecked: [],

  //hidden choose
  hiddenChoose: false,

  //hidden losts of editing
  hiddenLostsOfEditing: false,
  //Các khóa học được chọn
  listSelectedCourses: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZATION": {
      const newListChecked = Array(action.payload.listDataCourses.length).fill(
        false
      );
      return {
        ...state,
        listDataCourses: action.payload.listDataCourses,
        listChecked: newListChecked,
        listDataCoursesFiltered: action.payload.listDataCourses,
      };
    }

    //Lấy giá trị của form add course
    case "CHANGEFORMADDDATA": {
      const { name, value, type, files } = action.payload.element;
      const newValue = type === "file" ? files[0] : value;
      return { ...state, formData: { ...state.formData, [name]: newValue } };
    }

    //Xử lý add course
    case "CLICKADDCOURSE": {
      return {
        ...state,
        formData: {
          img: "",
          name: "",
          price: "",
          sale: "",
          instructor: "",
        },
      };
    }

    //Xử lý hidden box add course
    case "HIDDENBOXADDXOURSE":
      return {
        ...state,
        hiddenAddCourse: action.payload.value,
        idCourseUpdate: action.payload.id || "",
        formData: {
          img: "",
          name: "",
          price: "",
          sale: "",
          instructor: "",
        },
      };

    //xử lý update information course
    case "UPDATEINFORMATIONCOURSE":
      return {
        ...state,
        hiddenAddCourse: "",
        formData: {
          img: "",
          name: "",
          price: "",
          sale: "",
          instructor: "",
        },
      };

    //Xử lý hidden các ô input checkbox
    case "HIDDENCHECKBOX":
      return { ...state, hiddenChoose: !state.hiddenChoose };

    //xử lý lưu giá trị của các ô input checkbox
    case "CHANGEINPUTCHECKBOX": {
      const newListChecked = state.listChecked.map((item, index) =>
        index === action.payload.index ? !item : item
      );
      return { ...state, listChecked: newListChecked };
    }

    //Xử lý khi click vào confirm
    case "CLICKCONFIRM": {
      const newListSelectedCourses = state.listDataCoursesFiltered.filter(
        (course, index) => state.listChecked[index]
      );
      return {
        ...state,
        listSelectedCourses: newListSelectedCourses,
        hiddenChoose: false,
        hiddenLostsOfEditing: true,
      };
    }

    //xử lý khi đóng losts of editing
    case "CLOSELOSTSOFEDITING":
      return {
        ...state,
        hiddenLostsOfEditing: false,
        listChecked: state.listChecked.fill(false),
      };

    //Xử lý khi lọc các course được discount
    case "FILTERSALE": {
      const newListDataCourses = state.listDataCoursesFiltered.filter(
        (course) => course.sale === 100
      );
      return { ...state, listDataCoursesFiltered: newListDataCourses };
    }

    //Xử lý khi show all courses
    case "SHOWALLCOURSES":
      return { ...state, listDataCoursesFiltered: state.listDataCourses };

    //xử lý khi sắp xeepsgiamr dần
    case "DECREASEPRICE": {
      const newListDataCourses = state.listDataCoursesFiltered.sort(
        (a, b) =>
          (a.price * (100 - a.sale)) / 100 - (b.price * (100 - b.sale)) / 100
      );

      return { ...state, listDataCoursesFiltered: newListDataCourses };
    }

    //xử lý khi sắp xếp tăng dần
    case "INCREASEPRICE": {
      const newListDataCourses = state.listDataCoursesFiltered.sort(
        (a, b) =>
          (b.price * (100 - b.sale)) / 100 - (a.price * (100 - a.sale)) / 100
      );
      return { ...state, listDataCoursesFiltered: newListDataCourses };
    }

    default:
      return state;
  }
};

//Component=================================================================================
const ListCoursesOfPage = () => {
  const dispatchRedux = useDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);
  const listDataCourses = useSelector((state) => state.listDataCourses); //lấy dữ liệu về data courses từ store

  //Cập nhật listDataCourses cho state của reducer
  useEffect(() => {
    dispatch({
      type: "INITIALIZATION",
      payload: {
        listDataCourses,
      },
    });
  }, [listDataCourses]);

  //Hàm thay đổi của form add course
  const handleChangeAddData = (e) => {
    const element = e.target;
    dispatch({
      type: "CHANGEFORMADDDATA",
      payload: {
        element,
      },
    });
  };

  //Hàm xử lý khi click add course
  const handleClickAddCourse = (e) => {
    e.preventDefault();

    dispatchRedux({
      type: actionAdminAddCourse.type,
      payload: {
        formData: state.formData,
      },
    });

    dispatch({
      type: "CLICKADDCOURSE",
    });
  };

  //hàm xử lý hiển thị box add course
  const handleHiddenBoxAddCourse = (value, id) => {
    dispatch({
      type: "HIDDENBOXADDXOURSE",
      payload: {
        value,
        id,
      },
    });
  };

  // hàm xử lý xóa course
  const handleDeleteCourse = (id) => {
    dispatchRedux({
      type: actionAdminDeleteCourse.type,
      payload: {
        id,
      },
    });
  };

  // hàm xử lý khi thay đổi thông tin của course
  const handleUpdateInformation = (e) => {
    e.preventDefault();
    dispatchRedux({
      type: actionAdminUpdateCourse.type,
      payload: {
        formData: state.formData,
        id: state.idCourseUpdate,
      },
    });

    dispatch({
      type: "UPDATEINFORMATIONCOURSE",
    });
  };

  //hàm xử lý hiện thị các ô input checkbox
  const handleHiddenCheckbox = () => {
    dispatch({
      type: "HIDDENCHECKBOX",
    });
  };

  //hàm để lấy giá trị của các thẻ input type checkbox
  const handleChangeInputCheckbox = (index) => {
    dispatch({
      type: "CHANGEINPUTCHECKBOX",
      payload: {
        index,
      },
    });
  };

  //Hàm click confirm để xác nhận chọn các course
  const handleClickConfirm = () => {
    dispatch({
      type: "CLICKCONFIRM",
    });
  };

  //hàm đóng losts of editing
  const handleCloseLostsOfEditing = () => {
    dispatch({
      type: "CLOSELOSTSOFEDITING",
    });
  };

  //hàm xử lý khi lọc các course được discount
  const handleFilterSale = () => {
    dispatch({
      type: "FILTERSALE",
    });
  };

  //hàm xử lý show all courses
  const handleShowAllCourses = () => {
    dispatch({
      type: "SHOWALLCOURSES",
    });
  };

  //hàm xử lý khi sắp xếp giảm dần theo giá
  const handleDecreasePrice = () => {
    dispatch({
      type: "DECREASEPRICE",
    });
  };

  //hàm xử lý khi sắp xếp giảm dần theo giá
  const handleIncreasePrice = () => {
    dispatch({
      type: "INCREASEPRICE",
    });
  };
  
  return (
    <div className="list_courses_of_page">
      <div className="nav_bar">
        <ul className="menu">
          <li
            className="item desc"
            onClick={() => handleHiddenBoxAddCourse("add")}
          >
            Add course
          </li>
          <li className="item desc" onClick={handleHiddenCheckbox}>
            Choose multiple
          </li>
          <li className="filter">
            <p className="desc">Filter</p>
            <ul className="box_option">
              <li className="desc" onClick={handleShowAllCourses}>
                All
              </li>
              <li className="desc" onClick={handleFilterSale}>
                Is on sale
              </li>
              <li className="desc" onClick={handleDecreasePrice}>
                Prices gradually increase
              </li>
              <li className="desc" onClick={handleIncreasePrice}>
                Prices gradually decrease
              </li>
            </ul>
          </li>
          {state.listChecked.some((item) => item) &&
            !state.hiddenLostsOfEditing && (
              <li className="item desc" onClick={handleClickConfirm}>
                Confirm
              </li>
            )}
        </ul>
        <div className="search">
          <input type="text" placeholder="Search course" />
        </div>
      </div>

      {/* add_courses */}
      {(state.hiddenAddCourse === "add" ||
        state.hiddenAddCourse === "update") && (
        <form action="" className="add_course">
          <div className="item">
            <label htmlFor="img">Upload avatar:</label>
            <input
              type="file"
              name="img"
              id="img"
              onChange={handleChangeAddData}
              value=""
            />
          </div>
          <div className="item">
            <label htmlFor="name">Course name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChangeAddData}
              value={state.formData.name}
            />
          </div>
          <div className="item">
            <label htmlFor="price">Course price:</label>
            <input
              type="text"
              id="price"
              name="price"
              onChange={handleChangeAddData}
              value={state.formData.price}
            />
          </div>
          <div className="item">
            <label htmlFor="sale">Discount:</label>
            <input
              type="text"
              id="sale"
              name="sale"
              onChange={handleChangeAddData}
              value={state.formData.sale}
            />
          </div>
          <div className="item">
            <label htmlFor="instructor">Course instructor:</label>
            <input
              type="text"
              id="instructor"
              name="instructor"
              onChange={handleChangeAddData}
              value={state.formData.instructor}
            />
          </div>
          {state.hiddenAddCourse === "add" && (
            <button className="btn_primary" onClick={handleClickAddCourse}>
              Add Course
            </button>
          )}
          {state.hiddenAddCourse === "update" && (
            <button className="btn_primary" onClick={handleUpdateInformation}>
              Update Course
            </button>
          )}

          <p className="close" onClick={() => handleHiddenBoxAddCourse("")}>
            x
          </p>
        </form>
      )}

      {state.hiddenLostsOfEditing && (
        <LostsOfEditing
          listSelectedCourses={state.listSelectedCourses}
          handleCloseLostsOfEditing={handleCloseLostsOfEditing}
        ></LostsOfEditing>
      )}

      {/* list courses */}
      <div className="list_courses">
        {state.listDataCoursesFiltered.map((course, index) => (
          <Course
            handleDeleteCourse={handleDeleteCourse}
            course={course}
            key={course.id}
            handleHiddenBoxAddCourse={handleHiddenBoxAddCourse}
            hiddenChoose={state.hiddenChoose}
            handleChangeInputCheckbox={() => handleChangeInputCheckbox(index)}
            checked={state.listChecked[index]}
          ></Course>
        ))}
      </div>
    </div>
  );
};

export default ListCoursesOfPage;
