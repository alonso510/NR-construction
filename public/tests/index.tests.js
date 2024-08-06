const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { expect } = require('@jest/globals');

let dom;
let container;

beforeEach(() => {
  const html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');
  dom = new JSDOM(html);
  container = dom.window.document.body;
});

describe('Website Structure', () => {
  test('should have a header', () => {
    const header = container.querySelector('header');
    expect(header).not.toBeNull();
  });

  test('should have navigation links', () => {
    const navLinks = container.querySelectorAll('nav a');
    expect(navLinks.length).toBeGreaterThan(0);
  });

  test('should have a contact form', () => {
    const form = container.querySelector('#contact-form');
    expect(form).not.toBeNull();
  });

  test('should have required form fields', () => {
    const nameInput = container.querySelector('input[name="name"]');
    const emailInput = container.querySelector('input[name="email"]');
    const messageTextarea = container.querySelector('textarea[name="message"]');
    
    expect(nameInput).not.toBeNull();
    expect(emailInput).not.toBeNull();
    expect(messageTextarea).not.toBeNull();
  });
});

describe('Content', () => {
  test('should have company name in the header', () => {
    const header = container.querySelector('header');
    expect(header.textContent).toContain('Expert Roofing Solutions');
  });

  test('should have a services section', () => {
    const servicesSection = container.querySelector('#services');
    expect(servicesSection).not.toBeNull();
  });

  test('should have an about section', () => {
    const aboutSection = container.querySelector('#about');
    expect(aboutSection).not.toBeNull();
  });
});