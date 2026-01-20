# Resume Automater

A powerful, full-featured React application for creating professional resumes using LaTeX templates. All data is stored locally in your browser - no user accounts or server storage required.

## Features

- **Local Storage**: All your resume data is stored in your browser's localStorage - completely private and offline-capable
- **Three-Panel Layout**:
  - **Left Sidebar**: Manage multiple resume versions
  - **Middle Panel**: Intuitive forms for entering resume information
  - **Right Panel**: Live LaTeX source preview and PDF export
- **LaTeX Support**:
  - Built-in professional LaTeX templates
  - Custom `.cls` file support for styling
  - Custom `.tex` file support for content structure
  - Integrated LaTeX editor with syntax highlighting
- **Comprehensive Resume Sections**:
  - Personal Information
  - Professional Summary
  - Education
  - Work Experience
  - Projects
  - Skills (organized by category)
  - Certifications
- **Modern UI**: Built with ShadCN UI components and Tailwind CSS
- **TypeScript**: Fully typed for better development experience

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **ShadCN UI** for beautiful, accessible components
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Monaco Editor** for LaTeX code editing
- **Lucide React** for icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Creating a Resume

1. Click "New Resume" in the left sidebar
2. Fill in your personal information in the forms
3. Add education, experience, projects, skills, and certifications
4. View the generated LaTeX source in the right panel

### Downloading LaTeX Files

1. Click the ".tex" button to download the main resume file
2. Click the ".cls" button to download the styling class file
3. Compile locally using: `pdflatex your-resume.tex`

### Customizing LaTeX

1. Go to the "LaTeX Editor" tab
2. Edit the `.tex` file for content structure
3. Edit the `.cls` file for styling and formatting
4. Changes are saved automatically

### Managing Multiple Resumes

- Create multiple versions for different job applications
- Switch between resumes in the left sidebar
- Delete old versions with the trash icon

## Project Structure

```
src/
├── components/
│   ├── forms/              # Form components for each resume section
│   │   ├── PersonalInfoForm.tsx
│   │   ├── EducationForm.tsx
│   │   ├── ExperienceForm.tsx
│   │   ├── ProjectsForm.tsx
│   │   ├── SkillsForm.tsx
│   │   ├── CertificatesForm.tsx
│   │   └── LaTeXEditorForm.tsx
│   ├── ui/                 # ShadCN UI components
│   ├── Layout.tsx          # Main three-panel layout
│   ├── ResumeSidebar.tsx   # Left sidebar component
│   ├── ResumeForm.tsx      # Middle panel with tabs
│   └── PDFPreview.tsx      # Right panel with LaTeX preview
├── lib/
│   ├── utils.ts            # Utility functions
│   ├── storage.ts          # localStorage utilities
│   ├── templates.ts        # LaTeX templates
│   └── latexCompiler.ts    # LaTeX template engine
├── store/
│   └── resumeStore.ts      # Zustand store for state management
├── types/
│   └── resume.ts           # TypeScript type definitions
├── App.tsx                 # Main app component
└── main.tsx               # App entry point
```

## Future Enhancements

The following features are planned for future releases:

### API Integration
- Build API endpoints for resume compilation
- Server-side LaTeX to PDF conversion
- Email delivery of compiled resumes

### Additional Features
- More LaTeX templates
- PDF preview in browser (requires LaTeX compilation service)
- Import/Export resume data as JSON
- Resume templates marketplace
- AI-powered resume suggestions
- ATS (Applicant Tracking System) optimization

## Local LaTeX Compilation

To compile your resume locally:

1. Install a LaTeX distribution:
   - **Windows**: [MiKTeX](https://miktex.org/) or [TeX Live](https://www.tug.org/texlive/)
   - **macOS**: [MacTeX](https://www.tug.org/mactex/)
   - **Linux**: `sudo apt-get install texlive-full` (Debian/Ubuntu)

2. Download both `.tex` and `.cls` files from the app

3. Place them in the same directory

4. Compile:
   ```bash
   pdflatex your-resume.tex
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.
