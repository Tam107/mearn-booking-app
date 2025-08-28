import { Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

const AdminViewBus = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const stateBus = useSelector((state) => state.BusReducer);
  console.log(stateBus);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: 220,
      ellipsis: true,
    },
    {
      title: "Bus Name",
      dataIndex: "poName",
      key: "poName",
      width: 150,
      ellipsis: true,
    },
    {
      title: "City From",
      dataIndex: "cityFrom",
      key: "cityFrom",
      width: 150,
      ellipsis: true,
    },
    {
      title: "City To",
      dataIndex: "cityTo",
      key: "cityTo",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Departure Time",
      dataIndex: "departureTime",
      key: "departureTime",
      render: (text) => {
        const date = new Date(text);
        const options = {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Ho_Chi_Minh",
        };
        return new Intl.DateTimeFormat("vi-VN", options).format(date);
      },
      width: 150,
      ellipsis: true,
    },
    {
      title: "Arrival Time",
      dataIndex: "arrivalTime",
      key: "arrivalTime",
      width: 150,
      ellipsis: true,
      render: (text) => {
        const date = new Date(text);
        const options = {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Ho_Chi_Minh",
        };
        return new Intl.DateTimeFormat("vi-VN", options).format(date);
      },
    },
    {
      title: "Total Seats",
      dataIndex: "totalSeats",
      key: "totalSeats",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 150,
      ellipsis: true,
      render: (text) =>
      {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(text)
      }
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 200,
      render: (text, record) => (
        <span className="flex gap-3">
          <a href={`/dashboard-bus/${record.slug}`} className="text-green-500">
            Edit
          </a>
          <a
            href={`/buses/${record.slug}`}
            target="_blank"
            className="text-blue-500"
          >
            View
          </a>
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="w-full py-6 px-4">
        {isMobile ? (
          <div className="space-y-4">
            {stateBus?.busesAdmin?.map((bus) => (
              <div
                key={bus._id}
                className="border rounded-lg p-4 mb-3 shadow-sm bg-white"
              >
                <p className="text-sm text-gray-500">
                  <strong>ID:</strong> {bus._id}
                </p>
                <p><strong>Bus Name:</strong> {bus.poName}</p>
                <p><strong>City From:</strong> {bus.cityFrom}</p>
                <p><strong>City To:</strong> {bus.cityTo}</p>
                <p><strong>Departure Time:</strong> {new Intl.DateTimeFormat("vi-VN", {hour: '2-digit', minute: '2-digit'}).format(new Date(bus.departureTime))}</p>
                <p><strong>Arrival Time:</strong> {new Intl.DateTimeFormat("vi-VN", {hour: '2-digit', minute: '2-digit'}).format(new Date(bus.arrivalTime))}</p>
                <p><strong>Total Seats:</strong> {bus.totalSeats}</p>
                <p><strong>Price:</strong> {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(bus.price)}</p>
                <div className="mt-2 flex gap-3">
                  <a href={`/dashboard-bus/${bus.slug}`} className="text-green-500">
                    Edit
                  </a>
                  <a
                    href={`/buses/${bus.slug}`}
                    target="_blank"
                    className="text-blue-500"
                  >
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={stateBus?.busesAdmin}
            rowKey="_id"
            bordered
            pagination={{
              pageSize: 8,
              showSizeChanger: false,
            }}
            scroll={{
              x: 1000,
              y: 500,
            }}
          />
        )}
      </div>
    </>
  );
};

export default AdminViewBus;
