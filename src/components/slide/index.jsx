import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { LOCATIONS } from "constants/index";
// import style
import "./slide.css";
function Slide(props) {
  const [list, setList] = useState([
    {
      label: "Dashboard",
      active: false,
      src: LOCATIONS.DASHBOARD,
      icon:require('assets/icon-slide/dashboard-svgrepo-com.png')
    },
    {
      label: "Đơn Hàng",
      active: false,
      icon:require('assets/icon-slide/choices-order-svgrepo-com.png'),
      sub: [
        { label: "Đanh sánh đơn hàng", src: LOCATIONS.ORDER },
        {
          label: "Chi tiết đơn hàng",
          src: LOCATIONS.ORDER_DETAIL,
        },
        {
          label: "Tạo đơn hàng offline",
          src: LOCATIONS.CREATE_ORDER_OFF,
        },
        {
          label: "Tạo đơn hàng trực tuyến",
          src: LOCATIONS.CREATE_ORDER_ON,
        },
      ],
    },
    {
      label: "Sản Phẩm",
      active: false,
      icon:require('assets/icon-slide/phone-svgrepo-com.png'),
      sub: [
        { label: "Đanh sánh sản phẩm", src: LOCATIONS.PRODUCTS },
        {
          label: "Chi tiết sản phẩm",
          src: LOCATIONS.PRODUCT_DETAIL,
        },
        {
          label: "Thêm sản phẩm mới",
          src: LOCATIONS.CREATE_PRODUCT,
        },
        {
          label: "Cập nhật sản phẩm",
          src: LOCATIONS.UPDATE_PRODUCT,
        },
      ],
    },
    {
      label: "Categories",
      active: false,
      icon:require('assets/icon-slide/category-management-svgrepo-com.png'),
      sub: [
        { label: "Đanh sánh category", src: LOCATIONS.CATEGORY },
        {
          label: "Thêm mới category",
          src: LOCATIONS.CREATE_CATEGORY,
        },
        {
          label: "Cập nhật category",
          src: LOCATIONS.UPDATE_CATEGORY,
        },
      ],
    },
    {
      label: "Thông Báo",
      active: false,
      icon:require('assets/icon-slide/notification-svgrepo-com.png'),
      src: LOCATIONS.MESSAGES,
    },
    {
      label: "Cài Đặt",
      active: false,
      icon:require('assets/icon-slide/setting-setting-svgrepo-com.png'),
      src: LOCATIONS.SETTING,
    },
    {
      label: "Sign Out",
      active: false,
      icon:require('assets/icon-slide/door-svgrepo-com.png'),
      src: LOCATIONS.SIGNOUT,
    },
  ]);

  const [prevItem, setPrevItem] = useState(0);
  const activeSubItem = useCallback((index) => {
    const newList = [...list];
    if (newList[index].isExtend) {
      newList[index].isExtend= false
    }else{
      newList[index].isExtend= true;
    }
    
      setList(newList);
  }, [list]);
  const activeItem = useCallback(
    (index) => {
      const newList = [...list];
      if (prevItem === index) {
        newList[index].active = true;
        setList(newList);
      } else {
        setPrevItem(index);
        newList[index].active = true;
        newList[prevItem].active = false;
        setList(newList);
      }
      console.log('◀◀◀ newList ▶▶▶',newList);
    },
    [list, prevItem]
  );
  return (
    <div className="slide">
      <div className="d-flex flex-column justify-content-center  ">
        <h4 className="text-center py-3">E-Shop</h4>
        <ul className="menu-slide d-flex flex-column gap-2 list-unstyled">
          {list.map((item, idx) => {
            
            if(item?.sub){
              return <li onClick={()=>activeSubItem(idx)} key={idx} >
              <Link className={item.active ? "active" : ""}>
                <div className="px-3">
                  <img style={{width:"24px",height:"24px"}} src={`${item.icon}`} alt="" />
                  {item.label}
                </div>
              </Link>
              <ul className={`${!item.isExtend?"d-none":""} d-flex flex-column gap-2 list-unstyled mx-2`}>
                {item.sub.map((sub,index)=>{
                  return(
                    <li key={index}>
                      <Link onClick={() => activeItem(idx)} to={`${sub.src}`}>
                        {sub.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
            }
            
             return (
                 <li className="px-3" key={idx} >
                   <img style={{width:"24px",height:"24px"}} src={`${item.icon}`} alt="" />
                      <Link className={item.active ? "active" : ""} onClick={() => activeItem(idx)} to={`${item.src}`}>
                        {item.label}
                      </Link>
                    </li>
              );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Slide;
