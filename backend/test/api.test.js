import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { default: app } = await import('../server.js');
const { default: Admin } = await import('../models/Admin.js');

const PORT = process.env.TEST_PORT || 5055;
const BASE_URL = `http://localhost:${PORT}/api`;

describe('Khan Sher Portfolio - Backend API Test Suite', () => {
  let server;
  let adminToken;

  before(async () => {
    await new Promise((resolve) => {
      server = app.listen(PORT, resolve);
    });

    const { default: mongoose } = await import('mongoose');
    if (mongoose.connection.readyState !== 1) {
      await new Promise((resolve) => mongoose.connection.once('open', resolve));
    }

    const admin = await Admin.findOne();
    if (admin) {
      adminToken = jwt.sign(
        { id: admin._id },
        process.env.JWT_SECRET || 'fallback_development_secret_khan_sher_2026',
        { expiresIn: '1h' }
      );
    }
  });

  after(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    const { default: mongoose } = await import('mongoose');
    await mongoose.disconnect();
  });

  it('GET /api/health should return 200 OK with health status', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'OK');
    assert.strictEqual(typeof data.uptime, 'number');
  });

  it('POST /api/contact with empty body should return 400 with field validation errors', async () => {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.success, false);
    assert.ok(data.errors.name);
    assert.ok(data.errors.email);
    assert.ok(data.errors.subject);
    assert.ok(data.errors.message);
  });

  it('POST /api/contact with invalid email should return 400', async () => {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alex Tester',
        email: 'invalid-email-address',
        subject: 'Inquiry',
        message: 'This is a test message that has adequate length.',
      }),
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.success, false);
    assert.ok(data.errors.email);
  });

  it('POST /api/contact with short message should return 400', async () => {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alex Tester',
        email: 'alex@example.com',
        subject: 'Inquiry',
        message: 'short',
      }),
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.success, false);
    assert.ok(data.errors.message);
  });

  it('GET /api/contact without Bearer token should return 401 Unauthorized', async () => {
    const res = await fetch(`${BASE_URL}/contact`);
    assert.strictEqual(res.status, 401);
    const data = await res.json();
    assert.strictEqual(data.success, false);
  });

  it('GET /api/contact with invalid token should return 401 Unauthorized', async () => {
    const res = await fetch(`${BASE_URL}/contact`, {
      headers: { Authorization: 'Bearer bad_token_123' },
    });
    assert.strictEqual(res.status, 401);
    const data = await res.json();
    assert.strictEqual(data.success, false);
  });

  it('GET /api/contact with "undefined" string query params should ignore them and return messages', async () => {
    if (!adminToken) return;
    const res = await fetch(`${BASE_URL}/contact?isRead=undefined&isStarred=undefined&search=undefined`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(Array.isArray(data.data));
    assert.strictEqual(data.data.length > 0, true);
    assert.strictEqual(data.pagination.total > 0, true);
  });

  it('POST /api/auth/login with empty body should return 400', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.success, false);
    assert.ok(data.errors.usernameOrEmail);
    assert.ok(data.errors.password);
  });

  it('GET /api/unregistered-path should return 404 Not Found', async () => {
    const res = await fetch(`${BASE_URL}/unregistered-path`);
    assert.strictEqual(res.status, 404);
  });

});
