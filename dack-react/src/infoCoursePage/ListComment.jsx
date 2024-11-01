import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

const ListComment = () => {
  const listCommentCourses = useSelector((state) => state.listCommentCourses); //Lấy xuống list comment
  const courseViewed = useSelector((state) => state.courseViewed); //Lấy xuống course đang được xem
  const userLogged = useSelector((state) => state.userLogged);
  //lấy ra danh sách comment của course
  const listComments = listCommentCourses.find(
    (comment) => comment.id === courseViewed.id
  ).listComments;
  const textareaElement = useRef(null); //lấy ra phần tử textarea
  const [commentValue, setCommentValue] = useState(""); //Lưu giá trị của ô comment

  //hàm xử lý thay đổi của ô comment
  const handleChangeCommentValue = (e) => {
    setCommentValue(e.target.value);
  };

  //tính toán chiều cao cho ô comment
  useEffect(() => {
    if (textareaElement.current) {
      textareaElement.current.style.height = "auto";
      textareaElement.current.style.height = `${textareaElement.current.scrollHeight}px`;
    }
  }, [commentValue]);

  return (
    <div className="list_comments">
      <div className="write_comment">
        <p className="title_h5">{userLogged.account.name}</p>
        <textarea
          ref={textareaElement}
          type="text"
          placeholder="Enter your comment..."
          onChange={handleChangeCommentValue}
          value={commentValue}
          rows={1}
        />

        <div className="bottom">
          <button className={`btn_confirm ${commentValue ? "active" : ""}`}>
            Comment
          </button>
        </div>
      </div>

      {listComments &&
        listComments.map((comment) => (
          <div className="comment" key={comment.id}>
            <div className="top">
              <div className="title_h5">{comment.name}</div>
              <p className="date desc">{comment.date}</p>
            </div>
            <p className="content">{comment.comment}</p>
            <div className="bottom">
              <div className="icon">
                <i className="fa-solid fa-share"></i>
              </div>
              <p className="desc">Reply</p>
            </div>
          </div>
        ))}

      <div className="comment">
        <div className="top">
          <div className="title_h5">Laura Hipster</div>
          <p className="date desc">October 03, 2022</p>
        </div>
        <p className="content">
          Quisque nec non amet quis. Varius tellus justo odio parturient mauris
          curabitur lorem in. Pulvinar sit ultrices mi ut eleifend luctus ut. Id
          sed faucibus bibendum augue id cras purus. At eget euismod cursus non.
          Molestie dignissim sed volutpat feugiat vel.
        </p>
        <div className="bottom">
          <div className="icon">
            <i className="fa-solid fa-share"></i>
          </div>
          <p className="desc">Reply</p>
        </div>
      </div>

      <div className="comment">
        <div className="top">
          <div className="title_h5">Laura Hipster</div>
          <p className="date desc">October 03, 2022</p>
        </div>
        <p className="content">
          Quisque nec non amet quis. Varius tellus justo odio parturient mauris
          curabitur lorem in. Pulvinar sit ultrices mi ut eleifend luctus ut. Id
          sed faucibus bibendum augue id cras purus. At eget euismod cursus non.
          Molestie dignissim sed volutpat feugiat vel.
        </p>
        <div className="bottom">
          <div className="icon">
            <i className="fa-solid fa-share"></i>
          </div>
          <p className="desc">Reply</p>
        </div>
      </div>

      <div className="comment">
        <div className="top">
          <div className="title_h5">Laura Hipster</div>
          <p className="date desc">October 03, 2022</p>
        </div>
        <p className="content">
          Quisque nec non amet quis. Varius tellus justo odio parturient mauris
          curabitur lorem in. Pulvinar sit ultrices mi ut eleifend luctus ut. Id
          sed faucibus bibendum augue id cras purus. At eget euismod cursus non.
          Molestie dignissim sed volutpat feugiat vel.
        </p>
        <div className="bottom">
          <div className="icon">
            <i className="fa-solid fa-share"></i>
          </div>
          <p className="desc">Reply</p>
        </div>
      </div>
    </div>
  );
};

export default ListComment;
