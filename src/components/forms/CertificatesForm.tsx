import type { Resume, Certificate } from '@/types/resume';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface CertificatesFormProps {
  resume: Resume;
}

export function CertificatesForm({ resume }: CertificatesFormProps) {
  const { updateResumeData } = useResumeStore();

  const handleAddCertificate = () => {
    const newCertificate: Certificate = {
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      date: '',
    };

    updateResumeData(resume.id, {
      ...resume.data,
      certificates: [...resume.data.certificates, newCertificate],
    });
  };

  const handleRemoveCertificate = (id: string) => {
    updateResumeData(resume.id, {
      ...resume.data,
      certificates: resume.data.certificates.filter((c) => c.id !== id),
    });
  };

  const handleChange = (id: string, field: keyof Certificate, value: string) => {
    updateResumeData(resume.id, {
      ...resume.data,
      certificates: resume.data.certificates.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Certifications</h3>
          <p className="text-sm text-muted-foreground">
            Add your professional certifications and licenses
          </p>
        </div>
        <Button onClick={handleAddCertificate} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Certificate
        </Button>
      </div>

      {resume.data.certificates.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No certificates added yet. Click &quot;Add Certificate&quot; to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {resume.data.certificates.map((cert) => (
            <Card key={cert.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {cert.name || 'New Certificate'}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveCertificate(cert.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Certificate Name *</Label>
                  <Input
                    value={cert.name}
                    onChange={(e) => handleChange(cert.id, 'name', e.target.value)}
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Issuing Organization *</Label>
                    <Input
                      value={cert.issuer}
                      onChange={(e) => handleChange(cert.id, 'issuer', e.target.value)}
                      placeholder="Amazon Web Services"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Issue Date *</Label>
                    <Input
                      value={cert.date}
                      onChange={(e) => handleChange(cert.id, 'date', e.target.value)}
                      placeholder="Jan 2023"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Credential URL (Optional)</Label>
                  <Input
                    value={cert.link || ''}
                    onChange={(e) => handleChange(cert.id, 'link', e.target.value)}
                    placeholder="https://credentials.example.com/..."
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
