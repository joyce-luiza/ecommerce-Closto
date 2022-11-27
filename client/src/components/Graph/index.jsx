import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Graph({ graphData }) {
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const filteredDates = [];

	if (startDate && endDate) {
		graphData.x.forEach((day) => {
			if (
				new Date(day).getTime() >= startDate &&
				new Date(day).getTime() <= endDate
			) {
				filteredDates.push(day);
			}
		});
	}

	useEffect(() => {}, [filteredDates]);

	const series = graphData.values;
	const options = {
		dataLabels: {
			enabled: true,
		},
		stroke: {
			curve: 'smooth',
		},
		xaxis: {
			type: 'datetime',
			categories: filteredDates.length > 0 ? filteredDates : graphData.x,
		},
		tooltip: {
			x: {
				format: 'dd/MM/yy',
			},
		},
	};
	return (
		<div>
			<DatePicker
				selected={startDate}
				onChange={(date) => setStartDate(new Date(date).getTime())}
			/>
			<DatePicker
				selected={endDate}
				onChange={(date) => setEndDate(new Date(date).getTime())}
			/>
			<Chart options={options} series={series} width={800} height={800} />
		</div>
	);
}

export default Graph;
