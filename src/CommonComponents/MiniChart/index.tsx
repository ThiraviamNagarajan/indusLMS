import { Chart } from "chart.js";
import { useEffect, useRef } from "react";

const MiniChart = ({
  currentScore,
  predictedScore,
  color,
  maxY = 110,
  labels = ['Start', 'Current', 'Predicted', 'Target'],
  customData,
  stepSize, // new prop
}: any) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = chartRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const dataPoints = customData || [0, currentScore, predictedScore, 100];

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              data: dataPoints,
              borderColor: color,
              backgroundColor: `${color}20`,
              tension: 0.4,
              pointBackgroundColor: ["#6B7280", "#EF4444", "#F59E0B", "#10B981"],
              pointRadius: 5,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              beginAtZero: true,
              max: maxY,
              ticks: { font: { size: 9 }, stepSize: stepSize }, // <-- apply stepSize
              grid: { color: "rgba(107, 114, 128, 0.1)" },
            },
            x: {
              ticks: { font: { size: 8 } },
              grid: { display: false },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [currentScore, predictedScore, color, maxY, labels, customData, stepSize]);

  return <canvas ref={chartRef} />;
};
export default MiniChart

