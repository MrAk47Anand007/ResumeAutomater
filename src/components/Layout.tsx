import { ResumeSidebar } from './ResumeSidebar';
import { ResumeForm } from './ResumeForm';
import { PDFPreview } from './PDFPreview';

export function Layout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Left Sidebar - Resume Versions */}
      <div className="w-72 border-r border-border bg-muted/40 shadow-sm">
        <ResumeSidebar />
      </div>

      {/* Middle Panel - Input Form */}
      <div className="flex-1 overflow-hidden bg-background">
        <ResumeForm />
      </div>

      {/* Right Panel - PDF Preview */}
      <div className="w-[45%] border-l border-border bg-muted/20 shadow-sm">
        <PDFPreview />
      </div>
    </div>
  );
}
