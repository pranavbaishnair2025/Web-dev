import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

function Home() {
  return (
    <div className="hero">
      <div className="container">
        <h1>Unfazed</h1>
        <p>Private practice software for therapists in India.</p>
        <p>Run bookings, payments, notes, and client care from one branded link.</p>
        <div className="actions">
          <Link className="btn primary" to="/register">Create Therapist Account</Link>
          <Link className="btn" to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', specialty: '', slug: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, form);
      localStorage.setItem('token', res.data.token);
      setMessage('Account created successfully');
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="page">
      <h2>Create Your Practice</h2>
      <form onSubmit={submit} className="card">
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <input placeholder="Specialty" value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} />
        <input placeholder="Custom slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <button className="btn primary" type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, form);
      localStorage.setItem('token', res.data.token);
      setMessage('Welcome back');
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="page">
      <h2>Therapist Login</h2>
      <form onSubmit={submit} className="card">
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn primary" type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState([]);
  const [analytics, setAnalytics] = useState({ totalAppointments: 0, confirmedAppointments: 0, activeClients: 0 });
  const [form, setForm] = useState({ clientName: '', slot: '', therapistId: 'demo-therapist' });
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const [apptRes, clientRes, analyticsRes] = await Promise.all([
        axios.get(`${API_BASE}/appointments/demo-therapist`),
        axios.get(`${API_BASE}/clients/demo-therapist`),
        axios.get(`${API_BASE}/analytics/demo-therapist`)
      ]);
      setAppointments(apptRes.data.appointments || []);
      setClients(clientRes.data.clients || []);
      setAnalytics(analyticsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const book = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/appointments`, { ...form, therapistId: 'demo-therapist' });
      setForm({ clientName: '', slot: '', therapistId: 'demo-therapist' });
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const addClient = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/clients`, { therapistId: 'demo-therapist', name: form.clientName, concern: 'Initial intake' });
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="page">
      <div className="topbar">
        <h2>Therapist Dashboard</h2>
        <button className="btn" onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>Logout</button>
      </div>

      <div className="stats-grid">
        <div className="card stat">
          <h3>Total Sessions</h3>
          <p>{analytics.totalAppointments}</p>
        </div>
        <div className="card stat">
          <h3>Confirmed</h3>
          <p>{analytics.confirmedAppointments}</p>
        </div>
        <div className="card stat">
          <h3>Active Clients</h3>
          <p>{analytics.activeClients}</p>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h3>Book a Session</h3>
          <form onSubmit={book}>
            <input placeholder="Client name" value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} />
            <input placeholder="Slot" value={form.slot} onChange={(e) => setForm({ ...form, slot: e.target.value })} />
            <button className="btn primary" type="submit">Confirm</button>
          </form>
        </div>

        <div className="card">
          <h3>Add Client</h3>
          <form onSubmit={addClient}>
            <input placeholder="Client name" value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} />
            <button className="btn primary" type="submit">Save</button>
          </form>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h3>Upcoming Appointments</h3>
          {appointments.length === 0 ? <p>No appointments yet.</p> : appointments.map((a) => <p key={a.id}>{a.clientName} — {a.slot}</p>)}
        </div>
        <div className="card">
          <h3>Clients</h3>
          {clients.length === 0 ? <p>No clients yet.</p> : clients.map((c) => <p key={c.id}>{c.name} — {c.status}</p>)}
        </div>
      </div>
    </div>
  );
}

function PublicProfile() {
  const [therapist, setTherapist] = useState(null);
  const slug = window.location.pathname.replace('/', '');

  useEffect(() => {
    axios.get(`${API_BASE}/therapists/${slug}`).then((res) => setTherapist(res.data.therapist)).catch(() => setTherapist(null));
  }, [slug]);

  if (!therapist) {
    return <div className="page"><h2>Loading profile...</h2></div>;
  }

  return (
    <div className="page profile-card">
      <h1>{therapist.name}</h1>
      <p>{therapist.specialty}</p>
      <p>Branded link ready for clients: /{therapist.slug}</p>
      <div className="actions">
        <Link className="btn primary" to="/register">Join Unfazed</Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">Unfazed</Link>
        <div>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/:slug" element={<PublicProfile />} />
      </Routes>
    </>
  );
}
