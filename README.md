# ResumeAI Evaluator

**Made by CARL BENEDICT ELIPAN**

An AI-powered resume analysis tool that provides comprehensive feedback on your resume using Google's Gemini AI. Get instant insights on how your resume performs against industry standards and ATS systems.

## ✨ Features

### 🎯 Comprehensive Resume Analysis
- **Overall Impact Score**: Get a holistic view with averaged scores across all evaluation metrics
- **Standout Score**: Measure how well your resume distinguishes you from other candidates
- **ATS Match Score**: Evaluate how well your resume performs with Applicant Tracking Systems
- **Skill Relevance Score**: Assess how relevant your skills are to your target position

### 📊 Detailed Scoring System
- **Visual Radial Charts**: Interactive charts displaying your scores across multiple dimensions
- **Section-by-Section Breakdown**: Individual analysis of each resume section (Experience, Education, Skills, etc.)
- **Status Indicators**: Clear visual feedback (Excellent, Good, Needs Improvement, Critical)

### 🔍 In-Depth Insights
- **Executive Summary**: Concise overview of your resume's performance
- **Key Strengths**: Highlights what makes your resume stand out
- **Critical Weaknesses**: Identifies areas that need immediate attention
- **ATS Compatibility Analysis**: Shows keyword match percentage and missing critical skills
- **Skills Gap Analysis**: Lists skills you have vs. skills missing for your target role

### 🤖 AI-Powered Improvements
- **Smart Rewrites**: AI-generated improvements for weak sections of your resume
- **Before/After Comparisons**: See original content vs. AI-enhanced versions
- **Reasoning Explanations**: Understand why each rewrite improves your resume

### 🎨 Modern User Experience
- **Beautiful Dark Mode UI**: Sleek, modern interface with glassmorphic design elements
- **Smooth Animations**: Framer Motion-powered transitions and interactions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **PDF Upload Support**: Easy drag-and-drop or file browser upload

### 🎯 Industry-Specific Analysis
- Tailored feedback based on your target industry and position
- Customized recommendations aligned with job requirements

## 🚀 Run Locally

**Prerequisites:** Node.js (v16 or higher)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd resumeai-evaluator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Open [.env.local](.env.local)
   - Set your `GEMINI_API_KEY` to your Gemini API key
   - Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Styling**: TailwindCSS with custom glassmorphic design
- **Animations**: Framer Motion
- **Charts**: Recharts (Radial Bar Charts)
- **Icons**: Lucide React
- **AI Engine**: Google Gemini AI
- **Build Tool**: Vite
- **Fonts**: Inter & Space Grotesk

## 📝 How to Use

1. **Start the Application**: Click "Start Evaluation" on the hero screen
2. **Upload Your Resume**: Drag and drop or select your PDF resume
3. **Provide Context**: Enter your target industry and desired position
4. **Analyze**: Click "Analyze Resume" and wait for AI processing
5. **Review Results**: Explore your comprehensive evaluation report with scores, insights, and AI-generated improvements

## 🎓 What Gets Evaluated

- Resume formatting and structure
- Content quality and relevance
- Keyword optimization for ATS systems
- Skills alignment with target position
- Experience presentation
- Achievement quantification
- Overall professional presentation
- Industry-specific requirements

## 📄 License

This project is made by **CARL BENEDICT ELIPAN**

---

<div align="center">
  <p>Made with ❤️ by <strong>CARL BENEDICT ELIPAN</strong></p>
  <p>Powered by Google Gemini AI</p>
</div>
