import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import * as api from '../services/api';

describe('AdminDashboardPage - Inquiry Display Verification', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.setItem('khan_sher_admin_token', 'mock_token_123');
  });

  it('renders all 4 inquiries and displays "Inquiries (4)" when loaded with default filters', async () => {
    vi.spyOn(api, 'getAdminProfile').mockResolvedValue({
      admin: {
        id: '6b0470b3ca1be455ecf2b14f',
        username: 'sher',
        email: 'khansher68u@gmail.com',
        role: 'superadmin',
      },
    });

    vi.spyOn(api, 'getMessageStats').mockResolvedValue({
      data: {
        total: 4,
        unread: 4,
        starred: 0,
        today: 2,
      },
    });

    vi.spyOn(api, 'getContactMessages').mockResolvedValue({
      success: true,
      data: [
        {
          _id: '1',
          name: 'Muhammad sher',
          email: 'khansher577u@gmail.com',
          subject: 'i am stuck at in my project so we will solve together and project name is colleage managenment system',
          message: 'i hope your doing well',
          isRead: false,
          isStarred: false,
          createdAt: new Date().toISOString(),
        },
        {
          _id: '2',
          name: 'Muhammad sher',
          email: 'khansher577u@gmail.com',
          subject: 'i am stuck at in my project so we will solve together',
          message: 'i hope this message receive successfully',
          isRead: false,
          isStarred: false,
          createdAt: new Date().toISOString(),
        },
        {
          _id: '3',
          name: 'samam khan',
          email: 'khansher577u@gmail.com',
          subject: 'i  want to make the project for personal  use',
          message: 'I hope your doing well and receive this message safely',
          isRead: false,
          isStarred: false,
          createdAt: new Date().toISOString(),
        },
        {
          _id: '4',
          name: 'samam khan',
          email: 'khansher577u@gmail.com',
          subject: 'i  want to make the project for personal  use',
          message: 'ihfh ahh  hdhi   ihh',
          isRead: false,
          isStarred: false,
          createdAt: new Date().toISOString(),
        },
      ],
      pagination: {
        total: 4,
        page: 1,
        pages: 1,
        limit: 15,
      },
    });

    render(
      <MemoryRouter>
        <AdminDashboardPage />
      </MemoryRouter>
    );

    // Verify stats header
    await waitFor(() => {
      expect(screen.getByText('Inquiries (4)')).toBeTruthy();
    });

    // Verify that "No inquiries found" is NOT shown
    expect(screen.queryByText(/No inquiries found/i)).toBeNull();

    // Verify message list cards are rendered
    expect(screen.getAllByText('Muhammad sher').length).toBe(2);
    expect(screen.getAllByText('samam khan').length).toBe(2);
    expect(screen.getByText(/colleage managenment system/i)).toBeTruthy();
  });
});
