import type { Resume, AppState } from '@/types/resume';

const STORAGE_KEY = 'resume-automater-state';

export const storage = {
  getState: (): AppState => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        return { resumes: [], currentResumeId: null };
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading state from localStorage:', error);
      return { resumes: [], currentResumeId: null };
    }
  },

  setState: (state: AppState): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving state to localStorage:', error);
    }
  },

  addResume: (resume: Resume): void => {
    const state = storage.getState();
    state.resumes.push(resume);
    state.currentResumeId = resume.id;
    storage.setState(state);
  },

  updateResume: (resumeId: string, updates: Partial<Resume>): void => {
    const state = storage.getState();
    const index = state.resumes.findIndex(r => r.id === resumeId);
    if (index !== -1) {
      state.resumes[index] = {
        ...state.resumes[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      storage.setState(state);
    }
  },

  deleteResume: (resumeId: string): void => {
    const state = storage.getState();
    state.resumes = state.resumes.filter(r => r.id !== resumeId);
    if (state.currentResumeId === resumeId) {
      state.currentResumeId = state.resumes.length > 0 ? state.resumes[0].id : null;
    }
    storage.setState(state);
  },

  setCurrentResume: (resumeId: string): void => {
    const state = storage.getState();
    state.currentResumeId = resumeId;
    storage.setState(state);
  },

  clear: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },
};
