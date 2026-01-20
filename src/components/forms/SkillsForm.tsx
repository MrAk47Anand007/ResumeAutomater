import type { Resume, Skill } from '@/types/resume';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface SkillsFormProps {
  resume: Resume;
}

export function SkillsForm({ resume }: SkillsFormProps) {
  const { updateResumeData } = useResumeStore();

  const handleAddSkillCategory = () => {
    const newSkill: Skill = {
      category: '',
      items: [],
    };

    updateResumeData(resume.id, {
      ...resume.data,
      skills: [...resume.data.skills, newSkill],
    });
  };

  const handleRemoveSkillCategory = (index: number) => {
    updateResumeData(resume.id, {
      ...resume.data,
      skills: resume.data.skills.filter((_, i) => i !== index),
    });
  };

  const handleCategoryChange = (index: number, category: string) => {
    updateResumeData(resume.id, {
      ...resume.data,
      skills: resume.data.skills.map((s, i) =>
        i === index ? { ...s, category } : s
      ),
    });
  };

  const handleItemsChange = (index: number, value: string) => {
    const items = value.split(',').map((t) => t.trim()).filter(Boolean);
    updateResumeData(resume.id, {
      ...resume.data,
      skills: resume.data.skills.map((s, i) =>
        i === index ? { ...s, items } : s
      ),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Skills</h3>
          <p className="text-sm text-muted-foreground">
            Organize your skills into categories
          </p>
        </div>
        <Button onClick={handleAddSkillCategory} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {resume.data.skills.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No skills added yet. Click &quot;Add Category&quot; to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {resume.data.skills.map((skill, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {skill.category || 'New Skill Category'}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveSkillCategory(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Category Name *</Label>
                  <Input
                    value={skill.category}
                    onChange={(e) => handleCategoryChange(index, e.target.value)}
                    placeholder="Programming Languages, Frameworks, Tools, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Skills *</Label>
                  <Input
                    value={skill.items.join(', ')}
                    onChange={(e) => handleItemsChange(index, e.target.value)}
                    placeholder="JavaScript, TypeScript, React, Node.js (comma-separated)"
                  />
                  <p className="text-xs text-muted-foreground">
                    Separate skills with commas
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
