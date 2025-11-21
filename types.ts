export interface SectionFeedback {
  sectionName: string;
  score: number;
  feedback: string;
  status: 'Excellent' | 'Good' | 'Needs Improvement' | 'Critical';
}

export interface ImprovementRecommendation {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface RewrittenSection {
  original: string; // Description of what was there or snippet
  improved: string;
  reasoning: string;
}

export interface AnalysisResult {
  standoutScore: number;
  atsMatchScore: number;
  skillRelevanceScore: number;
  strengths: string[];
  weaknesses: string[];
  atsIssues: string[];
  skillsFound: string[];
  missingSkills: string[];
  sectionAnalysis: SectionFeedback[];
  recommendations: ImprovementRecommendation[];
  rewrittenSamples: RewrittenSection[];
  summary: string;
}

export interface UserInput {
  file: File | null;
  fileBase64: string | null;
  industry: string;
  position: string;
}