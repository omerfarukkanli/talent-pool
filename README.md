# Talent Pool UI

## Technologies Used

- **Next.js** – Modern React-based web framework
- **TypeScript** – A superset of JavaScript with type safety
- **Tailwind CSS** – Fast and flexible styling
- **ShadCN UI** – UI components
- **OpenAI API** – AI integration
- **Redux** – State management
- **GraphQL** – Data management

---

## ShadCN UI Components Used

| Component         | Purpose                           |
| ----------------- | --------------------------------- |
| **Avatar**        | Display user avatars              |
| **Badge**         | Used for the "Applied Job" label  |
| **Button**        | Used throughout the project       |
| **Checkbox**      | Used to control column visibility |
| **Dialog**        | Used for the AI input component   |
| **Dropdown Menu** | Used to list column names         |
| **Input**         | Used in input fields              |
| **Label**         | Used to label input fields        |
| **Progress**      | Used for the "AI Fit" indicator   |
| **Select**        | Used in the sidebar selection     |
| **Sheet**         | Used for mobile menu toggling     |
| **Switch**        | Used to toggle column visibility  |
| **Table**         | Used for data tables              |

---

## Project Overview

This project utilizes **GraphQL** for data access and **Redux** for state management. **Query** and **sorting** operations are handled via Redux.

To optimize performance, **useMemo** and **useCallback** hooks were used to minimize unnecessary re-renders. **Infinite Scroll** was implemented to dynamically load content based on table position.

### OpenAI API Integration

**OpenAI API** was integrated for AI functionality. Currently, the prompt is optimized for name queries but can be expanded in the future.

### Additional Features

- **Search by name** functionality was added.
- **Column visibility** is managed through Redux.
- **Sorting functionality** was implemented for most applicable fields.

This project is designed to create an AI-powered talent pool management system. Future versions will include additional features and improvements.

---

## Environment Variables

Ensure you set the following environment variables in your `.env` file:

```
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://staging-api.hrpanda.co/graphql
NEXT_PUBLIC_AUTH_EMAIL=admin20@hireg.com
NEXT_PUBLIC_AUTH_PASSWORD=123123
NEXT_PUBLIC_OPENAI_API_KEY=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
```

> **Note:** Keep sensitive credentials secure and avoid exposing them in public repositories.
