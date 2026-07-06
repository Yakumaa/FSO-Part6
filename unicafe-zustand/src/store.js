import { create } from 'zustand';

export const useFeedbackStore = create((set) => ({
  good: 0,
  neutral: 0,
  bad: 0,
  all: 0,
  average: 0,
  positive: 0,
  actions: {
    incrementGood: () => set((state) => ({ good: state.good + 1 })),
    incrementNeutral: () => set((state) => ({ neutral: state.neutral + 1 })),
    incrementBad: () => set((state) => ({ bad: state.bad + 1 }))
  }
}));

export const useFeedbacks = () => {
  const good = useFeedbackStore((state) => state.good);
  const neutral = useFeedbackStore((state) => state.neutral);
  const bad = useFeedbackStore((state) => state.bad);

  const all = good + neutral + bad;
  const average = all === 0 ? 0 : Math.round(((good - bad) / all) * 10) / 10;
  const positive = all === 0 ? 0 : Math.round((good / all) * 1000) / 10;

  return { good, neutral, bad, all, average, positive };
};


export const useFeedbackActions = () => useFeedbackStore((state) => state.actions);