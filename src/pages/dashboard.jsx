import Loading from "components/loading";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
function Dashboard(props) {
  const[isLoading,setLoading]=useState(false)
  const navigate = useNavigate();
  const [barChar, setBarChar] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "May",
          "July",
          "August",
        ],
      },
    },
    series: [
      {
        name: "Doanh thu",
        data: [2000, 4000, 6000, 8000, 10000, 4500, 4800, 6000],
      },
    ],
  });
  const [donut, setDonut] = useState({
    options: {
      labels: [
        "Order waiting",
        "Order completed",
        "Order reject",
        "Order canceled",
        "Order paid",
        "Order delivering",
      ],
    },
    series: [44, 55, 41, 17, 15, 17],
  });
  const [circle, setCircle] = useState({
    options: {
      labels: ["Sold out"],
    },
    series: [10],
  });

  const getTotalOrder = async () => {
    setLoading(true)
    try {
      const res = await axiosAdmin.get("/query-orders/getTotalOrder");
      setDonut((prev) => ({
        ...prev,
        series: res.data.payload,
      }));
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("◀◀◀ error ▶▶▶", error);
    }
  };
  const getRevenue = async () => {
    setLoading(true)
    try {
      const res = await axiosAdmin.get("/query-orders/getRevenueOfYear");
      const month = res?.data?.payload?.map((item) => {
        return item.month;
      });
      const revenue = res?.data?.payload?.map((item) => {
        return item.totalRevenue;
      });
      const seriess = [
        {
          name: "Revenue ($)",
          data: revenue,
        },
      ];
      setBarChar((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          xaxis: { ...prev.categories, categories: month },
        },
        series: seriess,
      }));
      // setDonut((prev)=>({
      //   ...prev,
      //   series:res.data.payload
      // }))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("◀◀◀ error ▶▶▶", error);
    }
  };
  const getSoldOut = async () => {
    setLoading(true)
    try {
      const res = await axiosAdmin.get("/query-orders/getProductSold");
      const data = res.data.payload;
      const arr = [((data?.productSold / data?.totalProduct) * 100).toFixed(2)];
      setCircle((prev) => ({ ...prev, series: arr }));
    } catch (error) {
      setLoading(false)
      console.log("◀◀◀ errror ▶▶▶", error);
    }
  };
  useEffect(() => {
    getRevenue();
    getTotalOrder();
    getSoldOut();
  }, []);

  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "May",
          "July",
          "August",
        ],
      },
    },
    series: [
      {
        name: "Doanh thu",
        data: [1000, 2000, 3000, 4000, 5000, 4500, 4800, 6000],
      },
    ],
  };

  return (
    <>
      {!isLoading?<div className="row">
        <div className="col-12">
          <h2> Revenue 2023</h2>
          <div className="mixed-chart">
            <Chart
              options={barChar.options}
              series={barChar.series}
              type="bar"
              width="100%"
            />
          </div>
        </div>
        <div className="col-xxl-6 col-lg-6 col-md-6 col-xs-12">
          <h2>Order statistics</h2>
          <Chart
            options={donut.options}
            series={donut.series}
            type="donut"
            width="100%"
          />
        </div>

        {/* <div className="col-xxl-4 col-lg-6 col-md-6 col-xs-12">
          <h2> Revenue 2023</h2>
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            width="100%"
          />
        </div> */}
        <div className="col-xxl-6 col-lg-6 col-md-6 col-xs-12">
          <h2>Total number of products sold</h2>
          <Chart
            options={circle.options}
            series={circle.series}
            type="radialBar"
            width="100%"
          />
        </div>
      </div>:<Loading/>}
    </>
  );
}

export default Dashboard;
