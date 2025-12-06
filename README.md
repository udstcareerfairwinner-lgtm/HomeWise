# Homewise: Smart Maintenance for Your Home

Homewise is a modern web application designed to help you intelligently manage and track the maintenance needs of all your household machines and vehicles. From your car to your kitchen appliances, Homewise leverages the power of generative AI to provide predictive insights, cost-saving recommendations, and timely reminders, ensuring your valuable assets are always in top condition.

This project is built with a modern, scalable tech stack, making it a robust starting point for a production-ready application.

## Key Features

- **Centralized Dashboard**: Get an at-a-glance overview of upcoming maintenance tasks, machines requiring immediate attention, and a summary of your maintenance costs and savings.
- **Machine Management**: Easily add, edit, and track an unlimited number of machines, including vehicles, kitchen appliances, HVAC systems, and more.
- **AI-Powered Predictive Maintenance**: For any machine in your inventory, our AI can predict:
    - The next likely maintenance task required.
    - An estimated due date for the task.
    - The potential cost of the service.
    - An urgency level (Low, Medium, High) to help you prioritize.
- **Intelligent AI Recommendations**: Go beyond predictions with AI-driven insights, including:
    - Actionable cost-saving tips.
    - An estimation of the machine's remaining useful life.
    - Recommendations for nearby service providers, using your current location to find local specialists.
- **Automatic & Manual Reminders**: Set custom maintenance reminders manually or let the app automatically create them for you based on AI predictions.
- **Comprehensive History**: Maintain a detailed log of all maintenance activities, including tasks performed, dates, costs, and vendors for each machine.
- **Notifications**: Stay informed with a dedicated page for all upcoming maintenance reminders.

## How It Works

The application is structured around a simple, user-centric workflow:

1.  **Add Your Machines**: New users are prompted to add their first machine. You can input details like category, brand, model, purchase date, and maintenance history.
2.  **Generate AI Insights**: On the **Predictions** page or directly from the machine's detail page, you can run AI-powered analyses to predict future maintenance needs and get tailored recommendations.
3.  **Stay Organized**: The **Dashboard** provides a high-level view of your most critical tasks, while the **Reminders** and **Notifications** pages help you stay on top of your schedule.
4.  **Track Everything**: All past and present activities are logged, giving you a complete and exportable history of your maintenance efforts.

## Technical Stack

This project leverages a modern, server-centric web architecture.

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit) with Google Gemini models.
-   **Hosting**: [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

The backend logic, particularly the AI flows, is handled by server-side code using Genkit, which communicates with Google's Gemini models to generate predictions and recommendations.
