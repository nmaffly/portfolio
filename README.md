# Brutalist Portfolio

A desktop-first portfolio with clean brutalist design, horizontal chapter navigation, and keyboard shortcuts.

## Running the Project

```bash
npm start
```

Runs on `http://localhost:3000`

## Customizing Content

All content is centralized in `/src/data/portfolio.js`. Edit this file to update:

### Personal Info
- Name, headline, subheadline
- Links (GitHub, LinkedIn, email)

### Projects
Add/edit projects with:
- `title`: Project name (ALL CAPS for brutalist aesthetic)
- `why`: One sentence explaining the motivation (human)
- `how`: One sentence explaining the approach (technical)
- `tags`: Array of technologies
- `details`: Array of bullet points for the modal
- `links`: GitHub and/or live URLs

### Experience
Add/edit experience with:
- `role`: Job title (ALL CAPS)
- `org`: Company/organization name
- `dates`: Time period
- `summary`: One-line context description
- `details`: Array of accomplishments

### Experiments
Add/edit learning projects with:
- `title`: Project name
- `goal`: What you were trying to learn
- `lesson`: What you discovered
- `doNext`: What you'd improve

### Now
Update the three fields:
- `exploring`: Current interests
- `openTo`: What opportunities you're seeking
- `currently`: What you're actively building

## Navigation

### Keyboard
- `←` / `→`: Navigate between chapters
- `Home`: Jump to first chapter
- `End`: Jump to last chapter
- `Esc`: Close any open modal

### Mouse
- **Desktop**: Horizontal scroll or click project/experience items
- **Mobile**: Swipe or tap (stacks vertically, no snap scrolling)

## Structure

```
src/
├── App.js                    # Main app with chapter layout
├── data/
│   └── portfolio.js          # All content (EDIT THIS)
├── components/
│   ├── Header.js             # Fixed header with progress indicator
│   ├── Section.js            # Chapter wrapper
│   ├── ItemListRow.js        # Project/experience list item
│   └── Modal.js              # Accessible detail modal
├── hooks/
│   ├── useChapterNav.js      # Keyboard navigation logic
│   └── usePrefersReducedMotion.js
└── index.css                 # Brutalist styles
```

## Design Principles

This portfolio follows brutalist design:
- **No rounded corners**: Everything is sharp edges
- **One accent color**: Blue (#1d4ed8) for underlines and focus
- **Minimal motion**: Only opacity and underlines on hover
- **Typography over decoration**: Strong hierarchy, system fonts
- **Visible structure**: Borders, dividers, hard edges
- **Honest layout**: No gradients, no shadows, no tricks

## Adding a New Project

1. Open `/src/data/portfolio.js`
2. Add a new object to the `projects` array:

```javascript
{
  id: "unique-id",
  title: "PROJECT NAME",
  why: "Human reason for building it",
  how: "Technical approach summary",
  tags: ["Tech", "Stack", "Here"],
  details: [
    "First accomplishment",
    "Second accomplishment",
    "Third accomplishment"
  ],
  links: {
    github: "https://github.com/...",
    live: null  // or URL if deployed
  }
}
```

## Adding a New Experience

1. Open `/src/data/portfolio.js`
2. Add a new object to the `experience` array:

```javascript
{
  id: "unique-id",
  role: "YOUR ROLE",
  org: "Company Name",
  dates: "Jan 2024 - Present",
  summary: "One-line context",
  details: [
    "What you did",
    "Impact you made"
  ]
}
```

## Browser Support

- Desktop Chrome/Firefox/Safari/Edge (latest)
- Mobile responsive (stacks vertically)
- Respects `prefers-reduced-motion`

## Accessibility

- ✅ Keyboard navigation throughout
- ✅ Focus trap in modals
- ✅ ARIA labels where needed
- ✅ Semantic HTML structure
- ✅ Reduced motion support

## License

MIT
