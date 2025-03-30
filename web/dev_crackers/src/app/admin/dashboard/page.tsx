"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Bell, Search } from "lucide-react";

const data = [
  { day: "Mon", value: 40 },
  { day: "Tues", value: 55 },
  { day: "Wed", value: 30 },
  { day: "Thurs", value: 90 },
  { day: "Fri", value: 50 },
  { day: "Sat", value: 60 },
  { day: "Sun", value: 35 },
];

function Card({ children, className }: any) {
  return (
    <div className={` rounded-2xl shadow p-4 ${className}`}>{children}</div>
  );
}

function CardContent({ children }: any) {
  return <div className="text-center">{children}</div>;
}
const AdminDashboard = () => {
  return (
    <div>
      <section className="">
        <h3 className="text-lg font-semibold">Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[
            {
              name: "French",
              color: "bg-blue-500",
              progress: "75%",
              icon: "🇫🇷",
            },
            {
              name: "Portuguese",
              color: "bg-orange-500",
              progress: "50%",
              icon: "🚋",
            },
            {
              name: "Italian",
              color: "bg-green-500",
              progress: "25%",
              icon: "🗼",
            },
            {
              name: "German",
              color: "bg-yellow-500",
              progress: "75%",
              icon: "🏛️",
            },
          ].map((course, idx) => (
            <Card key={idx} className={`${course.color} text-white`}>
              <CardContent>
                <h4 className="text-lg font-bold">{course.name}</h4>
                <p className="text-sm">{course.progress}</p>
                <span className="text-3xl">{course.icon}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Courses Completed", value: "02" },
          { label: "Total Points Gained", value: "250" },
          { label: "Courses In Progress", value: "03" },
          { label: "Tasks Finished", value: "05" },
        ].map((stat, idx) => (
          <Card key={idx}>
            <CardContent>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <h3 className="text-xl font-bold text-blue-500">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="mt-6">
        <h3 className="text-lg font-semibold">Activity</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default AdminDashboard;
