import type { Resume } from '@/types/resume';

// Template engine for LaTeX
export const compileLatexTemplate = (template: string, data: Resume['data']): string => {
  let result = template;

  // Replace personal info
  result = result.replace(/\{\{\{fullName\}\}\}/g, data.personalInfo.fullName || '');
  result = result.replace(/\{\{\{email\}\}\}/g, data.personalInfo.email || '');
  result = result.replace(/\{\{\{phone\}\}\}/g, data.personalInfo.phone || '');
  result = result.replace(/\{\{\{location\}\}\}/g, data.personalInfo.location || '');
  result = result.replace(/\{\{\{linkedin\}\}\}/g, data.personalInfo.linkedin || '');
  result = result.replace(/\{\{\{github\}\}\}/g, data.personalInfo.github || '');
  result = result.replace(/\{\{\{website\}\}\}/g, data.personalInfo.website || '');

  // Handle summary
  if (data.summary) {
    result = result.replace(/\{\{#if summary\}\}([\s\S]*?)\{\{\/if\}\}/g, '$1');
    result = result.replace(/\{\{summary\}\}/g, data.summary);
  } else {
    result = result.replace(/\{\{#if summary\}\}[\s\S]*?\{\{\/if\}\}/g, '');
  }

  // Handle education
  if (data.education && data.education.length > 0) {
    result = result.replace(/\{\{#if education\}\}([\s\S]*?)\{\{\/if\}\}/g, (_, content) => {
      const eduTemplate = content.match(/\{\{#each education\}\}([\s\S]*?)\{\{\/each\}\}/)?.[1] || '';
      const educationSections = data.education.map(edu => {
        let eduSection = eduTemplate;
        eduSection = eduSection.replace(/\{\{\{institution\}\}\}/g, edu.institution);
        eduSection = eduSection.replace(/\{\{\{degree\}\}\}/g, edu.degree);
        eduSection = eduSection.replace(/\{\{\{field\}\}\}/g, edu.field);
        eduSection = eduSection.replace(/\{\{\{startDate\}\}\}/g, edu.startDate);
        eduSection = eduSection.replace(/\{\{\{endDate\}\}\}/g, edu.endDate);
        eduSection = eduSection.replace(/\{\{\{location\}\}\}/g, ''); // Add location if needed

        if (edu.gpa) {
          eduSection = eduSection.replace(/\{\{#if gpa\}\}([\s\S]*?)\{\{\/if\}\}/g, '$1');
          eduSection = eduSection.replace(/\{\{gpa\}\}/g, edu.gpa);
        } else {
          eduSection = eduSection.replace(/\{\{#if gpa\}\}[\s\S]*?\{\{\/if\}\}/g, '');
        }

        if (edu.description) {
          eduSection = eduSection.replace(/\{\{#if description\}\}([\s\S]*?)\{\{\/if\}\}/g, '$1');
          eduSection = eduSection.replace(/\{\{description\}\}/g, edu.description);
        } else {
          eduSection = eduSection.replace(/\{\{#if description\}\}[\s\S]*?\{\{\/if\}\}/g, '');
        }

        return eduSection;
      }).join('');

      return content.replace(/\{\{#each education\}\}[\s\S]*?\{\{\/each\}\}/g, educationSections);
    });
  } else {
    result = result.replace(/\{\{#if education\}\}[\s\S]*?\{\{\/if\}\}/g, '');
  }

  // Handle experience
  if (data.experience && data.experience.length > 0) {
    result = result.replace(/\{\{#if experience\}\}([\s\S]*?)\{\{\/if\}\}/g,  (_, content) => {
      const expTemplate = content.match(/\{\{#each experience\}\}([\s\S]*?)\{\{\/each\}\}/)?.[1] || '';
      const experienceSections = data.experience.map(exp => {
        let expSection = expTemplate;
        expSection = expSection.replace(/\{\{\{company\}\}\}/g, exp.company);
        expSection = expSection.replace(/\{\{\{position\}\}\}/g, exp.position);
        expSection = expSection.replace(/\{\{\{location\}\}\}/g, exp.location);
        expSection = expSection.replace(/\{\{\{startDate\}\}\}/g, exp.startDate);

        // Handle current position
        if (exp.current) {
          expSection = expSection.replace(/\{\{#if current\}\}([\s\S]*?)\{\{else\}\}[\s\S]*?\{\{\/if\}\}/g, '$1');
        } else {
          expSection = expSection.replace(/\{\{#if current\}\}[\s\S]*?\{\{else\}\}([\s\S]*?)\{\{\/if\}\}/g, '$1');
          expSection = expSection.replace(/\{\{endDate\}\}/g, exp.endDate);
        }

        // Handle description items
        const descItems = exp.description.map(desc => `  \\item ${desc}`).join('\n');
        expSection = expSection.replace(/\{\{#each description\}\}[\s\S]*?\{\{\/each\}\}/g, descItems);

        return expSection;
      }).join('');

      return content.replace(/\{\{#each experience\}\}[\s\S]*?\{\{\/each\}\}/g, experienceSections);
    });
  } else {
    result = result.replace(/\{\{#if experience\}\}[\s\S]*?\{\{\/if\}\}/g, '');
  }

  // Handle projects
  if (data.projects && data.projects.length > 0) {
    result = result.replace(/\{\{#if projects\}\}([\s\S]*?)\{\{\/if\}\}/g,  (_, content) => {
      const projTemplate = content.match(/\{\{#each projects\}\}([\s\S]*?)\{\{\/each\}\}/)?.[1] || '';
      const projectSections = data.projects.map(proj => {
        let projSection = projTemplate;
        projSection = projSection.replace(/\{\{\{name\}\}\}/g, proj.name);
        projSection = projSection.replace(/\{\{\{description\}\}\}/g, proj.description);
        projSection = projSection.replace(/\{\{\{technologies\}\}\}/g, proj.technologies.join(', '));

        if (proj.github) {
          projSection = projSection.replace(/\{\{#if github\}\}([\s\S]*?)\{\{\/if\}\}/g, '$1');
          projSection = projSection.replace(/\{\{\{github\}\}\}/g, proj.github);
        } else {
          projSection = projSection.replace(/\{\{#if github\}\}[\s\S]*?\{\{\/if\}\}/g, '');
        }

        return projSection;
      }).join('');

      return content.replace(/\{\{#each projects\}\}[\s\S]*?\{\{\/each\}\}/g, projectSections);
    });
  } else {
    result = result.replace(/\{\{#if projects\}\}[\s\S]*?\{\{\/if\}\}/g, '');
  }

  // Handle skills
  if (data.skills && data.skills.length > 0) {
    result = result.replace(/\{\{#if skills\}\}([\s\S]*?)\{\{\/if\}\}/g,  (_, content) => {
      const skillTemplate = content.match(/\{\{#each skills\}\}([\s\S]*?)\{\{\/each\}\}/)?.[1] || '';
      const skillSections = data.skills.map(skill => {
        let skillSection = skillTemplate;
        skillSection = skillSection.replace(/\{\{\{category\}\}\}/g, skill.category);
        skillSection = skillSection.replace(/\{\{items\}\}/g, skill.items.join(', '));
        return skillSection;
      }).join('');

      return content.replace(/\{\{#each skills\}\}[\s\S]*?\{\{\/each\}\}/g, skillSections);
    });
  } else {
    result = result.replace(/\{\{#if skills\}\}[\s\S]*?\{\{\/if\}\}/g, '');
  }

  // Handle certificates
  if (data.certificates && data.certificates.length > 0) {
    result = result.replace(/\{\{#if certificates\}\}([\s\S]*?)\{\{\/if\}\}/g,  (_, content) => {
      const certTemplate = content.match(/\{\{#each certificates\}\}([\s\S]*?)\{\{\/each\}\}/)?.[1] || '';
      const certSections = data.certificates.map(cert => {
        let certSection = certTemplate;
        certSection = certSection.replace(/\{\{\{name\}\}\}/g, cert.name);
        certSection = certSection.replace(/\{\{\{issuer\}\}\}/g, cert.issuer);
        certSection = certSection.replace(/\{\{\{date\}\}\}/g, cert.date);

        if (cert.link) {
          certSection = certSection.replace(/\{\{#if link\}\}([\s\S]*?)\{\{\/if\}\}/g, '$1');
          certSection = certSection.replace(/\{\{\{link\}\}\}/g, cert.link);
        } else {
          certSection = certSection.replace(/\{\{#if link\}\}[\s\S]*?\{\{\/if\}\}/g, '');
        }

        return certSection;
      }).join('');

      return content.replace(/\{\{#each certificates\}\}[\s\S]*?\{\{\/each\}\}/g, certSections);
    });
  } else {
    result = result.replace(/\{\{#if certificates\}\}[\s\S]*?\{\{\/if\}\}/g, '');
  }

  return result;
};

// Generate full LaTeX document
export const generateLatexDocument = (resume: Resume): string => {
  const compiledTex = compileLatexTemplate(resume.template.texContent, resume.data);

  // If there's custom LaTeX, use it instead
  if (resume.customLatex) {
    return resume.customLatex;
  }

  return compiledTex;
};

// This will be used to compile LaTeX to PDF
// For now, it returns the LaTeX source
// In production, this would call a LaTeX compilation service
export const compileToPDF = async (latexSource: string): Promise<{ success: boolean; pdfUrl?: string; error?: string }> => {
  try {
    // For now, we'll use a LaTeX compilation API
    // Options: Overleaf API, LaTeX.Online, or latex.js

    // Placeholder for actual compilation
    // In production, you would:
    // 1. Send latexSource to a LaTeX compilation service
    // 2. Receive the compiled PDF
    // 3. Return the PDF URL or blob

    console.log('LaTeX source to compile:', latexSource);

    // For development, return a mock success
    return {
      success: true,
      pdfUrl: 'data:application/pdf;base64,mock-pdf-data',
    };
  } catch (error) {
    console.error('LaTeX compilation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
