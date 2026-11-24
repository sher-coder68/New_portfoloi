// Setup mock for window.matchMedia and scroll methods
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

window.scrollTo = window.scrollTo || function() {};
Element.prototype.scrollIntoView = Element.prototype.scrollIntoView || function() {};

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockImplementation(() => Promise.resolve()),
  },
});

// Mock fetch for API tests in JSDOM environment
global.fetch = vi.fn().mockImplementation((url, options) => {
  return Promise.resolve({
    ok: true,
    status: 200,
    json: async () => {
      if (typeof url === 'string' && url.includes('/contact')) {
        return {
          success: true,
          message: 'Thank you! Your message has been received and saved successfully.',
          data: { id: 'mock_id_123', createdAt: new Date().toISOString() },
        };
      }
      return { success: true };
    },
  });
});
