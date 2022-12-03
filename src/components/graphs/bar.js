
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
function BarChart ({ chartData }) {
    console.log(Chart);
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Sales Chart</h2>
      <Bar
        data={chartData}
        options={{
            plugins: {
              title: {
                display: true,
                text: "Total Sale Every Month(Numeric are months)"
              },
              legend: {
                display: false
              }
            }
          }}
      />
    </div>
  );
};


export default BarChart;