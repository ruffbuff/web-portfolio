import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import {
  cvContacts, cvCoreLanguages, cvEducation, cvExperience, cvHackathons, cvPersonal, cvSkillBlocks, cvSpoken,
  type Item,
} from '../lib/cv-data';

const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const items = (list: Item[]) =>
  list
    .map((i) => `<div class="item"><div><strong>${esc(i.title.en)}</strong> - ${esc(i.period)}</div><div class="description">${esc(i.text.en)}</div></div>`)
    .join('\n');

async function generateCV() {
  // The content comes from lib/cv-data.ts (English), the same data as the /cv page, so the PDF cannot drift from the site.
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 15px;
          color: #333;
          line-height: 1.3;
        }
        h1 {
          font-size: 20px;
          margin: 0 0 5px 0;
        }
        h2 {
          font-size: 16px;
          margin: 12px 0 6px 0;
          color: #444;
        }
        h3 {
          font-size: 14px;
          margin: 8px 0 4px 0;
        }
        h4 {
          font-size: 13px;
          margin: 6px 0 2px 0;
          font-weight: bold;
        }
        .contact {
          margin-bottom: 10px;
          font-size: 13px;
        }
        .divider {
          border-top: 1px solid #ddd;
          margin: 8px 0;
        }
        .section {
          margin-bottom: 12px;
        }
        .item {
          margin-bottom: 8px;
          font-size: 13px;
        }
        .period {
          color: #666;
          font-size: 12px;
        }
        .description {
          margin-top: 3px;
          font-size: 12px;
          line-height: 1.2;
        }
        .skills-list {
          margin: 2px 0;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <h1>Sergei Avramtsuk</h1>
      <div class="contact">
        ${cvPersonal.map((r) => `<div>${esc(r.k)}: ${esc(r.v)}</div>`).join('\n')}
      </div>

      <div class="section">
        <h2>Contacts</h2>
        ${cvContacts.map((r) => `<div>${esc(r.k)}: ${esc(r.v)}</div>`).join('\n')}
      </div>

      <div class="divider"></div>

      <div class="section">
        <h2>Professional Experience</h2>
        ${items(cvExperience)}
      </div>

      <div class="divider"></div>

      <div class="section">
        <h2>Education & Self-Learning</h2>
        ${items(cvEducation)}
      </div>

      <div class="divider"></div>

      <div class="section">
        <h2>Skills</h2>
        <div class="item">
          <h3>Languages</h3>
          ${cvCoreLanguages.map((l) => `<div class="skills-list"><strong>${esc(l.name)}:</strong> ${esc(l.text.en)}</div>`).join('\n')}
        </div>
        ${cvSkillBlocks.map((b) => `<div class="item"><h3>${esc(b.title.en)}</h3><div class="skills-list">${esc(b.text.en)}</div></div>`).join('\n')}
      </div>

      <div class="divider"></div>

      <div class="section">
        <h2>Spoken Languages</h2>
        ${cvSpoken.map((r) => `<div>${esc(r.k)} - ${esc(r.v)}</div>`).join('\n')}
      </div>

      <div class="divider"></div>

      <div class="section">
        <h2>Competitions</h2>
        ${cvHackathons.map((h) => `<div class="item"><div><strong>${esc(h.title.en)}</strong> - <a href="${h.href}">${esc(h.href.replace('https://', ''))}</a></div><div class="description">${esc(h.text.en)}</div></div>`).join('\n')}
      </div>
    </body>
    </html>
  `;
  // Create a temporary file to store HTML
  const tempHtmlPath = path.join(process.cwd(), 'temp.html');
  fs.writeFileSync(tempHtmlPath, html, 'utf8');

  // Launch browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set viewport to A4 size
  await page.setViewport({
    width: 794, // A4 width in pixels (assuming 96 DPI)
    height: 1123, // A4 height in pixels
    deviceScaleFactor: 2
  });

  // Load HTML file
  await page.goto(`file://${tempHtmlPath}`);

  // Generate PDF
  const outputPath = path.join(process.cwd(), 'public', 'cv', `cv_en.pdf`);
  await page.pdf({
    path: outputPath,
    format: 'A4',
    margin: {
      top: '15mm',
      right: '15mm',
      bottom: '15mm',
      left: '15mm'
    },
    printBackground: true
  });

  // Cleanup
  await browser.close();
  fs.unlinkSync(tempHtmlPath);

  console.log(`Generated CV at: ${outputPath}`);
}

generateCV();
