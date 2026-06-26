import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import https from 'https';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = parseInt(process.env.PORT ?? '3000', 10);

// ─── CORS ─────────────────────────────────────────────────────────────────────
// Allow requests from the Vercel frontend (set ALLOWED_ORIGIN in Render env vars)
// Falls back to allowing all origins in development.
const allowedOrigin = process.env.ALLOWED_ORIGIN;
app.use(
  cors({
    origin: allowedOrigin
      ? [allowedOrigin, 'http://localhost:5173', 'http://localhost:4173']
      : true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json());

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: "Nisha's Portfolio Backend" });
});

// ─── Gemini AI Client ─────────────────────────────────────────────────────────
let aiClient: GoogleGenAI | null = null;
const getAiClient = (): GoogleGenAI => {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not defined. The Portfolio Butler will fall back to offline templates.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || 'DUMMY_KEY',
      httpOptions: {
        headers: { 'User-Agent': 'aistudio-build' },
      },
    });
  }
  return aiClient;
};

// ─── Nisha's AI Butler system prompt ─────────────────────────────────────────
const nishaSystemInstruction = `You are "Nisha's Assistant AI Butler", an interactive chatbot designed for Nisha Kumari's portfolio website. Your purpose is to assist recruiters, clients, and visitors with details about Nisha's credentials, experience, projects, skills, and education. You are polite, enthusiastic, extremely accurate, and speak with a highly polished professional style.

Here is Nisha's exact schema data:
- Name: Nisha Kumari
- Email: nishkumari18jsr@gmail.com
- Mobile Phone Contact: +91 9031503628
- Location: Noida / Jamshedpur, India
- B.Tech Pursuing Degree: Gandhi Engineering College, Bhubaneswar, B.Tech in Computer Science & Engineering (Aug 2022 - Aug 2026), Active Pursuing.
- High School (XII): Jamshedpur Women's College, Jharkhand, JAC Board (2022) with 75.80% score.
- Secondary School (X): Jharkhand Public School, Jharkhand, JAC Board (2020) with 81.60% score.
- Current Active Role: Full Stack Developer at Cadera Infotech Pvt. Ltd. (Noida) since Jan 2026.
  * Details: Developed and deployed 10+ production-ready features for CaderaEdu utilizing React.js, Express.js, MongoDB, and Redux. Reduced UI development time by 25%. Validated and published 50+ content entries for CMS bulk-upload workflows.
- Previous Internship: Frontend Developer Intern at 1Stop.ai (Aug 2024 - Sep 2024, Bhubaneswar).
  * Details: Built responsive user interfaces with 100% fidelity.
- Core Technical Stack:
  * Frontend: React, Redux Toolkit, Tailwind CSS, TypeScript, Next.js.
  * Backend: Node.js, Express, REST APIs, JWT authentication, Java, C++, Socket.io.
  * Database/AI: MongoDB, Mongoose, PostgreSQL, Redis, Gemini API, OpenAI API, Vector Databases, DBMS, SQL.
- Key Showcased Projects:
  1. CareerForge AI: An intelligent ATS career navigator built with React, Node, Express, MongoDB, and Gemini API. Processes resume analysis, skill-gap detection, mock interviews, roadmap generation, and ATS scores in under 30 seconds. Handles 500+ analyses.
  2. AquaZone: High-performance water park ticketing reservation system using React, Node, MongoDB, Razorpay payment gate, JWT, and QR code onboarding.
- Achievements & Certifications:
  * Accenture Nordics Software Engineering Simulation.
  * Tata Steel Industrial Frontend / Forage Data Analytics Simulation.
  * Solved 150+ DSA algorithmic puzzles across LeetCode & Coding Ninjas.

Always act like a professional butler. Be concise, friendly, and structure answers using short, beautiful bullet points or paragraphs. Recommend contacting Nisha directly at nishkumari18jsr@gmail.com or calling +91 9031503628 to schedule interviews!`;

// ─── POST /api/chat ───────────────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message payload is required' });
    }

    const client = getAiClient();

    // Fallback when no API key is set
    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        reply: `Hello! I would love to tell you more about Nisha's credentials. Nisha is a passionate Full Stack Developer currently at Cadera Infotech. In her CareerForge AI project, she integrated the Gemini API to reduce ATS analysis to 30 seconds! Reach her at nishkumari18jsr@gmail.com or +91 9031503628 to discuss opportunities directly.`,
      });
    }

    const contents = [
      ...((history || []).map((h: any) => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }],
      }))),
      { role: 'user', parts: [{ text: message }] },
    ];

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: nishaSystemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text });
  } catch (err: any) {
    console.error('Gemini call error:', err);
    res.status(500).json({ error: 'Failed to communicate with the Portfolio Butler service.' });
  }
});

// ─── GET /api/leetcode/:username ──────────────────────────────────────────────
//  Primary  → alfa-leetcode-api (community proxy, no auth)
//  Fallback → direct LeetCode GraphQL
app.get('/api/leetcode/:username', async (req, res) => {
  const { username } = req.params;
  if (!username) return res.status(400).json({ error: 'Username is required' });

  // Helper: raw HTTPS GET
  function httpsGet(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const parsed = new URL(url);
      const options = {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; Portfolio-LCProxy/2.0)',
        },
        timeout: 8000,
      };
      const r = https.request(options, (resp) => {
        let data = '';
        resp.on('data', (c) => (data += c));
        resp.on('end', () => resolve(data));
      });
      r.on('error', reject);
      r.on('timeout', () => { r.destroy(); reject(new Error('timeout')); });
      r.end();
    });
  }

  // Helper: raw HTTPS POST
  function httpsPost(
    hostname: string,
    path: string,
    body: string,
    extraHeaders: Record<string, string> = {}
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const options = {
        hostname,
        path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          Referer: `https://${hostname}`,
          Origin: `https://${hostname}`,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          ...extraHeaders,
        },
        timeout: 8000,
      };
      const r = https.request(options, (resp) => {
        let data = '';
        resp.on('data', (c) => (data += c));
        resp.on('end', () => resolve(data));
      });
      r.on('error', reject);
      r.on('timeout', () => { r.destroy(); reject(new Error('timeout')); });
      r.write(body);
      r.end();
    });
  }

  // Strategy 1: alfa-leetcode-api
  async function tryAlfaApi() {
    const BASE = 'https://alfa-leetcode-api.0x584a.workers.dev';
    const [profileRaw, calendarRaw, submissionsRaw, contestRaw] = await Promise.allSettled([
      httpsGet(`${BASE}/userProfile/${username}`),
      httpsGet(`${BASE}/${username}/calendar`),
      httpsGet(`${BASE}/${username}/acSubmission?limit=10`),
      httpsGet(`${BASE}/${username}/contest`),
    ]);

    const profile  = profileRaw.status     === 'fulfilled' ? JSON.parse(profileRaw.value)    : null;
    const calendar = calendarRaw.status    === 'fulfilled' ? JSON.parse(calendarRaw.value)    : null;
    const subs     = submissionsRaw.status === 'fulfilled' ? JSON.parse(submissionsRaw.value) : null;
    const contest  = contestRaw.status     === 'fulfilled' ? JSON.parse(contestRaw.value)     : null;

    if (!profile || profile.errors || (!profile.totalSolved && !profile.ranking)) {
      throw new Error('alfa-api: invalid profile response');
    }

    return {
      source: 'alfa-leetcode-api',
      data: {
        matchedUser: {
          username,
          profile: { ranking: profile.ranking ?? 0 },
          submitStats: {
            acSubmissionNum: [
              { difficulty: 'All',    count: profile.totalSolved  ?? 0, submissions: profile.totalSolved  ?? 0 },
              { difficulty: 'Easy',   count: profile.easySolved   ?? 0, submissions: profile.easySolved   ?? 0 },
              { difficulty: 'Medium', count: profile.mediumSolved ?? 0, submissions: profile.mediumSolved ?? 0 },
              { difficulty: 'Hard',   count: profile.hardSolved   ?? 0, submissions: profile.hardSolved   ?? 0 },
            ],
          },
          userCalendar: {
            streak:          calendar?.streak          ?? profile.streak          ?? 0,
            totalActiveDays: calendar?.totalActiveDays ?? profile.totalActiveDays ?? 0,
            submissionCalendar:
              calendar?.submissionCalendar ?? profile.submissionCalendar ?? '{}',
          },
        },
        userContestRanking: contest?.contestRating
          ? {
              attendedContestsCount: contest.contestAttend          ?? 0,
              rating:                contest.contestRating          ?? null,
              globalRanking:         contest.contestGlobalRanking   ?? null,
              totalParticipants:     contest.totalParticipants      ?? null,
              topPercentage:         contest.contestTopPercentage   ?? null,
            }
          : null,
        recentAcSubmissionList: (subs?.submission ?? subs?.recentAcSubmissionList ?? []).slice(0, 10),
      },
    };
  }

  // Strategy 2: direct LeetCode GraphQL
  async function tryDirectGraphQL() {
    const query = `query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile { ranking }
        submitStats: submitStatsGlobal {
          acSubmissionNum { difficulty count submissions }
        }
        userCalendar { streak totalActiveDays submissionCalendar }
      }
      userContestRanking(username: $username) {
        attendedContestsCount rating globalRanking totalParticipants topPercentage
      }
      recentAcSubmissionList(username: $username, limit: 10) {
        id title titleSlug timestamp statusDisplay lang
      }
    }`;

    const body = JSON.stringify({ query, variables: { username } });
    const raw  = await httpsPost('leetcode.com', '/graphql', body, {
      'x-csrftoken': 'csrftoken',
      cookie: 'csrftoken=csrftoken',
    });
    const json = JSON.parse(raw);
    if (json.errors || !json.data?.matchedUser) throw new Error('GraphQL: no user data');
    return { source: 'leetcode-graphql', ...json };
  }

  // Run both strategies with fallback
  try {
    let result: any;
    try {
      result = await tryAlfaApi();
      console.log(`✅ LeetCode data fetched via alfa-leetcode-api for ${username}`);
    } catch (e1: any) {
      console.warn(`⚠ alfa-api failed (${e1.message}), trying direct GraphQL…`);
      result = await tryDirectGraphQL();
      console.log(`✅ LeetCode data fetched via direct GraphQL for ${username}`);
    }

    res.setHeader('Cache-Control', 'public, max-age=300');
    res.json(result);
  } catch (err: any) {
    console.error('❌ All LeetCode sources failed:', err.message);
    res.status(502).json({ error: 'Failed to fetch LeetCode data from all sources' });
  }
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend running on http://0.0.0.0:${PORT}`);
  console.log(`   CORS allowed origin: ${allowedOrigin ?? 'ALL (dev mode)'}`);
});
