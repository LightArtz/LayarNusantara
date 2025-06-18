# LayarNusantara

## Discover the Heart of Indonesia

LayarNusantara is a comprehensive platform designed to showcase the beauty and diversity of Indonesia. It connects adventurous travelers with authentic local experiences, cultural insights, and heartwarming travel stories from fellow explorers. The platform also provides a space for local businesses to promote their offerings to a wider audience, fostering sustainable tourism and community engagement.

## ✨ Features

-   **Interactive Indonesia Map**: Explore all 38 provinces of Indonesia, with detailed information on tourism, art & culture, and culinary highlights for select regions. Users can click on provinces to reveal curated content.
-   **Engaging Travel Stories**: A dedicated section featuring personal travelogues from adventurers, complete with rich narratives, stunning images, and author profiles.
-   **Cultural Insights**: Dive deep into Indonesia's vibrant traditions, festivals, rituals, and artistic expressions through informative articles and captivating visuals.
-   **Local Business Promotions**: A marketplace where local businesses can list their services (culinary, homestay, craft & art, cultural, adventure, etc.). Travelers can browse, search, and filter promotions by category, province, price range, and more.
-   **Business Promotion Submission**: Allows local businesses to easily create and submit their promotions through a user-friendly form, including image uploads and contact details.
-   **Integrated Payment System**: A seamless payment flow for submitted promotions, supporting QRIS and bank transfer methods, including payment proof upload.
-   **Admin Dashboard**: A secure administrative interface to manage submitted promotions, activate or reject listings, and track payment statuses.
-   **AI Chatbot Assistant**: An interactive chatbot powered by the Google Gemini API, providing quick answers and information about Indonesian travel and culture.
-   **Responsive Design & Modern UI**: Built with Next.js, React, and Tailwind CSS, leveraging Shadcn UI components for a modern, accessible, and fully responsive user experience, including dark mode support.
-   **Robust Data Management**: Utilizes Supabase for secure database operations, authentication, and file storage.

## 🚀 Technologies Used

This project is built with a modern web stack, focusing on performance, scalability, and developer experience:

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Frontend Library**: [React](https://react.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
-   **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL, Authentication, Storage)
-   **Icons**: [Lucide React](https://lucide.dev/icons/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Carousel**: [Embla Carousel React](https://www.embla-carousel.com/)
-   **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) (for schema validation)
-   **Notifications**: [Sonner](https://sonner.emilkowalski.com/)
-   **Charting (Scales)**: [Recharts](https://recharts.org/en-US/) (used in `components/ui/chart.tsx`)
-   **Package Manager**: [pnpm](https://pnpm.io/)
-   **AI Integration**: Google Gemini API (for the chatbot)

## 🛠️ Installation

Follow these steps to set up the project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/LightArtz/LayarNusantara.git
    cd LayarNusantara
    ```

2.  **Install dependencies:**
    This project uses `pnpm`. If you don't have it installed, you can install it via npm: `npm install -g pnpm`.
    ```bash
    pnpm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root of the project and add the following environment variables. You'll need to create a Supabase project and obtain your keys.

    ```dotenv
    # Supabase Credentials
    NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY" # This is for server-side actions

    # Google Gemini API (for chatbot)
    NEXT_PUBLIC_GEMINI_API_URL="YOUR_GEMINI_API_ENDPOINT" # e.g., [https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY](https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY)
    ```
    Replace `YOUR_SUPABASE_PROJECT_URL`, `YOUR_SUPABASE_ANON_KEY`, `YOUR_SUPABASE_SERVICE_ROLE_KEY`, and `YOUR_GEMINI_API_ENDPOINT` with your actual Supabase and Gemini API credentials. Ensure your Gemini API endpoint includes your API key directly in the URL as shown in the example comment if you are using it this way.

4.  **Supabase Database Setup:**
    You'll need to set up the necessary tables in your Supabase project. The application primarily uses:
    -   `promotions` table
    -   `promotion_payments` table
    -   `admin_users` table

    Refer to the `app/actions/promotions.ts`, `types/promotion.ts`, and `types/travel-story.ts` files for the expected schema and data structures. You can create these tables and their columns in your Supabase dashboard.

5.  **Run the development server:**
    ```bash
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 💡 Usage

-   **Home Page**: Explore the interactive map, see featured travel stories and cultural insights.
-   **Interactive Map**: Click on any province on the map to view its tourism, art & culture, and culinary highlights.
-   **Travel Stories**: Navigate to `/travel-stories` to browse and read detailed travel experiences.
-   **Culture Insights**: Visit `/culture-insights` to learn about various Indonesian traditions.
-   **Local Promotions**: Go to `/promotions` to discover local businesses. You can use search, category, province, and price filters.
-   **Create Promotion**: Businesses can submit their promotions via `/create-promotion`.
-   **Payment Flow**: After creating a promotion, you'll be redirected to a payment page to finalize your submission.
-   **Admin Dashboard**: Access the admin panel at `/admin/login`.
    -   **Demo Credentials**: Username: `ADMIN`, Password: `LAYARNUSANTARA`
    -   From here, administrators can review, activate, reject, or delete promotions and manage payment statuses.
-   **Chatbot**: Click the floating chatbot icon in the bottom right corner to get assistance.

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request.

1.  Fork the repository.
2.  Create a new branch: `git checkout -b feature/your-feature-name`
3.  Make your changes and commit them: `git commit -m 'feat: Add new feature'`
4.  Push to your fork: `git push origin feature/your-feature-name`
5.  Open a pull request.

## 📄 License

This project is licensed under the MIT License - see the `package-lock.json` for general license information on included packages.
