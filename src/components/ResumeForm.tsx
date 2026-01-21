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
import { User, GraduationCap, Briefcase, FolderGit2, Code, Award, FileCode2 } from 'lucide-react';

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
      <div className="flex items-center justify-center h-full bg-muted/30">
        <div className="text-center p-8 bg-background rounded-lg shadow-sm border border-border">
          <User className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-xl font-semibold text-foreground mb-2">No resume selected</p>
          <p className="text-sm text-muted-foreground">
            Create a new resume or select an existing one from the sidebar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border bg-background">
        <h1 className="text-3xl font-bold text-foreground">{currentResume.name}</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Last updated: {new Date(currentResume.updatedAt).toLocaleString()}
        </p>
      </div>

      {/* Form Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-border bg-muted/20">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent px-6">
            <TabsTrigger
              value="personal"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background/50 px-4 py-3"
            >
              <User className="mr-2 h-4 w-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background/50 px-4 py-3"
            >
              <GraduationCap className="mr-2 h-4 w-4" />
              Education
            </TabsTrigger>
            <TabsTrigger
              value="experience"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background/50 px-4 py-3"
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Experience
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background/50 px-4 py-3"
            >
              <FolderGit2 className="mr-2 h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background/50 px-4 py-3"
            >
              <Code className="mr-2 h-4 w-4" />
              Skills
            </TabsTrigger>
            <TabsTrigger
              value="certificates"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background/50 px-4 py-3"
            >
              <Award className="mr-2 h-4 w-4" />
              Certificates
            </TabsTrigger>
            <TabsTrigger
              value="latex"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background/50 px-4 py-3"
            >
              <FileCode2 className="mr-2 h-4 w-4" />
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
