/* eslint-disable react-hooks/exhaustive-deps */
import ContentToggle from "components/user/ContentToggle.jsx";
import UploadImage from "components/user/UploadImage.jsx";
import { LOCATIONS } from "constants/index";
import { format } from "date-fns";
import _capitalize from "lodash/capitalize";
import _omit from "lodash/omit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  actionAddUser,
  actionDeleteUser,
  actionInfoUser,
  actionUpdateUser,
} from "store/User/action";
import "./user.scss";

const initialUser = {
  firstName: "",
  email: "",
  phoneNumber: "",
  lastName: "",
  password: "",
  address: "",
  birthday: "",
  isDeleted: false,
  statusEmailVerify: false,
  avatar: "",
};

function Account() {
  const {
    actionStatus: { isLoading, isSuccess },
    deleteStatus,
    detail,
  } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const onAddUser = (params) => dispatch(actionAddUser(params));
  const onUpdateUser = (params) => dispatch(actionUpdateUser(params));
  const onGetInfoUser = (params) => dispatch(actionInfoUser(params));
  const onDeleteUser = (params) => dispatch(actionDeleteUser(params));

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [editable, setEdit] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState("");

  useEffect(() => {
    if (pathname === LOCATIONS.ADD_USER) {
      setUser(initialUser);
      setEdit(false);
    }
    if (id) {
      if (!isLoading) onGetInfoUser(id);
      setEdit(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname === LOCATIONS.ADD_USER && isSuccess) {
      setUser(initialUser);
      setEdit(false);
    }
    if (id && isSuccess) {
      setUser({
        ...detail,
        birthday: format(new Date(detail.birthday), "yyyy-MM-dd"),
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (deleteStatus.isSuccess) {
      navigate(LOCATIONS.ADD_USER);
    }
  }, [deleteStatus.isSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    const tmpKey = Object.keys(user).filter(
      (item) => !["avatar", "isDeleted", "statusEmailVerify"].includes(item)
    );
    let validates = true;
    tmpKey.forEach((key) => {
      if (user[key] === "") {
        setError((prev) => ({
          ...prev,
          [key]: `${_capitalize(key)} không được để trống`,
        }));
        validates = false;
      } else if (key === "email" && !isEmailValid(user.email)) {
        setError((prevError) => ({
          ...prevError,
          email: "Định dạng email không hợp lệ",
        }));
        validates = false;
      }
    });

    if (validates) {
      const newData = _omit(user, ["avatar", "statusEmailVerify"]);
      if (!editable) onAddUser(newData);
      else onUpdateUser(newData);
    }
  };

  return id && isLoading ? (
    <div className="h-50 d-flex justify-content-center align-items-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="container view-page">
      <div className="row gy-4">
        <div className="col-12">
          <div className="shadow-sm rounded-4 p-3 d-flex justify-content-between align-items-center">
            <h4 className="title">
              <strong>
                {pathname === LOCATIONS.ADD_USER
                  ? "Thêm mới người dùng"
                  : "Cập nhật người dùng"}
              </strong>
            </h4>
            <Link to={LOCATIONS.USER} className="btn btn-secondary">
              Quay lại
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="shadow-sm rounded-4 p-3">
            <div className="text-center">
              <UploadImage
                image={user.avatar}
                callback={(url) =>
                  handleChange({ target: { name: "avatar", value: url } })
                }
              />
            </div>
            <div className="w-75 mx-auto text-black-50 text-center">
              <small>
                Allowde *.jpeg, *jpg, *png, *.gif max size of 3.1 MB
              </small>
            </div>

            {editable && (
              <ContentToggle
                title="Banned"
                content="Apply disable account"
                statusCheck={user.isDeleted}
                handleChange={(value) =>
                  setUser((prev) => ({ ...prev, isDeleted: value }))
                }
              />
            )}

            {/* <ContentToggle
             title="Email Verified"
             content="Disabling this will automatically send the user a
             verification email"
             statusCheck={user.statusEmailVerify}
           /> */}
            {editable && (
              <div className="text-center my-4">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteUser(id)}
                >
                  Delete User
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="col-12 col-md-8">
          <div className="px-3 pt-3 shadow-sm rounded-4">
            <div className="row g-3 mb-0 ">
              <div className="col-12 col-sm-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="Tên"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                  <label htmlFor="firstName">Tên</label>
                </div>
                {error.firstName && (
                  <small className="d-block text-danger -mt-3">
                    {error.firstName}
                  </small>
                )}
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Họ"
                    value={user.lastName}
                    onChange={handleChange}
                  />
                  <label htmlFor="lastName">Họ</label>
                </div>
                {error.lastName && (
                  <small className="d-block text-danger -mt-3">
                    {error.lastName}
                  </small>
                )}
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={user.phoneNumber}
                    onChange={handleChange}
                  />
                  <label htmlFor="phoneNumber">Số điện thoại</label>
                </div>
                {error.phoneNumber && (
                  <small className="d-block text-danger -mt-3">
                    {error.phoneNumber}
                  </small>
                )}
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    placeholder="Địa chỉ"
                    value={user.address}
                    onChange={handleChange}
                  />
                  <label htmlFor="address">Địa chỉ</label>
                </div>
                {error.address && (
                  <small className="d-block text-danger -mt-3">
                    {error.address}
                  </small>
                )}
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    value={user.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="email">Email</label>
                </div>
                {error.email && (
                  <small className="d-block text-danger -mt-3">
                    {error.email}
                  </small>
                )}
              </div>

              <div className="col-12 col-sm-6">
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="City"
                    value={user.password}
                    onChange={handleChange}
                  />
                  <label htmlFor="password">Mật khẩu</label>
                </div>
                {error.password && (
                  <small className="d-block text-danger -mt-3">
                    {error.password}
                  </small>
                )}
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-floating">
                  <input
                    type="date"
                    className="form-control"
                    id="birthday"
                    name="birthday"
                    placeholder="Ngày sinh"
                    value={user.birthday}
                    onChange={handleChange}
                  />
                  <label htmlFor="birthday">Ngày sinh</label>
                </div>
                {error.birthday && (
                  <small className="d-block text-danger -mt-3">
                    {error.birthday}
                  </small>
                )}
              </div>
              <div className="text-end my-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading && (
                    <div
                      className="spinner-border"
                      role="status"
                      style={{ width: 16, height: 16 }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                  {editable ? "Cập nhật" : "Lưu"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Account.propTypes = {};
export default Account;
