//khởi tạo state
import { listDataCourses } from "../../listDataCourses";
import { listCommentCourses } from "../../listCommentCourses";
const initialState = {
  listDataCourses: listDataCourses,
  listCommentCourses: listCommentCourses,
  courseViewed: {}, //Lưu course khi xem thông tin của course

  //lưu trạng thái của option price ở trang coursesPage
  coursePrice: {
    all: true,
    free: false,
    increase: false,
    reduce: false,
  },

  courseInstructors: {
    all: true,
    kennyWhite: false,
    johnDoe: false,
  },

  userLogged: null,
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case "COURSEVIEWED":
      return {
        ...state,
        courseViewed: action.payload.courseViewed,
      };

    case "SELECTPRICE": {
      const newCoursePrice = { ...state.coursePrice };
      Object.keys(newCoursePrice).forEach((key) => {
        newCoursePrice[key] = false;
      });
      newCoursePrice[action.payload.key] = true;
      return {
        ...state,
        coursePrice: newCoursePrice,
      };
    }

    case "SELECTINSTRUCTORS": {
      const newCourseInstructors = { ...state.courseInstructors };
      Object.keys(newCourseInstructors).forEach((key) => {
        newCourseInstructors[key] = false;
      });

      newCourseInstructors[action.payload.key] = true;
      return { ...state, courseInstructors: newCourseInstructors };
    }

    case "USERLOGGED": {
      const listUsers = JSON.parse(localStorage.getItem("listUsers"));
      if (Array.isArray(listUsers)) {
        const newUserLogged = listUsers.find(
          (user) => user.account.email === action.payload.formData.email
        );

        return { ...state, userLogged: newUserLogged };
      } else {
        return state;
      }
    }

    //Xử lý log out tài khoản
    case "CLEARUSERLOGGED":
      return { ...state, userLogged: null };

    //Xử lí đăng ký khóa học
    case "ADDCOURSE": {
      const listUsers = JSON.parse(localStorage.getItem("listUsers") || []); // lấy xuống listUsers từ local

      const newListUsers = listUsers.map((user) => {
        if (state.userLogged.account.email === user.account.email) {
          const newUser = {
            ...user,
            courses: [...user.courses, state.courseViewed],
          };
          return newUser;
        } else {
          return user;
        }
      });

      localStorage.setItem("listUsers", JSON.stringify(newListUsers));

      setTimeout(() => {
        action.payload.navigate("/info_course");
      }, 500);

      return {
        ...state,
        userLogged: {
          ...state.userLogged,
          courses: [...state.userLogged.courses, state.courseViewed],
        },
      };
    }

    //Xử lý update profile
    case "UPDATEPROFILE": {
      const listUsers = JSON.parse(localStorage.getItem("listUsers"));
      const formData = action.payload.formData;
      const accountUserLogged = state.userLogged.account;

      const newAccountUser = {
        name: formData.name || accountUserLogged.name,
        birth: formData.birth || accountUserLogged.birth || null,
        address: formData.address || accountUserLogged.address || null,
        phone: formData.phone || accountUserLogged.phone || null,
        job: formData.job || accountUserLogged.job || null,
      };

      const newUserLogged = {
        ...state.userLogged,
        account: { ...state.userLogged.account, ...newAccountUser },
      };

      const updateListUsers = listUsers.map((user) => {
        if (user.account.id === newUserLogged.account.id) {
          return newUserLogged;
        } else {
          return user;
        }
      });
      localStorage.setItem("listUsers", JSON.stringify(updateListUsers));
      return {
        ...state,
        userLogged: newUserLogged,
      };
    }

    //xử lý thay đổi changeEmail
    case "CHANGEEMAIL": {
      const listUsers = JSON.parse(localStorage.getItem("listUsers"));
      const newListUsers = listUsers.map((user) => {
        if (user.account.id === state.userLogged.account.id) {
          return {
            ...user,
            account: { ...user.account, email: action.payload.email },
          };
        } else {
          return user;
        }
      });

      localStorage.setItem("listUsers", JSON.stringify(newListUsers));

      return {
        ...state,
        userLogged: {
          ...state.userLogged,
          account: { ...state.userLogged.account, email: action.payload.email },
        },
      };
    }

    //xử lý thay đổi password
    case "CHANGEPASSWORD": {
      const listUsers = JSON.parse(localStorage.getItem("listUsers"));
      const newListUsers = listUsers.map((user) => {
        if (user.account.id === state.userLogged.account.id) {
          return {
            ...user,
            account: {
              ...user.account,
              password: action.payload.formData.newPassword,
            },
          };
        } else {
          return user;
        }
      });

      localStorage.setItem("listUsers", JSON.stringify(newListUsers));

      return {
        ...state,
        userLogged: {
          ...state.userLogged,
          account: {
            ...state.userLogged.account,
            password: action.payload.formData.newPassword,
          },
        },
      };
    }

    //Xử lý khi click vào course để xem nội dung của các lessons
    case "VIEWCONTENTCOURSE": {
      action.payload.navigate("/course-content");
      return { ...state, courseViewed: action.payload.course };
    }

    //Xử lý upload file
    case "UPLOADFILE": {
      const newListDataCourses = state.listDataCourses.map((courses) => {
        if (courses.id === action.payload.newDataCourse.id) {
          console.log(action.payload.newDataCourse);
          return action.payload.newDataCourse;
        } else {
          console.log("sai");
          return courses;
        }
      });
      return { ...state, listDataCourses: newListDataCourses };
    }

    //xử lý khi admin add course
    case "ADMINADDCOURSE": {
      const imgUrl = URL.createObjectURL(action.payload.formData.img);
      const newCourse = {
        ...action.payload.formData,
        img: imgUrl,
        id: crypto.randomUUID(),
        updateTime: new Date(),
        students: 156,
        lessons: [
          {
            pdf: "/learning_materials/file_PDF/1-toan-de-tham-khao-2024.pdf",
            name: "Bài học 1-Đề toán",
            id: "9614fca8-82c2-48ba-a42f-4eac1fdbab59_lesson1",
          },
          {
            pdf: "/learning_materials/file_PDF/10-tieng-nga-de-tham-khao-2024.pdf",
            name: "Bài học 2-Đề tiếng Nga",
            id: "9614fca8-82c2-48ba-a42f-4eac1fdbab59_lesson2",
          },
          {
            pdf: "/learning_materials/file_PDF/2-vat-li-de-tham-khao-2024.pdf",
            name: "Bài học 3-Đề Vật lý",
            id: "9614fca8-82c2-48ba-a42f-4eac1fdbab59_lesson3",
          },
          {
            pdf: "/learning_materials/file_PDF/5-ngu-van-de-tham-khao-2024.pdf",
            name: "Bài học 4-Đề Ngữ văn",
            id: "9614fca8-82c2-48ba-a42f-4eac1fdbab59_lesson4",
          },
        ],
      };

      console.log("dispatch");

      return {
        ...state,
        listDataCourses: [...state.listDataCourses, newCourse],
      };
    }

    //xử lý khi admin xóa course
    case "ADMINDELETECOURSE": {
      const newListDataCourses = state.listDataCourses.filter(
        (course) => course.id !== action.payload.id
      );
      return { ...state, listDataCourses: newListDataCourses };
    }

    //xử lý khi admin update information course
    case "ADMINUPDATECOURSE": {
      const formData = action.payload.formData;
      const courseUpdate = listDataCourses.find(
        (course) => course.id === action.payload.id
      );
      const newCourseUpdate = {
        ...courseUpdate,
        img: formData.img
          ? URL.createObjectURL(formData.img)
          : courseUpdate.img,
        name: formData.name ? formData.name : courseUpdate.name,
        price: formData.price ? formData.price : courseUpdate.price,
        sale: formData.sale ? formData.sale : courseUpdate.sale,
        instructor: formData.instructor
          ? formData.instructor
          : courseUpdate.instructor,
      };

      const newListDataCourse = state.listDataCourses.map((course) => {
        if (course.id === action.payload.id) {
          return newCourseUpdate;
        } else {
          return course;
        }
      });

      return { ...state, listDataCourses: newListDataCourse };
    }

    //Xử lý khi admin update nhiều courses cùng 1 lúc
    case "ADMINUPDATELISTCOURSE": {
      const newListDataCourses = state.listDataCourses.map((courseMap) => {
        const courseSelected = action.payload.listSelectedCourses.find(
          (courseFind) => courseFind.id === courseMap.id
        );
        if (courseSelected) {
          return {
            ...courseMap,
            price: action.payload.formData.price || courseMap.price,
            sale: action.payload.formData.sale || courseMap.sale,
          };
        } else {
          return courseMap;
        }
      });
      return { ...state, listDataCourses: newListDataCourses };
    }

    case "ADMINDELETEALLSELECTEDCOURSES": {
      const newListDataCourses = state.listDataCourses.filter(
        (course) =>
          !action.payload.listSelectedCourses.find(
            (courseSelected) => course.id == courseSelected.id
          )
      );

      return { ...state, listDataCourses: newListDataCourses };
    }
    default:
      return state;
  }
};
