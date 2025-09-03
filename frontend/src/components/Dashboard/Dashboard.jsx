import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const Dashboard = () => {
    const revenueData = [
        { name: "Week 1", sales: 20, profit: 15 },
        { name: "Week 2", sales: 40, profit: 25 },
        { name: "Week 3", sales: 60, profit: 45 },
        { name: "Week 4", sales: 80, profit: 65 },
        { name: "Week 5", sales: 100, profit: 85 },
    ];

    const salesAnalyticsData = [
        { year: 2015, sales: 25, profit: 20 },
        { year: 2016, sales: 40, profit: 35 },
        { year: 2017, sales: 60, profit: 50 },
        { year: 2018, sales: 75, profit: 65 },
        { year: 2019, sales: 100, profit: 90 },
    ];

    const customerData = [
        { name: "New Customers", value: 34249 },
        { name: "Repeated", value: 1420 },
    ];

    const COLORS = ["#1E90FF", "#32CD32"];

    return (
        <div className="p-8 min-h-screen bg-gradient-to-br bg-white shadow-2xl rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 drop-shadow-md">
                Dashboard
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Revenue</h3>
                    <select className="mb-4 p-2 border border-gray-300 rounded-lg text-gray-700">
                        <option>October</option>
                    </select>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                                <XAxis dataKey="name" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#FF4500"
                                    strokeWidth={2}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="profit"
                                    stroke="#4169E1"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Customers */}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Customers</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={customerData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {customerData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="text-center mt-4 space-y-1">
                        <p className="text-blue-600 font-semibold">34,249 New Customers</p>
                        <p className="text-green-600 font-semibold">1,420 Repeated</p>
                    </div>
                </div>

                {/* Featured Product */}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        Featured Product
                    </h3>
                    <div className="text-center">
                        <p className="text-gray-700">Beats Headphone 2019</p>
                        <p className="text-green-600 font-bold text-xl mt-2">$99.00</p>
                    </div>
                </div>

                {/* Sales Analytics */}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        Sales Analytics
                    </h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={salesAnalyticsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                                <XAxis dataKey="year" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#1E90FF"
                                    strokeWidth={2}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="profit"
                                    stroke="#32CD32"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Orders Summary (NEW CARD) */}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        Orders Summary
                    </h3>
                    <div className="text-center space-y-2">
                        <p className="text-indigo-600 font-bold text-2xl">1,245</p>
                        <p className="text-gray-600">Total Orders</p>
                        <p className="text-green-600 font-semibold">+12% this month</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
