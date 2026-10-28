# Project Overview

This project is a frontend application for an Agentic AI–driven system for end-to-end B2B RFP (Request for Proposal) response automation. It is a Vite-based React application written in TypeScript and styled with Tailwind CSS. The UI is built with a combination of custom components and components from the shadcn/ui library.

The application serves as an internal enterprise UI for various teams to manage and monitor the RFP response process. It includes features like a dashboard with KPIs, RFP management, an agent workspace, and analytics.

# Building and Running

To get the frontend running locally, follow these steps:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:8080`.

3.  **Build for production:**
    ```bash
    npm run build
    ```

4.  **Lint the code:**
    ```bash
    npm run lint
    ```

# Development Conventions

*   **Component-Based Architecture:** The project follows a component-based architecture with a clear separation of concerns. Reusable components are located in `src/components/common`.
*   **Styling:** Styling is done using Tailwind CSS.
*   **State Management:** The project uses `@tanstack/react-query` for data fetching and caching.
*   **Routing:** Routing is handled by `react-router-dom`.
*   **Mock Data:** The application uses mock data from `src/data/mockData.ts` for development.
*   **Path Aliases:** The project uses the `@` alias for the `src` directory.
