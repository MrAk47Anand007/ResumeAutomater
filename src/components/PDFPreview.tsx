import { useState, useEffect } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { generateLatexDocument } from '@/lib/latexCompiler';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Download, FileCode, Eye } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

export function PDFPreview() {
  const { getCurrentResume } = useResumeStore();
  const currentResume = getCurrentResume();
  const [latexSource, setLatexSource] = useState('');
  const [viewMode, setViewMode] = useState<'preview' | 'source'>('source');

  useEffect(() => {
    if (currentResume) {
      const latex = generateLatexDocument(currentResume);
      setLatexSource(latex);
    }
  }, [currentResume]);

  const handleDownloadLatex = () => {
    if (!currentResume) return;

    const blob = new Blob([latexSource], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentResume.name}.tex`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadCls = () => {
    if (!currentResume) return;

    const blob = new Blob([currentResume.template.clsContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.cls';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!currentResume) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">No preview available</p>
          <p className="text-sm text-muted-foreground mt-2">
            Select or create a resume to see the preview
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Preview</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleDownloadLatex}>
              <Download className="mr-2 h-4 w-4" />
              .tex
            </Button>
            <Button size="sm" variant="outline" onClick={handleDownloadCls}>
              <Download className="mr-2 h-4 w-4" />
              .cls
            </Button>
          </div>
        </div>

        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'preview' | 'source')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="source">
              <FileCode className="mr-2 h-4 w-4" />
              LaTeX Source
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="mr-2 h-4 w-4" />
              PDF Preview
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'source' ? (
          <ScrollArea className="h-full">
            <pre className="p-4 text-xs font-mono bg-muted/50">
              <code>{latexSource}</code>
            </pre>
          </ScrollArea>
        ) : (
          <div className="h-full flex items-center justify-center bg-muted/50">
            <div className="text-center p-8">
              <p className="text-lg font-medium mb-2">PDF Preview Coming Soon</p>
              <p className="text-sm text-muted-foreground mb-4">
                PDF compilation requires a LaTeX server. For now, you can download the .tex and .cls files
                and compile them locally using your preferred LaTeX compiler.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>To compile locally:</p>
                <ol className="list-decimal list-inside text-left max-w-md mx-auto">
                  <li>Download both .tex and .cls files</li>
                  <li>Place them in the same directory</li>
                  <li>Run: pdflatex {currentResume.name}.tex</li>
                  <li>Your PDF will be generated!</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
