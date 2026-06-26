import { useState, useEffect, useMemo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2, Trophy, ExternalLink, RefreshCw,
  CheckCircle2, Clock, TrendingUp, Award, Star, Activity,
  ChevronRight, BarChart3, Flame
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface DifficultyCount {
  difficulty: 'All' | 'Easy' | 'Medium' | 'Hard';
  count: number;
  submissions: number;
}

interface LeetCodeData {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  streak: number;
  totalActiveDays: number;
  submissionCalendar: Record<string, number>;
  contestRating: number | null;
  contestGlobalRanking: number | null;
  contestAttended: number | null;
  topPercentage: number | null;
  recentSubmissions: RecentSubmission[];
}

interface RecentSubmission {
  id: string;
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

// ─── Fallback data (used when API unavailable) ────────────────────────────────
const FALLBACK_DATA: LeetCodeData = {
  username: 'nish_jsr',
  totalSolved: 300,
  easySolved: 142,
  mediumSolved: 128,
  hardSolved: 30,
  ranking: 184320,
  streak: 12,
  totalActiveDays: 180,
  submissionCalendar: {},
  contestRating: 1520,
  contestGlobalRanking: 84210,
  contestAttended: 14,
  topPercentage: 28.4,
  recentSubmissions: [
    { id: '1', title: 'Two Sum', titleSlug: 'two-sum', timestamp: String(Date.now() / 1000 - 86400), statusDisplay: 'Accepted', lang: 'typescript' },
    { id: '2', title: 'Longest Substring Without Repeating Characters', titleSlug: 'longest-substring-without-repeating-characters', timestamp: String(Date.now() / 1000 - 172800), statusDisplay: 'Accepted', lang: 'javascript' },
    { id: '3', title: 'Median of Two Sorted Arrays', titleSlug: 'median-of-two-sorted-arrays', timestamp: String(Date.now() / 1000 - 259200), statusDisplay: 'Accepted', lang: 'java' },
    { id: '4', title: 'LRU Cache', titleSlug: 'lru-cache', timestamp: String(Date.now() / 1000 - 345600), statusDisplay: 'Accepted', lang: 'typescript' },
    { id: '5', title: 'Word Ladder', titleSlug: 'word-ladder', timestamp: String(Date.now() / 1000 - 432000), statusDisplay: 'Accepted', lang: 'javascript' },
    { id: '6', title: 'Trapping Rain Water', titleSlug: 'trapping-rain-water', timestamp: String(Date.now() / 1000 - 518400), statusDisplay: 'Accepted', lang: 'java' },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const LANG_COLORS: Record<string, string> = {
  typescript: '#3178c6', javascript: '#f7df1e', python: '#3776ab', python3: '#3776ab',
  java: '#ed8b00', cpp: '#00599c', c: '#a8b9cc', go: '#00add8',
  rust: '#ce4a21', kotlin: '#7f52ff', swift: '#f05138', ruby: '#cc342d',
  csharp: '#239120', php: '#777bb4', scala: '#dc322f', dart: '#0175c2',
};

const LANG_LABELS: Record<string, string> = {
  typescript: 'TS', javascript: 'JS', python: 'PY', python3: 'PY3',
  java: 'JAVA', cpp: 'C++', c: 'C', go: 'GO', rust: 'RS',
  kotlin: 'KT', swift: 'SW', ruby: 'RB', csharp: 'C#',
};

function timeAgo(ts: string): string {
  const diff = Date.now() - parseInt(ts) * 1000;
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (days > 0) return `${days}d ago`;
  if (hrs > 0) return `${hrs}h ago`;
  return `${mins}m ago`;
}

function parseCalendar(calendarStr: string): Record<string, number> {
  try { return JSON.parse(calendarStr); }
  catch { return {}; }
}

function generateFallbackCalendar(): Record<string, number> {
  const cal: Record<string, number> = {};
  const now = Date.now();
  for (let i = 365; i >= 0; i--) {
    const ts = Math.floor((now - i * 86400000) / 1000);
    const day = new Date(ts * 1000).getDay();
    const isWeekend = day === 0 || day === 6;
    const rand = Math.random();
    if (rand > (isWeekend ? 0.75 : 0.45)) {
      cal[ts.toString()] = Math.floor(Math.random() * 8) + 1;
    }
  }
  return cal;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Skeleton shimmer block */
function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-white/5 ${className}`} />
  );
}

/** Animated counter number */
function Counter({ to, duration = 1.5 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = to / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [to, duration]);
  return <>{count.toLocaleString()}</>;
}

/** Radial progress ring */
function RadialRing({
  value, total, color, size = 120, strokeWidth = 8, children,
}: { value: number; total: number; color: string; size?: number; strokeWidth?: number; children?: ReactNode }) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / total, 1);
  const offset = circ * (1 - pct);
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 absolute inset-0">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
        />
      </svg>
      <div className="relative z-10 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

/** Heatmap cell */
function HeatCell({
  count, date, level,
}: { count: number; date: string; level: number }) {
  const [show, setShow] = useState(false);
  const colors = ['bg-white/[0.04]', 'bg-[#c0c1ff]/25', 'bg-[#c0c1ff]/50', 'bg-[#c0c1ff]/75', 'bg-[#c0c1ff]'];
  return (
    <div className="relative group"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      <div className={`w-[10px] h-[10px] rounded-[2px] transition-all duration-150 cursor-default hover:scale-125 hover:ring-1 hover:ring-[#c0c1ff]/40 ${colors[level]}`} />
      {show && count > 0 && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50 pointer-events-none whitespace-nowrap bg-[#051424] border border-white/10 px-2 py-1 rounded text-[10px] font-mono text-white shadow-xl">
          <span className="text-[#c0c1ff]">{count}</span> submission{count !== 1 ? 's' : ''} · {date}
        </div>
      )}
    </div>
  );
}

/** Recent submission row */
function SubmissionRow({ sub, idx }: { sub: RecentSubmission; idx: number; key?: string | number }) {
  const color = LANG_COLORS[sub.lang] ?? '#c0c1ff';
  const label = LANG_LABELS[sub.lang] ?? sub.lang.toUpperCase().slice(0, 3);
  return (
    <tr
      className="group border-b border-white/5 last:border-none hover:bg-white/[0.03] transition-colors animate-fade-in"
      style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}
    >
      <td className="py-3 pl-4 pr-2">
        <a
          href={`https://leetcode.com/problems/${sub.titleSlug}/`}
          target="_blank" rel="noopener noreferrer"
          className="text-sm text-[#c7c4d7] hover:text-white transition-colors flex items-center gap-1.5 group/link"
        >
          <CheckCircle2 size={12} className="shrink-0 text-[#10b981]" />
          <span className="group-hover/link:underline underline-offset-2 truncate max-w-[240px] sm:max-w-xs md:max-w-sm">{sub.title}</span>
          <ChevronRight size={10} className="shrink-0 opacity-0 group-hover/link:opacity-100 transition-opacity" />
        </a>
      </td>
      <td className="py-3 px-2">
        <span
          className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
          style={{ color, background: `${color}22` }}
        >{label}</span>
      </td>
      <td className="py-3 pl-2 pr-4 text-right">
        <span className="text-[11px] font-mono text-[#c7c4d7]/50 flex items-center justify-end gap-1">
          <Clock size={10} />{timeAgo(sub.timestamp)}
        </span>
      </td>
    </tr>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const LEETCODE_USERNAME = 'nish_jsr';
const LEETCODE_PROFILE = `https://leetcode.com/u/${LEETCODE_USERNAME}`;

export default function LeetCodeActivity() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/leetcode/${LEETCODE_USERNAME}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      if (json.errors || !json.data?.matchedUser) {
        throw new Error('User not found or API blocked');
      }

      const { matchedUser, userContestRanking, recentAcSubmissionList } = json.data;
      const acNums: DifficultyCount[] = matchedUser.submitStats.acSubmissionNum;
      const all = acNums.find((d) => d.difficulty === 'All');
      const easy = acNums.find((d) => d.difficulty === 'Easy');
      const medium = acNums.find((d) => d.difficulty === 'Medium');
      const hard = acNums.find((d) => d.difficulty === 'Hard');

      const cal = parseCalendar(matchedUser.userCalendar?.submissionCalendar ?? '{}');

      setData({
        username: matchedUser.username,
        totalSolved: all?.count ?? 0,
        easySolved: easy?.count ?? 0,
        mediumSolved: medium?.count ?? 0,
        hardSolved: hard?.count ?? 0,
        ranking: matchedUser.profile?.ranking ?? 0,
        streak: matchedUser.userCalendar?.streak ?? 0,
        totalActiveDays: matchedUser.userCalendar?.totalActiveDays ?? 0,
        submissionCalendar: Object.keys(cal).length ? cal : generateFallbackCalendar(),
        contestRating: userContestRanking?.rating ? Math.round(userContestRanking.rating) : null,
        contestGlobalRanking: userContestRanking?.globalRanking ?? null,
        contestAttended: userContestRanking?.attendedContestsCount ?? null,
        topPercentage: userContestRanking?.topPercentage ?? null,
        recentSubmissions: (recentAcSubmissionList ?? []).slice(0, 8),
      });
      setUsingFallback(false);
    } catch (err: any) {
      console.warn('LeetCode API failed, using fallback data:', err.message);
      // Use fallback with generated calendar
      setData({ ...FALLBACK_DATA, submissionCalendar: generateFallbackCalendar() });
      setUsingFallback(true);
      setError(err.message);
    } finally {
      setLoading(false);
      setLastRefreshed(new Date());
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ── Build heatmap grid (53 weeks × 7 days) ──────────────────────────────────
  const heatmapGrid = useMemo(() => {
    const calendar = data?.submissionCalendar ?? {};
    const grid: { ts: number; date: string; count: number; level: number }[][] = [];
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const endTs = Math.floor(today.getTime() / 1000);
    const startTs = endTs - 53 * 7 * 86400;

    // Align startTs to the previous Sunday
    const startDate = new Date(startTs * 1000);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    for (let w = 0; w < 53; w++) {
      const week: { ts: number; date: string; count: number; level: number }[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + w * 7 + d);
        const ts = Math.floor(date.getTime() / 1000);
        // Find count in calendar by checking timestamps within same day
        const dayStart = ts - (ts % 86400);
        let count = 0;
        for (let offset = 0; offset < 86400; offset += 3600) {
          count += calendar[String(dayStart + offset)] ?? 0;
        }
        // Also check exact key
        count = count || calendar[String(ts)] || 0;
        // Find key in +/- 1 day range
        if (!count) {
          for (const key of Object.keys(calendar)) {
            if (Math.abs(parseInt(key) - dayStart) < 86400) {
              count += calendar[key];
            }
          }
        }
        const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 7 ? 3 : 4;
        week.push({
          ts,
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          count,
          level,
        });
      }
      grid.push(week);
    }
    return grid;
  }, [data?.submissionCalendar]);

  const totalSubmissionsInCalendar = useMemo(() => {
    return Object.values(data?.submissionCalendar ?? {}).reduce((a: number, b: number) => a + b, 0);
  }, [data?.submissionCalendar]);

  // ─── Skeleton Loading ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <section id="leetcode" className="py-20 px-4 md:px-6 max-w-7xl mx-auto w-full border-t border-white/5 scroll-mt-20">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Skeleton className="h-6 w-36 rounded-full" />
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-1.5 w-24 rounded-full" />
        </div>
        {/* Skeleton grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => <div key={i}><Skeleton className="h-32" /></div>)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Skeleton className="lg:col-span-7 h-64" />
          <Skeleton className="lg:col-span-5 h-64" />
        </div>
        <Skeleton className="mt-6 h-64" />
      </section>
    );
  }

  if (!data) return null;

  const diffCards = [
    { label: 'Easy', value: data.easySolved, total: 843, color: '#10b981', bg: '#10b98120', border: '#10b98140', ring: '#10b981' },
    { label: 'Medium', value: data.mediumSolved, total: 1765, color: '#f59e0b', bg: '#f59e0b20', border: '#f59e0b40', ring: '#f59e0b' },
    { label: 'Hard', value: data.hardSolved, total: 765, color: '#ef4444', bg: '#ef444420', border: '#ef444440', ring: '#ef4444' },
  ];

  return (
    <section id="leetcode" className="py-20 px-4 md:px-6 max-w-7xl mx-auto w-full border-t border-white/5 scroll-mt-20">

      {/* ── Section Header ──────────────────────────────────────────────────── */}
      <motion.div
        className="flex flex-col items-center text-center space-y-4 mb-14"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 w-fit">
          <Code2 size={14} className="text-[#c0c1ff]" />
          <span className="text-[10px] font-mono tracking-widest text-[#c7c4d7] uppercase">Algorithm Mastery</span>
        </div>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-white">LeetCode Activity</h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-[#c0c1ff] to-[#d0bcff] rounded-full shadow-md shadow-[#c0c1ff]/25 mx-auto" />

        {/* Fallback notice */}
        <AnimatePresence>
          {usingFallback && (
            <motion.p
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-[11px] font-mono text-yellow-400/70 border border-yellow-400/20 bg-yellow-400/5 px-3 py-1 rounded-full"
            >
              ⚠ Showing sample data · API temporarily unavailable
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Row 1: Total Solved + 3 Difficulty Cards + 2 Contest Cards ─────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">

        {/* Total Solved Card */}
        <motion.div
          className="lg:col-span-2 bg-[#122131]/50 border border-white/10 rounded-2xl p-5 flex items-center gap-5 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          whileHover={{ borderColor: 'rgba(192,193,255,0.3)', y: -2 }}
        >
          {/* Glow */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#c0c1ff]/10 rounded-full blur-2xl pointer-events-none" />

          <RadialRing value={data.totalSolved} total={3373} color="#c0c1ff" size={88} strokeWidth={6}>
            <span className="text-lg font-bold text-white leading-none font-sans">
              <Counter to={data.totalSolved} />
            </span>
          </RadialRing>

          <div>
            <p className="text-[11px] font-mono text-[#c7c4d7]/60 uppercase tracking-widest mb-1">Total Solved</p>
            <p className="text-2xl font-bold text-white font-sans">{data.totalSolved.toLocaleString()}</p>
            <p className="text-[11px] font-mono text-[#c0c1ff]/70 mt-1">of 3,373 problems</p>
            <div className="flex items-center gap-1.5 mt-2">
              <Flame size={11} className="text-orange-400" />
              <span className="text-[11px] font-mono text-orange-400">{data.streak} day streak</span>
            </div>
          </div>
        </motion.div>

        {/* Easy / Medium / Hard Cards */}
        {diffCards.map((card, i) => (
          <motion.div
            key={card.label}
            className="bg-[#122131]/50 border border-white/10 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
            whileHover={{ borderColor: card.border, y: -2 }}
          >
            <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{ background: `radial-gradient(circle at 80% 20%, ${card.bg}, transparent 70%)` }} />

            <div className="flex justify-between items-start">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest" style={{ color: card.color }}>
                {card.label}
              </span>
              <span className="text-[10px] font-mono text-[#c7c4d7]/40">{Math.round((card.value / card.total) * 100)}%</span>
            </div>

            <div>
              <p className="text-3xl font-bold text-white font-sans mb-2">
                <Counter to={card.value} duration={1.2} />
              </p>
              {/* Mini progress bar */}
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: card.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.round((card.value / card.total) * 100)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                />
              </div>
              <p className="text-[10px] font-mono text-[#c7c4d7]/40 mt-1.5">of {card.total.toLocaleString()}</p>
            </div>
          </motion.div>
        ))}

        {/* Contest Rating Card */}
        <motion.div
          className="bg-[#122131]/50 border border-white/10 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ borderColor: 'rgba(245,158,11,0.4)', y: -2 }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <Star size={12} className="text-yellow-400" />
            <span className="text-[11px] font-mono text-[#c7c4d7]/60 uppercase tracking-widest">Contest Rating</span>
          </div>
          <p className="text-3xl font-bold text-white font-sans">
            {data.contestRating ? <Counter to={data.contestRating} /> : '—'}
          </p>
          <p className="text-[10px] font-mono text-yellow-400/70 mt-1">
            {data.contestAttended ? `${data.contestAttended} contests attended` : 'No contest data'}
          </p>
        </motion.div>

        {/* Global Ranking Card */}
        <motion.div
          className="bg-[#122131]/50 border border-white/10 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ borderColor: 'rgba(192,193,255,0.3)', y: -2 }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <TrendingUp size={12} className="text-[#c0c1ff]" />
            <span className="text-[11px] font-mono text-[#c7c4d7]/60 uppercase tracking-widest">Ranking</span>
          </div>
          <p className="text-2xl font-bold text-white font-sans">
            #{data.ranking ? <Counter to={data.ranking} /> : '—'}
          </p>
          {data.topPercentage && (
            <p className="text-[10px] font-mono text-[#c0c1ff]/70 mt-1">
              Top {data.topPercentage.toFixed(1)}% globally
            </p>
          )}
        </motion.div>
      </div>

      {/* ── Row 2: Heatmap + Concentric Ring ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">

        {/* Activity Heatmap */}
        <motion.div
          className="lg:col-span-8 bg-[#122131]/40 border border-white/10 rounded-[1.75rem] p-6 lg:p-8 relative overflow-hidden"
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-white/5 pb-5">
            <div className="flex items-center gap-2.5">
              <Activity size={18} className="text-[#c0c1ff]" />
              <div>
                <h3 className="font-display font-semibold text-white text-base">Submission Calendar</h3>
                <p className="text-[10px] font-mono text-purple-300">Past 12 months · {totalSubmissionsInCalendar.toLocaleString()} submissions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#c7c4d7]/50">{data.totalActiveDays} active days</span>
              <button
                onClick={fetchData}
                className="flex items-center gap-1 bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1.5 rounded-lg text-[10px] font-mono text-[#c0c1ff] hover:text-white transition-all cursor-pointer"
                title="Refresh LeetCode data"
              >
                <RefreshCw size={10} />Refresh
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="overflow-x-auto pb-2 scrollbar-thin">
            <div className="min-w-[650px]">
              {/* Month labels */}
              <div className="flex gap-[3px] mb-1.5 pl-0">
                {heatmapGrid.filter((_, wi) => wi % 4 === 0).map((week, i) => (
                  <div key={i} className="flex-1 text-[9px] font-mono text-[#c7c4d7]/30 pl-0.5">
                    {week[0]?.date.split(' ')[0]}
                  </div>
                ))}
              </div>
              {/* Cells */}
              <div className="flex gap-[3px]">
                {heatmapGrid.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => (
                    <div key={`${wi}-${di}`}><HeatCell count={day.count} date={day.date} level={day.level} /></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer legend */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-5 pt-4 border-t border-white/5">
            <p className="text-[10px] font-mono text-[#c7c4d7]/40">
              Last refreshed: {lastRefreshed.toLocaleTimeString()}
            </p>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#c7c4d7]/50">
              <span>Less</span>
              {['bg-white/[0.04]', 'bg-[#c0c1ff]/25', 'bg-[#c0c1ff]/50', 'bg-[#c0c1ff]/75', 'bg-[#c0c1ff]'].map((cls, i) => (
                <div key={i} className={`w-2.5 h-2.5 rounded-[2px] ${cls}`} />
              ))}
              <span>More</span>
            </div>
          </div>
        </motion.div>

        {/* Skills Breakdown Ring */}
        <motion.div
          className="lg:col-span-4 bg-[#122131]/40 border border-white/10 rounded-[1.75rem] p-6 lg:p-8 flex flex-col"
          initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-white/5">
            <BarChart3 size={18} className="text-[#c0c1ff]" />
            <div>
              <h3 className="font-display font-semibold text-white text-base">Difficulty Split</h3>
              <p className="text-[10px] font-mono text-purple-300">{data.totalSolved} problems solved</p>
            </div>
          </div>

          {/* Concentric Rings */}
          <div className="flex justify-center items-center py-4 relative">
            <svg width="180" height="180" className="-rotate-90">
              {/* Track rings */}
              {[65, 50, 35].map((r) => (
                <circle key={r} cx="90" cy="90" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="7" />
              ))}
              {/* Easy ring */}
              <motion.circle cx="90" cy="90" r={65} fill="none" stroke="#10b981" strokeWidth="7" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 65}
                initial={{ strokeDashoffset: 2 * Math.PI * 65 }}
                whileInView={{ strokeDashoffset: 2 * Math.PI * 65 * (1 - data.easySolved / 843) }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: 'easeOut', delay: 0.1 }}
              />
              {/* Medium ring */}
              <motion.circle cx="90" cy="90" r={50} fill="none" stroke="#f59e0b" strokeWidth="7" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 50}
                initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                whileInView={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - data.mediumSolved / 1765) }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: 'easeOut', delay: 0.25 }}
              />
              {/* Hard ring */}
              <motion.circle cx="90" cy="90" r={35} fill="none" stroke="#ef4444" strokeWidth="7" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 35}
                initial={{ strokeDashoffset: 2 * Math.PI * 35 }}
                whileInView={{ strokeDashoffset: 2 * Math.PI * 35 * (1 - data.hardSolved / 765) }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: 'easeOut', delay: 0.4 }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white font-sans leading-none">{data.totalSolved}</span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#c7c4d7]/60 mt-1">solved</span>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {diffCards.map((c) => (
              <div key={c.label} className="flex flex-col items-center p-2.5 rounded-xl" style={{ background: c.bg }}>
                <span className="text-[10px] font-mono font-bold" style={{ color: c.color }}>{c.label}</span>
                <span className="text-lg font-bold text-white font-sans mt-0.5">{c.value}</span>
              </div>
            ))}
          </div>

          {/* Profile link */}
          <motion.a
            href={LEETCODE_PROFILE} target="_blank" rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#c0c1ff]/10 hover:bg-[#c0c1ff]/20 border border-[#c0c1ff]/20 hover:border-[#c0c1ff]/40 text-[#c0c1ff] text-sm font-mono transition-all group"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          >
            <Code2 size={14} />
            <span>View LeetCode Profile</span>
            <ExternalLink size={12} className="opacity-60 group-hover:opacity-100 transition-opacity" />
          </motion.a>
        </motion.div>
      </div>

      {/* ── Row 3: Recent Accepted Submissions ────────────────────────────────── */}
      <motion.div
        className="bg-[#122131]/40 border border-white/10 rounded-[1.75rem] overflow-hidden"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={18} className="text-[#10b981]" />
            <div>
              <h3 className="font-display font-semibold text-white text-base">Recent Accepted Submissions</h3>
              <p className="text-[10px] font-mono text-purple-300">Latest AC solutions from LeetCode</p>
            </div>
          </div>
          <a
            href={`${LEETCODE_PROFILE}/`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] font-mono text-[#c0c1ff]/70 hover:text-[#c0c1ff] transition-colors"
          >
            View all <ExternalLink size={10} />
          </a>
        </div>

        {/* Table */}
        {data.recentSubmissions.length > 0 ? (
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-[10px] font-mono text-[#c7c4d7]/40 uppercase tracking-widest py-2.5 pl-4 pr-2">Problem</th>
                  <th className="text-left text-[10px] font-mono text-[#c7c4d7]/40 uppercase tracking-widest py-2.5 px-2">Language</th>
                  <th className="text-right text-[10px] font-mono text-[#c7c4d7]/40 uppercase tracking-widest py-2.5 pl-2 pr-4">Solved</th>
                </tr>
              </thead>
              <tbody>
                {data.recentSubmissions.map((sub, i) => (
                  <SubmissionRow key={`sub-${sub.id}-${i}`} sub={sub} idx={i} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-[#c7c4d7]/40">
            <Award size={32} className="mb-3 opacity-30" />
            <p className="text-sm font-mono">No recent submissions available</p>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-[10px] font-mono text-[#c7c4d7]/40 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block" />
            All submissions accepted · Status: Accepted
          </p>
          <motion.a
            href={LEETCODE_PROFILE}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#c0c1ff] hover:text-white transition-colors border border-[#c0c1ff]/20 hover:border-[#c0c1ff]/50 px-3 py-1.5 rounded-lg bg-[#c0c1ff]/5 hover:bg-[#c0c1ff]/10"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          >
            <Trophy size={12} />
            Open Full Profile
            <ExternalLink size={10} />
          </motion.a>
        </div>
      </motion.div>

    </section>
  );
}
