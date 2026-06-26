import { Project, Experience, SkillCategory, Certification } from './types';
import aquazoneImg from './assets/images/aquazone.png';
import careerForgeImg from './assets/images/careerforge.png';
import movieAIHero from './assets/images/movie_ai.png';

export const personalInfo = {
  name: 'Nisha Kumari',
  title: 'Full Stack Developer & AI Enthusiast',
  subtitle: 'MERN Stack Developer specializing in AI Integrations, and Production-Ready Applications.',
  briefAbout: 'I am a results-driven Full Stack Developer with a deep interest in Artificial Intelligence and its application in modern web ecosystems. Currently contributing to Cadera Infotech, I focus on architecting robust backend systems and intuitive frontend experiences that solve real-world problems.',
  email: 'nishkumari18jsr@gmail.com',
  phone: '+91 9031503628',
  location: 'Noida (Noida, India) / Jamshedpur',
  github: 'https://github.com/Nishakumari-18',
  linkedin: 'https://www.linkedin.com/in/nishakumari42/',
  leetcode: 'https://leetcode.com/u/nish_jsr',
  avatar: 'https://github.com/Nishakumari-18.png',
};

export const stats = [
  { value: '150+', label: 'DSA Problems' },
  { value: '25+', label: 'Full Stack Projects' },
];

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Full Stack Developer',
    company: 'Cadera Infotech Pvt. Ltd.',
    companyUrl: 'https://caderainfotech.com', // fallback
    type: 'Present',
    duration: 'Jan 2026 – Present | Noida',
    location: 'Noida, India',
    points: [
      'Developed and deployed 10+ production-ready features for CaderaEdu, serving thousands of monthly active students using React.js, Node.js, Express.js, and MongoDB.',
      'Reduced frontend development time by 25% through reusable React component architecture, improving UI consistency across sprints.',
      'Validated and published 50+ structured JSON content entries for CMS bulk-upload workflows with schema compliance and internal link optimization.',
    ],
  },
  {
    id: 'exp-2',
    role: 'Frontend Developer Intern',
    company: '1Stop.ai',
    type: 'Internship',
    duration: 'Aug 2024 – Sep 2024 | Bhubaneswar',
    location: 'Bhubaneswar, India',
    points: [
      'Built responsive UI components using React.js, HTML5, and CSS3 for a live AI product.',
      'Delivered all frontend features within the 2-month internship timeline, ensuring 100% design fidelity.',
    ],
  },
];

export const featuredProjects: Project[] = [
  {
    id: 'forge-ai',
    name: 'CareerForge AI',
    description: 'An intelligent career platform that uses AI to analyze resumes and suggest personalized growth paths. Processes 500+ resume analyses using the Gemini API.',
    category: 'Platform',
    tags: ['React', 'Node.js', 'MongoDB', 'Gemini API', 'Redux Toolkit'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Nishakumari-18',
    imageUrl: careerForgeImg,
    details: [
      'Built an AI-powered career platform with ATS resume analysis, skill-gap detection, AI mock interviews, and roadmap generation, processing 500+ resume analyses using the Gemini API.',
      'Reduced ATS evaluation time from 15 minutes to under 30 seconds; implemented JWT authentication, Cloudinary resume upload, and MongoDB analytics dashboards.',
    ],
  },
  {
    id: 'aquazone',
    name: 'AquaZone',
    description: 'A high-performance ticket booking engine with real-time seat mapping, QR code onboarding, ride navigation, and secure payment integration.',
    category: 'Ticketing',
    tags: ['Ticketing', 'Node.js', 'React', 'MongoDB', 'JWT', 'Razorpay', 'QR Code'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Nishakumari-18',
    imageUrl: aquazoneImg,
    details: [
      'Built a full-stack water park booking platform with Razorpay payment gateway, QR code onboarding, ride navigation, and mobile-responsive design.',
      'Achieved 99% transaction success in QA testing with high concurrent scheduling constraints.',
    ],
  },
];

export const moreRepositories: Project[] = [
  {
    id: 'repo-1',
    name: 'Movie AI',
    description: 'An AI-powered movie recommendation platform that delivers personalized movie suggestions using machine learning and collaborative filtering techniques.',
    category: 'AI/ML',
    tags: ['Python', 'Machine Learning', 'Pandas', 'Scikit-learn', 'AI', 'Recommendation System'],
    liveUrl: '#',
    imageUrl: movieAIHero,
    githubUrl: 'https://github.com/Nishakumari-18/movie-rec',
  },
  {
    id: 'repo-2',
    name: 'caderaedu',
    description: 'EdTech learning management system for streamlined course delivery.',
    category: 'MERN',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Nishakumari-18/caderaedu',
  },
  {
    id: 'repo-3',
    name: 'multi-tenant-issue-api',
    description: 'Scalable multi-tenant API for enterprise-level issue tracking systems.',
    category: 'Backend',
    tags: ['Node.js', 'Express.js', 'REST APIs', 'JWT'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Nishakumari-18/multi-tenant-issue-api',
  },
  {
    id: 'repo-4',
    name: 'Smart-Career-Companion',
    description: 'AI-driven advisor for career path planning and skill mapping.',
    category: 'JS/AI',
    tags: ['JavaScript', 'AI', 'Gemini API'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Nishakumari-18/Smart-Career-Companion',
  },
  {
    id: 'repo-5',
    name: 'social-bio-dashboard',
    description: 'Consolidated analytics dashboard for personal brand social metrics.',
    category: 'JS',
    tags: ['JavaScript', 'React', 'CSS3'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Nishakumari-18/social-bio-dashboard',
  },
  {
    id: 'repo-6',
    name: 'RateMaster',
    description: 'Extensible rating and review component library for web apps.',
    category: 'JS',
    tags: ['JavaScript', 'React', 'Library'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Nishakumari-18/RateMaster',
  },
  {
    id: 'repo-7',
    name: 'Resume_Platform',
    description: 'Open-source platform for creating dynamic, interactive digital resumes.',
    category: 'JS',
    tags: ['JavaScript', 'React', 'WebSprocket'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Nishakumari-18/Resume_Platform',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'skills-frontend',
    name: 'Frontend',
    icon: 'desktop_windows',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Bootstrap'],
  },
  {
    id: 'skills-backend',
    name: 'Backend',
    icon: 'dns',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Socket.io', 'JWT Authentication', 'Java', 'C++'],
  },
  {
    id: 'skills-ai-db',
    name: 'AI & Database',
    icon: 'psychology',
    skills: ['MongoDB', 'PostgreSQL', 'Redis', 'OpenAI API', 'Gemini API', 'Vector DBs', 'Mongoose ODM', 'DBMS', 'SQL'],
  },
];

export const certifications: Certification[] = [
  {
    id: 'cert-1',
    title: 'Accenture',
    issuer: 'Software Engineering Job Simulation (Accenture Nordics)',
    description: 'Focusing on Enterprise Application Architecture and Development Simulation.',
    icon: 'workspace_premium',
  },
  {
    id: 'cert-2',
    title: 'Tata Steel',
    issuer: 'Industrial Frontend Internship (Forage)',
    description: 'GenAI-Powered Data Analytics Job Simulation.',
    icon: 'workspace_premium',
  },
  {
    id: 'cert-3',
    title: 'LeetCode Monthly',
    issuer: 'Top 15% Global Competitor',
    description: 'Achievements of solving advanced challenges, DP, Graphs, and Trees.',
    icon: 'trophy',
  },
];

export const educationLine = [
  {
    degree: 'B.Tech, Computer Science & Engineering',
    institution: 'Gandhi Engineering College, Bhubaneswar',
    duration: 'Aug 2022 – Aug 2026',
    score: 'Active Pursuing',
  },
  {
    degree: 'Senior Secondary (XII), Science',
    institution: "Jamshedpur Women's College (JAC Board)",
    duration: '2022',
    score: '75.80%',
  },
  {
    degree: 'Secondary (X)',
    institution: 'Jharkhand Public School, Dhanbad (JAC Board)',
    duration: '2020',
    score: '81.60%',
  },
];
