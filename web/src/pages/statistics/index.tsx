// pages/statistics.js
import { FireIncidents } from '@/components/charts/fire-incidents';
import { Resolved } from '@/components/charts/resolved';
import { ResponseTime } from '@/components/charts/response-time';
import Layout from '@/components/layout';
import React from 'react';

export default function StatisticsPage() {
  return (
    <Layout>
    <div className="min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Statistics Overview</h1>
        <p className="text-gray-600">Analyze the performance and fire risk metrics of BlazeAlert.</p>
      </header>

      {/* KPIs Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* KPI Card */}
          <div className="p-6 bg-white border rounded-lg">
            <h3 className="text-gray-600 font-medium">Total Fire Alerts</h3>
            <p className="text-4xl font-bold text-red-500">125</p>
          </div>
          <div className="p-6 bg-white border rounded-lg">
            <h3 className="text-gray-600 font-medium">Resolved Tasks</h3>
            <p className="text-4xl font-bold text-green-500">95%</p>
          </div>
          <div className="p-6 bg-white border rounded-lg">
            <h3 className="text-gray-600 font-medium">Active Risks</h3>
            <p className="text-4xl font-bold text-yellow-500">8</p>
          </div>
          <div className="p-6 bg-white border rounded-lg">
            <h3 className="text-gray-600 font-medium">Personnel On-Duty</h3>
            <p className="text-4xl font-bold text-blue-500">37</p>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Placeholder for Chart 1 */}
          <div className="p-6 bg-white rounded-lg col-span-2">
            {/* <h3 className="text-gray-600 font-medium mb-4">Fire Incidents (Last 30 Days)</h3> */}
            <div className="h- 64 bg-gr ay-200 flex items-center justify-center">
              {/* Replace this with a chart component */}
              {/* <p className="text-gray-500">[Chart Placeholder]</p> */}
			  <FireIncidents />
            </div>
          </div>

          {/* Placeholder for Chart 2 */}
          <div className="p-6 bg-white  rounded-lg">
            {/* <h3 className="text-gray-600 font-medium mb-4">Resolved Alerts (Monthly)</h3> */}
            <div className="h- 64 flex items-center justify-center">
              {/* Replace this with a chart component */}
              {/* <p className="text-gray-500">[Chart Placeholder]</p> */}
			  <Resolved />
            </div>
          </div>

          {/* Placeholder for Chart 3 */}
          <div className="p-6 bg-white rounded-lg">
            {/* <h3 className="text-gray-600 font-medium mb-4">Response Time (Average)</h3> */}
            <div className=" flex items-center justify-center">
              {/* Replace this with a chart component */}
              {/* <p className="text-gray-500">[Chart Placeholder]</p> */}
			  <ResponseTime />
            </div>
          </div>

          {/* Placeholder for Chart 4 */}
          {/* <div className="p-6 bg-white border rounded-lg">
            <h3 className="text-gray-600 font-medium mb-4">Personnel Engagement</h3>
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              {/* Replace this with a chart component * /}
              <p className="text-gray-500">[Chart Placeholder]</p>
            </div>
          </div> */}
        </div>
      </section>
    </div>
    </Layout>
  );
}
