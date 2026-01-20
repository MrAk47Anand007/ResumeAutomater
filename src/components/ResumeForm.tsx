import { useEffect, useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { EducationForm } from './forms/EducationForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { SkillsForm } from './forms/SkillsForm';
import { CertificatesForm } from './forms/CertificatesForm';
import { LaTeXEditorForm } from './forms/LaTeXEditorForm';

export function ResumeForm() {
  const { getCurrentResume } = useResumeStore();
  const currentResume = getCurrentResume();
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    // Reset to personal tab when resume changes
    setActiveTab('personal');
  }, [currentResume?.id]);

  if (!currentResume) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">No resume selected</p>
          <p className="text-sm text-muted-foreground mt-2">
            Create a new resume or select an existing one
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold">{currentResume.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Last updated: {new Date(currentResume.updatedAt).toLocaleString()}
        </p>
      </div>

      {/* Form Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b px-6">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
            <TabsTrigger value="personal" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Personal
            </TabsTrigger>
            <TabsTrigger value="education" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Education
            </TabsTrigger>
            <TabsTrigger value="experience" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Experience
            </TabsTrigger>
            <TabsTrigger value="projects" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Projects
            </TabsTrigger>
            <TabsTrigger value="skills" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Skills
            </TabsTrigger>
            <TabsTrigger value="certificates" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Certificates
            </TabsTrigger>
            <TabsTrigger value="latex" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              LaTeX Editor
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6">
            <TabsContent value="personal" className="mt-0">
              <PersonalInfoForm resume={currentResume} />
            </TabsContent>

            <TabsContent value="education" className="mt-0">
              <EducationForm resume={currentResume} />
            </TabsContent>

            <TabsContent value="experience" className="mt-0">
              <ExperienceForm resume={currentResume} />
            </TabsContent>

            <TabsContent value="projects" className="mt-0">
              <ProjectsForm resume={currentResume} />
            </TabsContent>

            <TabsContent value="skills" className="mt-0">
              <SkillsForm resume={currentResume} />
            </TabsContent>

            <TabsContent value="certificates" className="mt-0">
              <CertificatesForm resume={currentResume} />
            </TabsContent>

            <TabsContent value="latex" className="mt-0">
              <LaTeXEditorForm resume={currentResume} />
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
