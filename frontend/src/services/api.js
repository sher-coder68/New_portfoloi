const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return `${window.location.origin}/api`;
  }
  return 'http://localhost:5000/api';
};

const API_BASE = getBaseUrl();

export const getToken = () => localStorage.getItem('khan_sher_admin_token');
export const setToken = (token) => localStorage.setItem('khan_sher_admin_token', token);
export const removeToken = () => localStorage.removeItem('khan_sher_admin_token');

const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Public: Submit contact form message
 */
export const submitContactMessage = async (formData) => {
  const response = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to submit message.');
  }
  return data;
};

/**
 * Public / Setup: Login Admin
 */
export const loginAdmin = async (credentials) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Authentication failed.');
  }
  if (data.token) {
    setToken(data.token);
  }
  return data;
};

/**
 * Public: Seed Initial Admin if no admin exists yet
 */
export const setupInitialAdmin = async (initialData) => {
  const response = await fetch(`${API_BASE}/auth/setup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(initialData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Initial admin setup failed.');
  }
  if (data.token) {
    setToken(data.token);
  }
  return data;
};

/**
 * Protected: Fetch authenticated admin profile
 */
export const getAdminProfile = async () => {
  const response = await fetch(`${API_BASE}/auth/me`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch admin profile.');
  }
  return data;
};

/**
 * Protected: Fetch contact messages list with pagination and search
 */
export const getContactMessages = async (params = {}) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ''
    )
  );
  const query = new URLSearchParams(cleanParams).toString();
  const url = `${API_BASE}/contact${query ? `?${query}` : ''}`;

  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch messages.');
  }
  return data;
};

/**
 * Protected: Get message stats (total, unread, today)
 */
export const getMessageStats = async () => {
  const response = await fetch(`${API_BASE}/contact/stats`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch statistics.');
  }
  return data;
};

/**
 * Protected: Update message status (isRead / isStarred)
 */
export const updateMessageStatus = async (id, updates) => {
  const response = await fetch(`${API_BASE}/contact/${id}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update message.');
  }
  return data;
};

/**
 * Protected: Delete message
 */
export const deleteContactMessage = async (id) => {
  const response = await fetch(`${API_BASE}/contact/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete message.');
  }
  return data;
};
