// import '../styles/graphStyle.css';

import { Chart } from 'react-google-charts';

function Graph({ graphData, graphOptions }) {
	const data = [['Graph', 'Data'], ...graphData];

	return (
		<div className="graph">
			{graphData && (
				<Chart
					chartType="PieChart"
					data={data}
					options={graphOptions}
					width={'100%'}
					height={'400px'}
				/>
			)}
		</div>
	);
}

export default Graph;
