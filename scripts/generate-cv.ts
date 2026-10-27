import path from 'path';
import puppeteer, { type Browser } from 'puppeteer';
import {
  cvContacts, cvCoreLanguages, cvEducation, cvExperience, cvHackathons, cvName, cvPersonal, cvSkillBlocks, cvSpoken, fmtPeriod,
  type Item, type Lang, type Row,
} from '../lib/cv-data';

const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const LABELS: Record<Lang, Record<'contacts' | 'experience' | 'education' | 'skills' | 'languages' | 'spoken' | 'competitions', string>> = {
  en: { contacts: 'Contacts', experience: 'Professional Experience', education: 'Education & Self-Learning', skills: 'Skills', languages: 'Languages', spoken: 'Spoken Languages', competitions: 'Competitions' },
  ru: { contacts: 'Контакты', experience: 'Опыт работы', education: 'Обучение и самообразование', skills: 'Навыки', languages: 'Языки программирования', spoken: 'Языки общения', competitions: 'Соревнования' },
};

async function generateCV(lang: Lang, browser: Browser) {
  const L = LABELS[lang];
  const items = (list: Item[]) =>
    list
      .map((i) => `<div class="item"><div><strong>${esc(i.title[lang])}</strong> - ${esc(fmtPeriod(i.period, lang))}</div><div class="description">${esc(i.text[lang])}</div></div>`)
      .join('\n');
  const rows = (list: Row[], sep: string) => list.map((r) => `<div>${esc(r.k[lang])}${sep}${esc(r.v[lang])}</div>`).join('\n');
  // The content comes from lib/cv-data.ts, the same data as the /cv page, so the PDF cannot drift from the site.
  const html = `
    <!DOCTYPE html>
    <html lang="${lang}">
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
      <h1>${esc(cvName[lang])}</h1>
      <div class="contact">
        ${rows(cvPersonal, ': ')}
      </div>

      <div class="section">
        <h2>${L.contacts}</h2>
        ${rows(cvContacts, ': ')}
      </div>

      <div class="divider"></div>

      <div class="section">
        <h2>${L.experience}</h2>
        ${items(cvExperience)}
      </div>

      <div class="divider"></div>

      <div class="section">
        <h2>${L.education}</h2>
        ${items(cvEducation)}
      </div>

      <div class="divider"></div>

      <div class="section">
        <h2>${L.skills}</h2>
        <div class="item">
          <h3>${L.languages}</h3>
          ${cvCoreLanguages.map((l) => `<div class="skills-list"><strong>${esc(l.name)}:</strong> ${esc(l.text[lang])}</div>`).join('\n')}
        </div>
        ${cvSkillBlocks.map((b) => `<div class="item"><h3>${esc(b.title[lang])}</h3><div class="skills-list">${esc(b.text[lang])}</div></div>`).join('\n')}
      </div>

      <div class="divider"></div>

      <div class="section">
        <h2>${L.spoken}</h2>
        ${rows(cvSpoken, ' - ')}
      </div>

      <div class="divider"></div>

      <div class="section">
        <h2>${L.competitions}</h2>
        ${cvHackathons.map((h) => `<div class="item"><div><strong>${esc(h.title[lang])}</strong> - <a href="${h.href}">${esc(h.href.replace('https://', ''))}</a></div><div class="description">${esc(h.text[lang])}</div></div>`).join('\n')}
      </div>
    </body>
    </html>
  `;
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 }); // A4 at 96 DPI
  await page.setContent(html, { waitUntil: 'load' });

  const outputPath = path.join(process.cwd(), 'public', 'cv', `cv_${lang}.pdf`);
  await page.pdf({
    path: outputPath,
    format: 'A4',
    margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
    printBackground: true,
  });
  await page.close();
  console.log(`Generated CV at: ${outputPath}`);
}

async function main() {
  const browser = await puppeteer.launch();
  try {
    for (const lang of ['en', 'ru'] as const) await generateCV(lang, browser);
  } finally {
    await browser.close();
  }
}

main();
