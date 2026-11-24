import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Skills from '../components/Skills';

describe('Khan Sher Portfolio - Multi-Page Routing & Verification Suite', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('1. Full App & Page Routing', () => {
    it('renders the Home page by default with all major sections and Khan Sher photo', () => {
      const { container } = render(<App />);
      expect(container).toBeTruthy();

      // Check hero section and user image exist
      expect(document.getElementById('hero')).toBeTruthy();
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
      expect(images.some((img) => img.getAttribute('alt')?.includes('Khan Sher'))).toBe(true);

      // Check name and core titles
      expect(screen.getAllByText(/Khan Sher/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Machine Learning Developer/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Frontend Developer/i).length).toBeGreaterThan(0);
    });

    it('navigates to Education page when Education nav link is clicked', async () => {
      render(<App />);

      // Find the desktop Education navigation link
      const educationLinks = screen.getAllByRole('link', { name: /^Education$/i });
      fireEvent.click(educationLinks[0]);

      // Should display the dedicated Education page title
      await waitFor(() => {
        expect(screen.getByText('Education & University Studies')).toBeTruthy();
        expect(screen.getAllByText(/Bacha Khan University/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/2023 – 2027/i).length).toBeGreaterThan(0);
      });
    });

    it('navigates to Projects page when Projects nav link is clicked', async () => {
      render(<App />);

      const projectLinks = screen.getAllByRole('link', { name: /^Projects$/i });
      fireEvent.click(projectLinks[0]);

      await waitFor(() => {
        expect(screen.getByText('Student Performance Prediction')).toBeTruthy();
        expect(screen.getByText('House Price Prediction')).toBeTruthy();
        expect(screen.getByText('College Management System')).toBeTruthy();
      });
    });

    it('navigates to Contact page when Contact nav link is clicked', async () => {
      render(<App />);

      const contactLinks = screen.getAllByRole('link', { name: /^Contact$/i });
      fireEvent.click(contactLinks[0]);

      await waitFor(() => {
        expect(screen.getAllByText(/khansher68u@gmail.com/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/03185775553/i).length).toBeGreaterThan(0);
      });
    });
  });

  describe('2. Navigation Bar & Mobile Drawer', () => {
    it('renders all navigation links inside Navbar', () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
      const navLinks = ['Home', 'About', 'Education', 'Experience', 'Skills', 'Projects', 'Training & Services', 'Testimonials', 'Blog', 'Contact'];
      navLinks.forEach((linkText) => {
        expect(screen.getByRole('link', { name: new RegExp(linkText, 'i') })).toBeTruthy();
      });
    });

    it('toggles mobile menu open and closed', () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
      const toggleButton = screen.getByLabelText(/Toggle navigation menu/i);
      expect(toggleButton).toBeTruthy();

      // Click toggle -> opens drawer
      fireEvent.click(toggleButton);
      expect(screen.getByText(/Contact Khan Sher/i)).toBeTruthy();

      // Click toggle again -> closes
      fireEvent.click(toggleButton);
      expect(screen.queryByText(/Contact Khan Sher/i)).toBeNull();
    });
  });

  describe('3. Projects Filtering & Modal Interactions', () => {
    it('filters projects by category', () => {
      render(<Projects />);
      
      expect(screen.getByText('Student Performance Prediction')).toBeTruthy();
      expect(screen.getByText('House Price Prediction')).toBeTruthy();
      expect(screen.getByText('College Management System')).toBeTruthy();

      // Machine Learning filter
      fireEvent.click(screen.getByRole('button', { name: /^Machine Learning$/i }));
      expect(screen.getByText('Student Performance Prediction')).toBeTruthy();
      expect(screen.queryByText('College Management System')).toBeNull();

      // Frontend filter
      fireEvent.click(screen.getByRole('button', { name: /^Frontend Development$/i }));
      expect(screen.getByText('College Management System')).toBeTruthy();
      expect(screen.queryByText('Student Performance Prediction')).toBeNull();
    });

    it('opens project modal on "View Details" click and closes when close button is clicked', () => {
      render(<Projects />);
      
      const viewDetailsButtons = screen.getAllByText(/View Details/i);
      fireEvent.click(viewDetailsButtons[0]);

      expect(screen.getByRole('dialog')).toBeTruthy();
      expect(screen.getByText(/Architecture & Methodology/i)).toBeTruthy();

      fireEvent.click(screen.getByLabelText(/Close modal/i));
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });

  describe('4. Skills Category Tabs', () => {
    it('switches between skill categories smoothly', () => {
      render(<Skills />);
      
      expect(screen.getByRole('button', { name: /Programming & Dev/i })).toBeTruthy();
      fireEvent.click(screen.getByRole('button', { name: /Cloud & DevOps/i }));
      expect(screen.getByText('Docker')).toBeTruthy();
      expect(screen.getByText('Kubernetes')).toBeTruthy();
      expect(screen.getByText('AWS')).toBeTruthy();
    });
  });

  describe('5. Blog Search, Filtering & Modal Reading', () => {
    it('filters articles by search input', () => {
      render(<Blog />);
      
      const searchInput = screen.getByPlaceholderText(/Search articles by title, keyword, or topic/i);
      fireEvent.change(searchInput, { target: { value: 'Python' } });

      expect(screen.getByText(/Getting Started with Python: Essential Libraries/i)).toBeTruthy();
      expect(screen.queryByText(/Machine Learning vs Deep Learning/i)).toBeNull();
    });

    it('opens and closes the blog reader modal', () => {
      render(<Blog />);
      
      const readButtons = screen.getAllByRole('button', { name: /Read Preview/i });
      fireEvent.click(readButtons[0]);

      expect(screen.getByRole('dialog')).toBeTruthy();
      expect(screen.getAllByText(/Demo Article Preview/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Author: Khan Sher/i)).toBeTruthy();

      fireEvent.click(screen.getByRole('button', { name: /Close Preview/i }));
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });

  describe('6. Contact Form Validation & Submission', () => {
    it('shows validation errors when submitting empty form', () => {
      render(<Contact />);
      
      const submitBtn = screen.getByRole('button', { name: /Send Message/i });
      fireEvent.click(submitBtn);

      expect(screen.getByText('Please provide your name.')).toBeTruthy();
      expect(screen.getByText('Please provide your email address.')).toBeTruthy();
      expect(screen.getByText('Please provide a subject.')).toBeTruthy();
      expect(screen.getByText('Please provide your message.')).toBeTruthy();
    });

    it('shows error for invalid email format', () => {
      render(<Contact />);
      
      const emailInput = screen.getByPlaceholderText('name@company.com');
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

      const submitBtn = screen.getByRole('button', { name: /Send Message/i });
      fireEvent.click(submitBtn);

      expect(screen.getByText('Please provide a valid email format.')).toBeTruthy();
    });

    it('successfully submits when form is valid', async () => {
      render(<Contact />);
      
      fireEvent.change(screen.getByPlaceholderText('e.g. Alex Johnson'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByPlaceholderText('name@company.com'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByPlaceholderText(/e\.g\. Web Development Collaboration/i), { target: { value: 'Project Consultation' } });
      fireEvent.change(screen.getByPlaceholderText(/Provide details about your project/i), { target: { value: 'Hello Khan, I would like to discuss an ML project with you.' } });

      fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

      await waitFor(() => {
        expect(screen.getByText('Message Received!')).toBeTruthy();
      }, { timeout: 2500 });
    });
  });

});
