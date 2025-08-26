import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

async function generateCV() {
  // Generate HTML content with full details matching the CV page
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
        <div>22 years old</div>
        <div>Originally from Estonia, currently based in Spain</div>
        <div>Blockchain & IT Developer</div>
      </div>

      <div class="section">
        <h2>Contacts</h2>
        <div>Telegram: @ruffbuff</div>
        <div>Email: ruffgreenw@gmail.com</div>
      </div>

      <div class="divider"></div>

      <div class="section">
        <h2>Education & Self-Learning</h2>
        <div class="item">
          <div><strong>Programming Courses</strong> - 2023 - 2025</div>
          <div class="description">Self-taught developer, completed various programming courses</div>
        </div>
        <div class="item">
          <div><strong>Smart Contracts Development</strong> - 2021 - 2023</div>
          <div class="description">Learning smart contract development and Chainlink tools</div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="section">
        <h2>Skills</h2>
        <div class="item">
          <h3>Programming Languages</h3>
          <div class="skills-list"><strong>Primary:</strong> Python, JavaScript/TypeScript, Solidity, HTML/CSS</div>
          <div class="skills-list"><strong>Secondary:</strong> Lua, Bash</div>
        </div>
        <div class="item">
          <h3>Technical Skills</h3>
          <div class="skills-list">Blockchain Development, Smart Contracts, Web3, Node.js, React, Next.js, Telegram Bot Development, API Integration, Database Management</div>
        </div>
        <div class="item">
          <h3>Soft Skills</h3>
          <div class="skills-list">Development, Project Management, Team Leadership, Problem Solving, Communication, Adaptability, Self-Learning</div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="section">
        <h2>Professional Experience</h2>
        <div class="item">
          <div><strong>Full Stack Developer</strong> - 2024 - Present</div>
          <div class="description">Developing full-stack web applications with focus on performance optimization and user experience. Building scalable applications using modern technologies, implementing deployment pipelines through self-learning and experimentation. Achieved significant performance improvements through iterative testing and optimization.</div>
        </div>
        <div class="item">
          <div><strong>Blockchain Engineer & Smart Contract Developer</strong> - 2023 - 2024</div>
          <div class="description">Self-taught blockchain development, specializing in secure smart contracts using Solidity. Learned to integrate Chainlink oracles and DeFi protocols through documentation and hands-on practice. Built multiple blockchain projects by experimenting with different approaches and learning from mistakes.</div>
        </div>
        <div class="item">
          <div><strong>Freelance Developer</strong> - 2022 - Present</div>
          <div class="description">Providing development services including web applications, automation solutions, and AI integration. Learning new technologies as needed for each project, adapting quickly to client requirements through self-study and practical implementation.</div>
        </div>
        <div class="item">
          <div><strong>Self-Taught Developer</strong> - 2018 - 2022</div>
          <div class="description">Started programming journey through online resources and documentation. Learned web development fundamentals, modern frameworks, and development methodologies through trial and error, building various personal projects.</div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="section">
        <h2>Languages</h2>
        <div>Russian - C1</div>
        <div>Estonian - B2</div>
        <div>English - B2</div>
      </div>

      <div class="divider"></div>

      <div class="section">
        <h2>Hackathons</h2>
        <div class="item">
          <div><strong>🏆 Chainlink Constellation Hackathon 2023</strong></div>
          <div class="description">Developed "DynamicAI" - a blockchain-based AI solution. Project focused on integrating AI with blockchain technology for dynamic content generation and management.</div>
        </div>
        <div class="item">
          <div><strong>🎮 Chainlink BlockMagic Hackathon 2024</strong></div>
          <div class="description">Created "OnChainTTT" - a decentralized Tic-Tac-Toe game on Polygon blockchain. Implemented Chainlink VRF for provably fair randomness and automated game state management.</div>
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
