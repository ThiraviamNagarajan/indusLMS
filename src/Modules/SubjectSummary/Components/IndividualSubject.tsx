// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import studentsData from "../../../data/students.json";
// import MiniChart from "../../../CommonComponents/MiniChart";
// import AssessmentTable from "../../../CommonComponents/Table";
// import LearningProgressChart, { type Dataset } from "../../../CommonComponents/LineGraph";
// import type { RootState } from "../../../store/store";
// import { setSubject } from "../../../store/store"; // ✅ use setSubject
// import { useNavigate } from "react-router-dom";
// import Dropdown from "../../../CommonComponents/SubjectDropDown";

// const IndividualSubject = () => {
//   const dispatch = useDispatch();
//   const subjectScores = useSelector((state: RootState) => state.subject.subjects);
//   let selectedSubject = useSelector((state: RootState) => state.subject.selectedSubject);

//   const firstStudent: any = studentsData[0];
//   const currentGrade = Object.keys(firstStudent?.grades || {})[0];

//    const navigate = useNavigate();

//   // Set default selected subject if none exists
//   useEffect(() => {
//     if (!selectedSubject && firstStudent) {
//       const firstSub = Object.keys(firstStudent?.grades?.[currentGrade]?.subjects || {})[0];
//       dispatch(setSubject(firstSub)); 
//     }
//   }, [dispatch, selectedSubject, firstStudent, currentGrade]);

//   selectedSubject =
//     selectedSubject || Object.keys(firstStudent?.grades?.[currentGrade]?.subjects || {})[0];

//   const subjectData =
//     firstStudent?.grades?.[currentGrade]?.subjects?.[selectedSubject] || null;

//     const subjectsArray = Object.keys(firstStudent.grades[currentGrade].subjects)

//   // Helper: Convert percentage to 5-point scale
//   const convertToFiveScale = (percentage: number) => {
//     const scaled = (percentage / 100) * 5;
//     return Math.round(scaled);
//   };

//   // Helper: Calculate predicted score (20% more, max 5)
//   const calculatePredictedScore = (current: number) => {
//     const predicted = current * 1.2;
//     return predicted > 5 ? 5 : Math.round(predicted);
//   };



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

//   const score = subjectScores[selectedSubject]?.currentScore || 0;

//   // Terms
//   let faTerms: { name: string }[] = [];
//   let saTerms: { name: string }[] = [];

//   if (["Grade 10", "Grade 12"].includes(currentGrade)) {
//     faTerms = [
//       { name: "Term 1 (JUL-SEP)" },
//       { name: "Term 2 (OCT-DEC)" },
//       { name: "Term 3 (JAN-MAR)" },
//     ];
//     saTerms = [...faTerms];
//   } else {
//     faTerms = [
//       { name: "Term 1 (JUL-DEC)" },
//       { name: "Term 2 (JAN-JUN)" },
//     ];
//     saTerms = [...faTerms];
//   }

//   const faRows = ["Writing Test", "Formative Assessment", "SDL", "Steam"];
//   const saRows = ["Project Work"];

//    const handleSelect = (subject: string) => {
//     dispatch(setSubject(subject));
//     navigate(`/subject-summary/${subject}`);
//   };

  

//   return (
//     <div className="min-h-screen bg-gray-50 p-[1%] md:p-[1%]">
//       <div className="max-w-7xl mx-auto">
//         {/* Page Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
//             Student Personalised Learning Pathway
//           </h1>

//  <div className="mt-4 mx-auto flex justify-center">
//       <Dropdown
//         options={subjectsArray}
//         selected={selectedSubject}
//         onSelect={handleSelect}
//         placeholder="Select Subject"
//       />
//     </div>




//         </div>

//         <div className="flex flex-col xl:flex-row gap-8">
//           <div className="flex-1 xl:flex-[2] space-y-6">
//             {/* Academic Scores Heading */}
//             <div className="flex justify-center">
//               <div className="bg-gradient-to-r from-[#4193df] via-[#57a1e7] to-[#7fbef4] text-white px-4 py-2 rounded font-semibold inline">
//                 Academic Scores
//               </div>
//             </div>

//             {/* Assessment Sections */}
// {/* ------------------ EOL ------------------ */}
// <div className="flex flex-col lg:flex-row gap-4 items-start mt-6 px-[30px]">
//   {/* Left Card */}
//   <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 lg:flex-[0.6] flex-1 min-w-0">
//     <div className="flex justify-between items-center">
//       <div className="bg-yellow-400 text-gray-800 px-4 py-2 w-[100px] text-[12px] rounded text-center font-medium">
//         EOL (Daily)
//       </div>

//       <div className="flex flex-col items-center ml-4">
//         {/* Task Count */}
//         <div className="rounded-md p-2 text-center mb-2 w-24 bg-yellow-100 text-yellow-700">
//           <div className="text-md font-bold mb-1">
//             {subjectData?.count_eol || 0}
//           </div>
//           <div className="text-xs font-medium text-yellow-600">Tasks</div>
//         </div>

//         {/* Score */}
//         <div className="rounded-md p-2 text-center w-24 bg-yellow-200 text-yellow-800">
//           <div className="text-md font-bold mb-1">
//             {subjectData?.percentage_eol || 0}%
//           </div>
//           <div className="text-xs font-medium text-yellow-700">Score</div>
//         </div>
//       </div>
//     </div>
//   </div>

//   {/* Right Side */}
//   <div className="flex-[1.4] bg-white rounded-lg border p-2 min-w-0 min-h-[120px]">
//     <MiniChart
//       color="#facc15"
//       maxY={5}
//       labels={["Start", "Current", "Predicted", "Max"]}
//       customData={[
//         0,
//         convertToFiveScale(subjectData?.percentage_eol || 0),
//         calculatePredictedScore(convertToFiveScale(subjectData?.percentage_eol || 0)),
//         5,
//       ]}
//     />
//   </div>
// </div>

// {/* ------------------ FA ------------------ */}
// <div className="flex flex-col lg:flex-row gap-4 items-start mt-6 px-[30px]">
//   <div className="bg-red-50 border border-red-200 rounded-lg p-4 lg:flex-[0.6] flex-1 min-w-0">
//     <div className="flex justify-between items-center">
//       <div className="bg-red-400 text-white px-4 py-2 w-[100px] text-[12px] rounded text-center font-medium">
//         FA (twice a month)
//       </div>

//       <div className="flex flex-col items-center ml-4">
//         <div className="rounded-md p-2 text-center mb-2 w-24 bg-red-100 text-red-700">
//           <div className="text-md font-bold mb-1">
//             {subjectData?.count_fa || 0}
//           </div>
//           <div className="text-xs font-medium text-red-600">Tasks</div>
//         </div>
//         <div className="rounded-md p-2 text-center w-24 bg-red-200 text-red-800">
//           <div className="text-md font-bold mb-1">
//             {subjectData?.percentage_fa || 0}%
//           </div>
//           <div className="text-xs font-medium text-red-700">Score</div>
//         </div>
//       </div>
      
//     </div>
    
//   </div>

//   {/* Right Side */}
//   <div className="flex-[1.4] bg-white rounded-lg border p-2 min-w-0 min-h-[120px]">
//     <AssessmentTable rows={faRows} terms={faTerms} />
//   </div>
  
// </div>
// <div className="flex gap-4">
//  <div className="border border-gray-200 rounded-lg overflow-hidden basis-[50%]">
//                   <div className="bg-blue-100 px-4 py-2 border-b">
//                     <div className="font-semibold text-gray-800">Descriptive Analysis</div>
//                     <div className="text-sm text-gray-600">({selectedSubject})</div>
//                   </div>
//                   <div className="bg-orange-50 px-4 py-3 text-sm text-gray-800">
//                     {subjectData?.descriptive_eol ||
//                       "No descriptive analysis available for this subject."}
//                   </div>
//                 </div>

//                 {/* Prescriptive */}
//                 <div className="border border-gray-200 rounded-lg overflow-hidden basis-[50%]">
//                   <div className="bg-blue-100 px-4 py-2 border-b">
//                     <div className="font-semibold text-gray-800">Prescriptive Analysis</div>
//                     <div className="text-sm text-gray-600">({selectedSubject})</div>
//                   </div>
//                   <div className="bg-orange-50 px-4 py-3 text-sm text-gray-800">
//                     {subjectData?.prescriptive_eol ||
//                       "No prescriptive analysis available for this subject."}
//                   </div>
//                 </div>
//                 </div>

// {/* ------------------ SA ------------------ */}
// <div className="flex flex-col lg:flex-row gap-4 items-start mt-6 px-[30px]">
//   <div className="bg-green-50 border border-green-200 rounded-lg p-4 lg:flex-[0.6] flex-1 min-w-0">
//     <div className="flex justify-between items-center">
//       <div className="bg-green-400 text-white px-4 py-2 w-[100px] text-[12px] rounded text-center font-medium">
//         SA (twice a year)
//       </div>

//       <div className="flex flex-col items-center ml-4">
//         <div className="rounded-md p-2 text-center mb-2 w-24 bg-green-100 text-green-700">
//           <div className="text-md font-bold mb-1">
//             {subjectData?.count_sa || 0}
//           </div>
//           <div className="text-xs font-medium text-green-600">Tasks</div>
//         </div>
//         <div className="rounded-md p-2 text-center w-24 bg-green-200 text-green-800">
//           <div className="text-md font-bold mb-1">
//             {subjectData?.percentage_sa || 0}%
//           </div>
//           <div className="text-xs font-medium text-green-700">Score</div>
//         </div>
//       </div>
//     </div>
//   </div>

//   {/* Right Side */}
//   <div className="flex-[1.4] bg-white rounded-lg border p-2 min-w-0 min-h-[120px]">
//     <AssessmentTable rows={saRows} terms={saTerms} />
//   </div>
// </div>


//             {/* Smart Analysis */}
//             <div className="flex justify-center py-2">
//               <div className="bg-gradient-to-r from-[#4193df] via-[#57a1e7] to-[#7fbef4] text-white px-4 py-2 rounded font-semibold inline">
//                 Smart Analysis
//               </div>
//             </div>

//             {/* Descriptive & Prescriptive Analysis */}
//             <div className="flex flex-col lg:flex-row gap-6 px-[30px]">
//               <div className="flex-1 flex flex-col gap-6">
//                 {/* Descriptive */}
//                 <div className="border border-gray-200 rounded-lg overflow-hidden">
//                   <div className="bg-blue-100 px-4 py-2 border-b">
//                     <div className="font-semibold text-gray-800">Descriptive Analysis</div>
//                     <div className="text-sm text-gray-600">({selectedSubject})</div>
//                   </div>
//                   <div className="bg-orange-50 px-4 py-3 text-sm text-gray-800">
//                     {subjectData?.descriptive_eol ||
//                       "No descriptive analysis available for this subject."}
//                   </div>
//                 </div>

//                 {/* Prescriptive */}
//                 <div className="border border-gray-200 rounded-lg overflow-hidden">
//                   <div className="bg-blue-100 px-4 py-2 border-b">
//                     <div className="font-semibold text-gray-800">Prescriptive Analysis</div>
//                     <div className="text-sm text-gray-600">({selectedSubject})</div>
//                   </div>
//                   <div className="bg-orange-50 px-4 py-3 text-sm text-gray-800">
//                     {subjectData?.prescriptive_eol ||
//                       "No prescriptive analysis available for this subject."}
//                   </div>
//                 </div>
//               </div>

//               {/* Shared Chart */}
//               <div className="flex-1 bg-white rounded-lg border p-4 min-h-[240px] flex flex-col items-center">
//                 <div className="w-full h-[89%] flex items-center justify-center">
//                   <MiniChart currentScore={score} predictedScore={score*1.1} color="#8b5cf6" stepSize={10} />
//                 </div>
//                 <div className="flex justify-around gap-4 mt-4 text-xs w-full">
//                   <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-red-100 text-red-700 border border-red-200 shadow-sm">
//                     <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
//                     <span>Current: {score}</span>
//                   </div>
//                   <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-yellow-100 text-yellow-700 border border-yellow-200 shadow-sm">
//                     <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
//                     <span>Predicted: {Math.round(score*1.1)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Sentiment Charts */}
//             <div className="mt-8 px-[30px] space-y-8 justify-center flex gap-10">
          
//               <div className="basis-[80%]">
//                 <LearningProgressChart
//                   height="400px"
//                   datasets={attentiveDatasets}
//                   config={attentiveConfig}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IndividualSubject;






import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import studentsData from "../../../data/students.json";
import MiniChart from "../../../CommonComponents/MiniChart";
import AssessmentTable from "../../../CommonComponents/Table";
import LearningProgressChart, { type Dataset } from "../../../CommonComponents/LineGraph";
import type { RootState } from "../../../store/store";
import { setSubject } from "../../../store/store"; // ✅ use setSubject
import { useNavigate } from "react-router-dom";
import Dropdown from "../../../CommonComponents/SubjectDropDown";

const IndividualSubject = () => {
  const dispatch = useDispatch();
  const subjectScores = useSelector((state: RootState) => state.subject.subjects);
  let selectedSubject = useSelector((state: RootState) => state.subject.selectedSubject);

  const firstStudent: any = studentsData[0];
  const currentGrade = Object.keys(firstStudent?.grades || {})[0];

  const navigate = useNavigate();

  // Set default selected subject if none exists
  useEffect(() => {
    if (!selectedSubject && firstStudent) {
      const firstSub = Object.keys(firstStudent?.grades?.[currentGrade]?.subjects || {})[0];
      dispatch(setSubject(firstSub));
    }
  }, [dispatch, selectedSubject, firstStudent, currentGrade]);

  selectedSubject =
    selectedSubject || Object.keys(firstStudent?.grades?.[currentGrade]?.subjects || {})[0];

  const subjectData =
    firstStudent?.grades?.[currentGrade]?.subjects?.[selectedSubject] || null;

  const subjectsArray = Object.keys(firstStudent.grades[currentGrade].subjects);

  // Helper: Convert percentage to 5-point scale
  const convertToFiveScale = (percentage: number) => {
    const scaled = (percentage / 100) * 5;
    return Math.round(scaled);
  };

  // Helper: Calculate predicted score (20% more, max 5)
  const calculatePredictedScore = (current: number) => {
    const predicted = current * 1.2;
    return predicted > 5 ? 5 : Math.round(predicted);
  };

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

  const score = subjectScores[selectedSubject]?.currentScore || 0;

  // Terms
  let faTerms: { name: string }[] = [];
  let saTerms: { name: string }[] = [];

  if (["Grade 10", "Grade 12"].includes(currentGrade)) {
    faTerms = [
      { name: "Term 1 (JUL-SEP)" },
      { name: "Term 2 (OCT-DEC)" },
      { name: "Term 3 (JAN-MAR)" },
    ];
    saTerms = [...faTerms];
  } else {
    faTerms = [
      { name: "Term 1 (JUL-DEC)" },
      { name: "Term 2 (JAN-JUN)" },
    ];
    saTerms = [...faTerms];
  }

  const faRows = ["Writing Test", "Formative Assessment", "SDL", "Steam"];
  const saRows = ["Project Work"];

  const handleSelect = (subject: string) => {
    dispatch(setSubject(subject));
    navigate(`/subject-summary/${subject}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-[1%] md:p-[1%]">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Student Personalised Learning Pathway
          </h1>

          <div className="mt-4 mx-auto flex justify-center">
            <Dropdown
              options={subjectsArray}
              selected={selectedSubject}
              onSelect={handleSelect}
              placeholder="Select Subject"
            />
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          <div className="flex-1 xl:flex-[2] space-y-6">
            {/* Academic Scores Heading */}
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-[#4193df] via-[#57a1e7] to-[#7fbef4] text-white px-4 py-2 rounded font-semibold inline">
                Academic Scores
              </div>
            </div>

            {/* ------------------ EOL ------------------ */}
            <div className="flex flex-col lg:flex-row gap-4 items-start mt-6 px-4 sm:px-6 md:px-[30px] w-full">
              {/* Left Card */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex-1 min-w-0 lg:flex-[0.6] w-full">
                <div className="flex justify-between items-center">
                  <div className="bg-yellow-400 text-gray-800 px-3 py-1 text-xs sm:text-sm rounded text-center font-medium w-[80px] sm:w-[100px]">
                    EOL (Daily)
                  </div>
                  <div className="flex flex-col items-center ml-4">
                    <div className="rounded-md p-2 text-center mb-2 w-20 sm:w-24 bg-yellow-100 text-yellow-700">
                      <div className="text-sm sm:text-md font-bold mb-1">
                        {subjectData?.count_eol || 0}
                      </div>
                      <div className="text-xs font-medium text-yellow-600">Tasks</div>
                    </div>
                    <div className="rounded-md p-2 text-center w-20 sm:w-24 bg-yellow-200 text-yellow-800">
                      <div className="text-sm sm:text-md font-bold mb-1">
                        {subjectData?.percentage_eol || 0}%
                      </div>
                      <div className="text-xs font-medium text-yellow-700">Score</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Chart */}
              <div className="flex-1 lg:flex-[1.4] bg-white rounded-lg border p-2 min-w-0 min-h-[120px] w-full">
                <MiniChart
                  color="#facc15"
                  maxY={5}
                  labels={["Start", "Current", "Predicted", "Max"]}
                  customData={[
                    0,
                    convertToFiveScale(subjectData?.percentage_eol || 0),
                    calculatePredictedScore(
                      convertToFiveScale(subjectData?.percentage_eol || 0)
                    ),
                    5,
                  ]}
                />
              </div>
            </div>

            {/* ------------------ FA ------------------ */}
            <div className="flex flex-col lg:flex-row gap-4 items-start mt-6 px-4 sm:px-6 md:px-[30px] w-full">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex-1 min-w-0 lg:flex-[0.6] w-full">
                <div className="flex justify-between items-center">
                  <div className="bg-red-400 text-white px-3 py-1 text-xs sm:text-sm rounded text-center font-medium w-[80px] sm:w-[100px]">
                    FA (twice a month)
                  </div>
                  <div className="flex flex-col items-center ml-4">
                    <div className="rounded-md p-2 text-center mb-2 w-20 sm:w-24 bg-red-100 text-red-700">
                      <div className="text-sm sm:text-md font-bold mb-1">
                        {subjectData?.count_fa || 0}
                      </div>
                      <div className="text-xs font-medium text-red-600">Tasks</div>
                    </div>
                    <div className="rounded-md p-2 text-center w-20 sm:w-24 bg-red-200 text-red-800">
                      <div className="text-sm sm:text-md font-bold mb-1">
                        {subjectData?.percentage_fa || 0}%
                      </div>
                      <div className="text-xs font-medium text-red-700">Score</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 lg:flex-[1.4] bg-white rounded-lg border p-2 min-w-0 min-h-[120px] w-full">
                <AssessmentTable rows={faRows} terms={faTerms} />
              </div>
            </div>

            {/* Descriptive & Prescriptive (FA/EOL Analysis) */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 px-4 sm:px-6 md:px-[30px] w-full">
              <div className="border border-gray-200 rounded-lg overflow-hidden basis-full sm:basis-1/2">
                <div className="bg-blue-100 px-4 py-2 border-b">
                  <div className="font-semibold text-gray-800">Descriptive Analysis</div>
                  <div className="text-sm text-gray-600">({selectedSubject})</div>
                </div>
                <div className="bg-orange-50 px-4 py-3 text-sm text-gray-800">
                  {subjectData?.descriptive_eol ||
                    "No descriptive analysis available for this subject."}
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden basis-full sm:basis-1/2">
                <div className="bg-blue-100 px-4 py-2 border-b">
                  <div className="font-semibold text-gray-800">Prescriptive Analysis</div>
                  <div className="text-sm text-gray-600">({selectedSubject})</div>
                </div>
                <div className="bg-orange-50 px-4 py-3 text-sm text-gray-800">
                  {subjectData?.prescriptive_eol ||
                    "No prescriptive analysis available for this subject."}
                </div>
              </div>
            </div>

            {/* ------------------ SA ------------------ */}
            <div className="flex flex-col lg:flex-row gap-4 items-start mt-6 px-4 sm:px-6 md:px-[30px] w-full">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex-1 min-w-0 lg:flex-[0.6] w-full">
                <div className="flex justify-between items-center">
                  <div className="bg-green-400 text-white px-3 py-1 text-xs sm:text-sm rounded text-center font-medium w-[80px] sm:w-[100px]">
                    SA (twice a year)
                  </div>
                  <div className="flex flex-col items-center ml-4">
                    <div className="rounded-md p-2 text-center mb-2 w-20 sm:w-24 bg-green-100 text-green-700">
                      <div className="text-sm sm:text-md font-bold mb-1">
                        {subjectData?.count_sa || 0}
                      </div>
                      <div className="text-xs font-medium text-green-600">Tasks</div>
                    </div>
                    <div className="rounded-md p-2 text-center w-20 sm:w-24 bg-green-200 text-green-800">
                      <div className="text-sm sm:text-md font-bold mb-1">
                        {subjectData?.percentage_sa || 0}%
                      </div>
                      <div className="text-xs font-medium text-green-700">Score</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 lg:flex-[1.4] bg-white rounded-lg border p-2 min-w-0 min-h-[120px] w-full">
                <AssessmentTable rows={saRows} terms={saTerms} />
              </div>
            </div>

            {/* Smart Analysis */}
            <div className="flex justify-center py-2">
              <div className="bg-gradient-to-r from-[#4193df] via-[#57a1e7] to-[#7fbef4] text-white px-4 py-2 rounded font-semibold inline">
                Smart Analysis
              </div>
            </div>

            {/* Descriptive & Prescriptive Analysis */}
            <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 md:px-[30px] w-full">
              <div className="flex-1 flex flex-col gap-6">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-blue-100 px-4 py-2 border-b">
                    <div className="font-semibold text-gray-800">Descriptive Analysis</div>
                    <div className="text-sm text-gray-600">({selectedSubject})</div>
                  </div>
                  <div className="bg-orange-50 px-4 py-3 text-sm text-gray-800">
                    {subjectData?.descriptive_eol ||
                      "No descriptive analysis available for this subject."}
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-blue-100 px-4 py-2 border-b">
                    <div className="font-semibold text-gray-800">Prescriptive Analysis</div>
                    <div className="text-sm text-gray-600">({selectedSubject})</div>
                  </div>
                  <div className="bg-orange-50 px-4 py-3 text-sm text-gray-800">
                    {subjectData?.prescriptive_eol ||
                      "No prescriptive analysis available for this subject."}
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-white rounded-lg border p-4 min-h-[240px] flex flex-col items-center">
                <div className="w-full h-[89%] flex items-center justify-center">
                  <MiniChart
                    currentScore={score}
                    predictedScore={score * 1.1}
                    color="#8b5cf6"
                    stepSize={10}
                  />
                </div>
                <div className="flex justify-around gap-4 mt-4 text-xs w-full">
                  <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-red-100 text-red-700 border border-red-200 shadow-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    <span>Current: {score}</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-yellow-100 text-yellow-700 border border-yellow-200 shadow-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                    <span>Predicted: {Math.round(score * 1.1)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sentiment Charts */}
            <div className="mt-8 px-4 sm:px-6 md:px-[30px] space-y-8 flex flex-col items-center">
              <div className="w-full lg:basis-[80%]">
                <LearningProgressChart
                  height="400px"
                  datasets={attentiveDatasets}
                  config={attentiveConfig}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualSubject;