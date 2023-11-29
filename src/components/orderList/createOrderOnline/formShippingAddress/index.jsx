import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { actionGetReceiveProvince } from "store/Orders/getReceiveProvince/action";
import { actionGetReceiveDistrict } from "store/Orders/getReceiveDistrict/action";
import { actionGetReceiveWard } from "store/Orders/getReceiveWard/action";
import { districtCodeSend } from "constants/index";
import { actionGetShippingFee } from "store/Orders/getShippingFee/action";
import { actionAddAddress } from "store/Orders/storeAddress/action";
import styles from "./shipping.module.scss";
import Loading from "components/svg/loading";

function FormAddShippingAddress(props) {
  const { addShippingAddressFrom } = props;

  const dispatch = useDispatch();

  const getReceiveProvince = useSelector(
    (state) => state.getReceiveProvinceReducer.payload.data
  );

  const getReceiveDistrict = useSelector(
    (state) => state.getReceiveDistrictReducer.payload.data
  );

  const getReceiveWard = useSelector(
    (state) => state.getReceiveWardReducer.payload.data
  );

  const getShippingFee = useSelector(
    (state) => state.getShippingFeeReducer.payload.data
  );

  const isLoading = useSelector(
    (state) => state.getShippingFeeReducer.isLoading
  );

  const [provinceList, setProvinceList] = useState([]);

  const [provinceId, setProvinceId] = useState(null);

  const [provinceName, setProvinceName] = useState(null);

  const [districtList, setDistrictList] = useState([]);

  const [districtId, setDistrictId] = useState(null);

  const [districtName, setDistrictName] = useState(null);

  const [wardList, setWardList] = useState([]);

  const [wardId, setWardId] = useState(null);

  const [wardName, setWardName] = useState(null);

  const [address, setAddress] = useState(null);

  const [length, setLength] = useState(null);

  const [width, setWidth] = useState(null);

  const [height, setHeight] = useState(null);

  useEffect(() => {
    dispatch(actionGetReceiveProvince());
  }, [dispatch]);

  useEffect(() => {
    if (getReceiveProvince?.length > 0) {
      const newProvinceList = getReceiveProvince?.map((item) => {
        return {
          value: item.ProvinceID,
          label: item.ProvinceName,
        };
      });

      setProvinceList(newProvinceList);
    }
  }, [getReceiveProvince]);

  useEffect(() => {
    if (provinceId) {
      dispatch(actionGetReceiveDistrict(provinceId));
    }
  }, [dispatch, provinceId]);

  useEffect(() => {
    if (getReceiveDistrict?.length > 0) {
      const newDistrictList = getReceiveDistrict?.map((item) => {
        return {
          value: item.DistrictID,
          label: item.DistrictName,
        };
      });

      setDistrictList(newDistrictList);
    }
  }, [getReceiveDistrict]);

  useEffect(() => {
    if (districtId) {
      dispatch(actionGetReceiveWard(districtId));
    }
  }, [dispatch, districtId]);

  useEffect(() => {
    if (getReceiveWard?.length > 0) {
      const newWardList = getReceiveWard?.map((item) => {
        return {
          value: item.WardCode,
          label: item.WardName,
        };
      });

      setWardList(newWardList);
    }
  }, [getReceiveWard]);

  const validateLength = (_rule, value) => {
    return new Promise((resolve, reject) => {
      if (value && (!Number.isInteger(Number(value)) || value <= 0)) {
        reject("Length must be a positive integer");
      } else {
        resolve();
      }
    });
  };

  const validateWidth = (_rule, value) => {
    return new Promise((resolve, reject) => {
      if (value && (!Number.isInteger(Number(value)) || value <= 0)) {
        reject("Width must be a positive integer");
      } else {
        resolve();
      }
    });
  };

  const validateHeight = (_rule, value) => {
    return new Promise((resolve, reject) => {
      if (value && (!Number.isInteger(Number(value)) || value <= 0)) {
        reject("Height must be a positive integer");
      } else {
        resolve();
      }
    });
  };

  const onFinish = useCallback(async () => {
    try {
      const data = {
        insurance_value: 1000000,
        coupon: null,
        from_district_id: parseInt(districtCodeSend),
        to_district_id: parseInt(districtId),
        length: parseInt(length),
        width: parseInt(width),
        height: parseInt(height),
        weight: parseInt(
          (parseInt(length) * parseInt(width) * parseInt(height)) / 6000
        ),
      };

      dispatch(actionGetShippingFee(data));
    } catch (error) {
      console.log("««««« error »»»»»", error);
    }
  }, [dispatch, districtId, height, length, width]);

  useEffect(() => {
    if (getShippingFee) {
      const data = {
        address: `${address}, ${wardName}, ${districtName}, ${provinceName}`,
        shippingFee: getShippingFee?.total,
      };

      dispatch(actionAddAddress(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, getShippingFee]);

  return (
    <>
      {isLoading && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}

      <Form
        form={addShippingAddressFrom}
        className=""
        name="Add Shipping Address"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Province"
          name="province"
          rules={[{ required: true, message: "Please select Province" }]}
        >
          <Select
            onChange={(value, label) => {
              setProvinceId(value);
              setProvinceName(label.label);
              setDistrictId(null);
              setDistrictName(null);
              setWardId(null);
              setWardName(null);
              setWardList([]);
              addShippingAddressFrom.setFieldsValue({
                district: undefined,
                ward: undefined,
              });
            }}
            showSearch
            style={{
              width: "100%",
            }}
            placeholder="Select Province"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={provinceList}
          />
        </Form.Item>

        <Form.Item
          label="District"
          name="district"
          rules={[{ required: true, message: "Please select District" }]}
        >
          <Select
            onChange={(value, label) => {
              setDistrictId(value);
              setDistrictName(label.label);
              setWardId(null);
              setWardName(null);
              addShippingAddressFrom.setFieldsValue({
                ward: undefined,
              });
            }}
            showSearch
            style={{
              width: "100%",
            }}
            // value={districtId}
            placeholder="Select District"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={districtList}
          />
        </Form.Item>

        <Form.Item
          label="Ward"
          name="ward"
          rules={[{ required: true, message: "Please select Ward" }]}
        >
          <Select
            onChange={(value, label) => {
              setWardId(value);
              setWardName(label.label);
            }}
            showSearch
            style={{
              width: "100%",
            }}
            // value={wardId}
            placeholder="Select Ward"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={wardList}
          />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[
            { required: true, message: "Please type Address" },
            { max: 500, message: "Max 500 characters" },
          ]}
        >
          <Input
            onChange={(e) => setAddress(e.target.value)}
            placeholder="house number, apartment, street name..."
          />
        </Form.Item>

        <Form.Item
          label="Length(cm)"
          name="length"
          rules={[
            { required: true, message: "Please type Length" },
            { validator: validateLength },
          ]}
        >
          <Input
            onChange={(e) => setLength(e.target.value)}
            placeholder="Length(cm)"
          />
        </Form.Item>

        <Form.Item
          label="Width(cm)"
          name="width"
          rules={[
            { required: true, message: "Please type Width" },
            { validator: validateWidth },
          ]}
        >
          <Input
            onChange={(e) => setWidth(e.target.value)}
            placeholder="Width(cm)"
          />
        </Form.Item>

        <Form.Item
          label="Height(cm)"
          name="height"
          rules={[
            { required: true, message: "Please type Height" },
            { validator: validateHeight },
          ]}
        >
          <Input
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Height(cm)"
          />
        </Form.Item>

        <Form.Item
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Button className="" type="primary" htmlType="submit">
            Confirm
          </Button> */}

          <Button
            className={styles.btn_add_shipping}
            type="primary"
            htmlType="submit"
          >
            <span className={styles.add_shipping}>Confirm</span>
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default FormAddShippingAddress;
