import { ResumeSidebar } from './ResumeSidebar';
import { ResumeForm } from './ResumeForm';
import { PDFPreview } from './PDFPreview';
import { Separator } from './ui/separator';

export function Layout() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Sidebar - Resume Versions */}
      <div className="w-64 border-r bg-muted/30">
        <ResumeSidebar />
      </div>

      <Separator orientation="vertical" />

      {/* Middle Panel - Input Form */}
      <div className="flex-1 overflow-auto">
        <ResumeForm />
      </div>

      <Separator orientation="vertical" />

      {/* Right Panel - PDF Preview */}
      <div className="w-1/2 bg-muted/20">
        <PDFPreview />
      </div>
    </div>
  );
}
