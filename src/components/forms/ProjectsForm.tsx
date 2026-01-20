import type { Resume, Project } from '@/types/resume';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface ProjectsFormProps {
  resume: Resume;
}

export function ProjectsForm({ resume }: ProjectsFormProps) {
  const { updateResumeData } = useResumeStore();

  const handleAddProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      technologies: [],
    };

    updateResumeData(resume.id, {
      ...resume.data,
      projects: [...resume.data.projects, newProject],
    });
  };

  const handleRemoveProject = (id: string) => {
    updateResumeData(resume.id, {
      ...resume.data,
      projects: resume.data.projects.filter((p) => p.id !== id),
    });
  };

  const handleChange = (id: string, field: keyof Project, value: string | string[]) => {
    updateResumeData(resume.id, {
      ...resume.data,
      projects: resume.data.projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    });
  };

  const handleTechnologiesChange = (id: string, value: string) => {
    const technologies = value.split(',').map((t) => t.trim()).filter(Boolean);
    handleChange(id, 'technologies', technologies);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Projects</h3>
          <p className="text-sm text-muted-foreground">Showcase your personal and professional projects</p>
        </div>
        <Button onClick={handleAddProject} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {resume.data.projects.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No projects added yet. Click &quot;Add Project&quot; to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {resume.data.projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {project.name || 'New Project'}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveProject(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Project Name *</Label>
                  <Input
                    value={project.name}
                    onChange={(e) => handleChange(project.id, 'name', e.target.value)}
                    placeholder="E-commerce Platform"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => handleChange(project.id, 'description', e.target.value)}
                    placeholder="Built a full-stack e-commerce platform with payment integration..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Technologies *</Label>
                  <Input
                    value={project.technologies.join(', ')}
                    onChange={(e) => handleTechnologiesChange(project.id, e.target.value)}
                    placeholder="React, Node.js, MongoDB, AWS (comma-separated)"
                  />
                  <p className="text-xs text-muted-foreground">
                    Separate technologies with commas
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>GitHub (Optional)</Label>
                    <Input
                      value={project.github || ''}
                      onChange={(e) => handleChange(project.id, 'github', e.target.value)}
                      placeholder="https://github.com/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Live Link (Optional)</Label>
                    <Input
                      value={project.link || ''}
                      onChange={(e) => handleChange(project.id, 'link', e.target.value)}
                      placeholder="https://project.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
