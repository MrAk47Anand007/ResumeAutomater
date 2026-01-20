import type { Resume, Education } from '@/types/resume';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface EducationFormProps {
  resume: Resume;
}

export function EducationForm({ resume }: EducationFormProps) {
  const { updateResumeData } = useResumeStore();

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    };

    updateResumeData(resume.id, {
      ...resume.data,
      education: [...resume.data.education, newEducation],
    });
  };

  const handleRemoveEducation = (id: string) => {
    updateResumeData(resume.id, {
      ...resume.data,
      education: resume.data.education.filter((e) => e.id !== id),
    });
  };

  const handleChange = (id: string, field: keyof Education, value: string) => {
    updateResumeData(resume.id, {
      ...resume.data,
      education: resume.data.education.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Education</h3>
          <p className="text-sm text-muted-foreground">Add your educational background</p>
        </div>
        <Button onClick={handleAddEducation} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </div>

      {resume.data.education.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No education added yet. Click &quot;Add Education&quot; to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {resume.data.education.map((edu) => (
            <Card key={edu.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {edu.institution || 'New Education'}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveEducation(edu.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Institution *</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => handleChange(edu.id, 'institution', e.target.value)}
                    placeholder="University of Example"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Degree *</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                      placeholder="Bachelor of Science"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Field of Study *</Label>
                    <Input
                      value={edu.field}
                      onChange={(e) => handleChange(edu.id, 'field', e.target.value)}
                      placeholder="Computer Science"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Input
                      value={edu.startDate}
                      onChange={(e) => handleChange(edu.id, 'startDate', e.target.value)}
                      placeholder="Aug 2018"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>End Date *</Label>
                    <Input
                      value={edu.endDate}
                      onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)}
                      placeholder="May 2022"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>GPA (Optional)</Label>
                    <Input
                      value={edu.gpa || ''}
                      onChange={(e) => handleChange(edu.id, 'gpa', e.target.value)}
                      placeholder="3.8/4.0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description (Optional)</Label>
                  <Textarea
                    value={edu.description || ''}
                    onChange={(e) => handleChange(edu.id, 'description', e.target.value)}
                    placeholder="Relevant coursework, honors, activities..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
