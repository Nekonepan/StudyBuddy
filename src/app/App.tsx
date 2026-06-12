import { useState } from "react";
import {
  Home, Search, Calendar, MessageCircle, User, Bell, Settings,
  ChevronLeft, ChevronRight, Star, Clock, Users, BookOpen, Plus,
  Video, Phone, Mic, MicOff, VideoOff, MonitorUp, X, Send,
  Paperclip, Smile, MoreVertical, CheckCheck, Download, Timer,
  LogOut, Edit2, Filter, TrendingUp, Award, Zap, GraduationCap,
  UserPlus, CalendarPlus, Check, BookMarked, Globe,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen =
  | "onboarding" | "home" | "search" | "schedule" | "chat" | "profile"
  | "student-profile" | "chat-view" | "study-room" | "notifications"
  | "recommendations";
type Tab = "home" | "search" | "schedule" | "chat" | "profile";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const ME = {
  name: "Alex Rivera", avatar: "AR", university: "UC Berkeley",
  program: "Computer Science", bio: "Caffeine-powered coder. Love algorithms, hackathons, and morning yoga.",
  courses: ["CS 161 – Security", "CS 189 – ML", "MATH 128A", "CS 170 – Algorithms"],
  interests: ["Machine Learning", "Web Dev", "Competitive Programming", "Photography"],
  stats: { sessions: 47, hours: 128, partners: 31 },
};

const STUDENTS = [
  {
    id: 1, name: "Maya Chen", avatar: "MC", university: "UC Berkeley",
    program: "Data Science", status: "online",
    courses: ["CS 189 – ML", "STAT 134", "CS 170 – Algorithms", "DATA 100"],
    interests: ["Deep Learning", "Data Viz", "Yoga", "Cooking"],
    match: 87, sharedCourses: ["CS 189 – ML", "CS 170"],
    lastSeen: "Active now", coverHue: "from-violet-600 to-indigo-800",
    schedule: [1,0,1,1,0,1,0, 1,1,0,1,1,0,0, 0,1,1,0,1,1,0],
  },
  {
    id: 2, name: "Jordan Kim", avatar: "JK", university: "UC Berkeley",
    program: "EECS", status: "studying",
    courses: ["CS 161 – Security", "CS 189 – ML", "EE 120", "CS 170 – Algorithms"],
    interests: ["Cybersecurity", "Robotics", "Gaming", "Music"],
    match: 92, sharedCourses: ["CS 161 – Security", "CS 189 – ML", "CS 170"],
    lastSeen: "Active now", coverHue: "from-blue-600 to-cyan-800",
    schedule: [1,1,0,1,0,1,1, 0,1,1,1,0,1,0, 1,0,1,1,0,0,1],
  },
  {
    id: 3, name: "Priya Patel", avatar: "PP", university: "Stanford",
    program: "Statistics", status: "available",
    courses: ["STAT 229", "CS 229 – ML", "MATH 128A", "CS 170 – Algorithms"],
    interests: ["Statistics", "Research", "Hiking", "Piano"],
    match: 74, sharedCourses: ["MATH 128A", "CS 170"],
    lastSeen: "2m ago", coverHue: "from-pink-600 to-purple-800",
    schedule: [0,1,1,0,1,1,0, 1,0,1,1,1,0,1, 1,1,0,1,0,1,1],
  },
  {
    id: 4, name: "Luca Rossi", avatar: "LR", university: "UC Berkeley",
    program: "Applied Math", status: "busy",
    courses: ["MATH 128A", "CS 170 – Algorithms", "STAT 134", "ECON 140"],
    interests: ["Number Theory", "Chess", "Running", "Coffee"],
    match: 68, sharedCourses: ["MATH 128A", "CS 170"],
    lastSeen: "1h ago", coverHue: "from-orange-600 to-red-800",
    schedule: [1,0,0,1,1,0,1, 0,1,0,1,0,1,1, 0,1,1,0,1,0,1],
  },
  {
    id: 5, name: "Zara Okonkwo", avatar: "ZO", university: "MIT",
    program: "Computer Science", status: "offline",
    courses: ["6.006 – Algorithms", "6.036 – ML", "18.06 – Linear Algebra"],
    interests: ["AI Ethics", "Bioinformatics", "Writing", "Travel"],
    match: 61, sharedCourses: ["CS 189 – ML"],
    lastSeen: "3h ago", coverHue: "from-teal-600 to-green-800",
    schedule: [0,0,1,1,0,1,1, 1,1,0,0,1,1,0, 0,1,0,1,1,1,0],
  },
];

const GROUPS = [
  {
    id: 1, name: "ML Study Squad", topic: "Machine Learning",
    members: 8, nextSession: "Today, 7:00 PM", matchPct: 91,
    avatars: ["MC", "JK", "PP"], tags: ["PyTorch", "Transformers"],
  },
  {
    id: 2, name: "Algorithms Grind", topic: "CS 170",
    members: 5, nextSession: "Tomorrow, 3:00 PM", matchPct: 85,
    avatars: ["LR", "ZO", "AR"], tags: ["Graphs", "DP", "Flows"],
  },
  {
    id: 3, name: "Security Nerds", topic: "CS 161",
    members: 6, nextSession: "Thu, 6:30 PM", matchPct: 79,
    avatars: ["JK", "AR", "MC"], tags: ["Cryptography", "Web"],
  },
];

const CONVERSATIONS = [
  {
    id: 1, type: "private", with: STUDENTS[1],
    lastMsg: "Are you free tonight for the ML problem set?", time: "2m", unread: 2,
  },
  {
    id: 2, type: "group", name: "ML Study Squad", avatar: "ML",
    lastMsg: "Jordan: Let's meet in Moffitt at 7!", time: "14m", unread: 5,
  },
  {
    id: 3, type: "private", with: STUDENTS[0],
    lastMsg: "Thanks for the notes! 🙏", time: "1h", unread: 0,
  },
  {
    id: 4, type: "group", name: "Algorithms Grind", avatar: "AG",
    lastMsg: "Priya: problem 4 is brutal", time: "2h", unread: 1,
  },
  {
    id: 5, type: "private", with: STUDENTS[2],
    lastMsg: "Same schedule on Thursday!", time: "Yesterday", unread: 0,
  },
];

const MESSAGES = [
  { id: 1, from: "them", text: "Hey! Working on the ML assignment?", time: "6:42 PM", read: true },
  { id: 2, from: "me", text: "Yeah, stuck on problem 3. The gradient descent part is tricky.", time: "6:44 PM", read: true },
  { id: 3, from: "them", text: "Same! Want to work through it together tonight?", time: "6:44 PM", read: true },
  { id: 4, from: "me", text: "100%! Moffitt Library? 7:30?", time: "6:45 PM", read: true },
  { id: 5, from: "them", text: "Perfect 👌 I'll grab us coffee on the way", time: "6:46 PM", read: true },
  {
    id: 6, from: "them", text: "", time: "6:47 PM", read: true,
    file: { name: "CS189_notes_lec12.pdf", size: "2.4 MB", type: "pdf" },
  },
  { id: 7, from: "me", text: "These notes are amazing, thank you!", time: "6:50 PM", read: true },
  { id: 8, from: "them", text: "Are you free tonight for the ML problem set?", time: "7:02 PM", read: false },
];

const NOTIFS = [
  { id: 1, icon: "partner", title: "New Study Partner Match!", desc: "Jordan Kim matches 92% with your courses & schedule.", time: "2m ago", unread: true },
  { id: 2, icon: "session", title: "Session Reminder", desc: "ML Study Squad meets in 30 minutes at Moffitt Library.", time: "28m ago", unread: true },
  { id: 3, icon: "message", title: "New Message", desc: "Maya Chen: Thanks for the notes! 🙏", time: "1h ago", unread: false },
  { id: 4, icon: "group", title: "Group Invitation", desc: "Jordan Kim invited you to join Algorithms Grind.", time: "2h ago", unread: false },
  { id: 5, icon: "schedule", title: "Schedule Updated", desc: "Priya Patel updated her availability for Thursday.", time: "5h ago", unread: false },
  { id: 6, icon: "partner", title: "New Study Partner Match!", desc: "Zara Okonkwo has 3 courses in common with you.", time: "Yesterday", unread: false },
];

const SESSIONS = [
  { id: 1, title: "ML Problem Set Session", participants: ["MC", "JK"], date: "Today", time: "7:00 PM", location: "Moffitt Library", topic: "CS 189 – ML", dots: [12] },
  { id: 2, title: "Algorithms Review", participants: ["PP", "LR", "ZO"], date: "Tomorrow", time: "3:00 PM", location: "Online", topic: "CS 170", dots: [13] },
  { id: 3, title: "Security Exam Prep", participants: ["JK", "MC"], date: "Thu, Jun 15", time: "6:30 PM", location: "Soda Hall 310", topic: "CS 161", dots: [15] },
  { id: 4, title: "Linear Algebra Help", participants: ["PP"], date: "Fri, Jun 16", time: "2:00 PM", location: "Online", topic: "MATH 128A", dots: [16] },
];

// ─── Utility Components ───────────────────────────────────────────────────────
const statusColors: Record<string, string> = {
  online: "#22C55E", studying: "#6C63FF", available: "#38BDF8",
  busy: "#F59E0B", offline: "#6B7280",
};
const statusLabels: Record<string, string> = {
  online: "Online", studying: "Studying", available: "Available", busy: "Busy", offline: "Offline",
};

function Avatar({ initials, size = "md", status }: { initials: string; size?: "sm" | "md" | "lg" | "xl"; status?: string }) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-base", xl: "w-20 h-20 text-xl" };
  const dotSizes = { sm: "w-2 h-2 border", md: "w-2.5 h-2.5 border-[1.5px]", lg: "w-3.5 h-3.5 border-2", xl: "w-4 h-4 border-2" };
  const hues: Record<string, string> = {
    AR: "from-violet-500 to-indigo-600", MC: "from-pink-500 to-rose-600",
    JK: "from-blue-500 to-cyan-600", PP: "from-orange-400 to-pink-500",
    LR: "from-amber-500 to-orange-600", ZO: "from-teal-500 to-green-600",
    ML: "from-violet-600 to-purple-700", AG: "from-blue-600 to-indigo-700",
  };
  const grad = hues[initials] || "from-violet-500 to-purple-600";
  return (
    <div className="relative inline-block flex-shrink-0">
      <div className={`${sizes[size]} rounded-full bg-gradient-to-br ${grad} flex items-center justify-center font-semibold text-white`}
        style={{ fontFamily: "'Poppins', sans-serif" }}>
        {initials}
      </div>
      {status && (
        <span className={`absolute bottom-0 right-0 ${dotSizes[size]} rounded-full border-[#1E1E2E]`}
          style={{ backgroundColor: statusColors[status] }} />
      )}
    </div>
  );
}

function TagChip({ label, color = "primary" }: { label: string; color?: "primary" | "coral" | "muted" | "green" | "amber" }) {
  const colors = {
    primary: "bg-[#6C63FF]/20 text-[#9D97FF] border-[#6C63FF]/30",
    coral: "bg-[#FF6B6B]/20 text-[#FF9F9F] border-[#FF6B6B]/30",
    muted: "bg-white/5 text-[#8E8EA0] border-white/10",
    green: "bg-[#22C55E]/20 text-[#4ADE80] border-[#22C55E]/30",
    amber: "bg-[#F59E0B]/20 text-[#FBD38D] border-[#F59E0B]/30",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`}>
      {label}
    </span>
  );
}

function GlassCard({ children, className = "", glow = false }: { children: React.ReactNode; className?: string; glow?: boolean }) {
  return (
    <div className={`rounded-2xl bg-white/[0.06] border border-white/[0.09] backdrop-blur-sm ${glow ? "shadow-[0_0_30px_rgba(108,99,255,0.12)]" : ""} ${className}`}>
      {children}
    </div>
  );
}

function MatchBar({ pct }: { pct: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-[#6C63FF] to-[#FF6B6B] transition-all"
          style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-[#9D97FF] font-semibold">{pct}%</span>
    </div>
  );
}

// ─── Onboarding ───────────────────────────────────────────────────────────────
function OnboardingScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [slide, setSlide] = useState(0);
  const slides = [
    {
      icon: <Users className="w-12 h-12 text-white" />,
      bg: "from-[#6C63FF] to-[#8B85FF]",
      title: "Find Study Partners",
      desc: "Connect with classmates who share your courses, schedule, and learning style.",
    },
    {
      icon: <Calendar className="w-12 h-12 text-white" />,
      bg: "from-[#FF6B6B] to-[#FF9F9F]",
      title: "Schedule Together",
      desc: "Sync calendars in seconds. Find overlapping free time and book sessions instantly.",
    },
    {
      icon: <GraduationCap className="w-12 h-12 text-white" />,
      bg: "from-[#22C55E] to-[#4ADE80]",
      title: "Learn Better",
      desc: "Students who study together score 40% higher. Your best semester starts now.",
    },
  ];
  const s = slides[slide];
  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Logo bar */}
      <div className="flex items-center justify-between px-6 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#8B85FF] flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-base text-white">StudyBuddy</span>
        </div>
        <button onClick={() => navigate("home")} className="text-xs text-[#8E8EA0] hover:text-white transition-colors">
          Skip
        </button>
      </div>

      {/* Illustration area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-6">
        <div className={`w-40 h-40 rounded-[40px] bg-gradient-to-br ${s.bg} flex items-center justify-center mb-8 shadow-[0_20px_60px_rgba(108,99,255,0.3)]`}>
          {s.icon}
        </div>
        <h1 className="text-2xl font-bold text-white text-center mb-3">{s.title}</h1>
        <p className="text-sm text-[#8E8EA0] text-center leading-relaxed">{s.desc}</p>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 pb-6">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setSlide(i)}
            className={`rounded-full transition-all ${i === slide ? "w-6 h-2 bg-[#6C63FF]" : "w-2 h-2 bg-white/20"}`} />
        ))}
      </div>

      {/* Navigation */}
      <div className="px-6 pb-8 flex flex-col gap-3">
        {slide < 2 ? (
          <button onClick={() => setSlide(s => s + 1)}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#6C63FF] to-[#8B85FF] text-white font-semibold text-sm shadow-[0_8px_30px_rgba(108,99,255,0.4)] active:scale-[0.98] transition-transform">
            Continue
          </button>
        ) : (
          <>
            <button onClick={() => navigate("home")}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#6C63FF] to-[#8B85FF] text-white font-semibold text-sm shadow-[0_8px_30px_rgba(108,99,255,0.4)] active:scale-[0.98] transition-transform">
              Get Started — it's free
            </button>
            <button onClick={() => navigate("home")}
              className="w-full py-3.5 rounded-2xl border border-white/10 text-[#8E8EA0] text-sm font-medium active:bg-white/5 transition-colors">
              I already have an account
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
function HomeScreen({ navigate, setSelectedStudent, setSelectedChat }:
  { navigate: (s: Screen) => void; setSelectedStudent: (s: typeof STUDENTS[0]) => void; setSelectedChat: (c: typeof CONVERSATIONS[0]) => void }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="px-5 pt-3 pb-4">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-xs text-[#8E8EA0]">Good evening 👋</p>
            <h1 className="text-lg font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Alex Rivera
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("notifications")} className="relative">
              <Bell className="w-5 h-5 text-[#8E8EA0]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF6B6B] text-white text-[9px] flex items-center justify-center font-bold">3</span>
            </button>
            <Avatar initials="AR" size="md" status="online" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[
            { label: "Sessions", value: "47", icon: <BookOpen className="w-4 h-4" />, color: "text-[#9D97FF]" },
            { label: "Hours", value: "128", icon: <Clock className="w-4 h-4" />, color: "text-[#FF9F9F]" },
            { label: "Partners", value: "31", icon: <Users className="w-4 h-4" />, color: "text-[#4ADE80]" },
          ].map(({ label, value, icon, color }) => (
            <GlassCard key={label} className="p-3 flex flex-col gap-1">
              <div className={`${color}`}>{icon}</div>
              <p className="text-lg font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>{value}</p>
              <p className="text-[10px] text-[#8E8EA0]">{label}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mb-5">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Search", icon: <Search className="w-5 h-5" />, action: () => navigate("search"), grad: "from-[#6C63FF] to-[#8B85FF]" },
            { label: "Create Group", icon: <Users className="w-5 h-5" />, action: () => {}, grad: "from-[#FF6B6B] to-[#FF9F9F]" },
            { label: "Schedule", icon: <CalendarPlus className="w-5 h-5" />, action: () => navigate("schedule"), grad: "from-[#22C55E] to-[#4ADE80]" },
          ].map(({ label, icon, action, grad }) => (
            <button key={label} onClick={action}
              className={`flex flex-col items-center gap-2 py-3.5 rounded-2xl bg-gradient-to-br ${grad} text-white active:scale-95 transition-transform shadow-lg`}>
              {icon}
              <span className="text-[11px] font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Partners */}
      <div className="mb-5">
        <div className="flex items-center justify-between px-5 mb-3">
          <h2 className="text-sm font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Recommended Partners
          </h2>
          <button onClick={() => navigate("recommendations")} className="text-xs text-[#6C63FF]">See all</button>
        </div>
        <div className="flex gap-3 pl-5 overflow-x-auto scrollbar-hide pb-1">
          {STUDENTS.slice(0, 4).map(s => (
            <button key={s.id} onClick={() => { setSelectedStudent(s); navigate("student-profile"); }}
              className="flex-shrink-0 w-44">
              <GlassCard className="p-3.5 flex flex-col gap-3 hover:border-[#6C63FF]/30 transition-colors" glow>
                <div className="flex items-center gap-2.5">
                  <Avatar initials={s.avatar} size="md" status={s.status} />
                  <div className="text-left min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{s.name}</p>
                    <p className="text-[11px] text-[#8E8EA0] truncate">{s.program}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {s.sharedCourses.slice(0, 2).map(c => (
                    <span key={c} className="text-[10px] bg-[#6C63FF]/20 text-[#9D97FF] rounded-full px-2 py-0.5">{c.split(" – ")[0]}</span>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] text-[#8E8EA0] mb-1">Schedule match</p>
                  <MatchBar pct={s.match} />
                </div>
              </GlassCard>
            </button>
          ))}
          <div className="w-5 flex-shrink-0" />
        </div>
      </div>

      {/* Study Groups */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Study Groups
          </h2>
          <button className="text-xs text-[#6C63FF]">See all</button>
        </div>
        <div className="flex flex-col gap-3">
          {GROUPS.map(g => (
            <GlassCard key={g.id} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-white">{g.name}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Clock className="w-3 h-3 text-[#8E8EA0]" />
                    <span className="text-xs text-[#8E8EA0]">{g.nextSession}</span>
                  </div>
                </div>
                <TagChip label={`${g.matchPct}% match`} color="primary" />
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1">
                  <div className="flex -space-x-2">
                    {g.avatars.map(a => (
                      <div key={a} className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 border-2 border-[#1E1E2E] flex items-center justify-center text-[9px] text-white font-bold">
                        {a}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-[#8E8EA0] ml-1">{g.members} members</span>
                </div>
                <button className="text-xs text-white bg-[#6C63FF] px-3 py-1 rounded-full hover:bg-[#7C74FF] transition-colors">
                  Join
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Search ───────────────────────────────────────────────────────────────────
function SearchScreen({ navigate, setSelectedStudent }:
  { navigate: (s: Screen) => void; setSelectedStudent: (s: typeof STUDENTS[0]) => void }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Courses", "Programs", "Topics"];
  const filtered = STUDENTS.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.courses.some(c => c.toLowerCase().includes(query.toLowerCase())) ||
    s.program.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="px-5 pt-3 pb-4">
        <h1 className="text-lg font-bold text-white mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>Find Partners</h1>
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8EA0]" />
          <input
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search students, courses, topics..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/[0.06] border border-white/[0.09] text-white placeholder-[#6B6B80] text-sm focus:outline-none focus:border-[#6C63FF]/50"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-[#8E8EA0]" />
            </button>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-[#6C63FF] text-white"
                  : "bg-white/[0.06] border border-white/10 text-[#8E8EA0]"
              }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-5">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
              <Search className="w-8 h-8 text-[#8E8EA0]" />
            </div>
            <p className="text-[#8E8EA0] text-sm">No results found</p>
            <p className="text-[#6B6B80] text-xs">Try a different name or course</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 pb-4">
            {filtered.map(s => (
              <button key={s.id} onClick={() => { setSelectedStudent(s); navigate("student-profile"); }}>
                <GlassCard className="p-4 text-left hover:border-[#6C63FF]/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <Avatar initials={s.avatar} size="md" status={s.status} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-white">{s.name}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{
                          backgroundColor: `${statusColors[s.status]}20`,
                          color: statusColors[s.status],
                        }}>
                          {statusLabels[s.status]}
                        </span>
                      </div>
                      <p className="text-xs text-[#8E8EA0] mb-2">{s.university} · {s.program}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {s.sharedCourses.map(c => (
                          <TagChip key={c} label={c.split(" – ")[0]} color="primary" />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-1.5 rounded-xl bg-[#6C63FF] text-white text-xs font-semibold hover:bg-[#7C74FF] transition-colors">
                          Connect
                        </button>
                        <button className="flex-1 py-1.5 rounded-xl border border-white/10 text-[#8E8EA0] text-xs hover:border-[#6C63FF]/50 transition-colors">
                          Invite to Study
                        </button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Student Profile ──────────────────────────────────────────────────────────
function StudentProfileScreen({ student, goBack, navigate, setSelectedChat }:
  { student: typeof STUDENTS[0]; goBack: () => void; navigate: (s: Screen) => void; setSelectedChat: (c: typeof CONVERSATIONS[0]) => void }) {
  const [tab, setTab] = useState<"courses" | "interests" | "schedule">("courses");
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const conv = CONVERSATIONS.find(c => c.type === "private" && c.with?.id === student.id);
  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Cover */}
      <div className={`relative h-36 bg-gradient-to-br ${student.coverHue} flex-shrink-0`}>
        <button onClick={goBack} className="absolute top-3 left-4 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
        <button className="absolute top-3 right-4 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
          <MoreVertical className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Avatar + Info */}
      <div className="px-5 -mt-8 mb-4">
        <div className="flex items-end justify-between mb-3">
          <div className="ring-4 ring-[#1E1E2E] rounded-full">
            <Avatar initials={student.avatar} size="xl" status={student.status} />
          </div>
          <span className="text-xs px-3 py-1.5 rounded-full font-medium mb-2" style={{
            backgroundColor: `${statusColors[student.status]}20`,
            color: statusColors[student.status],
            border: `1px solid ${statusColors[student.status]}40`,
          }}>
            {statusLabels[student.status]}
          </span>
        </div>
        <h1 className="text-lg font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>{student.name}</h1>
        <p className="text-xs text-[#8E8EA0] mt-0.5">{student.university} · {student.program}</p>
        <div className="mt-2">
          <p className="text-xs text-[#8E8EA0] mb-1">Schedule match</p>
          <MatchBar pct={student.match} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-5 mb-5 grid grid-cols-3 gap-2">
        {[
          { label: "Message", icon: <MessageCircle className="w-4 h-4" />, action: () => { if (conv) { setSelectedChat(conv); navigate("chat-view"); } }, primary: true },
          { label: "Invite", icon: <CalendarPlus className="w-4 h-4" />, action: () => {} },
          { label: "Add Group", icon: <UserPlus className="w-4 h-4" />, action: () => {} },
        ].map(({ label, icon, action, primary }) => (
          <button key={label} onClick={action}
            className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl text-xs font-semibold transition-colors active:scale-95 ${
              primary
                ? "bg-gradient-to-r from-[#6C63FF] to-[#8B85FF] text-white shadow-[0_4px_20px_rgba(108,99,255,0.3)]"
                : "bg-white/[0.06] border border-white/[0.09] text-[#8E8EA0] hover:border-[#6C63FF]/30"
            }`}>
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="px-5">
        <div className="flex rounded-xl bg-white/[0.05] p-1 mb-4">
          {(["courses", "interests", "schedule"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                tab === t ? "bg-[#6C63FF] text-white shadow" : "text-[#8E8EA0]"
              }`}>
              {t}
            </button>
          ))}
        </div>

        {tab === "courses" && (
          <div className="flex flex-col gap-2 pb-6">
            {student.courses.map(c => (
              <GlassCard key={c} className="px-4 py-3 flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-[#6C63FF] flex-shrink-0" />
                <span className="text-sm text-white">{c}</span>
                {ME.courses.includes(c) && <TagChip label="Shared" color="primary" />}
              </GlassCard>
            ))}
          </div>
        )}

        {tab === "interests" && (
          <div className="flex flex-wrap gap-2 pb-6">
            {student.interests.map(i => (
              <TagChip key={i} label={i} color="muted" />
            ))}
          </div>
        )}

        {tab === "schedule" && (
          <div className="pb-6">
            <p className="text-xs text-[#8E8EA0] mb-3">Weekly availability (3 weeks)</p>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {days.map((d, i) => (
                <div key={i} className="text-center text-[10px] text-[#8E8EA0]">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {student.schedule.map((v, i) => (
                <div key={i} className={`h-7 rounded-lg ${v ? "bg-[#6C63FF]/70" : "bg-white/5"}`} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Schedule ─────────────────────────────────────────────────────────────────
function ScheduleScreen() {
  const [showCreate, setShowCreate] = useState(false);
  const today = 12;
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const datesWithSessions = [12, 13, 15, 16, 20, 22];
  const calDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const firstDayOffset = 0;

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="px-5 pt-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Schedule</h1>
          <button onClick={() => setShowCreate(true)}
            className="flex items-center gap-1.5 bg-[#6C63FF] text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-[0_4px_20px_rgba(108,99,255,0.3)] hover:bg-[#7C74FF] transition-colors">
            <Plus className="w-3.5 h-3.5" />
            New Session
          </button>
        </div>

        {/* Calendar */}
        <GlassCard className="p-4 mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>June 2026</h2>
            <div className="flex gap-1">
              <button className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors">
                <ChevronLeft className="w-3.5 h-3.5 text-[#8E8EA0]" />
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors">
                <ChevronRight className="w-3.5 h-3.5 text-[#8E8EA0]" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {days.map((d, i) => (
              <div key={i} className="text-center text-[10px] text-[#8E8EA0] py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOffset }).map((_, i) => <div key={`e${i}`} />)}
            {calDays.map(d => (
              <button key={d}
                className={`relative aspect-square flex flex-col items-center justify-center rounded-xl text-xs font-medium transition-colors ${
                  d === today
                    ? "bg-[#6C63FF] text-white shadow-[0_0_15px_rgba(108,99,255,0.4)]"
                    : datesWithSessions.includes(d)
                    ? "text-white hover:bg-white/10"
                    : "text-[#8E8EA0] hover:bg-white/5"
                }`}>
                {d}
                {datesWithSessions.includes(d) && d !== today && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#6C63FF]" />
                )}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Upcoming Sessions */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-white mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Upcoming Sessions
          </h2>
          <div className="flex flex-col gap-3">
            {SESSIONS.map(s => (
              <GlassCard key={s.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-[#6C63FF]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white mb-1">{s.title}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-3 h-3 text-[#8E8EA0]" />
                      <span className="text-xs text-[#8E8EA0]">{s.date} · {s.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="w-3 h-3 text-[#8E8EA0]" />
                        <span className="text-xs text-[#8E8EA0]">{s.location}</span>
                      </div>
                      <div className="flex -space-x-2">
                        {s.participants.map(a => (
                          <div key={a} className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 border-2 border-[#1E1E2E] flex items-center justify-center text-[8px] text-white font-bold">
                            {a}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      {/* Create Session Modal */}
      {showCreate && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end">
          <div className="w-full bg-[#252540] rounded-t-3xl p-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                New Study Session
              </h2>
              <button onClick={() => setShowCreate(false)}>
                <X className="w-5 h-5 text-[#8E8EA0]" />
              </button>
            </div>
            {[
              { placeholder: "Session title", type: "text" },
              { placeholder: "Date & time", type: "text" },
              { placeholder: "Topic / Subject", type: "text" },
            ].map(f => (
              <input key={f.placeholder} placeholder={f.placeholder} type={f.type}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.09] text-white placeholder-[#6B6B80] text-sm mb-3 focus:outline-none focus:border-[#6C63FF]/50" />
            ))}
            <div className="flex gap-2 mb-4">
              {["15 min", "30 min", "1 hr"].map(r => (
                <button key={r} className="flex-1 py-2 rounded-xl border border-white/10 text-[#8E8EA0] text-xs hover:border-[#6C63FF]/40 transition-colors">
                  {r} before
                </button>
              ))}
            </div>
            <button onClick={() => setShowCreate(false)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#6C63FF] to-[#8B85FF] text-white font-semibold text-sm shadow-[0_8px_30px_rgba(108,99,255,0.4)]">
              Create Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Chat List ────────────────────────────────────────────────────────────────
function ChatListScreen({ navigate, setSelectedChat }:
  { navigate: (s: Screen) => void; setSelectedChat: (c: typeof CONVERSATIONS[0]) => void }) {
  const [tab, setTab] = useState<"private" | "groups">("private");
  const filtered = CONVERSATIONS.filter(c => tab === "private" ? c.type === "private" : c.type === "group");
  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="px-5 pt-3 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Messages</h1>
          <button className="w-8 h-8 rounded-full bg-[#6C63FF] flex items-center justify-center shadow-[0_4px_15px_rgba(108,99,255,0.4)]">
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8EA0]" />
          <input placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/[0.06] border border-white/[0.09] text-white placeholder-[#6B6B80] text-sm focus:outline-none" />
        </div>
        <div className="flex rounded-xl bg-white/[0.05] p-1">
          {(["private", "groups"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                tab === t ? "bg-[#6C63FF] text-white" : "text-[#8E8EA0]"
              }`}>
              {t === "private" ? "Private" : "Groups"}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5">
        <div className="flex flex-col gap-1">
          {filtered.map(conv => (
            <button key={conv.id} onClick={() => { setSelectedChat(conv); navigate("chat-view"); }}
              className="flex items-center gap-3 py-3 px-3 rounded-2xl hover:bg-white/[0.04] active:bg-white/[0.06] transition-colors">
              <div className="relative flex-shrink-0">
                {conv.type === "group" ? (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#8B85FF] flex items-center justify-center text-white text-sm font-bold">
                    {conv.name!.charAt(0)}
                  </div>
                ) : (
                  <Avatar initials={conv.with!.avatar} size="lg" status={conv.with!.status} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-sm font-semibold text-white truncate">
                    {conv.type === "group" ? conv.name : conv.with!.name}
                  </p>
                  <span className="text-[11px] text-[#6B6B80] flex-shrink-0 ml-2">{conv.time}</span>
                </div>
                <p className="text-xs text-[#8E8EA0] truncate">{conv.lastMsg}</p>
              </div>
              {conv.unread > 0 && (
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#6C63FF] text-white text-[10px] flex items-center justify-center font-bold">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Chat View ────────────────────────────────────────────────────────────────
function ChatViewScreen({ conv, goBack, navigate }:
  { conv: typeof CONVERSATIONS[0]; goBack: () => void; navigate: (s: Screen) => void }) {
  const [text, setText] = useState("");
  const name = conv.type === "group" ? conv.name! : conv.with!.name;
  const initials = conv.type === "group" ? conv.name!.charAt(0) : conv.with!.avatar;
  const status = conv.type === "private" ? conv.with!.status : "online";
  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-3 pb-3 border-b border-white/[0.07]">
        <button onClick={goBack}>
          <ChevronLeft className="w-5 h-5 text-[#8E8EA0]" />
        </button>
        <Avatar initials={initials} size="md" status={status} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{name}</p>
          <p className="text-[11px]" style={{ color: statusColors[status] }}>
            {conv.type === "group" ? "8 members · 5 online" : statusLabels[status]}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
            <Phone className="w-4 h-4 text-[#8E8EA0]" />
          </button>
          <button onClick={() => navigate("study-room")} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
            <Video className="w-4 h-4 text-[#8E8EA0]" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-3 flex flex-col gap-3">
        {MESSAGES.map(m => (
          <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"} gap-2`}>
            {m.from !== "me" && <Avatar initials={initials} size="sm" />}
            <div className={`max-w-[75%] ${m.from === "me" ? "items-end" : "items-start"} flex flex-col gap-1`}>
              {m.file ? (
                <div className={`rounded-2xl ${m.from === "me" ? "rounded-br-sm bg-[#6C63FF]/30 border border-[#6C63FF]/40" : "rounded-bl-sm bg-white/[0.07] border border-white/10"} p-3 flex items-center gap-3`}>
                  <div className="w-8 h-8 rounded-lg bg-[#FF6B6B]/20 flex items-center justify-center">
                    <BookMarked className="w-4 h-4 text-[#FF6B6B]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">{m.file.name}</p>
                    <p className="text-[10px] text-[#8E8EA0]">{m.file.size}</p>
                  </div>
                  <Download className="w-4 h-4 text-[#8E8EA0]" />
                </div>
              ) : m.text ? (
                <div className={`px-3.5 py-2.5 rounded-2xl text-sm ${
                  m.from === "me"
                    ? "rounded-br-sm bg-gradient-to-br from-[#6C63FF] to-[#7C74FF] text-white"
                    : "rounded-bl-sm bg-white/[0.07] border border-white/10 text-[#E8E8F0]"
                }`}>
                  {m.text}
                </div>
              ) : null}
              <div className="flex items-center gap-1 px-1">
                <span className="text-[10px] text-[#6B6B80]">{m.time}</span>
                {m.from === "me" && <CheckCheck className="w-3 h-3 text-[#6C63FF]" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 pb-3 pt-2 border-t border-white/[0.07]">
        <div className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.09] rounded-2xl px-3 py-2">
          <button className="text-[#8E8EA0] hover:text-white transition-colors">
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            value={text} onChange={e => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-white text-sm placeholder-[#6B6B80] focus:outline-none"
          />
          <button className="text-[#8E8EA0] hover:text-white transition-colors">
            <Smile className="w-4 h-4" />
          </button>
          <button className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            text ? "bg-[#6C63FF] shadow-[0_0_15px_rgba(108,99,255,0.5)]" : "bg-white/10"
          }`}>
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Study Room ───────────────────────────────────────────────────────────────
function StudyRoomScreen({ goBack }: { goBack: () => void }) {
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [timer, setTimer] = useState(25 * 60);
  const [showChat, setShowChat] = useState(false);
  const mins = Math.floor(timer / 60).toString().padStart(2, "0");
  const secs = (timer % 60).toString().padStart(2, "0");
  const participants = [
    { initials: "AR", status: "online", label: "You", grad: "from-violet-600 to-indigo-700" },
    { initials: "JK", status: "studying", label: "Jordan Kim", grad: "from-blue-600 to-cyan-700" },
    { initials: "MC", status: "online", label: "Maya Chen", grad: "from-pink-600 to-rose-700" },
    { initials: "PP", status: "available", label: "Priya Patel", grad: "from-orange-500 to-pink-600" },
  ];
  return (
    <div className="flex flex-col h-full bg-[#141420]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-3">
        <button onClick={goBack} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <X className="w-4 h-4 text-white" />
        </button>
        <div className="text-center">
          <p className="text-xs font-semibold text-white">ML Study Room</p>
          <p className="text-[11px] text-[#22C55E]">● Live · 4 participants</p>
        </div>
        <button onClick={() => setShowChat(s => !s)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${showChat ? "bg-[#6C63FF]" : "bg-white/10"}`}>
          <MessageCircle className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Pomodoro Timer */}
      <div className="mx-4 mb-3">
        <GlassCard className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-[#FF6B6B]" />
            <span className="text-xs text-[#8E8EA0]">Pomodoro</span>
          </div>
          <span className="text-xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
            {mins}:{secs}
          </span>
          <div className="flex gap-1.5">
            <button onClick={() => setTimer(25 * 60)} className="w-6 h-6 rounded-full bg-[#FF6B6B]/20 flex items-center justify-center">
              <X className="w-3 h-3 text-[#FF6B6B]" />
            </button>
            <button className="w-6 h-6 rounded-full bg-[#22C55E]/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-[#22C55E]" />
            </button>
          </div>
        </GlassCard>
      </div>

      {/* Video Grid */}
      <div className={`flex-1 grid grid-cols-2 gap-2 px-4 ${showChat ? "hidden" : ""}`}>
        {participants.map((p, i) => (
          <div key={i} className={`relative rounded-2xl bg-gradient-to-br ${p.grad} overflow-hidden flex items-center justify-center`}>
            {i === 1 && videoOff ? (
              <div className="flex flex-col items-center gap-2">
                <Avatar initials={p.initials} size="lg" />
                <p className="text-xs text-white font-medium">Camera off</p>
              </div>
            ) : (
              <>
                <div className={`w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold text-white`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {p.initials}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                  <span className="text-xs text-white font-medium">{p.label}</span>
                  {i === 0 && muted && <MicOff className="w-3 h-3 text-[#FF6B6B]" />}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Chat Sidebar */}
      {showChat && (
        <div className="flex-1 flex flex-col px-4">
          <div className="flex-1 overflow-y-auto scrollbar-hide py-2 flex flex-col gap-2">
            {MESSAGES.slice(0, 5).map(m => (
              <div key={m.id} className={`flex gap-2 ${m.from === "me" ? "justify-end" : ""}`}>
                {m.from !== "me" && <Avatar initials="JK" size="sm" />}
                {m.text && (
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs ${m.from === "me" ? "bg-[#6C63FF]/80 text-white" : "bg-white/10 text-white"}`}>
                    {m.text}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.09] rounded-xl px-3 py-2 mb-2">
            <input placeholder="Chat..." className="flex-1 bg-transparent text-white text-xs placeholder-[#6B6B80] focus:outline-none" />
            <Send className="w-4 h-4 text-[#6C63FF]" />
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="px-4 pb-4 pt-3">
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => setMuted(m => !m)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${muted ? "bg-[#FF6B6B]" : "bg-white/10"}`}>
            {muted ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-white" />}
          </button>
          <button onClick={() => setVideoOff(v => !v)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${videoOff ? "bg-[#FF6B6B]" : "bg-white/10"}`}>
            {videoOff ? <VideoOff className="w-5 h-5 text-white" /> : <Video className="w-5 h-5 text-white" />}
          </button>
          <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <MonitorUp className="w-5 h-5 text-white" />
          </button>
          <button onClick={goBack} className="w-12 h-12 rounded-full bg-[#FF6B6B] flex items-center justify-center shadow-[0_4px_20px_rgba(255,107,107,0.4)]">
            <Phone className="w-5 h-5 text-white rotate-[135deg]" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Notifications ────────────────────────────────────────────────────────────
function NotificationsScreen({ goBack }: { goBack: () => void }) {
  const notifIcons: Record<string, React.ReactNode> = {
    partner: <UserPlus className="w-4 h-4" />,
    session: <Calendar className="w-4 h-4" />,
    message: <MessageCircle className="w-4 h-4" />,
    group: <Users className="w-4 h-4" />,
    schedule: <Clock className="w-4 h-4" />,
  };
  const notifColors: Record<string, string> = {
    partner: "#6C63FF", session: "#22C55E", message: "#38BDF8",
    group: "#FF6B6B", schedule: "#F59E0B",
  };
  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="flex items-center gap-3 px-5 pt-3 pb-4">
        <button onClick={goBack}>
          <ChevronLeft className="w-5 h-5 text-[#8E8EA0]" />
        </button>
        <h1 className="text-lg font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Notifications</h1>
        <button className="ml-auto text-xs text-[#6C63FF]">Mark all read</button>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5">
        <div className="flex flex-col gap-2 pb-4">
          {NOTIFS.map(n => (
            <GlassCard key={n.id} className={`p-4 flex gap-3 transition-colors ${n.unread ? "border-[#6C63FF]/20" : ""}`}>
              {n.unread && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r bg-[#6C63FF]" />}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${notifColors[n.icon]}20`, color: notifColors[n.icon] }}>
                {notifIcons[n.icon]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <p className={`text-sm font-semibold ${n.unread ? "text-white" : "text-[#8E8EA0]"}`}>{n.title}</p>
                  <span className="text-[10px] text-[#6B6B80] flex-shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-[#8E8EA0] leading-relaxed">{n.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Recommendations ──────────────────────────────────────────────────────────
function RecommendationsScreen({ goBack, setSelectedStudent, navigate }:
  { goBack: () => void; setSelectedStudent: (s: typeof STUDENTS[0]) => void; navigate: (s: Screen) => void }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="flex items-center gap-3 px-5 pt-3 pb-4">
        <button onClick={goBack}>
          <ChevronLeft className="w-5 h-5 text-[#8E8EA0]" />
        </button>
        <h1 className="text-lg font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Recommendations</h1>
      </div>

      {/* Same Courses */}
      <div className="px-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-[#6C63FF]" />
          <h2 className="text-sm font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Same Courses</h2>
        </div>
        <div className="flex flex-col gap-3">
          {STUDENTS.slice(0, 3).map(s => (
            <button key={s.id} onClick={() => { setSelectedStudent(s); navigate("student-profile"); }}>
              <GlassCard className="p-3.5 text-left hover:border-[#6C63FF]/30 transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar initials={s.avatar} size="md" status={s.status} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{s.name}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {s.sharedCourses.map(c => <TagChip key={c} label={c.split(" – ")[0]} color="primary" />)}
                    </div>
                  </div>
                  <MatchBar pct={s.match} />
                </div>
              </GlassCard>
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Compatible */}
      <div className="px-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-[#22C55E]" />
          <h2 className="text-sm font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Schedule Compatible</h2>
        </div>
        <div className="flex flex-col gap-3">
          {STUDENTS.slice(1, 4).map(s => (
            <button key={s.id} onClick={() => { setSelectedStudent(s); navigate("student-profile"); }}>
              <GlassCard className="p-3.5 text-left hover:border-[#22C55E]/30 transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar initials={s.avatar} size="md" status={s.status} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{s.name}</p>
                    <p className="text-xs text-[#8E8EA0] mt-0.5">{s.program}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#22C55E]" style={{ fontFamily: "'Poppins', sans-serif" }}>{s.match}%</p>
                    <p className="text-[10px] text-[#8E8EA0]">overlap</p>
                  </div>
                </div>
              </GlassCard>
            </button>
          ))}
        </div>
      </div>

      {/* Study Groups */}
      <div className="px-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-[#FF6B6B]" />
          <h2 className="text-sm font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Study Groups for You</h2>
        </div>
        <div className="flex flex-col gap-3">
          {GROUPS.map(g => (
            <GlassCard key={g.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-white">{g.name}</p>
                  <p className="text-xs text-[#8E8EA0] mt-0.5">{g.members} members · {g.nextSession}</p>
                </div>
                <TagChip label={`${g.matchPct}%`} color="coral" />
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {g.tags.map(t => <TagChip key={t} label={t} color="muted" />)}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {g.avatars.map(a => (
                    <div key={a} className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 border-2 border-[#252540] flex items-center justify-center text-[9px] text-white font-bold">
                      {a}
                    </div>
                  ))}
                </div>
                <button className="bg-[#6C63FF] text-white text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-[#7C74FF] transition-colors">
                  Join Group
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Profile ──────────────────────────────────────────────────────────────────
function ProfileScreen() {
  const [editMode, setEditMode] = useState(false);
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const availability = [1,0,1,1,0,0, 1,1,1,0,1,0, 0,0,1,1,1,0];
  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Cover */}
      <div className="relative h-28 bg-gradient-to-br from-[#6C63FF] to-[#4834D4] flex-shrink-0">
        <button onClick={() => setEditMode(e => !e)}
          className="absolute top-3 right-4 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
          <Edit2 className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Avatar & Info */}
      <div className="px-5 -mt-7 mb-5">
        <div className="ring-4 ring-[#1E1E2E] rounded-full inline-block mb-3">
          <Avatar initials="AR" size="xl" status="online" />
        </div>
        <h1 className="text-lg font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>{ME.name}</h1>
        <p className="text-xs text-[#8E8EA0] mt-0.5">{ME.university} · {ME.program}</p>
        <p className="text-xs text-[#8E8EA0] mt-2 leading-relaxed">{ME.bio}</p>
      </div>

      {/* Stats */}
      <div className="px-5 mb-5">
        <h2 className="text-sm font-bold text-white mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>Study Stats</h2>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Sessions", value: ME.stats.sessions, icon: <BookOpen className="w-4 h-4" />, color: "#9D97FF", bg: "#6C63FF" },
            { label: "Hours", value: ME.stats.hours, icon: <Clock className="w-4 h-4" />, color: "#FF9F9F", bg: "#FF6B6B" },
            { label: "Partners", value: ME.stats.partners, icon: <Users className="w-4 h-4" />, color: "#4ADE80", bg: "#22C55E" },
          ].map(({ label, value, icon, color, bg }) => (
            <GlassCard key={label} className="p-3 flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-1"
                style={{ backgroundColor: `${bg}20`, color }}>
                {icon}
              </div>
              <p className="text-xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>{value}</p>
              <p className="text-[10px] text-[#8E8EA0]">{label}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="px-5 mb-5">
        <h2 className="text-sm font-bold text-white mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>My Availability</h2>
        <GlassCard className="p-4">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {days.map((d, i) => <div key={i} className="text-center text-[10px] text-[#8E8EA0]">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {availability.map((v, i) => (
              <div key={i} className={`h-8 rounded-xl cursor-pointer transition-colors ${v ? "bg-[#6C63FF]/70 hover:bg-[#6C63FF]" : "bg-white/5 hover:bg-white/10"}`} />
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Courses & Interests */}
      <div className="px-5 mb-5">
        <h2 className="text-sm font-bold text-white mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>Courses</h2>
        <div className="flex flex-col gap-2 mb-4">
          {ME.courses.map(c => (
            <GlassCard key={c} className="px-4 py-3 flex items-center gap-3">
              <BookOpen className="w-4 h-4 text-[#6C63FF] flex-shrink-0" />
              <span className="text-sm text-white">{c}</span>
            </GlassCard>
          ))}
        </div>
        <h2 className="text-sm font-bold text-white mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>Interests</h2>
        <div className="flex flex-wrap gap-2 mb-5">
          {ME.interests.map(i => <TagChip key={i} label={i} color="muted" />)}
        </div>
      </div>

      {/* Settings */}
      <div className="px-5 mb-8">
        <h2 className="text-sm font-bold text-white mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>Settings</h2>
        <GlassCard className="overflow-hidden">
          {[
            { icon: <Bell className="w-4 h-4" />, label: "Notifications", color: "#6C63FF" },
            { icon: <Settings className="w-4 h-4" />, label: "App Settings", color: "#8E8EA0" },
            { icon: <Globe className="w-4 h-4" />, label: "Privacy", color: "#38BDF8" },
            { icon: <LogOut className="w-4 h-4" />, label: "Log Out", color: "#FF6B6B" },
          ].map(({ icon, label, color }, i, arr) => (
            <button key={label} className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/[0.04] transition-colors ${i < arr.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20`, color }}>
                {icon}
              </div>
              <span className="text-sm text-white">{label}</span>
              <ChevronRight className="w-4 h-4 text-[#8E8EA0] ml-auto" />
            </button>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
function BottomNav({ activeTab, onTabChange }: { activeTab: Tab; onTabChange: (t: Tab) => void }) {
  const tabs: { id: Tab; icon: React.ReactNode; label: string }[] = [
    { id: "home", icon: <Home className="w-5 h-5" />, label: "Home" },
    { id: "search", icon: <Search className="w-5 h-5" />, label: "Search" },
    { id: "schedule", icon: <Calendar className="w-5 h-5" />, label: "Schedule" },
    { id: "chat", icon: <MessageCircle className="w-5 h-5" />, label: "Chat" },
    { id: "profile", icon: <User className="w-5 h-5" />, label: "Profile" },
  ];
  return (
    <div className="flex-shrink-0 border-t border-white/[0.07] bg-[#1A1A2E]/90 backdrop-blur-xl">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(t => (
          <button key={t.id} onClick={() => onTabChange(t.id)}
            className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all relative"
            style={{ color: activeTab === t.id ? "#6C63FF" : "#6B6B80" }}>
            {activeTab === t.id && (
              <span className="absolute inset-0 rounded-2xl bg-[#6C63FF]/10" />
            )}
            {t.id === "chat" && (
              <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-[#FF6B6B]" />
            )}
            {t.icon}
            <span className="text-[10px] font-medium">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("onboarding");
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [selectedStudent, setSelectedStudent] = useState<typeof STUDENTS[0]>(STUDENTS[0]);
  const [selectedChat, setSelectedChat] = useState<typeof CONVERSATIONS[0]>(CONVERSATIONS[0]);

  const navigate = (s: Screen) => setScreen(s);
  const goBack = () => setScreen(activeTab);
  const handleTabChange = (t: Tab) => { setActiveTab(t); setScreen(t); };

  const isSubScreen = ["student-profile", "chat-view", "study-room", "notifications", "recommendations"].includes(screen);
  const showNav = screen !== "onboarding" && screen !== "study-room";

  const renderScreen = () => {
    switch (screen) {
      case "onboarding": return <OnboardingScreen navigate={navigate} />;
      case "home": return <HomeScreen navigate={navigate} setSelectedStudent={setSelectedStudent} setSelectedChat={setSelectedChat} />;
      case "search": return <SearchScreen navigate={navigate} setSelectedStudent={setSelectedStudent} />;
      case "schedule": return <ScheduleScreen />;
      case "chat": return <ChatListScreen navigate={navigate} setSelectedChat={setSelectedChat} />;
      case "profile": return <ProfileScreen />;
      case "student-profile": return <StudentProfileScreen student={selectedStudent} goBack={goBack} navigate={navigate} setSelectedChat={setSelectedChat} />;
      case "chat-view": return <ChatViewScreen conv={selectedChat} goBack={goBack} navigate={navigate} />;
      case "study-room": return <StudyRoomScreen goBack={goBack} />;
      case "notifications": return <NotificationsScreen goBack={goBack} />;
      case "recommendations": return <RecommendationsScreen goBack={goBack} setSelectedStudent={setSelectedStudent} navigate={navigate} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(108,99,255,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,107,107,0.1) 0%, transparent 60%), #0A0A16" }}>
      {/* Phone Frame */}
      <div className="relative w-[390px] h-[844px] rounded-[44px] overflow-hidden flex flex-col"
        style={{
          background: "#1E1E2E",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 40px 120px rgba(0,0,0,0.6), 0 0 80px rgba(108,99,255,0.15)",
        }}>
        {/* Dynamic Island */}
        {screen !== "onboarding" && (
          <div className="flex-shrink-0 h-11 flex items-center justify-center relative z-10">
            <div className="w-28 h-7 rounded-full bg-black flex items-center justify-center gap-3 px-4">
              <span className="text-[10px] text-white/60">9:41</span>
              <div className="w-1 flex-1" />
              <div className="flex gap-1 items-center">
                <div className="flex gap-0.5">
                  {[3,4,4,3].map((h, i) => (
                    <div key={i} className="w-0.5 rounded-full bg-white" style={{ height: `${h * 2}px` }} />
                  ))}
                </div>
                <div className="w-4 h-2 rounded-sm border border-white/60 relative">
                  <div className="absolute inset-0.5 rounded-sm bg-white" style={{ width: "70%" }} />
                  <div className="absolute -right-0.5 top-0.5 w-0.5 h-1 rounded-r-sm bg-white/60" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Screen Content */}
        <div className="flex-1 overflow-hidden flex flex-col relative">
          {renderScreen()}
        </div>

        {/* Bottom Nav */}
        {showNav && (
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </div>
    </div>
  );
}
