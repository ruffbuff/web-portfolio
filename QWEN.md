# Project Overview: RuffBuff's Web Portfolio

This is a Next.js 15-based web portfolio for RuffBuff, showcasing their work as a Blockchain & IT Developer. The site is built with modern web technologies including TypeScript, Tailwind CSS, and integrates with GitHub APIs to dynamically display projects and contributions. It also features a language switcher for English and Russian localization.

## Key Technologies & Frameworks

- **Next.js 15**: The core framework, utilizing App Router.
- **TypeScript**: For type safety throughout the application.
- **Tailwind CSS**: Used for styling, configured with `tailwindcss-animate`.
- **shadcn/ui**: Component library built on Radix UI and Tailwind CSS.
- **Lucide React**: Icon library.
- **React Hook Form & Zod**: For form handling and validation.
- **Framer Motion**: For animations.
- **Puppeteer**: Included, possibly for PDF generation (e.g., CV).
- **GitHub API Integration**: Fetches user data, repositories, and contribution graphs.

## Project Structure

- `app/`: Next.js App Router directory, containing routes and layouts (e.g., `page.tsx` for the home page, `layout.tsx` for the root layout).
- `components/`: Reusable UI components, including providers (`theme-provider`, `language-provider`), UI elements from shadcn/ui, and custom components like `github-contributions`.
- `hooks/`: Custom React hooks.
- `lib/`: Utility functions and library integrations (e.g., `github.ts` for GitHub API logic, `utils.ts` for general helpers).
- `public/`: Static assets like icons (`gmail.svg`, `x.svg`, etc.) and `cv.pdf`.
- `styles/`: Global CSS files.
- `scripts/`: Likely contains build or utility scripts (not explored).

## Building and Running

The project uses standard Next.js scripts defined in `package.json`:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs the Next.js linter.

### Environment Variables

The application requires a `GITHUB_TOKEN` environment variable for fetching data from the GitHub API. This should be set in a `.env.local` file.

## Development Conventions

- **UI Components**: Uses shadcn/ui components, which are built on Radix UI primitives and styled with Tailwind CSS. Component aliases are configured in `components.json`.
- **Styling**: Primarily uses Tailwind CSS classes. Custom color definitions are in `tailwind.config.ts`.
- **Routing**: Follows Next.js App Router conventions with directories in `app/`.
- **Localization**: Implements a custom language switcher using React Context (`LanguageProvider`) and `localStorage` to persist user preference. Translations are defined in `components/language-provider.tsx`.
- **Data Fetching**: Uses Next.js server-side rendering capabilities for API routes (e.g., `/api/github/repos`) to fetch and process external data (GitHub) before rendering.

## Key Features

- **Dynamic GitHub Integration**: Fetches and displays the user's GitHub profile information, repositories, and contribution graph.
- **Multi-language Support**: Supports English and Russian with a toggleable language switcher.
- **Responsive Design**: Utilizes Tailwind CSS for a responsive layout.
- **Dark/Light Theme**: Theme switching is implemented with `next-themes`.