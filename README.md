# Tickify Client

Frontend web application for **Tickify** — a cinema ticketing platform. Built with Next.js 16, React 19, and Tailwind CSS v4.

---

## Tech Stack

| Category       | Technology                 |
| -------------- | -------------------------- |
| Framework      | Next.js 16 (App Router)    |
| Language       | React 19                   |
| Styling        | Tailwind CSS v4            |
| Server State   | TanStack Query v5          |
| Client State   | Zustand v5                 |
| Auth           | Firebase v12               |
| HTTP Client    | Axios                      |
| Forms          | React Hook Form v7         |
| Notifications  | React Hot Toast            |
| Icons          | Lucide React + React Icons |
| Charts         | Recharts                   |
| Carousel       | Swiper                     |
| Video          | React Player               |
| Date Utilities | date-fns v4                |

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── (main)/                 # Public-facing layout
│   │   ├── movies/             # Browse movies
│   │   ├── movie/[movieId]/    # Movie detail
│   │   ├── showtime/[id]/      # Theater & time selection
│   │   ├── seat/               # Seat map
│   │   ├── booking-details/    # Order summary
│   │   ├── contact/            # Contact page
│   │   └── privacy-policy/     # Privacy policy
│   ├── (minimal)/              # Auth layout (no nav)
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/            # Dashboard layout
│   │   └── dashboard/
│   │       ├── profile/
│   │       ├── bookings/
│   │       └── admin/
│   └── payment/
│       ├── loading/[nextUrl]/
│       └── success/
├── components/
│   ├── auth/                   # SocialLogin
│   ├── contact/                # ContactForm, ContactInfo, SupportTopics
│   ├── dashboard/              # DashboardHeader, DashboardNav, DashboardNavLink
│   ├── editMoviePage/          # GeneralInfoSection, MetaStatsSection, GenresSection…
│   ├── moviesPage/             # MovieCard, filters, grid/list views
│   ├── profilePage/            # ProfileHero, FavoritesSection, AccountDetails
│   └── shared/                 # BlurCircle, Spinner, SectionTitle, skeletons…
├── hooks/                      # Custom TanStack Query hooks
├── lib/
│   └── axios/                  # axiosPublic + axiosSecure instances
├── services/                   # Firebase Auth.service.js
├── store/                      # Zustand stores (authStore, bookingStore)
└── utils/                      # dateFormatter and other helpers
```

---

## Pages & Routes

| Path                                            | Description                             | Access |
| ----------------------------------------------- | --------------------------------------- | ------ |
| `/`                                             | Homepage — hero, now playing, upcoming  | Public |
| `/movies`                                       | Browse all movies with filters          | Public |
| `/movie/[movieId]`                              | Movie detail — cast, showtimes, related | Public |
| `/showtime/[showtimeId]`                        | Select theater, date, and time          | Public |
| `/seat`                                         | Interactive seat map                    | Auth   |
| `/booking-details`                              | Order summary before payment            | Auth   |
| `/payment/loading/[nextUrl]`                    | Post-payment redirect handler           | Auth   |
| `/payment/success`                              | Booking confirmed screen                | Auth   |
| `/login`                                        | Login with email or demo accounts       | Public |
| `/register`                                     | Create a new account                    | Public |
| `/contact`                                      | Contact form + support topics           | Public |
| `/privacy-policy`                               | Privacy policy                          | Public |
| `/dashboard/profile`                            | Edit profile, email, password           | Auth   |
| `/dashboard/bookings`                           | Personal booking history                | Auth   |
| `/dashboard/admin`                              | Admin stats & charts overview           | Admin  |
| `/dashboard/admin/add-show`                     | Create a new showtime                   | Admin  |
| `/dashboard/admin/manage-movies`                | Movie library management                | Admin  |
| `/dashboard/admin/manage-movies/edit/[movieId]` | Edit a movie entry                      | Admin  |
| `/dashboard/admin/shows`                        | All showtimes                           | Admin  |
| `/dashboard/admin/theaters`                     | Theater management                      | Admin  |
| `/dashboard/admin/bookings`                     | All bookings                            | Admin  |
| `/dashboard/admin/users`                        | User management                         | Admin  |

---

## Installation

### Prerequisites

- Node.js 18+
- A running instance of [tickify-server](../tickify-server) or the deployed API URL
- Firebase project with Email/Password + Google auth enabled

### 1. Clone the repository

```bash
git clone https://github.com/Rabby-khan-04/tickify-client-next.git
cd tickify-next
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
# API
NEXT_PUBLIC_API_URL=https://tickify-server.vercel.app/api/v1

# TMDB image base path
NEXT_PUBLIC_TMDB_PATH=https://image.tmdb.org/t/p/original

# Firebase
NEXT_PUBLIC_APIKEY=your_firebase_api_key
NEXT_PUBLIC_AUTHDOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_PROJECTID=your_project_id
NEXT_PUBLIC_STORAGEBUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_MESSAGINGSENDERID=your_sender_id
NEXT_PUBLIC_APPID=your_app_id

# Demo accounts (optional — for login page demo buttons)
NEXT_PUBLIC_DEMO_USER_EMAIL=demo_user@example.com
NEXT_PUBLIC_DEMO_USER_PASSWORD=YourDemoPassword
NEXT_PUBLIC_DEMO_ADMIN_EMAIL=demo_admin@example.com
NEXT_PUBLIC_DEMO_ADMIN_PASSWORD=YourDemoPassword
```

> ⚠️ All client-side env vars must be prefixed with `NEXT_PUBLIC_` to be exposed in the browser.  
> Never commit your `.env.local` file — Next.js adds it to `.gitignore` by default.

### 4. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:3000` by default.

### 5. Build for production

```bash
npm run build
```

### 6. Start the production server

```bash
npm start
```

---

## Environment Variables Reference

| Variable                          | Required | Description                                     |
| --------------------------------- | -------- | ----------------------------------------------- |
| `NEXT_PUBLIC_API_URL`             | Yes      | Base URL of the tickify-server API              |
| `NEXT_PUBLIC_TMDB_PATH`           | Yes      | TMDB image CDN base path                        |
| `NEXT_PUBLIC_APIKEY`              | Yes      | Firebase project API key                        |
| `NEXT_PUBLIC_AUTHDOMAIN`          | Yes      | Firebase auth domain                            |
| `NEXT_PUBLIC_PROJECTID`           | Yes      | Firebase project ID                             |
| `NEXT_PUBLIC_STORAGEBUCKET`       | Yes      | Firebase storage bucket                         |
| `NEXT_PUBLIC_MESSAGINGSENDERID`   | Yes      | Firebase messaging sender ID                    |
| `NEXT_PUBLIC_APPID`               | Yes      | Firebase app ID                                 |
| `NEXT_PUBLIC_DEMO_USER_EMAIL`     | Optional | Pre-filled email for demo user login button     |
| `NEXT_PUBLIC_DEMO_USER_PASSWORD`  | Optional | Pre-filled password for demo user login button  |
| `NEXT_PUBLIC_DEMO_ADMIN_EMAIL`    | Optional | Pre-filled email for demo admin login button    |
| `NEXT_PUBLIC_DEMO_ADMIN_PASSWORD` | Optional | Pre-filled password for demo admin login button |

---

## Auth Flow

```
1. User signs in via Firebase (email/password or Google)
2. Firebase ID token is sent to POST /api/v1/auth/jwt
3. Server returns an access token + sets refresh token as HttpOnly cookie
4. Access token is stored in Zustand (authStore) and attached to axiosSecure
5. On 401, axiosSecure automatically calls /auth/refresh-access-token
```

---

## State Management

| Store          | Purpose                                                            |
| -------------- | ------------------------------------------------------------------ |
| `authStore`    | Current user info, auth status, admin flag                         |
| `bookingStore` | In-progress booking data passed between showtime → seat → checkout |

---

## License

MIT
