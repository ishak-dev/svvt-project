import React from 'react';
import ReactApexCharts from 'react-apexcharts';

const ChartComponent: React.FC<{ chartDataProp: any, selectedDate: string }> = ({ chartDataProp, selectedDate }) => {
  // Parse the selected date
  console.log("THIS IS SELECTED DATE", selectedDate)
  const selectedMonth = new Date(selectedDate).getMonth(); // 0-based (0 for January, 11 for December)
  const selectedYear = new Date(selectedDate).getFullYear();

  console.log("SELECTED MONTH", selectedMonth)
  console.log("SELECTED YEAR", selectedYear)

  // Filter the data to include only the selected year's appointments
  const filteredDataForYear = chartDataProp.filter((item: any) => {
    const appointmentDate = new Date(item.date);
    return appointmentDate.getFullYear() === selectedYear;
  });

  // Calculate total cost for the selected year (from overall costs)
  const totalCostForYear = filteredDataForYear.reduce((acc: number, item: any) => acc + item.cost, 0);

  // Filter the data to include only the selected month's appointments
  const filteredDataForMonth = filteredDataForYear.filter((item: any) => {
    const appointmentDate = new Date(item.date);
    return appointmentDate.getMonth() === selectedMonth;
  });

  // Calculate total cost for the selected month
  const totalCostForMonth = filteredDataForMonth.reduce((acc: number, item: any) => acc + item.cost, 0);

  // Calculate percentage spent in the selected month over the total cost for the year
  const percentageSpent = totalCostForYear > 0 ? (totalCostForMonth / totalCostForYear) * 100 : 0;

  // Chart data for the Donut chart
  const chartData = [
    { label: `Spent in ${new Date(selectedDate).toLocaleString('default', { month: 'long' })}`, value: totalCostForMonth },
    { label: 'Remaining', value: totalCostForYear - totalCostForMonth },
  ];

  // Chart options
  const chartOptions = {
    chart: {
      type: 'donut',
      width: '100%',
    },
    labels: chartData.map(item => item.label),
    colors: ['#FF5733', '#33FF57'], // Customize your colors
    legend: {
      position: 'bottom',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: '100%',
          },
        },
      },
    ],
  };

  // Data for the Donut chart
  const chartSeries = chartData.map(item => item.value);

  return (
    <div className="chart-section mt-8">
      <h3 className="text-lg font-semibold mb-4 text-center">Cost Distribution for {new Date(selectedDate).toLocaleString('default', { month: 'long' })}</h3>
      <ReactApexCharts
        options={chartOptions}
        series={chartSeries}
        type="donut"
        width="100%"
      />
      <p className="text-center mt-4">
        Total cost for this year: ${totalCostForYear.toFixed(2)}
      </p>
      <p className="text-center mt-2">
        Total spent in {new Date(selectedDate).toLocaleString('default', { month: 'long' })}: ${totalCostForMonth.toFixed(2)} (
        {percentageSpent.toFixed(2)}%)
      </p>
    </div>
  );
};

export default ChartComponent;
