import PathDot from "components/svg/pathDot";
import { LOCATIONS } from "constants/index";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Modal,
  Popconfirm,
  Table,
  Switch,
  Space,
  DatePicker,
  notification,
} from "antd";
import dayjs from "dayjs";

import "./createFlashsale.scss";
import ClearIcon from "components/svg/clear";
import { useDispatch, useSelector } from "react-redux";
import {
  actionChangeDiscountOnFlashsaleDetails,
  actionChangeStockOnFlashsaleDetails,
  actionDeleteProdutFromFlashsaleDetails,
  actionGetFlashsaleDetails,
  actionResetFlashsaleDetailList,
} from "store/Products/CreateFlashsale/storeProductsArray/action";
import EditIcon from "components/svg/edit";
import FormSearchProductFlashsale from "components/products/formSearchProductFlashsale";
import { actionResetSearchProduct } from "store/Orders/searchProduct/action";
import { actionUpdateFlashsale } from "store/Products/CreateFlashsale/updateFlashsale/action";
import { actionUpdateTimeFlashsale } from "store/Products/CreateFlashsale/updateTimeFlashsale/action";
import {
  actionGetTimeFlashsale,
  actionUpdateTimeFlashsaleLocal,
} from "store/Products/CreateFlashsale/getTimeFlashsale/action";
import Loading from "components/svg/loading";

function CreateFlashsalePage() {
  const dispatch = useDispatch();  

  const [isInitialRender, setIsInitialRender] = useState(true);

  const [api, contextHolder] = notification.useNotification();

  const [productEdit, setProductEdit] = useState({});

  const [isOpenFlashsale, setIsOpenFlashsale] = useState(false);

  const [inputTimeFlashsale, setInputTimeFlashsale] = useState("");

  const [inputChangeStockFlashsale, setInputChangeStockFlashsale] = useState(0);

  const [inputChangeDiscountFlashsale, setInputChangeDiscountFlashsale] =
    useState(0);

  const [isOpenModalEditStockFlashsale, setIsOpenModalEditStockFlashsale] =
    useState(false);

  const [isOpenModalEditTimeFlashsale, setIsOpenModalEditTimeFlashsale] =
    useState(false);

  const [
    isOpenModalEditDiscountFlashsale,
    setIsOpenModalEditDiscountFlashsale,
  ] = useState(false);

  const [searchProductFrom] = Form.useForm();

  const [isOpenModalSearchProduct, setIsOpenModalSearchProduct] =
    useState(false);

  const flashsaleList = useSelector(
    (state) => state.storeProductsFlashsaleReducer.payload
  );

  const flashsaleInfo = useSelector(
    (state) => state.getTimeFlashsaleReducer.payload
  );

  const isLoadingFlashsaleList = useSelector(
    (state) => state.storeProductsFlashsaleReducer.isLoading
  );

  const openNotificationWithIcon = useCallback(
    (type, message) => {
      switch (type) {
        case "error":
          api[type]({
            message: "ERROR",
            description: message,
          });
          break;

        case "success":
          api[type]({
            message: "SUCCESS",
            description: message,
          });
          break;

        case "warning":
          api[type]({
            message: "WARNING",
            description: message,
          });
          break;

        default:
          break;
      }
    },
    [api]
  );

  const handleClickDeletedProduct = useCallback(
    (id) => {
      dispatch(actionDeleteProdutFromFlashsaleDetails(id));
    },
    [dispatch]
  );

  const handleClickChangeStockFlashsale = useCallback((product) => {
    setIsOpenModalEditStockFlashsale(true);

    setProductEdit(product);

    setInputChangeStockFlashsale(product.flashsaleStock);
  }, []);

  const handleClickChangeDiscountFlashsale = useCallback((product) => {
    setIsOpenModalEditDiscountFlashsale(true);

    setProductEdit(product);

    setInputChangeDiscountFlashsale(product.discount);
  }, []);

  const handleSubmitChangeFlashsaleStock = useCallback(() => {
    const data = {
      ...productEdit,
      flashsaleStock: parseInt(inputChangeStockFlashsale),
    };

    dispatch(actionChangeStockOnFlashsaleDetails(data));

    setIsOpenModalEditStockFlashsale(false);
  }, [dispatch, inputChangeStockFlashsale, productEdit]);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);

      return;
    }

    const newFlashsaleList = flashsaleList.map((item) => {
      return {
        productId: item.productId,
        flashsaleStock: item.flashsaleStock,
        discount: item.discount,
      };
    });

    dispatch(actionUpdateFlashsale(newFlashsaleList));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, flashsaleList]);

  const onChangeOpenFlashsale = useCallback((checked) => {
    setIsOpenFlashsale(checked);
  }, []);

  const handleSubmitChangeDiscountFlashsale = useCallback(() => {
    const data = {
      ...productEdit,
      discount: parseInt(inputChangeDiscountFlashsale),
    };

    dispatch(actionChangeDiscountOnFlashsaleDetails(data));

    setIsOpenModalEditDiscountFlashsale(false);
  }, [dispatch, inputChangeDiscountFlashsale, productEdit]);

  useEffect(() => {
    dispatch(actionGetFlashsaleDetails());

    dispatch(actionGetTimeFlashsale());
  }, [dispatch]);

  const onChangeDateFlashsale = useCallback((date, dateString) => {
    setInputTimeFlashsale(dateString);
  }, []);

  const handleSubmitEditTimeFlashsale = useCallback(() => {
    const data = {
      expirationTime: inputTimeFlashsale,
      isOpenFlashsale: isOpenFlashsale,
    };

    dispatch(actionUpdateTimeFlashsale(data));
    dispatch(actionUpdateTimeFlashsaleLocal(data));

    setIsOpenModalEditTimeFlashsale(false);
  }, [dispatch, inputTimeFlashsale, isOpenFlashsale]);

  const clickDeleteAllFlashsale = useCallback(() => {
    if (flashsaleList.length <= 0) {
      openNotificationWithIcon("warning", "There's nothing to delete");

      return;
    }

    dispatch(actionResetFlashsaleDetailList());

    // dispatch(actionDeleteAllFlashsale());
  }, [dispatch, flashsaleList.length, openNotificationWithIcon]);

  const columns = [
    {
      // width: "10%",
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        return (
          <Link to={`/product_detail/${record.productId}`}>
            <div className="cover_product_name_flashsale">
              <img
                className="product_img_flashsale"
                src={record.image}
                alt="..."
              />

              <span className="product_name_flashsale">{text}</span>
            </div>
          </Link>
        );
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (text, record, index) => {
        return <span className="stock">{text}</span>;
      },
    },
    {
      title: "Flashsale Stock",
      dataIndex: "flashsaleStock",
      key: "flashsaleStock",
      render: (text, record, index) => {
        if (record.flashsaleStock > record.stock || record.flashsaleStock < 0) {
          return (
            <div className="cover_stock_flashsale_error">
              <span className="product_stock_flashsale_error">{text}</span>

              <button
                onClick={() => handleClickChangeStockFlashsale(record)}
                className="btn_stock_flashsale_edit"
              >
                <EditIcon />
              </button>
            </div>
          );
        }

        return (
          <div className="cover_stock_flashsale">
            <span className="product_stock_flashsale">{text}</span>

            <button
              onClick={() => handleClickChangeStockFlashsale(record)}
              className="btn_stock_flashsale_edit"
            >
              <EditIcon />
            </button>
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record, index) => {
        return (
          // <span className={styles.price}>${numeral(text).format("0,0")}</span>
          <span className="price_flashsale">${text.toFixed(2)}</span>
        );
      },
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      // render: (text, record, index) => {
      //   return <span className="discount_flashsale">{text}%</span>;
      // },
      render: (text, record, index) => {
        if (record.discount > 100 || record.discount < 0) {
          return (
            <div className="cover_stock_flashsale_error">
              <span className="product_stock_flashsale_error">{text}%</span>

              <button
                onClick={() => handleClickChangeDiscountFlashsale(record)}
                className="btn_stock_flashsale_edit"
              >
                <EditIcon />
              </button>
            </div>
          );
        }

        return (
          <div className="cover_stock_flashsale">
            <span className="product_stock_flashsale">{text}%</span>

            <button
              onClick={() => handleClickChangeDiscountFlashsale(record)}
              className="btn_stock_flashsale_edit"
            >
              <EditIcon />
            </button>
          </div>
        );
      },
    },
    {
      title: "Discounted Price",
      // dataIndex: "discountedPrice",
      key: "discountedPrice",
      render: (text, record, index) => {
        return (
          <span className="discounted_price_flashsale">
            ${((record.price * (100 - record.discount)) / 100).toFixed(2)}
          </span>
        );
      },
    },
    {
      title: " ",
      key: "actions",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Popconfirm
            title="Are you sure you want to delete it?"
            okText="OK"
            cancelText="Cancel"
            okButtonProps={{ style: { background: "rgb(0, 167, 111)" } }}
            onConfirm={() => handleClickDeletedProduct(record.productId)}
          >
            <Button danger icon={<ClearIcon />}></Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <>
      {contextHolder}

      {isLoadingFlashsaleList && (
        <div className="cover_loading">
          <Loading />
        </div>
      )}

      <div className="container-fluid">
        <div className="row custom_row">
          <div className="col-12 custom_col order_list_title">
            Create Flash Sale
          </div>

          <div className="col-12 custom_col order_list_path">
            <span className="order_list_path_dashboard">
              <Link rel="noopener noreferrer" to={LOCATIONS.DASHBOARD}>
                Dashboard
              </Link>
            </span>

            <span className="order_list_path_dot">
              <PathDot />
            </span>

            <span className="order_list_path_order">Create Flash Sale</span>
          </div>
        </div>

        <div className="row custom_row">
          <div className="col-12 custom_col cover_create_flashsale_content">
            <button
              onClick={() => {
                setIsOpenModalSearchProduct(true);
                searchProductFrom.resetFields();
                // setIsErrorProduct(false);
                // setIsErrorCustomer(false);
                dispatch(actionResetSearchProduct());
              }}
              className="btn_detail_edit_flashsale"
            >
              <EditIcon />
            </button>

            <h4 className="title_products_flashsale">Products Flashsale</h4>

            <div className="cover_table_flashsale">
              <Table
                rowKey="productId"
                columns={columns}
                dataSource={flashsaleList}
                pagination={false}
              />
              <Space className="btn_group">
                {/* <Button
                  onClick={updateFlashsale}
                  className="btn_update"
                  type="primary"
                  htmlType="submit"
                >
                  <span className="update">Update</span>
                </Button> */}

                <Popconfirm
                  title="Are you sure you want to delete all products on flash sale?"
                  okText="OK"
                  cancelText="Cancel"
                  okButtonProps={{ style: { background: "rgb(0, 167, 111)" } }}
                  onConfirm={() => clickDeleteAllFlashsale()}
                >
                  <Button
                    className="btn_delete_all"
                    type="primary"
                    htmlType="submit"
                  >
                    <span className="delete_all">Delete All</span>
                  </Button>
                </Popconfirm>
              </Space>

              <Modal
                open={isOpenModalSearchProduct}
                centered
                title="Search Product"
                onCancel={() => {
                  setIsOpenModalSearchProduct(false);
                }}
                cancelText="Close"
                okButtonProps={{ style: { display: "none" } }}
              >
                <FormSearchProductFlashsale
                  searchProductFrom={searchProductFrom}
                />
              </Modal>

              <Modal
                open={isOpenModalEditStockFlashsale}
                centered
                title={productEdit.name}
                onCancel={() => {
                  setIsOpenModalEditStockFlashsale(false);
                }}
                cancelText="Close"
                okText="Save"
                onOk={handleSubmitChangeFlashsaleStock}
                okButtonProps={{ style: { background: "rgb(0, 167, 111)" } }}
              >
                <input
                  className="input_change_stock"
                  value={inputChangeStockFlashsale}
                  type="number"
                  onChange={(e) => setInputChangeStockFlashsale(e.target.value)}
                />
              </Modal>

              <Modal
                open={isOpenModalEditDiscountFlashsale}
                centered
                title={productEdit.name}
                onCancel={() => {
                  setIsOpenModalEditDiscountFlashsale(false);
                }}
                cancelText="Close"
                okText="Save"
                onOk={handleSubmitChangeDiscountFlashsale}
                okButtonProps={{ style: { background: "rgb(0, 167, 111)" } }}
              >
                <input
                  className="input_change_stock"
                  value={inputChangeDiscountFlashsale}
                  type="number"
                  onChange={(e) =>
                    setInputChangeDiscountFlashsale(e.target.value)
                  }
                />
              </Modal>
            </div>
          </div>
        </div>

        <div className="row custom_row cover_setting">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 cover_create_flashsale_info">
            <Modal
              open={isOpenModalEditTimeFlashsale}
              centered
              title="Edit time flash sale"
              onCancel={() => {
                setIsOpenModalEditTimeFlashsale(false);
              }}
              cancelText="Close"
              okText="Save"
              onOk={handleSubmitEditTimeFlashsale}
              okButtonProps={{ style: { background: "rgb(0, 167, 111)" } }}
            >
              <span className="end_date">
                <span>Flash sale end date:</span>

                <DatePicker
                  defaultValue={dayjs(inputTimeFlashsale)}
                  onChange={onChangeDateFlashsale}
                  format="YYYY-MM-DD"
                />
              </span>

              <div className="cover_open_flash_sale">
                <span className="open_flash_sale">Is open flash sale:</span>{" "}
                <Switch
                  defaultChecked={flashsaleInfo?.isOpenFlashsale || false}
                  // checked={flashsaleInfo?.isOpenFlashsale || false}
                  onChange={onChangeOpenFlashsale}
                  style={{
                    backgroundColor: isOpenFlashsale && "rgb(0, 167, 111)",
                  }}
                />
              </div>
            </Modal>

            <button
              onClick={() => {
                setIsOpenModalEditTimeFlashsale(true);
                setInputTimeFlashsale(
                  flashsaleInfo?.expirationTime || dayjs().format("YYYY-MM-DD")
                );
                setIsOpenFlashsale(
                  flashsaleInfo?.isOpenFlashsale || isOpenFlashsale
                );
                // setIsErrorProduct(false);
                // setIsErrorCustomer(false);
              }}
              className="btn_detail_edit_flashsale_info"
            >
              <EditIcon />
            </button>

            <h4 className="title_flashsale_info">Flashsale Info</h4>

            <span className="end_date">
              Flash sale end date:{" "}
              <span className="date">
                {flashsaleInfo.expirationTime
                  ? flashsaleInfo?.expirationTime?.slice(0, 10) + " 23:59:59"
                  : "not set"}
              </span>
            </span>

            <div className="cover_open_flash_sale">
              <span className="open_flash_sale">Is open flash sale:</span>{" "}
              <Switch
                checked={flashsaleInfo?.isOpenFlashsale || false}
                disabled
                style={{
                  backgroundColor:
                    flashsaleInfo?.isOpenFlashsale && "rgb(0, 167, 111)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateFlashsalePage;
