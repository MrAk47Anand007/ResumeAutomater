import { create } from 'zustand';
import type { Resume, ResumeData, LaTeXTemplate } from '@/types/resume';
import { storage } from '@/lib/storage';

interface ResumeStore {
  resumes: Resume[];
  currentResumeId: string | null;

  // Actions
  loadState: () => void;
  createResume: (name: string, template: LaTeXTemplate) => Resume;
  updateResumeData: (resumeId: string, data: ResumeData) => void;
  updateResumeTemplate: (resumeId: string, template: LaTeXTemplate) => void;
  updateCustomLatex: (resumeId: string, latex: string) => void;
  deleteResume: (resumeId: string) => void;
  setCurrentResume: (resumeId: string) => void;
  getCurrentResume: () => Resume | null;
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  resumes: [],
  currentResumeId: null,

  loadState: () => {
    const state = storage.getState();
    set({ resumes: state.resumes, currentResumeId: state.currentResumeId });
  },

  createResume: (name: string, template: LaTeXTemplate) => {
    const newResume: Resume = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      data: {
        personalInfo: {
          fullName: '',
          email: '',
          phone: '',
          location: '',
        },
        education: [],
        experience: [],
        projects: [],
        skills: [],
        certificates: [],
      },
      template,
    };

    storage.addResume(newResume);
    set({
      resumes: [...get().resumes, newResume],
      currentResumeId: newResume.id,
    });

    return newResume;
  },

  updateResumeData: (resumeId: string, data: ResumeData) => {
    storage.updateResume(resumeId, { data });
    const resumes = get().resumes.map(r =>
      r.id === resumeId ? { ...r, data, updatedAt: new Date().toISOString() } : r
    );
    set({ resumes });
  },

  updateResumeTemplate: (resumeId: string, template: LaTeXTemplate) => {
    storage.updateResume(resumeId, { template });
    const resumes = get().resumes.map(r =>
      r.id === resumeId ? { ...r, template, updatedAt: new Date().toISOString() } : r
    );
    set({ resumes });
  },

  updateCustomLatex: (resumeId: string, latex: string) => {
    storage.updateResume(resumeId, { customLatex: latex });
    const resumes = get().resumes.map(r =>
      r.id === resumeId ? { ...r, customLatex: latex, updatedAt: new Date().toISOString() } : r
    );
    set({ resumes });
  },

  deleteResume: (resumeId: string) => {
    storage.deleteResume(resumeId);
    const state = storage.getState();
    set({ resumes: state.resumes, currentResumeId: state.currentResumeId });
  },

  setCurrentResume: (resumeId: string) => {
    storage.setCurrentResume(resumeId);
    set({ currentResumeId: resumeId });
  },

  getCurrentResume: () => {
    const { resumes, currentResumeId } = get();
    return resumes.find(r => r.id === currentResumeId) || null;
  },
}));
