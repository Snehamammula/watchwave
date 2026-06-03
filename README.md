# WatchWave

Your ultimate destination for tracking movies and TV shows.

## Features

- 🎬 **Trending Movies**: Discover what's trending now
- 📊 **Personal Watchlist**: Create and manage your favorite watchlists
- 👤 **User Profiles**: Personalized user accounts with Firebase authentication
- ⭐ **Ratings & Reviews**: Rate and review movies
- 🔐 **Secure Authentication**: Firebase-powered user authentication
- 📱 **Responsive Design**: Works on all devices
- 🎨 **Modern UI**: Built with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth, Firestore)
- **API**: TMDb (The Movie Database)
- **Deployment**: Azure Web Apps

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account
- TMDb API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/Snehamammula/watchwave.git
cd watchwave
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.local.example .env.local
```

Add your Firebase and TMDb API credentials to `.env.local`

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   ├── login/          # Authentication pages
│   ├── signup/
│   ├── profile/        # User profile
│   ├── watchlist/      # Watchlist management
│   ├── movie/          # Movie details page
│   └── admin/          # Admin dashboard
├── components/         # React components
│   ├── Navbar.tsx
│   ├── MovieCard.tsx
│   ├── HeroSection.tsx
│   └── Footer.tsx
├── config/            # Configuration files
│   └── firebase.ts    # Firebase setup
└── lib/               # Utility functions
    └── tmdb.ts        # TMDb API calls
```

## Usage

### Authentication
- Sign up with email and password
- Login to access your watchlist
- Logout from your profile page

### Watchlist Management
- Add movies to your watchlist from movie detail pages
- Remove movies from your watchlist
- View all your watchlisted movies on the watchlist page

### Admin Features
- Access admin dashboard with admin account
- View all users
- Manage user data

## API Integrations

### TMDb API
- Trending movies
- Movie search
- Movie details
- Ratings and metadata

### Firebase
- User authentication (sign up, login, logout)
- Firestore database for user data
- Real-time watchlist syncing

## Deployment

The application is configured for deployment on Azure Web Apps. See `.github/workflows/azure-webapps-node.yml` for CI/CD configuration.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [TMDb](https://www.themoviedb.org/) for providing movie data
- [Firebase](https://firebase.google.com/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the React framework

## Contact

For questions or feedback, please open an issue on the repository.
