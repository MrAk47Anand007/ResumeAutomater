import type { Resume, Experience } from '@/types/resume';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus, Trash2, X } from 'lucide-react';

interface ExperienceFormProps {
  resume: Resume;
}

export function ExperienceForm({ resume }: ExperienceFormProps) {
  const { updateResumeData } = useResumeStore();

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [],
    };

    updateResumeData(resume.id, {
      ...resume.data,
      experience: [...resume.data.experience, newExperience],
    });
  };

  const handleRemoveExperience = (id: string) => {
    updateResumeData(resume.id, {
      ...resume.data,
      experience: resume.data.experience.filter((e) => e.id !== id),
    });
  };

  const handleChange = (id: string, field: keyof Experience, value: string | boolean) => {
    updateResumeData(resume.id, {
      ...resume.data,
      experience: resume.data.experience.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });
  };

  const handleAddDescriptionItem = (id: string) => {
    updateResumeData(resume.id, {
      ...resume.data,
      experience: resume.data.experience.map((e) =>
        e.id === id ? { ...e, description: [...e.description, ''] } : e
      ),
    });
  };

  const handleRemoveDescriptionItem = (expId: string, index: number) => {
    updateResumeData(resume.id, {
      ...resume.data,
      experience: resume.data.experience.map((e) =>
        e.id === expId
          ? { ...e, description: e.description.filter((_, i) => i !== index) }
          : e
      ),
    });
  };

  const handleDescriptionChange = (expId: string, index: number, value: string) => {
    updateResumeData(resume.id, {
      ...resume.data,
      experience: resume.data.experience.map((e) =>
        e.id === expId
          ? {
              ...e,
              description: e.description.map((d, i) => (i === index ? value : d)),
            }
          : e
      ),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Work Experience</h3>
          <p className="text-sm text-muted-foreground">Add your professional experience</p>
        </div>
        <Button onClick={handleAddExperience} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {resume.data.experience.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No experience added yet. Click &quot;Add Experience&quot; to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {resume.data.experience.map((exp) => (
            <Card key={exp.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {exp.position || 'New Experience'} {exp.company && `at ${exp.company}`}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveExperience(exp.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company *</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                      placeholder="Tech Corp"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Position *</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) => handleChange(exp.id, 'position', e.target.value)}
                      placeholder="Software Engineer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Location *</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) => handleChange(exp.id, 'location', e.target.value)}
                    placeholder="San Francisco, CA"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Input
                      value={exp.startDate}
                      onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
                      placeholder="Jan 2020"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      value={exp.endDate}
                      onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
                      placeholder="Dec 2022"
                      disabled={exp.current}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Current Position</Label>
                    <div className="flex items-center h-10">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => handleChange(exp.id, 'current', e.target.checked)}
                        className="h-4 w-4"
                      />
                      <span className="ml-2 text-sm">I currently work here</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Responsibilities & Achievements</Label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddDescriptionItem(exp.id)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Item
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {exp.description.map((desc, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={desc}
                          onChange={(e) =>
                            handleDescriptionChange(exp.id, index, e.target.value)
                          }
                          placeholder="Describe your achievement or responsibility..."
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveDescriptionItem(exp.id, index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    {exp.description.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        Add bullet points describing your work
                      </p>
                    )}
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
