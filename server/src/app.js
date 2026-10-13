import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { z } from 'zod';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('tiny'));

const seedJobs = [
  { id:'j1', slug:'senior-frontend-engineer', title:'Senior Frontend Engineer', organization:'Northstar Labs', department:'Engineering', workplace_type:'Remote', employment_type:'Full-time', location:'Remote · India', salary:'₹24L – ₹36L', experience:'4+ years', description:'Lead the frontend architecture for products used by ambitious teams.', requirements:['React and modern JavaScript','Strong product sense','Comfortable owning outcomes'], status:'published', applicants:24, posted:'2 days ago' },
  { id:'j2', slug:'product-designer', title:'Product Designer', organization:'Northstar Labs', department:'Design', workplace_type:'Hybrid', employment_type:'Full-time', location:'Bengaluru, India', salary:'₹18L – ₹28L', experience:'3+ years', description:'Shape intuitive workflows from the first sketch to the final pixel.', requirements:['Portfolio of shipped products','Figma fluency','Excellent communication'], status:'published', applicants:18, posted:'5 days ago' },
  { id:'j3', slug:'backend-engineer', title:'Backend Engineer', organization:'Orbit Systems', department:'Engineering', workplace_type:'Hybrid', employment_type:'Full-time', location:'Pune, India', salary:'₹20L – ₹32L', experience:'3+ years', description:'Build resilient APIs and data systems for a fast-growing platform.', requirements:['Node.js and SQL','API design experience','Production ownership'], status:'published', applicants:31, posted:'1 week ago' },
  { id:'j4', slug:'people-operations-intern', title:'People Operations Intern', organization:'Orbit Systems', department:'People', workplace_type:'On-site', employment_type:'Internship', location:'Mumbai, India', salary:'₹25K – ₹35K / month', experience:'0–1 years', description:'Help create a thoughtful, high-trust candidate experience.', requirements:['Organized and curious','Clear written communication'], status:'published', applicants:42, posted:'1 week ago' }
];

const applications = [
  { id:'HF-1048', jobId:'j1', candidate:'Aarav Mehta', initials:'AM', job:'Senior Frontend Engineer', organization:'Northstar Labs', status:'Interview', applied:'Oct 10, 2026', updated:'2h ago', color:'purple', skills:['React','JavaScript','Design systems'], location:'Bengaluru' },
  { id:'HF-1047', jobId:'j2', candidate:'Riya Shah', initials:'RS', job:'Product Designer', organization:'Northstar Labs', status:'Screening', applied:'Oct 10, 2026', updated:'5h ago', color:'blue', skills:['Figma','Research','Prototyping'], location:'Mumbai' },
  { id:'HF-1046', jobId:'j3', candidate:'Kabir Nair', initials:'KN', job:'Backend Engineer', organization:'Orbit Systems', status:'Shortlisted', applied:'Oct 9, 2026', updated:'1d ago', color:'orange', skills:['Node.js','PostgreSQL','AWS'], location:'Pune' },
  { id:'HF-1045', jobId:'j1', candidate:'Ananya Rao', initials:'AR', job:'Senior Frontend Engineer', organization:'Northstar Labs', status:'Applied', applied:'Oct 8, 2026', updated:'2d ago', color:'green', skills:['React','TypeScript','Testing'], location:'Hyderabad' },
  { id:'HF-1044', jobId:'j4', candidate:'Vihaan Kapoor', initials:'VK', job:'People Operations Intern', organization:'Orbit Systems', status:'Offer', applied:'Oct 7, 2026', updated:'3d ago', color:'pink', skills:['Operations','Communication'], location:'Delhi' }
];
let jobStore = [...seedJobs];
let appStore = [...applications];

const ok = (data, message='Success') => ({ success:true, message, data });
app.get('/api/health', (_req,res) => res.json(ok({ service:'hireflow-api', status:'healthy', mode:'demo' })));
app.get('/api/public/jobs', (req,res) => {
  const q = String(req.query.q || '').toLowerCase();
  const jobs = jobStore.filter(j => j.status === 'published' && (!q || `${j.title} ${j.organization} ${j.department} ${j.location}`.toLowerCase().includes(q)));
  res.json(ok({ items:jobs, pagination:{ page:1, pageSize:20, total:jobs.length } }));
});
app.get('/api/public/jobs/:slug', (req,res) => {
  const job = jobStore.find(j => j.slug === req.params.slug && j.status === 'published');
  if (!job) return res.status(404).json({ success:false, message:'Job not found' });
  res.json(ok(job));
});
app.get('/api/jobs', (_req,res) => res.json(ok({ items:jobStore, pagination:{page:1,pageSize:20,total:jobStore.length} })));
app.post('/api/jobs', (req,res) => { const input=z.object({title:z.string().min(3),department:z.string().min(2),location:z.string().min(2)}).safeParse(req.body); if(!input.success)return res.status(400).json({success:false,message:'Title, department, and location are required'}); const job={id:`j${Date.now()}`,slug:input.data.title.toLowerCase().replace(/[^a-z0-9]+/g,'-'),organization:'Northstar Labs',workplace_type:'Remote',employment_type:'Full-time',salary:'',experience:'',description:'',requirements:[],status:'draft',applicants:0,posted:'Just now',...input.data}; jobStore.unshift(job); res.status(201).json(ok(job,'Job created')); });
app.get('/api/dashboard/recruiter', (_req,res) => res.json(ok({ metrics:{activeOpenings:8,newApplications:48,interviews:12,offers:4}, trend:[{name:'Mon',applications:18},{name:'Tue',applications:26},{name:'Wed',applications:22},{name:'Thu',applications:35},{name:'Fri',applications:31},{name:'Sat',applications:42},{name:'Sun',applications:48}], stages:[{name:'Applied',value:42},{name:'Screening',value:28},{name:'Interview',value:18},{name:'Offer',value:8},{name:'Hired',value:4}], applications:appStore }))); 
app.get('/api/applications', (_req,res) => res.json(ok({items:appStore,pagination:{page:1,pageSize:20,total:appStore.length}})));
app.patch('/api/applications/:id/status', (req,res) => { const allowed=['Applied','Screening','Shortlisted','Interview','Offer','Hired','Rejected']; if(!allowed.includes(req.body.status)) return res.status(400).json({success:false,message:'Invalid status transition'}); const item=appStore.find(a=>a.id===req.params.id); if(!item)return res.status(404).json({success:false,message:'Application not found'}); item.status=req.body.status; item.updated='Just now'; res.json(ok(item,'Application status updated')); });
app.use((err,_req,res,_next)=>{ console.error(err); res.status(500).json({success:false,message:'Unexpected server error'}); });
export default app;
