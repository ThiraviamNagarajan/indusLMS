// import { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// const LearningProgressChart = ({ currentScore, predictedScore }: any) => {
//   const chartRef = useRef<HTMLCanvasElement>(null);
//   const chartInstance = useRef<Chart | null>(null);
  
//   const targetScore = 100;
  
//   useEffect(() => {
//     const canvas = chartRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext('2d');
      
//       if (!ctx) return;
      
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
      
//       chartInstance.current = new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: ['Start', 'Current Score', 'Predicted', 'Target'],
//           datasets: [{
//             label: 'Learning Progress',
//             data: [0, currentScore, predictedScore, targetScore],
//             borderColor: 'rgb(59, 130, 246)',
//             backgroundColor: 'rgba(59, 130, 246, 0.1)',
//             tension: 0.4,
//             pointBackgroundColor: ['#6B7280', '#EF4444', '#F59E0B', '#10B981'],
//             pointBorderColor: ['#6B7280', '#EF4444', '#F59E0B', '#10B981'],
//             pointRadius: 6,
//             pointHoverRadius: 8,
//             fill: true
//           }]
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: {
//               display: false
//             },
//             tooltip: {
//               callbacks: {
//                 label: function(context) {
//                   return `Score: ${context.parsed.y}`;
//                 }
//               }
//             }
//           },
//           scales: {
//             y: {
//               beginAtZero: true,
//               max: Math.max(targetScore, predictedScore, currentScore) + 10,
//               ticks: {
//                 stepSize: 10,
//                 color: '#6B7280'
//               },
//               grid: {
//                 color: 'rgba(107, 114, 128, 0.2)'
//               }
//             },
//             x: {
//               ticks: {
//                 color: '#6B7280',
//                 font: {
//                   size: 10
//                 }
//               },
//               grid: {
//                 display: false
//               }
//             }
//           },
//           elements: {
//             line: {
//               borderWidth: 3
//             }
//           }
//         }
//       });
//     }
    
//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, [currentScore, predictedScore]);


//   return (
//     <div className="bg-white rounded-lg shadow-md ">
//       <div className="text-center mb-6">
//         <h3 className="font-semibold text-gray-800 mb-2">Student Personalised Learning Pathway</h3>
//       </div>
      
//       <div className="relative">
//         <div className="bg-gray-50 rounded-lg p-4 mb-4" style={{height: '300px'}}>
//           <canvas ref={chartRef} id="learningChart"></canvas>
//         </div>
        
//         <div className="flex justify-between items-center mb-4 px-4">
//           <div className="text-center">
//             <div className="text-sm text-gray-600">Target</div>
//             <div className="text-xl font-bold text-green-600">{targetScore}</div>
//           </div>
//           <div className="text-center">
//             <div className="text-sm text-gray-600">Predicted</div>
//             <div className="text-xl font-bold text-yellow-600">{predictedScore}</div>
//           </div>
//           <div className="text-center">
//             <div className="text-sm text-gray-600">Current</div>
//             <div className="text-xl font-bold text-red-500">{currentScore}</div>
//           </div>
//         </div>
        
//         <div className="text-center">
//           <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors w-full">
//             How to get this level
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default LearningProgressChart

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export interface DataPoint {
  label: string;
  value: number;
  color?: string;
  borderColor?: string;
}

export interface Dataset {
  label: string;
  data: DataPoint[];
  borderColor?: string;
  backgroundColor?: string;
  tension?: number;
  fill?: boolean;
}

export interface ChartConfig {
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  stepSize?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  chartType?: 'line' | 'bar' | 'radar';
}

interface LearningProgressChartProps {
  datasets: Dataset[];
  config?: ChartConfig;
  height?: string;
  onButtonClick?: () => void;
  buttonText?: string;
}

const defaultColors = [
  { border: 'rgb(59, 130, 246)', background: 'rgba(59, 130, 246, 0.1)' },
  { border: 'rgb(34, 197, 94)', background: 'rgba(34, 197, 94, 0.1)' },
  { border: 'rgb(239, 68, 68)', background: 'rgba(239, 68, 68, 0.1)' },
  { border: 'rgb(245, 158, 11)', background: 'rgba(245, 158, 11, 0.1)' },
  { border: 'rgb(168, 85, 247)', background: 'rgba(168, 85, 247, 0.1)' },
];

const defaultPointColors = ['#6B7280', '#EF4444', '#F59E0B', '#10B981', '#8B5CF6'];

const LearningProgressChart: React.FC<LearningProgressChartProps> = ({ 
  datasets = [], 
  config = {}, 
  height = '300px',
  onButtonClick,
  buttonText = "How to improve"
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  const {
    title = "Student Learning Progress",
    xAxisLabel,
    yAxisLabel,
    stepSize = 10,
    showLegend = datasets.length > 1,
    showGrid = true,
    chartType = 'line'
  } = config;

  useEffect(() => {
    const canvas = chartRef.current;
    if (canvas && datasets && datasets.length > 0) {
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      // Prepare chart datasets
      const chartDatasets = datasets.map((dataset, datasetIndex) => {
        const colorIndex = datasetIndex % defaultColors.length;
        const defaultColor = defaultColors[colorIndex];
        
        if (!dataset.data) return null;
        
        return {
          label: dataset.label,
          data: dataset.data.map(point => point.value),
          borderColor: dataset.borderColor || defaultColor.border,
          backgroundColor: "transparent",
          tension: dataset.tension || 0.4,
          pointBackgroundColor: dataset.data.map((point, index) => 
            point.color || defaultPointColors[index % defaultPointColors.length]
          ),
          pointBorderColor: dataset.data.map((point, index) => 
            point.borderColor || point.color || defaultPointColors[index % defaultPointColors.length]
          ),
          pointRadius: 4,
          pointHoverRadius: 8,
          fill: dataset.fill !== undefined ? dataset.fill : true,
          borderWidth: 3
        };
      }).filter((dataset): dataset is NonNullable<typeof dataset> => dataset !== null);

      // Get labels from first dataset (assuming all datasets have same structure)
      const labels = datasets[0]?.data?.map(point => point.label) || [];
      
      chartInstance.current = new Chart(ctx, {
        type: chartType,
        data: {
          labels,
          datasets: chartDatasets as any[]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 20,   // ✅ adds space above chart
              bottom: 10
            }
          },
          plugins: {
            legend: {
              display: showLegend,
              position: 'top' as const,
              labels: {
                color: '#6B7280',
                usePointStyle: true,
                padding: 20
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const datasetLabel = context.dataset.label;
                  const value = context.parsed.y;
                  return `${datasetLabel}: ${value}`;
                }
              }
            },
            title: {
              display: !!title,
              text: title,
              color: '#374151',
              font: {
                size: 18,
                weight: 'bold' as const
              },
              padding: {
                top: 10,   // ✅ spacing above title
                bottom: 20 // ✅ spacing between title & chart
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              min: 0,
              max: 110,
              ticks: {
                stepSize,
                color: '#6B7280'
              },
              grid: {
                display: showGrid,
                color: 'rgba(107, 114, 128, 0.2)'
              },
              title: {
                display: !!yAxisLabel,
                text: yAxisLabel,
                color: '#6B7280'
              }
            },
            x: {
              ticks: {
                color: '#6B7280',
                font: {
                  size: 10
                }
              },
              grid: {
                display: showGrid && chartType !== 'line',
                color: 'rgba(107, 114, 128, 0.2)'
              },
              title: {
                display: !!xAxisLabel,
                text: xAxisLabel,
                color: '#6B7280'
              }
            }
          }
        }
      });
    }
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [datasets, config, chartType, height]);

  return (
    <div className="bg-white rounded-lg shadow-md ">
      <div className="relative">
        <div className="bg-gray-50 rounded-lg p-4 mb-4" style={{height}}>
          <canvas ref={chartRef} id="learningChart"></canvas>
        </div>
        
        {onButtonClick && (
          <div className="text-center">
            <button 
              onClick={onButtonClick}
              className="bg-blue-500 text-white px-2 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors w-full"
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningProgressChart;

