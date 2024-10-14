const NavBar = () => {
  return (
    <div className="nav_bar">
      <ul className="type">
        <div className="title_h4">Course category</div>
        <div className="option">
          <input type="checkbox" />
          <p className="desc">Commercial 15</p>
        </div>
        <div className="option">
          <input type="checkbox" />
          <p className="desc">Office 15</p>
        </div>
        <div className="option">
          <input type="checkbox" />
          <p className="desc">Shop 15</p>
        </div>
        <div className="option">
          <input type="checkbox" />
          <p className="desc">Educate</p>
        </div>
        <div className="option">
          <input type="checkbox" />
          <p className="desc">Academy 15</p>
        </div>
        <div className="option">
          <input type="checkbox" />
          <p className="desc">Single family home 15</p>
        </div>
        <div className="option">
          <input type="checkbox" />
          <p className="desc">Studio 15</p>
        </div>
        <div className="option">
          <input type="checkbox" />
          <p className="desc">University 15</p>
        </div>
      </ul>

      <ul className="type">
        <div className="title_h4">Instructors</div>
        <div className="option">
          <input type="checkbox" />
          <p className="desc">Kenny White 15</p>
        </div>
        <div className="option">
          <input type="checkbox" />
          <p className="desc">John Doe</p>
        </div>
      </ul>

      <ul className="type">
        <ul className="type">
          <div className="title_h4">Price</div>
          <div className="option">
            <input type="checkbox" />
            <p className="desc">All</p>
          </div>
          <div className="option">
            <input type="checkbox" />
            <p className="desc">Free</p>
          </div>
          <div className="option">
            <input type="checkbox" />
            <p className="desc">Paid</p>
          </div>
        </ul>
      </ul>

      <ul className="type">
        <ul className="type">
          <div className="title_h4">Price</div>
          <div className="option">
            <input type="checkbox" />
            <div className="list_star">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
          </div>
          <div className="option">
            <input type="checkbox" />
            <div className="list_star">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </div>
          </div>
          <div className="option">
            <input type="checkbox" />
            <div className="list_star">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </div>
          </div>
          <div className="option">
            <input type="checkbox" />
            <div className="list_star">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </div>
          </div>
          <div className="option">
            <input type="checkbox" />
            <div className="list_star">
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </div>
          </div>
        </ul>
      </ul>
      <ul className="type">
        <ul className="type">
          <div className="title_h4">Level</div>
          <div className="option">
            <input type="checkbox" />
            <p className="desc">All levels 15</p>
          </div>
          <div className="option">
            <input type="checkbox" />
            <p className="desc">Beginner</p>
          </div>
          <div className="option">
            <input type="checkbox" />
            <p className="desc">Expert</p>
          </div>
          <div className="option">
            <input type="checkbox" />
            <p className="desc">Intermidiate</p>
          </div>
        </ul>
      </ul>
    </div>
  );
};

export default NavBar;
