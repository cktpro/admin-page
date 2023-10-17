import React from "react";
import Chart from "react-apexcharts";
function Dashboard(props) {
  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 5",
          "Tháng 7",
          "Tháng 8",
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
  const donut = {
    options: {
      labels: [
        "Đơn hàng đã tạo",
        "Đơn thành công",
        "Đơn chờ giao",
        "Đơn bị hủy",
        "Đơn bị từ chối",
      ],
    },
    series: [44, 55, 41, 17, 15],
  };
  const circle = {
    options: {
      labels: ["Đã bán ra"],
    },
    series: [70],
  };

  return (
    <>
      <div className="row">
        <div className="col-xxl-4 col-lg-6 col-md-6 col-xs-12">
          <h2> Doanh thu 2023</h2>
          <div className="mixed-chart">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="100%"
            />
          </div>
        </div>
        <div className="col-xxl-4 col-lg-6 col-md-6 col-xs-12">
          <h2>Thống kê đơn hàng</h2>
          <Chart
            options={donut.options}
            series={donut.series}
            type="donut"
            width="100%"
          />
        </div>
      
      <div className="col-xxl-4 col-lg-6 col-md-6 col-xs-12">
        <h2> Doanh thu 2023</h2>
        <Chart
          options={state.options}
          series={state.series}
          type="line"
          width="100%"
        />
      </div>
      <div className="col-xxl-4 col-lg-6 col-md-6 col-xs-12">
        <h2>Tổng số sản phẩm đã bán ra</h2>
        <Chart
          options={circle.options}
          series={circle.series}
          type="radialBar"
          width="100%"
        />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
