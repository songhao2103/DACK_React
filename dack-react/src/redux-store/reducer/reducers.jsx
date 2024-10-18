//khởi tạo state
const initialState = {
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
        console.log(newUserLogged);

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
        if (state.userLogged.email === user.account.email) {
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

      return { ...state, courses: [...state.courses, state.courseViewed] };
    }
    default:
      return state;
  }
};
