import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// In-memory stores (replace with database in production)
const newsletterSubscribers = [];
const contactMessages = [];

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Newsletter signup
app.post('/api/newsletter', (req, res) => {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const exists = newsletterSubscribers.find((s) => s.email === email);
  if (exists) {
    return res.status(409).json({ error: 'Email already subscribed' });
  }

  const subscriber = {
    id: Date.now().toString(),
    email,
    name: name || '',
    subscribedAt: new Date().toISOString(),
  };
  newsletterSubscribers.push(subscriber);

  res.status(201).json({
    message: 'Subscribed successfully',
    subscriber,
  });
});

// Contact form
app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const contactMessage = {
    id: Date.now().toString(),
    name,
    email,
    phone: phone || '',
    subject: subject || '',
    message,
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  contactMessages.push(contactMessage);

  res.status(201).json({
    message: 'Message sent successfully',
    contactMessage,
  });
});

// Get all newsletter subscribers (admin)
app.get('/api/newsletter/subscribers', (req, res) => {
  res.json({ count: newsletterSubscribers.length, subscribers: newsletterSubscribers });
});

// Get all contact messages (admin)
app.get('/api/contact/messages', (req, res) => {
  res.json({ count: contactMessages.length, messages: contactMessages });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Galleria Mall backend running on port ${PORT}`);
});

export default app;