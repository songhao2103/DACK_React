//Action xem thông tin của course
export const actionCourseViewed = {
  type: "COURSEVIEWED",
  payload: {},
};

//Action khi click để lọc course theo giá
export const actionSelectPrice = {
  type: "SELECTPRICE",
  payload: {},
};

//action khi click để lọc course theo instructors
export const actionSelectInstructors = {
  type: "SELECTINSTRUCTORS",
  payload: {},
};

// action đưa lưu tài khoản đang đăng nhập
export const actionUserLogged = {
  type: "USERLOGGED",
  payload: {},
};

//action xóa tài khoản đang đăng nhập
export const actionClearUserLogged = {
  type: "CLEARUSERLOGGED",
};

//action đăng ký khóa học
export const actionAddCourse = {
  type: "ADDCOURSE",
  payload: {},
};
