// import { createSlice, configureStore } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';


// interface SubjectState {
//   selectedSubject: string | null;
// }

// const initialState: SubjectState = {
//   selectedSubject: null
// };

// const subjectSlice = createSlice({
//   name: 'subject',
//   initialState,
//   reducers: {
//     setSubject: (state, action: PayloadAction<string | null>) => {
//       state.selectedSubject = action.payload;
//     }
//   }
// });

// export const { setSubject } = subjectSlice.actions;

// export const store = configureStore({
//   reducer: {
//     subject: subjectSlice.reducer
//   }
// });

// store/store.ts
import { createSlice, configureStore } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface SubjectScores {
  [subject: string]: {
    currentScore: number;
    predictedScore: number;
  };
}

interface SubjectState {
  selectedSubject: string | null;
  subjects: SubjectScores;  // ✅ store scores here
}

const initialState: SubjectState = {
  selectedSubject: null,
  subjects: {}
};

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    setSubject: (state, action: PayloadAction<string | null>) => {
      state.selectedSubject = action.payload;
    },
    setSubjectScore: (
      state,
      action: PayloadAction<{ subject: string; currentScore: number; predictedScore: number }>
    ) => {
      const { subject, currentScore, predictedScore } = action.payload;
      state.subjects[subject] = { currentScore, predictedScore };
    }
  }
});

export const { setSubject, setSubjectScore } = subjectSlice.actions;

export const store = configureStore({
  reducer: {
    subject: subjectSlice.reducer
  }
});

// ✅ Add types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

