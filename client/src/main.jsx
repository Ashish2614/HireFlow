import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  Bell,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Clock3,
  Home,
  LayoutDashboard,
  Menu,
  Moon,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Users,
} from "lucide-react";
import {
  BarChart as RBarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./styles.css";
const BarChart = BarChart3;

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const fallbackJobs = [
  {
    id: "j1",
    slug: "senior-frontend-engineer",
    title: "Senior Frontend Engineer",
    organization: "Northstar Labs",
    department: "Engineering",
    workplace_type: "Remote",
    employment_type: "Full-time",
    location: "Remote · India",
    salary: "₹24L – ₹36L",
    experience: "4+ years",
    description:
      "Lead the frontend architecture for products used by ambitious teams.",
    requirements: [
      "React and modern JavaScript",
      "Strong product sense",
      "Comfortable owning outcomes",
    ],
    applicants: 24,
    posted: "2 days ago",
  },
  {
    id: "j2",
    slug: "product-designer",
    title: "Product Designer",
    organization: "Northstar Labs",
    department: "Design",
    workplace_type: "Hybrid",
    employment_type: "Full-time",
    location: "Bengaluru, India",
    salary: "₹18L – ₹28L",
    experience: "3+ years",
    description:
      "Shape intuitive workflows from the first sketch to the final pixel.",
    requirements: [
      "Portfolio of shipped products",
      "Figma fluency",
      "Excellent communication",
    ],
    applicants: 18,
    posted: "5 days ago",
  },
  {
    id: "j3",
    slug: "backend-engineer",
    title: "Backend Engineer",
    organization: "Orbit Systems",
    department: "Engineering",
    workplace_type: "Hybrid",
    employment_type: "Full-time",
    location: "Pune, India",
    salary: "₹20L – ₹32L",
    experience: "3+ years",
    description:
      "Build resilient APIs and data systems for a fast-growing platform.",
    requirements: [
      "Node.js and SQL",
      "API design experience",
      "Production ownership",
    ],
    applicants: 31,
    posted: "1 week ago",
  },
];
const fallbackApps = [
  {
    id: "HF-1048",
    candidate: "Aarav Mehta",
    initials: "AM",
    job: "Senior Frontend Engineer",
    organization: "Northstar Labs",
    status: "Interview",
    applied: "Oct 10, 2026",
    updated: "2h ago",
    skills: ["React", "JavaScript", "Design systems"],
    location: "Bengaluru",
  },
  {
    id: "HF-1047",
    candidate: "Riya Shah",
    initials: "RS",
    job: "Product Designer",
    organization: "Northstar Labs",
    status: "Screening",
    applied: "Oct 10, 2026",
    updated: "5h ago",
    skills: ["Figma", "Research", "Prototyping"],
    location: "Mumbai",
  },
  {
    id: "HF-1046",
    candidate: "Kabir Nair",
    initials: "KN",
    job: "Backend Engineer",
    organization: "Orbit Systems",
    status: "Shortlisted",
    applied: "Oct 9, 2026",
    updated: "1d ago",
    skills: ["Node.js", "PostgreSQL", "AWS"],
    location: "Pune",
  },
  {
    id: "HF-1045",
    candidate: "Ananya Rao",
    initials: "AR",
    job: "Senior Frontend Engineer",
    organization: "Northstar Labs",
    status: "Applied",
    applied: "Oct 8, 2026",
    updated: "2d ago",
    skills: ["React", "TypeScript", "Testing"],
    location: "Hyderabad",
  },
];
async function get(path) {
  try {
    const r = await fetch(`${API}${path}`);
    if (!r.ok) throw Error();
    return (await r.json()).data;
  } catch {
    return null;
  }
}
function Badge({ children, tone = "neutral" }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}
function Avatar({ initials = "HF", color = "purple" }) {
  return <span className={`avatar ${color}`}>{initials}</span>;
}
function Shell({ children }) {
  const [open, setOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [dark, setDark] = useState(
    () => localStorage.getItem("hireflow-theme") !== "light",
  );
  const loc = useLocation();
  useEffect(() => {
    document.body.classList.toggle("dark-mode", dark);
    localStorage.setItem("hireflow-theme", dark ? "dark" : "light");
  }, [dark]);
  const nav = [
    ["/", "Home", Home],
    ["/app", "Overview", LayoutDashboard],
    ["/app/applications", "Applications", ClipboardList],
    ["/app/jobs", "Jobs", BriefcaseBusiness],
    ["/app/candidates", "Candidates", Users],
    ["/app/interviews", "Interviews", CalendarDays],
    ["/app/analytics", "Analytics", BarChart3],
  ];
  return (
    <div className="app-shell">
      <aside className={open ? "sidebar open" : "sidebar"}>
        <div className="brand">
          <div className="brand-mark">✦</div>
          <span>
            hire<span>flow</span>
          </span>
        </div>
        <button
          className="workspace"
          onClick={() => setWorkspaceOpen(!workspaceOpen)}
          aria-expanded={workspaceOpen}
        >
          <Avatar initials="NL" color="navy" />
          <div>
            <strong>Northstar Labs</strong>
            <small>Recruiting team</small>
          </div>
          <ChevronDown size={15} />
        </button>
        {workspaceOpen && (
          <div className="workspace-menu">
            <Link to="/" onClick={() => setWorkspaceOpen(false)}>
              <Home size={15} /> Home page
            </Link>
            <Link to="/jobs" onClick={() => setWorkspaceOpen(false)}>
              <BriefcaseBusiness size={15} /> Public jobs
            </Link>
          </div>
        )}
        <nav>
          {nav.map(([to, label, Icon]) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              to={to}
              key={to}
              onClick={() => setOpen(false)}
            >
              <Icon size={18} />
              <span>{label}</span>
              {label === "Applications" && <em>48</em>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button
            className="nav-item theme-toggle"
            onClick={() => setDark(!dark)}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
            <span>{dark ? "Light theme" : "Dark theme"}</span>
            <i>{dark ? "On" : "Off"}</i>
          </button>
          <NavLink to="/app/settings" className="nav-item">
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
          <NavLink to="/" className="nav-item">
            <CircleHelp size={18} />
            <span>Help center</span>
          </NavLink>
          <div className="profile">
          <Avatar initials="AKT" color="teal" />
            <div>
              <strong>Ashish Kumar Tripathi</strong>
              <small>Platform administrator</small>
            </div>
            <ChevronDown size={14} />
          </div>
        </div>
      </aside>
      <main className="main">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setOpen(!open)}>
            <Menu />
          </button>
          <div className="crumb">
            Workspace <ChevronRight size={15} />{" "}
            <strong>
              {loc.pathname.includes("applications")
                ? "Applications"
                : loc.pathname.includes("jobs")
                  ? "Jobs"
                  : "Overview"}
            </strong>
          </div>
          <div className="top-actions">
            <div className="search-mini">
              <Search size={16} />
              <input placeholder="Search anything..." />
            </div>
            <button className="icon-btn">
              <Bell size={19} />
              <i />
            </button>
          <Avatar initials="AKT" color="teal" />
          </div>
        </header>
        <div className="content">{children}</div>
      </main>
    </div>
  );
}
function PublicNav() {
  return (
    <header className="public-nav">
      <Link to="/" className="brand dark">
        <div className="brand-mark">✦</div>
        <span>
          hire<span>flow</span>
        </span>
      </Link>
      <div className="public-links">
        <a href="#how">How it works</a>
        <Link to="/jobs">Find a job</Link>
        <Link to="/login">Sign in</Link>
        <Link className="btn primary small" to="/login">
          Get started <ChevronRight size={15} />
        </Link>
      </div>
    </header>
  );
}
function Landing() {
  return (
    <div className="landing">
      <PublicNav />
      <section className="hero">
        <div className="hero-copy">
          <Badge tone="soft">
            <Sparkles size={14} /> The modern way to hire
          </Badge>
          <h1>
            Great teams start
            <br />
            <span>with great hiring.</span>
          </h1>
          <p>
            HireFlow brings your entire hiring process into one calm, focused
            workspace — from first application to final offer.
          </p>
          <div className="hero-actions">
            <Link className="btn primary" to="/jobs">
              Explore open roles <ChevronRight size={17} />
            </Link>
            <Link className="text-link" to="/app">
              View recruiter demo <ChevronRight size={16} />
            </Link>
          </div>
          <div className="trust">
            <div className="faces">
              <Avatar initials="AR" color="teal" />
              <Avatar initials="JM" color="orange" />
              <Avatar initials="SK" color="purple" />
              <Avatar initials="+" color="gray" />
            </div>
            <span>
              Trusted by thoughtful teams
              <br />
              <strong>across 12 countries</strong>
            </span>
          </div>
        </div>
        <div className="hero-art">
          <div className="art-card main-card">
            <div className="art-head">
              <span>Application pipeline</span>
              <span className="live">
                <i /> Live
              </span>
            </div>
            <div className="pipeline-mini">
              <div>
                <small>Applied</small>
                <strong>42</strong>
                <span className="green-text">+12%</span>
              </div>
              <div>
                <small>Screening</small>
                <strong>28</strong>
                <span className="blue-text">+8%</span>
              </div>
              <div>
                <small>Interview</small>
                <strong>18</strong>
                <span className="purple-text">+4%</span>
              </div>
            </div>
            <div className="mini-list">
              <div>
                <Avatar initials="AM" color="purple" />
                <span>
                  <b>Aarav Mehta</b>
                  <small>Senior Frontend Engineer</small>
                </span>
                <Badge tone="purple">Interview</Badge>
              </div>
              <div>
                <Avatar initials="RS" color="orange" />
                <span>
                  <b>Riya Shah</b>
                  <small>Product Designer</small>
                </span>
                <Badge tone="blue">Screening</Badge>
              </div>
              <div>
                <Avatar initials="KN" color="teal" />
                <span>
                  <b>Kabir Nair</b>
                  <small>Backend Engineer</small>
                </span>
                <Badge tone="green">Shortlisted</Badge>
              </div>
            </div>
          </div>
          <div className="float-card success">
            <span className="check">✓</span>
            <span>
              <b>Offer accepted!</b>
              <small>Just now · Product Designer</small>
            </span>
          </div>
          <div className="float-card upcoming">
            <CalendarDays size={18} />
            <span>
              <b>Upcoming interview</b>
              <small>Tomorrow at 11:30 AM</small>
            </span>
          </div>
        </div>
      </section>
      <section className="feature-strip" id="how">
        <div>
          <span className="feature-icon blue">
            <BriefcaseBusiness size={19} />
          </span>
          <b>One workspace</b>
          <small>Everything your team needs to hire</small>
        </div>
        <div>
          <span className="feature-icon purple">
            <ShieldCheck size={19} />
          </span>
          <b>Built with trust</b>
          <small>Privacy-first, secure by default</small>
        </div>
        <div>
          <span className="feature-icon orange">
            <Sparkles size={19} />
          </span>
          <b>Made for humans</b>
          <small>Less admin, more meaningful work</small>
        </div>
      </section>
    </div>
  );
}
function Jobs() {
  const [q, setQ] = useState("");
  const [jobs, setJobs] = useState(fallbackJobs);
  useEffect(() => {
    get("/public/jobs").then((x) => x?.items && setJobs(x.items));
  }, []);
  const filtered = jobs.filter((j) =>
    `${j.title} ${j.organization} ${j.location} ${j.department}`
      .toLowerCase()
      .includes(q.toLowerCase()),
  );
  return (
    <div className="public-page">
      <PublicNav />
      <div className="jobs-hero">
        <Badge tone="soft">✦ Find your next chapter</Badge>
        <h1>
          Open roles for <span>ambitious people.</span>
        </h1>
        <p>
          Join teams doing meaningful work. Search roles, explore companies, and
          find a place where you can do your best work.
        </p>
        <div className="job-search">
          <Search size={19} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by role, skill, or company"
          />
          <button className="btn primary">Search roles</button>
        </div>
      </div>
      <div className="jobs-wrap">
        <div className="jobs-toolbar">
          <span>
            <strong>{filtered.length}</strong> roles available
          </span>
          <button className="filter-btn">
            <SlidersHorizontal size={16} /> Filters <ChevronDown size={15} />
          </button>
        </div>
        <div className="job-grid">
          {filtered.map((j) => (
            <Link className="job-card" to={`/jobs/${j.slug}`} key={j.id}>
              <div className="job-card-top">
                <div className="company-icon">{j.organization[0]}</div>
                <Badge tone="green">Actively hiring</Badge>
              </div>
              <h3>{j.title}</h3>
              <p className="company">{j.organization}</p>
              <div className="job-meta">
                <span>{j.location}</span>
                <span>{j.workplace_type}</span>
                <span>{j.employment_type}</span>
              </div>
              <div className="job-card-foot">
                <span>{j.salary}</span>
                <ChevronRight size={17} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
function JobDetails() {
  const { slug } = useParams();
  const [job, setJob] = useState(
    fallbackJobs.find((j) => j.slug === slug) || fallbackJobs[0],
  );
  useEffect(() => {
    get(`/public/jobs/${slug}`).then((x) => x && setJob(x));
  }, [slug]);
  return (
    <div className="public-page">
      <PublicNav />
      <div className="detail-wrap">
        <Link className="back" to="/jobs">
          ← Back to all roles
        </Link>
        <div className="detail-layout">
          <article className="job-detail">
            <div className="detail-company">
              <div className="company-icon large">{job.organization[0]}</div>
              <div>
                <h1>{job.title}</h1>
                <p>
                  {job.organization} · {job.location}
                </p>
              </div>
            </div>
            <div className="detail-tags">
              <Badge tone="blue">{job.workplace_type}</Badge>
              <Badge>{job.employment_type}</Badge>
              <Badge>{job.experience}</Badge>
            </div>
            <hr />
            <h2>About the role</h2>
            <p>{job.description}</p>
            <h2>What you'll bring</h2>
            <ul>
              {job.requirements.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </article>
          <aside className="apply-card">
            <h3>Ready to make an impact?</h3>
            <p>Apply in a few minutes. Your next chapter could start here.</p>
            <Link className="btn primary full" to="/login">
              Apply for this role <ChevronRight size={17} />
            </Link>
            <div className="apply-note">
              <ShieldCheck size={17} />
              <span>Your information is private and secure.</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
function Login() {
  const nav = useNavigate();
  return (
    <div className="auth-page">
      <div className="auth-brand">
        <Link to="/" className="brand dark">
          <div className="brand-mark">✦</div>
          <span>
            hire<span>flow</span>
          </span>
        </Link>
      </div>
      <div className="auth-card">
        <Badge tone="soft">Welcome back</Badge>
        <h1>Sign in to HireFlow</h1>
        <p className="muted">
          Use the demo workspace to explore the recruiter experience.
        </p>
        <label>
          Email address
          <input defaultValue="ashishtring@gmail.com" type="email" />
        </label>
        <label>
          Password
          <div className="password">
            <input placeholder="Enter your admin password" type="password" />
            <a href="#">Show</a>
          </div>
        </label>
        <button className="btn primary full" onClick={() => nav("/app")}>
          Sign in <ChevronRight size={17} />
        </button>
        <div className="divider">
          <span>or</span>
        </div>
        <button className="btn secondary full" onClick={() => nav("/jobs")}>
          Continue as candidate
        </button>
        <p className="auth-foot">
          Don't have an account? <a href="#">Create one</a>
        </p>
      </div>
    </div>
  );
}
function Dashboard() {
  const [data, setData] = useState(null);
  const now = new Date();
  const hour = Number(
    new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      hour12: false,
    }).format(now),
  );
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const localDate = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(now);
  useEffect(() => {
    get("/dashboard/recruiter").then(setData);
  }, []);
  const metrics = data?.metrics || {
    activeOpenings: 8,
    newApplications: 48,
    interviews: 12,
    offers: 4,
  };
  const apps = data?.applications || fallbackApps;
  return (
    <Shell>
      <div className="page-heading">
        <div>
          <p className="eyebrow">{localDate} · Asia/Kolkata</p>
          <h1>
            {greeting}, Ashish <span>✦</span>
          </h1>
          <p className="muted">
            Here’s what’s happening across your hiring workspace.
          </p>
        </div>
        <button className="btn primary">
          <Plus size={17} /> Create a job
        </button>
      </div>
      <div className="metric-grid">
        {[
          [
            "Active openings",
            metrics.activeOpenings,
            "2 drafts",
            "blue",
            BriefcaseBusiness,
          ],
          [
            "New applications",
            metrics.newApplications,
            "+18% this week",
            "purple",
            ClipboardList,
          ],
          [
            "Interviews this week",
            metrics.interviews,
            "3 today",
            "orange",
            CalendarDays,
          ],
          [
            "Offers extended",
            metrics.offers,
            "2 awaiting response",
            "green",
            Sparkles,
          ],
        ].map(([label, value, sub, tone, Icon]) => (
          <div className="metric-card" key={label}>
            <div className={`metric-icon ${tone}`}>
              <Icon size={19} />
            </div>
            <span>{label}</span>
            <strong>{value}</strong>
            <small className={tone === "purple" ? "up" : ""}>{sub}</small>
          </div>
        ))}
      </div>
      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <div className="panel-head">
            <div>
              <h2>Application activity</h2>
              <p className="muted">
                Applications received over the last 7 days
              </p>
            </div>
            <button className="select">
              This week <ChevronDown size={14} />
            </button>
          </div>
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <RBarChart
                data={
                  data?.trend || [
                    { name: "Mon", applications: 18 },
                    { name: "Tue", applications: 26 },
                    { name: "Wed", applications: 22 },
                    { name: "Thu", applications: 35 },
                    { name: "Fri", applications: 31 },
                    { name: "Sat", applications: 42 },
                    { name: "Sun", applications: 48 },
                  ]
                }
              >
                <CartesianGrid vertical={false} stroke="#edf0f3" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#98a2b3", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#98a2b3", fontSize: 12 }}
                />
                <Tooltip cursor={{ fill: "#f8fafc" }} />
                <Bar
                  dataKey="applications"
                  fill="#5664d2"
                  radius={[5, 5, 0, 0]}
                  barSize={22}
                />
              </RBarChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="panel">
          <div className="panel-head">
            <div>
              <h2>Upcoming interviews</h2>
              <p className="muted">Your schedule this week</p>
            </div>
            <Link className="view-link" to="/app/interviews">
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="interview-list">
            <div>
              <span className="date-box">
                <b>14</b>
                <small>OCT</small>
              </span>
              <span>
                <b>Product Designer · Riya Shah</b>
                <small>
                  <Clock3 size={13} /> 11:30 AM · Video call
                </small>
              </span>
              <ChevronRight size={16} />
            </div>
            <div>
              <span className="date-box">
                <b>15</b>
                <small>OCT</small>
              </span>
              <span>
                <b>Frontend Engineer · Aarav Mehta</b>
                <small>
                  <Clock3 size={13} /> 2:00 PM · Video call
                </small>
              </span>
              <ChevronRight size={16} />
            </div>
            <div>
              <span className="date-box">
                <b>17</b>
                <small>OCT</small>
              </span>
              <span>
                <b>Backend Engineer · Kabir Nair</b>
                <small>
                  <Clock3 size={13} /> 10:00 AM · On-site
                </small>
              </span>
              <ChevronRight size={16} />
            </div>
          </div>
        </section>
      </div>
      <section className="panel applications-panel">
        <div className="panel-head">
          <div>
            <h2>Recent applications</h2>
            <p className="muted">Keep up with your candidate pipeline</p>
          </div>
          <Link className="view-link" to="/app/applications">
            View all applications <ChevronRight size={14} />
          </Link>
        </div>
        <ApplicationTable apps={apps.slice(0, 4)} />
      </section>
    </Shell>
  );
}
function ApplicationTable({ apps }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Role</th>
            <th>Applied</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {apps.map((a, i) => (
            <tr key={a.id}>
              <td>
                <div className="candidate-cell">
                  <Avatar
                    initials={a.initials}
                    color={["purple", "orange", "teal", "pink"][i % 4]}
                  />
                  <span>
                    <b>{a.candidate}</b>
                    <small>{a.location}</small>
                  </span>
                </div>
              </td>
              <td>
                <span className="role-cell">
                  {a.job}
                  <small>{a.organization}</small>
                </span>
              </td>
              <td>
                <span className="date-cell">
                  {a.applied}
                  <small>Updated {a.updated}</small>
                </span>
              </td>
              <td>
                <Badge tone={a.status.toLowerCase()}>{a.status}</Badge>
              </td>
              <td>
                <button className="more">•••</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Applications() {
  const [apps, setApps] = useState(fallbackApps);
  const [filter, setFilter] = useState("All applications");
  useEffect(() => {
    get("/applications").then((x) => x?.items && setApps(x.items));
  }, []);
  const shown =
    filter === "All applications"
      ? apps
      : apps.filter((a) => a.status === filter);
  return (
    <Shell>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Recruitment workspace</p>
          <h1>Applications</h1>
          <p className="muted">
            Review, organize, and move candidates forward.
          </p>
        </div>
        <button className="btn primary">
          <Plus size={17} /> Add candidate
        </button>
      </div>
      <div className="tabs">
        <button
          className={filter === "All applications" ? "active" : ""}
          onClick={() => setFilter("All applications")}
        >
          All applications <b>48</b>
        </button>
        {["Applied", "Screening", "Interview", "Offer"].map((x) => (
          <button
            className={filter === x ? "active" : ""}
            onClick={() => setFilter(x)}
            key={x}
          >
            {x}
          </button>
        ))}
        <div className="tab-spacer" />
        <button className="filter-btn">
          <SlidersHorizontal size={15} /> Filter
        </button>
      </div>
      <section className="panel applications-panel">
        <div className="panel-head">
          <div className="search-table">
            <Search size={16} />
            <input placeholder="Search candidates or roles..." />
          </div>
          <button className="select">
            Newest first <ChevronDown size={14} />
          </button>
        </div>
        <ApplicationTable apps={shown} />
      </section>
    </Shell>
  );
}
function SimplePage({ title, icon: Icon = BriefcaseBusiness, description }) {
  return (
    <Shell>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Recruitment workspace</p>
          <h1>{title}</h1>
          <p className="muted">{description}</p>
        </div>
        <button className="btn primary">
          <Plus size={17} /> Create new
        </button>
      </div>
      <div className="empty-state panel">
        <div className="empty-icon">
          <Icon size={28} />
        </div>
        <h2>Your {title.toLowerCase()} will appear here</h2>
        <p>
          Connect your Supabase project to start managing live{" "}
          {title.toLowerCase()} in HireFlow.
        </p>
        <button className="btn secondary">Explore demo data</button>
      </div>
    </Shell>
  );
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:slug" element={<JobDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<Dashboard />} />
      <Route path="/app/applications" element={<Applications />} />
      <Route
        path="/app/jobs"
        element={
          <SimplePage
            title="Jobs"
            description="Publish roles and build your next great team."
          />
        }
      />
      <Route
        path="/app/candidates"
        element={
          <SimplePage
            title="Candidates"
            icon={Users}
            description="A searchable talent pool for every open role."
          />
        }
      />
      <Route
        path="/app/interviews"
        element={
          <SimplePage
            title="Interviews"
            icon={CalendarDays}
            description="Keep every conversation and decision on track."
          />
        }
      />
      <Route
        path="/app/analytics"
        element={
          <SimplePage
            title="Analytics"
            icon={BarChart3}
            description="See what is working across your hiring funnel."
          />
        }
      />
      <Route
        path="/app/settings"
        element={
          <SimplePage
            title="Settings"
            icon={Settings}
            description="Manage your workspace and personal preferences."
          />
        }
      />
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
