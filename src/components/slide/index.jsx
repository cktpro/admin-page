import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LOCATIONS } from "constants/index";
// import style
import "./slide.css";
function Slide(props) {
  const [list, setList] = useState([
    {
      label: "Dashboard",
      active: false,
      src:LOCATIONS.DASHBOARD
    },
    {
      label: "Order",
      active: false,
      src:LOCATIONS.ORDER
    },
    {
      label: "Products",
      active: false,
      src:LOCATIONS.PRODUCTS
    },
    {
      label: "Sales Report",
      active: false,
      src:LOCATIONS.SALES_REPORT
    },
    {
      label: "Messages",
      active: false,
      src:LOCATIONS.MESSAGES
    },
    {
      label: "Setting",
      active: false,
      src:LOCATIONS.SETTING
    },
    {
      label: "Sign Out",
      active: false,
      src:LOCATIONS.SIGNOUT
    },
  ]);
  const location=useLocation()
  
  const [prevItem,setPrevItem]=useState(0)
  const activeItem =useCallback((index) => {
    const newList=[...list]
    if (prevItem===index) {
        
    newList[index].active=true
    setList(newList)
    }else{
        setPrevItem(index)
    newList[index].active=true
    newList[prevItem].active=false
    setList(newList)
    }
  }, [list,prevItem]);
  useEffect(()=>{
    if(location.pathname!=="/"){
        const index= list.findIndex(obj=>obj.src===location.pathname)
        if(index){
            setPrevItem(index)
            const newList=[...list]
        newList[index].active=true
        }
    }
  },[list,location])
  return (
    <div className="slide">
      <div className="d-flex flex-column justify-content-center align-items-center ">
        <h4 className="py-3">E-Shop</h4>
        <ul className="menu-slide d-flex flex-column gap-3 list-unstyled mx-4">
          {list.map((item, idx) => {
            return (
              <li key={idx} className={item.active?"active":""} >
                <Link  onClick={()=>activeItem(idx)}  to={`${item.src}`}>{item.label}</Link>
              </li>
            );
          })}
          {/* <li ><Link>Dashboard</Link></li>
                    <li><Link>Order</Link></li>
                    <li><Link>Products</Link></li>
                    <li><Link>Sales Report</Link></li>
                    <li><Link>Messages</Link></li>
                    <li><Link>Setting</Link></li>
                    <li><Link>Sign Out</Link></li> */}
        </ul>
      </div>
    </div>
  );
}

export default Slide;
