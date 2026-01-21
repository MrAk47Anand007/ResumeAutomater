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
      <div className="flex items-center justify-center h-full bg-muted/30">
        <div className="text-center p-8 bg-background rounded-lg shadow-sm border border-border">
          <Eye className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-xl font-semibold text-foreground mb-2">No preview available</p>
          <p className="text-sm text-muted-foreground">
            Select or create a resume to see the preview
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border bg-background">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">Preview</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleDownloadLatex} className="shadow-sm">
              <Download className="mr-2 h-4 w-4" />
              .tex
            </Button>
            <Button size="sm" variant="outline" onClick={handleDownloadCls} className="shadow-sm">
              <Download className="mr-2 h-4 w-4" />
              .cls
            </Button>
          </div>
        </div>

        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'preview' | 'source')}>
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger value="source" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <FileCode className="mr-2 h-4 w-4" />
              LaTeX Source
            </TabsTrigger>
            <TabsTrigger value="preview" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Eye className="mr-2 h-4 w-4" />
              PDF Preview
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden bg-muted/30">
        {viewMode === 'source' ? (
          <ScrollArea className="h-full">
            <pre className="p-6 text-xs font-mono bg-background/50 text-foreground leading-relaxed">
              <code className="language-latex">{latexSource}</code>
            </pre>
          </ScrollArea>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-8 bg-background rounded-lg shadow-sm border border-border max-w-xl">
              <FileCode className="h-16 w-16 mx-auto mb-4 text-primary" />
              <p className="text-xl font-semibold mb-3">PDF Preview Coming Soon</p>
              <p className="text-sm text-muted-foreground mb-6">
                PDF compilation requires a LaTeX server. For now, you can download the .tex and .cls files
                and compile them locally using your preferred LaTeX compiler.
              </p>
              <div className="space-y-3 text-sm bg-muted/50 p-4 rounded-lg">
                <p className="font-semibold text-foreground">To compile locally:</p>
                <ol className="list-decimal list-inside text-left space-y-2 text-muted-foreground">
                  <li>Download both .tex and .cls files</li>
                  <li>Place them in the same directory</li>
                  <li className="font-mono text-xs bg-background px-2 py-1 rounded">
                    pdflatex {currentResume.name}.tex
                  </li>
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
