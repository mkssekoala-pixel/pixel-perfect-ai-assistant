# AI Workplace Productivity Assistant

A modern, responsive web dashboard that helps professionals automate everyday workplace tasks using AI. It brings three AI-powered tools together in one clean, SaaS-style interface, with no backend, no database, and no login.

---

## Features

### 1. Smart Email Generator
- Generate professional emails from a recipient, purpose, and key points.
- Choose a tone: **Formal**, **Friendly**, or **Persuasive**.
- Output includes a subject line and a ready-to-send body.

### 2. Meeting Notes Summarizer
- Paste long or messy meeting notes and get a structured summary.
- Automatically extracts:
  - **Summary**
  - **Key Decisions**
  - **Action Items** (with owners)
  - **Deadlines**

### 3. AI Chatbot
- Interactive workplace assistant with a chat-style interface.
- Keeps conversation history during the session.
- Typing indicator and a **Clear chat** button.

### Across the app
- Editable AI outputs (Email and Summarizer) with **Copy**, **Regenerate**, and **Download (.txt)** actions.
- Sidebar navigation with a hamburger menu on mobile.
- Loading states, friendly error messages, and retry handling.
- Responsible AI disclaimer shown on every page.

---

## Design

- Two-tone palette: light gray (`#F3F4F6`) and dark gray (`#1F2937`) with blue (`#3B82F6`) outlines, focus rings, and primary buttons.
- Rounded cards, soft shadows, and the Inter typeface.
- Fully responsive across desktop, tablet, and mobile.

---

## Tech Stack

| Area | Technology |
|------|------------|
| Framework | React |
| Styling | Tailwind CSS |
| Build tool | Vite |
| AI provider | [Pollinations.ai](https://pollinations.ai) text API (no key, no login) |
| Hosting | Lovable (static frontend only) |

> The project was generated with [Lovable](https://lovable.dev). Exact libraries may vary slightly depending on the generated code.

---

## How the AI Works

All AI responses are generated directly from the browser using a single reusable helper, `generateAI(systemPrompt, userInput, history)`.

```
Browser  ──POST──▶  https://text.pollinations.ai/openai  ──▶  AI response
```

Each tool uses its own structured system prompt:

| Tool | Prompt goal |
|------|-------------|
| Email Generator | Write a professional email with a subject line in the selected tone |
| Meeting Summarizer | Return Summary, Key Decisions, Action Items (owner), and Deadlines |
| Chatbot | Act as a helpful, concise workplace assistant |

If a request fails or is rate limited, the app shows a friendly message, retries once automatically, and offers a manual **Retry** button.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) 18 or newer
- npm (included with Node.js)

### Run locally

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd ai-workplace-productivity-assistant

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

No environment variables or API keys are required.

---

## Project Structure

```
src/
├── components/     # Sidebar, footer, output editor, shared UI
├── pages/          # Dashboard, EmailGenerator, MeetingSummarizer, Chatbot
├── lib/
│   └── generateAI  # Reusable AI helper
└── App             # Routing and layout
```

---

## Responsible AI Disclaimer

> AI-generated content may be inaccurate or biased. Review and edit before use. Do not enter confidential or sensitive data.

Because requests are sent to a third-party AI service, please avoid entering personal, financial, or confidential company information.

---

## Limitations

- **No backend:** nothing is saved. Refreshing the page clears your content and chat history.
- **Free-tier AI:** the anonymous Pollinations.ai tier may be slow or rate limited during busy periods.
- **Service changes:** if the provider introduces mandatory API keys, the AI helper will need to be updated.
- **Accuracy:** outputs may contain errors, so always review before sending or sharing.

---

## Future Improvements

- Settings page for users to add their own AI API key
- Save and export history using local storage
- Additional tools such as a Task Planner and Research Assistant
- Dark mode toggle

---

## License

This project is released under the [MIT License](LICENSE).
