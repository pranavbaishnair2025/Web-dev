const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const therapists = [];
const clients = [];
const appointments = [];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Unfazed backend is running' });
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, specialty, slug } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }

  const existing = therapists.find((t) => t.email === email);
  if (existing) {
    return res.status(409).json({ message: 'Therapist already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const therapist = {
    id: Date.now().toString(),
    name,
    email,
    passwordHash,
    specialty: specialty || 'Mental Wellness',
    slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
    createdAt: new Date().toISOString()
  };

  therapists.push(therapist);
  const token = jwt.sign({ id: therapist.id, email: therapist.email }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '1d' });

  res.status(201).json({ token, therapist: { id: therapist.id, name, email, specialty: therapist.specialty, slug: therapist.slug } });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const therapist = therapists.find((t) => t.email === email);
  if (!therapist) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, therapist.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: therapist.id, email: therapist.email }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '1d' });
  res.json({ token, therapist: { id: therapist.id, name: therapist.name, email: therapist.email, specialty: therapist.specialty, slug: therapist.slug } });
});

app.get('/api/therapists/:slug', (req, res) => {
  const therapist = therapists.find((t) => t.slug === req.params.slug);
  if (!therapist) {
    return res.status(404).json({ message: 'Therapist not found' });
  }

  res.json({ therapist });
});

app.post('/api/appointments', (req, res) => {
  const { therapistId, clientName, slot, status = 'Confirmed' } = req.body;
  const appointment = { id: Date.now().toString(), therapistId, clientName, slot, status };
  appointments.push(appointment);
  res.status(201).json({ appointment });
});

app.get('/api/appointments/:therapistId', (req, res) => {
  const therapistAppointments = appointments.filter((a) => a.therapistId === req.params.therapistId);
  res.json({ appointments: therapistAppointments });
});

app.post('/api/clients', (req, res) => {
  const { therapistId, name, concern } = req.body;
  const client = { id: Date.now().toString(), therapistId, name, concern, consent: true, status: 'Active' };
  clients.push(client);
  res.status(201).json({ client });
});

app.get('/api/clients/:therapistId', (req, res) => {
  const therapistClients = clients.filter((c) => c.therapistId === req.params.therapistId);
  res.json({ clients: therapistClients });
});

app.get('/api/analytics/:therapistId', (req, res) => {
  const therapistAppointments = appointments.filter((a) => a.therapistId === req.params.therapistId);
  res.json({
    totalAppointments: therapistAppointments.length,
    confirmedAppointments: therapistAppointments.filter((a) => a.status === 'Confirmed').length,
    activeClients: clients.filter((c) => c.therapistId === req.params.therapistId).length
  });
});

app.listen(PORT, () => {
  console.log(`Unfazed backend running on http://localhost:${PORT}`);
});
