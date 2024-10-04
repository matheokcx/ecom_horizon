import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface props {
    donnees: {
        labels: Array<string>;
        datasets: Array<
            {
                label: string,
                data: Array<number>,
                borderColor: string,
                tension: number,
            }
        >;
    } | null
}

export default function LineChart({ donnees }: props) {

    const test = {
        labels: ['January', 'February', 'March', 'April', 'May', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
        datasets: [
            {
                label: '',
                data: [65, 59, 80, 81, 56, 12, 32, 63, 24, 84, 59, 741],
                borderColor: 'rgb(205, 90, 255)',
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="w-full">
            <Line data={donnees != null ? donnees : test} />
        </div>
    );
}
