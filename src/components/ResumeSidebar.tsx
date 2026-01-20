import { useEffect } from 'react';
import { FileText, Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { defaultTemplate } from '@/lib/templates';

export function ResumeSidebar() {
  const { resumes, currentResumeId, loadState, createResume, deleteResume, setCurrentResume } = useResumeStore();

  useEffect(() => {
    loadState();
  }, [loadState]);

  const handleCreateResume = () => {
    const resumeName = `Resume ${resumes.length + 1}`;
    createResume(resumeName, defaultTemplate);
  };

  const handleDeleteResume = (resumeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this resume?')) {
      deleteResume(resumeId);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-3">Resume Versions</h2>
        <Button onClick={handleCreateResume} className="w-full" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Resume
        </Button>
      </div>

      {/* Resume List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {resumes.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground p-4">
              No resumes yet. Create one to get started!
            </div>
          ) : (
            resumes.map((resume) => (
              <div
                key={resume.id}
                className={cn(
                  'flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent',
                  currentResumeId === resume.id && 'bg-accent'
                )}
                onClick={() => setCurrentResume(resume.id)}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <FileText className="h-4 w-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{resume.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0"
                  onClick={(e) => handleDeleteResume(resume.id, e)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
