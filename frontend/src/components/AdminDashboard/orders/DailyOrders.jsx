import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DailyOrders = ({ data }) => {
  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 sm:p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className='text-lg sm:text-xl font-semibold text-gray-100 mb-3 sm:mb-4'>Daily Orders</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
            <XAxis 
              dataKey='date' 
              stroke='#9CA3AF' 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke='#9CA3AF' 
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.9)",
                border: "1px solid #4B5563",
                borderRadius: "8px"
              }}
            />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            <Line 
              type='monotone' 
              dataKey='orders' 
              stroke='#8B5CF6' 
              strokeWidth={2}
              dot={{ fill: '#8B5CF6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
export default DailyOrders;