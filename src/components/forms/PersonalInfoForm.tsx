import type { Resume } from '@/types/resume';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface PersonalInfoFormProps {
  resume: Resume;
}

export function PersonalInfoForm({ resume }: PersonalInfoFormProps) {
  const { updateResumeData } = useResumeStore();

  const handleChange = (field: keyof Resume['data']['personalInfo'], value: string) => {
    updateResumeData(resume.id, {
      ...resume.data,
      personalInfo: {
        ...resume.data.personalInfo,
        [field]: value,
      },
    });
  };

  const handleSummaryChange = (value: string) => {
    updateResumeData(resume.id, {
      ...resume.data,
      summary: value,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your basic contact and identification details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={resume.data.personalInfo.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={resume.data.personalInfo.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                value={resume.data.personalInfo.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={resume.data.personalInfo.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="New York, NY"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={resume.data.personalInfo.linkedin || ''}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                placeholder="linkedin.com/in/johndoe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                value={resume.data.personalInfo.github || ''}
                onChange={(e) => handleChange('github', e.target.value)}
                placeholder="github.com/johndoe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={resume.data.personalInfo.website || ''}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="johndoe.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
          <CardDescription>A brief overview of your professional background and goals</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={resume.data.summary || ''}
            onChange={(e) => handleSummaryChange(e.target.value)}
            placeholder="Experienced software engineer with 5+ years in full-stack development..."
            rows={6}
          />
        </CardContent>
      </Card>
    </div>
  );
}
