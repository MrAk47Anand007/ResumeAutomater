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
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold mb-4 text-foreground">Resume Versions</h2>
        <Button onClick={handleCreateResume} className="w-full shadow-sm" size="default">
          <Plus className="mr-2 h-4 w-4" />
          New Resume
        </Button>
      </div>

      {/* Resume List */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {resumes.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground p-8 bg-muted/50 rounded-lg m-2">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No resumes yet</p>
              <p className="text-xs mt-1">Create one to get started!</p>
            </div>
          ) : (
            resumes.map((resume) => (
              <div
                key={resume.id}
                className={cn(
                  'flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200',
                  'hover:bg-accent/80 hover:shadow-sm border border-transparent',
                  currentResumeId === resume.id && 'bg-accent border-primary/20 shadow-sm'
                )}
                onClick={() => setCurrentResume(resume.id)}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={cn(
                    "p-2 rounded-md bg-primary/10",
                    currentResumeId === resume.id && "bg-primary/20"
                  )}>
                    <FileText className={cn(
                      "h-4 w-4",
                      currentResumeId === resume.id ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{resume.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
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
