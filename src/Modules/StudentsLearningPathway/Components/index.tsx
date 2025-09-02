
// import studentsData from "../../../data/students.json";
// import { useNavigate } from "react-router-dom";
// import { setSubject, setSubjectScore } from "../../../store/store";
// import { useDispatch } from "react-redux";
// import LearningProgressChart, {
//   type Dataset,
//   type ChartConfig,
// } from "../../../CommonComponents/LineGraph";

// import { useEffect, useState } from "react";
// import WelcomeHeader from "../../../CommonComponents/WelcomeHeader";
// import axios from "axios";
// import { ArrowUp, ArrowDown } from "lucide-react";

// export default function StudentPathway() {
//   const student: any = studentsData[0];
//   const dispatch = useDispatch();
//   const currentGrade = Object.keys(student.grades)[0];
//   const subjectsArray = Object.keys(student.grades[currentGrade].subjects);
//   const overallMarks = student.grades[currentGrade].overall_score;
//   const predictedScore = (overallMarks * 1.2).toFixed(2);

//   const navigate = useNavigate();

//   // ✅ Subject card bg classes
//   const colors = [
//     "bg-blue-100 border border-blue-300",
//     "bg-green-100 border border-green-300",
//     "bg-yellow-100 border border-yellow-300",
//     "bg-purple-100 border border-purple-300",
//     "bg-pink-100 border border-pink-300",
//   ];

//   // ✅ Matching chart colors for subjects
//   const chartColors = [
//     { border: "rgb(59, 130, 246)", background: "rgba(59, 130, 246, 0.1)" }, // blue
//     { border: "rgb(34, 197, 94)", background: "rgba(34, 197, 94, 0.1)" }, // green
//     { border: "rgb(245, 158, 11)", background: "rgba(245, 158, 11, 0.1)" }, // yellow
//     { border: "rgb(168, 85, 247)", background: "rgba(168, 85, 247, 0.1)" }, // purple
//     { border: "rgb(236, 72, 153)", background: "rgba(236, 72, 153, 0.1)" }, // pink
//   ];

//   // ✅ Fixed scores for subjects
//   const fixedScores: Record<string, { currentScore: number; predictedScore: number }> = {
//     Geography: { currentScore: 72, predictedScore: 85 },
//     History: { currentScore: 68, predictedScore: 80 },
//     Biology: { currentScore: 75, predictedScore: 88 },
//     Physics: { currentScore: 70, predictedScore: 83 },
//     Design: { currentScore: 80, predictedScore: 90 },
//     English: { currentScore: 78, predictedScore: 88 },
//     Math: { currentScore: 85, predictedScore: 95 },
//     Chemistry: { currentScore: 74, predictedScore: 87 },
//   };
// const [api,setAPi]=useState<any>("")
//    useEffect(() => {
//     axios.get("https://dummyjson.com/users")
//       .then(response => {
//         console.log("Axios is working ✅", response.data);
//         setAPi(response.data)
//       })
//       .catch(error => {
//         console.error("Axios error ❌", error);
//       });
//   }, []);

//   console.log(api,"api");
  

//   function generateSubjectData(subjects: string[]) {
//     return subjects.map((subject, index) => {
//       const scores = fixedScores[subject] || { currentScore: 50, predictedScore: 60 };
//       const color = chartColors[index % chartColors.length];

//       return {
//         name: subject,
//         currentScore: scores.currentScore,
//         predictedScore: scores.predictedScore,
//         chartDataset: {
//           label: `${subject} Performance`,
//           borderColor: color.border,
//           backgroundColor: color.background,
//           data: [
//             { label: "", value: 0 },
//             { label: "Current Score", value: scores.currentScore },
//             { label: "Predicted Score", value: scores.predictedScore },
//             { label: "Target Score", value: 100 },
//           ],
//         },
//       };
//     });
//   }

//   const subjectDataArray = generateSubjectData(subjectsArray);

//   // ✅ Dispatch all subjects' scores to Redux
//   useEffect(() => {
//     subjectDataArray.forEach((subject) => {
//       dispatch(
//         setSubjectScore({
//           subject: subject.name,
//           currentScore: subject.currentScore,
//           predictedScore: subject.predictedScore,
//         })
//       );
//     });
//   }, [dispatch, subjectDataArray]);

//   const subjectChartData = {
//     datasets: subjectDataArray.map((s) => s.chartDataset),
//     config: {
//       title: "Subject-wise Performance Trend",
//       chartType: "line" as const,
//       xAxisLabel: "Evaluation",
//       yAxisLabel: "Score",
//       showLegend: false,
//       showGrid: true,
//     },
//     height: "400px",
//     showSummary: false,
//   } satisfies { datasets: Dataset[]; config: ChartConfig; height: string; showSummary: boolean };

//   const overallChartData = {
//     datasets: [
//       {
//         label: "Overall Performance",
//         data: [
//           { label: "", value: 0 },
//           { label: "Current Score", value: overallMarks },
//           { label: "Predicted Score", value: Number(predictedScore) },
//           { label: "Target Score", value: 100 },
//         ],
//       },
//     ],
//     config: {
//       title: "Overall Performance Trend",
//       chartType: "line" as const,
//       xAxisLabel: "Evaluation",
//       yAxisLabel: "Score",
//       showLegend: false,
//       showGrid: true,
//     },
//     height: "400px",
//     showSummary: true,
//   } satisfies { datasets: Dataset[]; config: ChartConfig; height: string; showSummary: boolean };

//   // ✅ Sample attentive dataset
//   const attentiveDatasets: Dataset[] = [
//     {
//       label: "Attentive",
//       data: [
//         { label: "2025-08-01", value: 20 },
//         { label: "2025-08-05", value: 80 },
//         { label: "2025-08-10", value: 50 },
//       ],
//     },
//   ];

//   const attentiveConfig = {
//     title: "Engagement Analysis",
//     xAxisLabel: "Date",
//     yAxisLabel: "Attentive",
//     stepSize: 10,
//     chartType: "line",
//     showLegend: false,
//   } as const;

//   return (
//     <div className="min-h-screen py-4 px-2 sm:px-[2%] lg:px-[1%] flex flex-col">
//       <WelcomeHeader name="Harish" grade="Grade 8" />
//       <h1 className="text-xl md:text-2xl font-semibold text-center mb-6 mt-4">
//         Student Personalised Learning Pathway
//       </h1>

//       <div className="flex gap-2  w-full justify-between">
//         {/* Subject cards */}
//         <div className="flex flex-wrap gap-4 basis-[60%] mt-6 max-w-lg">
//           {subjectDataArray.map((subject, index) => (
//             <div
//               key={index}
//               className={`flex flex-col rounded-xl shadow-md p-4 w-[45%] cursor-pointer hover:shadow-lg transition ${
//                 colors[index % colors.length]
//               }`}
//               onClick={() => {
//                 // ✅ Dispatch selected subject before navigating
//                 dispatch(setSubject(subject.name));
//                 navigate(`/subject-summary/${subject.name}`, {
//                   state: { subjects: subjectDataArray, currentGrade },
//                 });
//               }}
//             >
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-2">
//                   <div
//                     className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
//                       colors[index % colors.length]
//                     }`}
//                   >
//                     {subject.name[0]}
//                   </div>
//                   <p className="text-gray-800 font-semibold">{subject.name}</p>
//                 </div>

//                 <span className="text-gray-600 font-medium">
//                   {subject.currentScore}%
//                   <span className="text-gray-400 font-bold text-lg ml-1">{">"}</span>
//                 </span>
//               </div>

//               <div className="flex justify-between items-center mt-2">
//                 <p className="text-sm text-gray-500 ml-10">BCS-4A</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="basis-[40%] w-full mt-6">
//           <LearningProgressChart
//             datasets={overallChartData.datasets}
//             config={overallChartData.config}
//             height={overallChartData.height}
//           />

//           <div className="flex justify-around gap-4 mt-3 text-xs">
//             <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-red-100 text-red-700 border border-red-200 shadow-sm">
//               <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
//               <span>Current: {Math.round(overallMarks)}%</span>
//             </div>
//             <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-yellow-100 text-yellow-700 border border-yellow-200 shadow-sm">
//               <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
//               <span>Predicted: {Math.round(Number(predictedScore))}%</span>
//             </div>
//           </div>
//         </div>
//       </div>

//     <div className="flex gap-10">
//   <div className="basis-[75%] mt-6">
//     <LearningProgressChart
//       datasets={subjectChartData.datasets}
//       config={subjectChartData.config}
//       height={subjectChartData.height}
//     />
//   </div>

//   <div className="flex flex-col gap-6 w-full  justify-center basis-[20%]">
//     {/* Strongest Subject */}
//     <div className="flex items-center gap-3 rounded-md border-1 border-green-500 bg-green-50 shadow-md px-2 py-2 w-fit">
      
//       <span className="text-sm  text-green-600">
//         <div className="font-semibold">Strongest Subject</div>
//         <div className="mt-1">Mathematics</div>
//       </span>
//       <ArrowUp className="text-green-500 w-6 h-6" />
//     </div>

//     {/* Weakest Subject */}
//     <div className="flex items-center gap-3 rounded-md border-1 border-red-500 bg-red-50 shadow-md px-2 py-2 w-fit">
    
//       <span className="text-sm  text-red-600">
//         <div className="font-semibold">Weakest Subject</div>
//         <div className="mt-1">History</div>
//       </span>
//         <ArrowDown className="text-red-500 w-6 h-6" />
//     </div>
//   </div>
// </div>

//       <div className="flex flex-col items-center px-[5%]">
//        <div className="rounded-lg shadow-md overflow-hidden pt-2">
//             <div className="bg-[#4472c4] text-white py-2 px-3 font-semibold text-center">
//               <span>Descriptive</span>
//               <span className="block font-normal text-sm">(Overall)</span>
//             </div>
//             <div className="bg-orange-100 p-5">
//               <p className="text-md md:text-sm">{student.grades["Grade 8"]?.descriptive_overall}</p>
//             </div>
//           </div>
//             <div className="rounded-lg shadow-md overflow-hidden pt-4">
//             <div className="bg-[#4472c4] text-white py-2 px-3 font-semibold text-center">
//               <span>Prescriptive</span>
//               <span className="block font-normal text-sm">(Overall)</span>
//             </div>
//             <div className="bg-orange-100 p-5">
//               <p className="text-md md:text-sm">{student.grades["Grade 8"]?.prescriptive_overall}</p>
//             </div>
//           </div>

//           </div>

//       {/* Attentive Chart */}
//       <div className="mt-8 space-y-8 flex justify-center gap-10">
//         <div className="basis-[80%]">
//           <LearningProgressChart
//             height="400px"
//             datasets={attentiveDatasets}
//             config={attentiveConfig}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }


import studentsData from "../../../data/students.json";
import { useNavigate } from "react-router-dom";
import { setSubject, setSubjectScore } from "../../../store/store";
import { useDispatch } from "react-redux";
import LearningProgressChart, {
  type Dataset,
  type ChartConfig,
} from "../../../CommonComponents/LineGraph";

import { useEffect, useState } from "react";
import WelcomeHeader from "../../../CommonComponents/WelcomeHeader";
import axios from "axios";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function StudentPathway() {
  const student: any = studentsData[0];
  const dispatch = useDispatch();
  const currentGrade = Object.keys(student.grades)[0];
  const subjectsArray = Object.keys(student.grades[currentGrade].subjects);
  const overallMarks = student.grades[currentGrade].overall_score;
  const predictedScore = (overallMarks * 1.2).toFixed(2);

  const navigate = useNavigate();

  // ✅ Subject card bg classes
  const colors = [
    "bg-blue-100 border border-blue-300",
    "bg-green-100 border border-green-300",
    "bg-yellow-100 border border-yellow-300",
    "bg-purple-100 border border-purple-300",
    "bg-pink-100 border border-pink-300",
  ];

  // ✅ Matching chart colors for subjects
  const chartColors = [
    { border: "rgb(59, 130, 246)", background: "rgba(59, 130, 246, 0.1)" },
    { border: "rgb(34, 197, 94)", background: "rgba(34, 197, 94, 0.1)" },
    { border: "rgb(245, 158, 11)", background: "rgba(245, 158, 11, 0.1)" },
    { border: "rgb(168, 85, 247)", background: "rgba(168, 85, 247, 0.1)" },
    { border: "rgb(236, 72, 153)", background: "rgba(236, 72, 153, 0.1)" },
  ];

  const fixedScores: Record<string, { currentScore: number; predictedScore: number }> = {
    Geography: { currentScore: 72, predictedScore: 85 },
    History: { currentScore: 68, predictedScore: 80 },
    Biology: { currentScore: 75, predictedScore: 88 },
    Physics: { currentScore: 70, predictedScore: 83 },
    Design: { currentScore: 80, predictedScore: 90 },
    English: { currentScore: 78, predictedScore: 88 },
    Math: { currentScore: 85, predictedScore: 95 },
    Chemistry: { currentScore: 74, predictedScore: 87 },
  };

  const [api, setAPi] = useState<any>("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((response) => {
        console.log("Axios is working ✅", response.data);
        setAPi(response.data);
      })
      .catch((error) => {
        console.error("Axios error ❌", error);
      });
  }, []);

  console.log(api, "api");

  function generateSubjectData(subjects: string[]) {
    return subjects.map((subject, index) => {
      const scores = fixedScores[subject] || { currentScore: 50, predictedScore: 60 };
      const color = chartColors[index % chartColors.length];

      return {
        name: subject,
        currentScore: scores.currentScore,
        predictedScore: scores.predictedScore,
        chartDataset: {
          label: `${subject} Performance`,
          borderColor: color.border,
          backgroundColor: color.background,
          data: [
            { label: "", value: 0 },
            { label: "Current Score", value: scores.currentScore },
            { label: "Predicted Score", value: scores.predictedScore },
            { label: "Target Score", value: 100 },
          ],
        },
      };
    });
  }

  const subjectDataArray = generateSubjectData(subjectsArray);

  useEffect(() => {
    subjectDataArray.forEach((subject) => {
      dispatch(
        setSubjectScore({
          subject: subject.name,
          currentScore: subject.currentScore,
          predictedScore: subject.predictedScore,
        })
      );
    });
  }, [dispatch, subjectDataArray]);

  const subjectChartData = {
    datasets: subjectDataArray.map((s) => s.chartDataset),
    config: {
      title: "Subject-wise Performance Trend",
      chartType: "line" as const,
      xAxisLabel: "Evaluation",
      yAxisLabel: "Score",
      showLegend: false,
      showGrid: true,
    },
    height: "400px",
    showSummary: false,
  } satisfies { datasets: Dataset[]; config: ChartConfig; height: string; showSummary: boolean };

  const overallChartData = {
    datasets: [
      {
        label: "Overall Performance",
        data: [
          { label: "", value: 0 },
          { label: "Current Score", value: overallMarks },
          { label: "Predicted Score", value: Number(predictedScore) },
          { label: "Target Score", value: 100 },
        ],
      },
    ],
    config: {
      title: "Overall Performance Trend",
      chartType: "line" as const,
      xAxisLabel: "Evaluation",
      yAxisLabel: "Score",
      showLegend: false,
      showGrid: true,
    },
    height: "400px",
    showSummary: true,
  } satisfies { datasets: Dataset[]; config: ChartConfig; height: string; showSummary: boolean };

  const attentiveDatasets: Dataset[] = [
    {
      label: "Attentive",
      data: [
        { label: "2025-08-01", value: 20 },
        { label: "2025-08-05", value: 80 },
        { label: "2025-08-10", value: 50 },
      ],
    },
  ];

  const attentiveConfig = {
    title: "Engagement Analysis",
    xAxisLabel: "Date",
    yAxisLabel: "Attentive",
    stepSize: 10,
    chartType: "line",
    showLegend: false,
  } as const;

  return (
    <div className="min-h-screen py-4 px-2 sm:px-[2%] lg:px-[1%] flex flex-col">
      <WelcomeHeader name="Harish" grade="Grade 8" />
      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-center mb-6 mt-4">
        Student Personalised Learning Pathway
      </h1>

      {/* Subject cards + overall chart */}
      <div className="flex flex-col lg:flex-row gap-4 w-full justify-between">
        {/* Subject cards */}
        <div className="w-full overflow-x-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 basis-[60%] mt-6 max-w-lg min-w-[280px]">
            {subjectDataArray.map((subject, index) => (
              <div
                key={index}
                className={`flex flex-col rounded-xl shadow-md p-3 sm:p-4 cursor-pointer hover:shadow-lg transition ${
                  colors[index % colors.length]
                }`}
                onClick={() => {
                  dispatch(setSubject(subject.name));
                  navigate(`/subject-summary/${subject.name}`, {
                    state: { subjects: subjectDataArray, currentGrade },
                  });
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-semibold ${
                        colors[index % colors.length]
                      }`}
                    >
                      {subject.name[0]}
                    </div>
                    <p className="text-gray-800 font-semibold text-sm sm:text-base">
                      {subject.name}
                    </p>
                  </div>

                  <span className="text-gray-600 font-medium text-sm sm:text-base">
                    {subject.currentScore}%
                    <span className="text-gray-400 font-bold ml-1">{">"}</span>
                  </span>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs sm:text-sm text-gray-500 ml-8">BCS-4A</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Chart */}
        <div className="basis-[40%] w-full mt-6">
          <LearningProgressChart
            datasets={overallChartData.datasets}
            config={overallChartData.config}
            height={overallChartData.height}
          />

          <div className="flex flex-col sm:flex-row justify-around gap-4 mt-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-red-100 text-red-700 border border-red-200 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span>Current: {Math.round(overallMarks)}%</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-yellow-100 text-yellow-700 border border-yellow-200 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span>Predicted: {Math.round(Number(predictedScore))}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Chart + Strongest/Weakest */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="basis-[75%] mt-6">
          <LearningProgressChart
            datasets={subjectChartData.datasets}
            config={subjectChartData.config}
            height={subjectChartData.height}
          />
        </div>

        <div className="flex flex-row lg:flex-col gap-6 w-full justify-center basis-[20%]">
          {/* Strongest Subject */}
          <div className="flex items-center gap-3 rounded-md border-1 border-green-500 bg-green-50 shadow-md px-2 py-2 w-fit text-xs sm:text-sm">
            <span className="text-green-600">
              <div className="font-semibold">Strongest Subject</div>
              <div className="mt-1">Mathematics</div>
            </span>
            <ArrowUp className="text-green-500 w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          {/* Weakest Subject */}
          <div className="flex items-center gap-3 rounded-md border-1 border-red-500 bg-red-50 shadow-md px-2 py-2 w-fit text-xs sm:text-sm">
            <span className="text-red-600">
              <div className="font-semibold">Weakest Subject</div>
              <div className="mt-1">History</div>
            </span>
            <ArrowDown className="text-red-500 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>

      {/* Descriptive & Prescriptive */}
      <div className="flex flex-col md:flex-row items-center gap-6 px-[5%] mt-6 w-full">
        <div className="flex-1 rounded-lg shadow-md overflow-hidden pt-2 w-full">
          <div className="bg-[#4472c4] text-white py-2 px-2 sm:px-3 font-semibold text-center text-sm sm:text-base">
            <span>Descriptive</span>
            <span className="block font-normal text-xs sm:text-sm">(Overall)</span>
          </div>
          <div className="bg-orange-100 p-3 sm:p-5">
            <p className="text-sm sm:text-md">{student.grades["Grade 8"]?.descriptive_overall}</p>
          </div>
        </div>
        <div className="flex-1 rounded-lg shadow-md overflow-hidden pt-2 w-full">
          <div className="bg-[#4472c4] text-white py-2 px-2 sm:px-3 font-semibold text-center text-sm sm:text-base">
            <span>Prescriptive</span>
            <span className="block font-normal text-xs sm:text-sm">(Overall)</span>
          </div>
          <div className="bg-orange-100 p-3 sm:p-5">
            <p className="text-sm sm:text-md">{student.grades["Grade 8"]?.prescriptive_overall}</p>
          </div>
        </div>
      </div>

      {/* Attentive Chart */}
      <div className="mt-8 flex justify-center">
        <div className="w-full sm:w-[95%] md:w-[90%] lg:w-[80%]">
          <LearningProgressChart
            height="400px"
            datasets={attentiveDatasets}
            config={attentiveConfig}
          />
        </div>
      </div>
    </div>
  );
}



