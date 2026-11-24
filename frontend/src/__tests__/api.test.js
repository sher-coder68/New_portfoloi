import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getContactMessages } from '../services/api';

describe('Frontend API Service - getContactMessages param cleanup', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('strips undefined, null, and empty string parameters before fetching', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: [] }),
    });
    global.fetch = fetchMock;

    await getContactMessages({
      isRead: undefined,
      isStarred: undefined,
      search: undefined,
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const calledUrl = fetchMock.mock.calls[0][0];
    expect(calledUrl).not.toContain('undefined');
    expect(calledUrl).toMatch(/\/contact$/);
  });

  it('strips empty string and null parameters but keeps valid values', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: [] }),
    });
    global.fetch = fetchMock;

    await getContactMessages({
      isRead: '',
      isStarred: null,
      search: 'machine learning',
      page: 1,
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const calledUrl = fetchMock.mock.calls[0][0];
    expect(calledUrl).not.toContain('isRead');
    expect(calledUrl).not.toContain('isStarred');
    expect(calledUrl).toContain('search=machine+learning');
    expect(calledUrl).toContain('page=1');
  });

  it('preserves boolean true/false parameters correctly', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: [] }),
    });
    global.fetch = fetchMock;

    await getContactMessages({
      isRead: false,
      isStarred: true,
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const calledUrl = fetchMock.mock.calls[0][0];
    expect(calledUrl).toContain('isRead=false');
    expect(calledUrl).toContain('isStarred=true');
  });
});
