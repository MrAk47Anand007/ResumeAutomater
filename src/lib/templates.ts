import type { LaTeXTemplate } from '@/types/resume';

export const defaultTemplate: LaTeXTemplate = {
  id: 'default',
  name: 'Professional Resume',
  description: 'A clean and professional resume template',
  clsContent: `% Resume Class File
\\NeedsTeXFormat{LaTeX2e}
\\ProvidesClass{resume}[2024/01/01 Resume class]
\\LoadClass[11pt,letterpaper]{article}

% Packages
\\RequirePackage[parfill]{parskip}
\\RequirePackage{array}
\\RequirePackage{ifthen}
\\RequirePackage[hidelinks]{hyperref}
\\RequirePackage{geometry}
\\RequirePackage{enumitem}

% Page Layout
\\geometry{left=0.75in,top=0.6in,right=0.75in,bottom=0.6in}

% Custom Commands
\\newcommand{\\name}[1]{
  \\centerline{\\Huge\\scshape{#1}}
  \\vspace{2pt}
}

\\newcommand{\\contact}[4]{
  \\centerline{#1 \\textbar\\ #2 \\textbar\\ #3 \\textbar\\ #4}
  \\vspace{10pt}
}

\\newcommand{\\header}[1]{
  \\vspace{5pt}
  {\\Large\\scshape{#1}}
  \\vspace{2pt}
  \\hrule
  \\vspace{5pt}
}

\\newcommand{\\experience}[4]{
  \\textbf{#1} \\hfill #2 \\\\
  \\textit{#3} \\hfill \\textit{#4}
}

\\newcommand{\\education}[4]{
  \\textbf{#1} \\hfill #2 \\\\
  \\textit{#3} \\hfill \\textit{#4}
}

\\pagestyle{empty}
`,
  texContent: `\\documentclass{resume}

\\begin{document}

% Personal Information
\\name{{{fullName}}}
\\contact{{{email}}}{{{phone}}}{{{location}}}{{{linkedin}}}

% Summary
{{#if summary}}
\\header{Professional Summary}
{{summary}}
{{/if}}

% Education
{{#if education}}
\\header{Education}
{{#each education}}
\\education{{{institution}}}{{{location}}}{{{degree}} in {{field}}}{{{startDate}} - {{endDate}}}
{{#if gpa}}GPA: {{gpa}}{{/if}}
{{#if description}}{{description}}{{/if}}
\\vspace{5pt}
{{/each}}
{{/if}}

% Experience
{{#if experience}}
\\header{Experience}
{{#each experience}}
\\experience{{{company}}}{{{location}}}{{{position}}}{{{startDate}} - {{#if current}}Present{{else}}{{endDate}}{{/if}}}
\\begin{itemize}[leftmargin=*]
{{#each description}}
  \\item {{this}}
{{/each}}
\\end{itemize}
\\vspace{5pt}
{{/each}}
{{/if}}

% Projects
{{#if projects}}
\\header{Projects}
{{#each projects}}
\\textbf{{{name}}} {{#if github}}(\\href{{{github}}}{GitHub}){{/if}}
\\begin{itemize}[leftmargin=*]
  \\item {{description}}
  \\item Technologies: {{technologies}}
\\end{itemize}
\\vspace{5pt}
{{/each}}
{{/if}}

% Skills
{{#if skills}}
\\header{Skills}
{{#each skills}}
\\textbf{{{category}}:} {{items}} \\\\
{{/each}}
{{/if}}

% Certificates
{{#if certificates}}
\\header{Certifications}
{{#each certificates}}
\\textbf{{{name}}} - {{issuer}} ({{date}}) {{#if link}}\\href{{{link}}}{Link}{{/if}} \\\\
{{/each}}
{{/if}}

\\end{document}
`,
};

export const templates: LaTeXTemplate[] = [defaultTemplate];

export const getTemplateById = (id: string): LaTeXTemplate | undefined => {
  return templates.find(t => t.id === id);
};
