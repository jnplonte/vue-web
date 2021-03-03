// @ts-ignore
import palette from '@/styles/sass/_exports.scss';

const barData = {
	labels: ['Date 1', 'Date 2', 'Date 3', 'Date 4', 'Date 5', 'Date 6', 'Date 7'],
	datasets: [
		{
			label: 'this year',
			backgroundColor: palette['blue'],
			data: [18, 5, 19, 27, 29, 19, 20],
		},
		{
			label: 'last year',
			backgroundColor: palette['green'],
			data: [11, 20, 12, 29, 30, 25, 13],
		},
	],
};

const pieData = {
	datasets: [
		{
			data: [63, 15, 22],
			backgroundColor: [palette['blue'], palette['green'], palette['red']],
			borderWidth: 8,
			borderColor: palette['white'],
			hoverBorderColor: palette['white'],
		},
	],
	labels: ['Data 1', 'Data 2', 'Data 3'],
};

const options = {
	responsive: true,
	maintainAspectRatio: false,
};

export { barData, pieData, options };
