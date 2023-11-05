import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

import styles from "./createOrderOnline.module.scss";
import PathDot from "components/svg/pathDot";
import { LOCATIONS } from "constants/index";
import SearchIcon from "components/svg/search";
import { useDispatch, useSelector } from "react-redux";
import { actionsearchCustomer } from "store/Orders/searchCustomer/action";

function CreateOrderOnline() {
  const dispatch = useDispatch();

  const inputSearchCustomerRef = useRef(null);

  const [searchCondition, setSearchCondition] = useState("");

  const resSearchCustomer = useSelector((state) => state.searchCustomerOrderReducer);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeSearch = useCallback(
    debounce((e) => {
      setSearchCondition(e.target.value);
    }, 1000),
    []
  );

  useEffect(() => {
    dispatch(actionsearchCustomer({phoneNumber: searchCondition}));
  }, [dispatch, searchCondition]);

  useEffect(() => {
    console.log("««««« resSearchCustomer »»»»»", resSearchCustomer);
  }, [resSearchCustomer]);

  return (
    <div className="container">
      <div className={`row ${styles.custom_row}`}>
        <div className={`col-12 ${styles.custom_col}`}>
          <h4 className={styles.title_create_order_online}>Tạo đơn online</h4>
        </div>

        <div className="col-12 custom_col order_list_path">
          <span className="order_list_path_dashboard">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to={LOCATIONS.DASHBOARD}
            >
              Dashboard
            </Link>
          </span>

          <span className="order_list_path_dot">
            <PathDot />
          </span>

          <span className="order_list_path_order">Tạo đơn online</span>
        </div>

        <div className={`row ${styles.custom_row}`}>
          <div className={`col-12 ${styles.custom_col} ${styles.cover}`}>
            <form className={`cover_input`}>
              <div className={`row ${styles.custom_row}`}>
                <div className="col-12">
                  <h5 className={styles.customer}>Khách hàng</h5>
                </div>

                <div className="col-12 custom_col cover_input cover_input_search">
                  <div className="search_icon">
                    <SearchIcon />
                  </div>

                  <input
                    ref={inputSearchCustomerRef}
                    type="text"
                    className="form-control orders_input_search"
                    id="search_customer"
                    name="search_customer"
                    placeholder="Tìm số điện thoại..."
                    onChange={handleChangeSearch}
                  />
                </div>

                <div
                  className={`col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 form-floating ${styles.custom_col}`}
                >
                  <input
                    className={`form-control input_group`}
                    type="text"
                    placeholder="Họ"
                    id="firstName"
                    name="firstName"
                  />

                  <label className="label_input_group" htmlFor="firstName">
                    Họ
                  </label>
                </div>

                <div
                  className={`col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 form-floating ${styles.custom_col}`}
                >
                  <input
                    className={`form-control input_group`}
                    type="text"
                    placeholder="Tên"
                    id="lastName"
                    name="lastName"
                  />

                  <label className="label_input_group" htmlFor="lastName">
                    Tên
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateOrderOnline;
