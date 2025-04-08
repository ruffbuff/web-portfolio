import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { translations } from '@/components/language-provider';

// Get translations from language provider
const getTranslation = (key: string, lang: 'en' | 'ru'): string => {
  const translation = translations[key];
  if (!translation) {
    console.warn(`Translation not found for key: ${key}`);
    return key;
  }
  return translation[lang] || key;
};

async function generateCV(lang: 'en' | 'ru') {
  const t = (key: string) => getTranslation(key, lang);

  // Generate HTML content
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
          line-height: 1.2;
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
          margin-bottom: 6px;
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
      </style>
    </head>
    <body>
      <h1>${t("cv.name")}</h1>
      <div class="contact">
        <div>${t("cv.age")}</div>
        <div>${t("cv.location")}</div>
        <div>${t("cv.profession")}</div>
      </div>

      <div class="section">
        <h2>${t("cv.contacts.title")}</h2>
        <div>${t("cv.contacts.telegram")}</div>
        <div>${t("cv.contacts.email")}</div>
      </div>

      <div class="divider"></div>

      <div class="section">
        <h2>${t("cv.education.title")}</h2>
        <div class="item">
          <div><strong>${t("cv.education.courses")}</strong> - ${t("cv.education.courses.period")}</div>
          <div class="description">${t("cv.education.courses.description")}</div>
        </div>
        <div class="item">
          <div><strong>${t("cv.education.smart_contracts")}</strong> - ${t("cv.education.smart_contracts.period")}</div>
          <div class="description">${t("cv.education.smart_contracts.description")}</div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="section">
        <h2>${t("cv.skills.title")}</h2>
        <div class="item">
          <h3>${t("cv.skills.programming.title")}</h3>
          <div>${t("cv.skills.programming.primary")}</div>
          <div>${t("cv.skills.programming.secondary")}</div>
        </div>
        <div class="item">
          <h3>${t("cv.skills.technical.title")}</h3>
          <div>${t("cv.skills.technical.items")}</div>
        </div>
        <div class="item">
          <h3>${t("cv.skills.soft.title")}</h3>
          <div>${t("cv.skills.soft.items")}</div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="section">
        <h2>${t("cv.languages.title")}</h2>
        <div>${t("cv.languages.russian")}</div>
        <div>${t("cv.languages.estonian")}</div>
        <div>${t("cv.languages.english")}</div>
      </div>

      <div class="divider"></div>

      <div class="section">
        <h2>${t("cv.hackathons.title")}</h2>
        <div class="item">
          <div><strong>${t("cv.hackathons.constellation.title")}</strong></div>
          <div class="description">${t("cv.hackathons.constellation.description")}</div>
        </div>
        <div class="item">
          <div><strong>${t("cv.hackathons.blockmagic.title")}</strong></div>
          <div class="description">${t("cv.hackathons.blockmagic.description")}</div>
        </div>
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
  const outputPath = path.join(process.cwd(), 'public', 'cv', `cv_${lang}.pdf`);
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

  console.log(`Generated ${lang} CV at: ${outputPath}`);
}

// Generate both English and Russian versions
async function generateCVs() {
  await generateCV('en');
  await generateCV('ru');
}

generateCVs();
