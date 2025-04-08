import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

// Translation data
const translations = {
  en: {
    "cv.name": "Sergei Avramtsuk",
    "cv.age": "Age: 22",
    "cv.location": "Location: Estonia",
    "cv.profession": "Full Stack Developer",
    "cv.education.title": "Education",
    "cv.education.courses": "Web Development Courses",
    "cv.education.courses.period": "2023 - 2024",
    "cv.education.courses.description": "Comprehensive web development program covering modern technologies",
    "cv.education.smart_contracts": "Smart Contracts Development",
    "cv.education.smart_contracts.period": "2023",
    "cv.education.smart_contracts.description": "Blockchain and smart contract development course",
    "cv.skills.title": "Skills",
    "cv.skills.programming.title": "Programming Languages",
    "cv.skills.programming.primary": "JS/TS, Python, HTML/CSS",
    "cv.skills.programming.secondary": "Solidity, Lua, Bash, MySQL",
    "cv.skills.technical.title": "Technical Skills",
    "cv.skills.technical.items": "React, Next.js, Node.js, Git, Docker",
    "cv.skills.soft.title": "Soft Skills",
    "cv.skills.soft.items": "Team collaboration, Problem solving, Communication",
    "cv.languages.title": "Languages",
    "cv.languages.russian": "Russian - c1",
    "cv.languages.estonian": "Estonian - b2",
    "cv.languages.english": "English - b2",
    "cv.hackathons.title": "Hackathons",
    "cv.hackathons.constellation.title": "Constellation - 2023",
    "cv.hackathons.constellation.description": "Developed DynamicAI - a blockchain-based AI solution. Project focused on integrating AI with blockchain technology for dynamic NFT content generation and management.",
    "cv.hackathons.blockmagic.title": "BlockMagic - 2024",
    "cv.hackathons.blockmagic.description": "Created OnChainTTT - a decentralized Tic Tac Toe game on Polygon blockchain. Implemented Chainlink VRF for fair gameplay and Chainlink Automation for game state management."
  },
  ru: {
    "cv.name": "Сергей Аврамчук",
    "cv.age": "Возраст: 22",
    "cv.location": "Местоположение: Эстония",
    "cv.profession": "Full Stack Разработчик",
    "cv.education.title": "Образование",
    "cv.education.courses": "Курсы веб-разработки",
    "cv.education.courses.period": "2023 - 2024",
    "cv.education.courses.description": "Комплексная программа веб-разработки с использованием современных технологий",
    "cv.education.smart_contracts": "Разработка смарт-контрактов",
    "cv.education.smart_contracts.period": "2023",
    "cv.education.smart_contracts.description": "Курс по разработке блокчейн и смарт-контрактов",
    "cv.skills.title": "Навыки",
    "cv.skills.programming.title": "Языки программирования",
    "cv.skills.programming.primary": "JS/TS, Python, HTML/CSS",
    "cv.skills.programming.secondary": "Solidity, Lua, Bash, MySQL",
    "cv.skills.technical.title": "Технические навыки",
    "cv.skills.technical.items": "React, Next.js, Node.js, Git, Docker",
    "cv.skills.soft.title": "Гибкие навыки",
    "cv.skills.soft.items": "Командная работа, Решение проблем, Коммуникация",
    "cv.languages.title": "Языки",
    "cv.languages.russian": "Русский - c1",
    "cv.languages.estonian": "Эстонский - b2",
    "cv.languages.english": "Английский - b2",
    "cv.hackathons.title": "Хакатоны",
    "cv.hackathons.constellation.title": "Constellation - 2023",
    "cv.hackathons.constellation.description": "Разработали DynamicAI - блокчейн-решение на основе ИИ. Проект был сосредоточен на интеграции ИИ с блокчейн-технологиями для динамической генерации и управления НФТ контентом.",
    "cv.hackathons.blockmagic.title": "BlockMagic - 2024",
    "cv.hackathons.blockmagic.description": "Создали OnChainTTT - децентрализованную игру в крестики-нолики на блокчейне Polygon. Реализовал Chainlink VRF для честной игры и Chainlink Automation для управления состоянием игры."
  }
};

function generateCV(lang: 'en' | 'ru') {
  const t = (key: string) => translations[lang][key as keyof typeof translations['en']];
  
  const pdf = new jsPDF();
  const content = {
    name: t("cv.name"),
    age: t("cv.age"),
    location: t("cv.location"),
    profession: t("cv.profession"),
    education: {
      title: t("cv.education.title"),
      courses: {
        name: t("cv.education.courses"),
        period: t("cv.education.courses.period"),
        description: t("cv.education.courses.description")
      },
      smartContracts: {
        name: t("cv.education.smart_contracts"),
        period: t("cv.education.smart_contracts.period"),
        description: t("cv.education.smart_contracts.description")
      }
    },
    skills: {
      title: t("cv.skills.title"),
      programming: {
        title: t("cv.skills.programming.title"),
        primary: t("cv.skills.programming.primary"),
        secondary: t("cv.skills.programming.secondary")
      },
      technical: {
        title: t("cv.skills.technical.title"),
        items: t("cv.skills.technical.items")
      },
      soft: {
        title: t("cv.skills.soft.title"),
        items: t("cv.skills.soft.items")
      }
    },
    languages: {
      title: t("cv.languages.title"),
      russian: t("cv.languages.russian"),
      estonian: t("cv.languages.estonian"),
      english: t("cv.languages.english")
    }
  };

  // Set font
  pdf.setFont("helvetica");

  // Header
  pdf.setFontSize(24);
  pdf.text(content.name, 20, 20);

  pdf.setFontSize(12);
  pdf.text(content.age, 20, 30);
  pdf.text(content.location, 20, 37);
  pdf.text(content.profession, 20, 44);

  // Education
  pdf.setFontSize(16);
  pdf.text(content.education.title, 20, 60);

  pdf.setFontSize(12);
  pdf.text(content.education.courses.name, 20, 70);
  pdf.setFontSize(10);
  pdf.text(content.education.courses.period, 20, 77);
  pdf.text(content.education.courses.description, 20, 84);

  pdf.setFontSize(12);
  pdf.text(content.education.smartContracts.name, 20, 95);
  pdf.setFontSize(10);
  pdf.text(content.education.smartContracts.period, 20, 102);
  pdf.text(content.education.smartContracts.description, 20, 109);

  // Skills
  pdf.setFontSize(16);
  pdf.text(content.skills.title, 20, 125);

  pdf.setFontSize(12);
  pdf.text(content.skills.programming.title, 20, 135);
  pdf.setFontSize(10);
  pdf.text(content.skills.programming.primary, 20, 142);
  pdf.text(content.skills.programming.secondary, 20, 149);

  pdf.setFontSize(12);
  pdf.text(content.skills.technical.title, 20, 160);
  pdf.setFontSize(10);
  pdf.text(content.skills.technical.items, 20, 167);

  pdf.setFontSize(12);
  pdf.text(content.skills.soft.title, 20, 178);
  pdf.setFontSize(10);
  pdf.text(content.skills.soft.items, 20, 185);

  // Languages
  pdf.setFontSize(16);
  pdf.text(content.languages.title, 20, 201);

  pdf.setFontSize(10);
  pdf.text(content.languages.russian, 20, 211);
  pdf.text(content.languages.estonian, 20, 218);
  pdf.text(content.languages.english, 20, 225);

  // Hackathons
  pdf.setFontSize(16);
  pdf.text(t("cv.hackathons.title"), 20, 235);

  // Constellation
  pdf.setFontSize(12);
  const constTitle = t("cv.hackathons.constellation.title");
  pdf.text(constTitle, 20, 245);
  
  pdf.setFontSize(10);
  const constDesc = t("cv.hackathons.constellation.description");
  const constLines = pdf.splitTextToSize(constDesc, 170);
  pdf.text(constLines, 20, 255);

  // BlockMagic
  pdf.setFontSize(12);
  const blockTitle = t("cv.hackathons.blockmagic.title");
  pdf.text(blockTitle, 20, 270);
  
  pdf.setFontSize(10);
  const blockDesc = t("cv.hackathons.blockmagic.description");
  const blockLines = pdf.splitTextToSize(blockDesc, 170);
  pdf.text(blockLines, 20, 280);

  // Save the PDF
  const outputPath = path.join(process.cwd(), 'public', 'cv', `cv_${lang}.pdf`);
  const pdfOutput = pdf.output();
  fs.writeFileSync(outputPath, pdfOutput, 'binary');
  console.log(`Generated ${lang} CV at: ${outputPath}`);
}

// Generate both versions
generateCV('en');
generateCV('ru');
