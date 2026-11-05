# LeadFlow Pro

LeadFlow Pro is a React-based lead management application for reviewing, filtering, selecting, and tracking leads.

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide icons

## Getting started

### Requirements

- Node.js (LTS recommended)
- npm

### Install and run

```bash
npm install
npm run dev
```

Vite starts a local development server and prints the address in the terminal.

### Production build

```bash
npm run build
npm run preview
```

## Lead management

The current interface includes:

- Lead listing with text search
- Filtering by lead status and industry
- Paginated lead results
- Row selection and page-level select-all
- Lead status indicators
- Recent-lead activity display

Some screens currently use in-memory sample data. Treat those records as demonstration data, not live customer records. Persistence, authentication, and external CRM integrations should be considered separate capabilities unless implemented elsewhere in the application.

## Development notes

- Keep filtering and pagination behavior consistent when changing the lead table.
- Reset pagination when search or filters change.
- Ensure select-all applies to the visible page and that empty search results have a clear state.
- Avoid committing credentials, API keys, or real personal data.

## Suggested verification

Before submitting UI changes, run the available lint and build scripts from `package.json`. Add or update tests when changing filtering, pagination, or selection behavior.

## Contributing

Keep changes focused, describe user-visible behavior in commit messages, and include reproduction steps for bug fixes.