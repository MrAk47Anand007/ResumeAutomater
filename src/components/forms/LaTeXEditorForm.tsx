import { useState, useEffect } from 'react';
import type { Resume } from '@/types/resume';
import { useResumeStore } from '@/store/resumeStore';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { RotateCcw, Save } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { generateLatexDocument } from '@/lib/latexCompiler';

interface LaTeXEditorFormProps {
  resume: Resume;
}

export function LaTeXEditorForm({ resume }: LaTeXEditorFormProps) {
  const { updateCustomLatex, updateResumeTemplate } = useResumeStore();
  const [customLatex, setCustomLatex] = useState(resume.customLatex || '');
  const [clsContent, setClsContent] = useState(resume.template.clsContent);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Initialize with generated LaTeX if no custom LaTeX exists
    if (!resume.customLatex) {
      const generated = generateLatexDocument(resume);
      setCustomLatex(generated);
    } else {
      setCustomLatex(resume.customLatex);
    }
    setClsContent(resume.template.clsContent);
    setHasChanges(false);
  }, [resume.id]);

  const handleSaveLatex = () => {
    updateCustomLatex(resume.id, customLatex);
    setHasChanges(false);
  };

  const handleSaveCls = () => {
    updateResumeTemplate(resume.id, {
      ...resume.template,
      clsContent: clsContent,
    });
    setHasChanges(false);
  };

  const handleResetLatex = () => {
    if (confirm('Are you sure you want to reset to the auto-generated LaTeX? Any custom changes will be lost.')) {
      const generated = generateLatexDocument(resume);
      setCustomLatex(generated);
      updateCustomLatex(resume.id, '');
      setHasChanges(false);
    }
  };

  const handleLatexChange = (value: string | undefined) => {
    setCustomLatex(value || '');
    setHasChanges(true);
  };

  const handleClsChange = (value: string | undefined) => {
    setClsContent(value || '');
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>LaTeX Editor</CardTitle>
          <CardDescription>
            Customize your resume&apos;s LaTeX source code directly. Edit the .tex file for content or the .cls file for styling.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tex" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tex">.tex File (Content)</TabsTrigger>
              <TabsTrigger value="cls">.cls File (Styling)</TabsTrigger>
            </TabsList>

            <TabsContent value="tex" className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Edit the main LaTeX document. Changes will override auto-generated content.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handleResetLatex}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                  <Button size="sm" onClick={handleSaveLatex} disabled={!hasChanges}>
                    <Save className="mr-2 h-4 w-4" />
                    Save .tex
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Editor
                  height="600px"
                  defaultLanguage="latex"
                  value={customLatex}
                  onChange={handleLatexChange}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                  }}
                />
              </div>
            </TabsContent>

            <TabsContent value="cls" className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Edit the LaTeX class file to customize styling, commands, and layout.
                </p>
                <Button size="sm" onClick={handleSaveCls} disabled={!hasChanges}>
                  <Save className="mr-2 h-4 w-4" />
                  Save .cls
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Editor
                  height="600px"
                  defaultLanguage="latex"
                  value={clsContent}
                  onChange={handleClsChange}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                  }}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Tips:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>The .tex file contains your resume content and structure</li>
              <li>The .cls file defines custom commands and styling</li>
              <li>Both files work together to generate your final PDF</li>
              <li>Download both files from the preview panel to compile locally</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
