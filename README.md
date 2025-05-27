# Ghibli Café PWA

A Progressive Web App for a café business with Studio Ghibli-inspired design. The app includes features for customers to top up their balance, use loyalty cards, place orders, and for staff to manage orders and scan QR codes.

## Features

- User authentication system
- Balance top-up functionality with SumUp payment integration
- Loyalty card system with QR code scanning
- Order management system
- Admin interface for managing orders, menu, and scanning QR codes
- Push notifications for order status updates
- Beautiful Studio Ghibli-inspired design
- Offline functionality
- Installable as a PWA

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- NextAuth.js for authentication
- SumUp API for payments
- PWA features (Service Worker, Web App Manifest)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ghibli-cafe.git
   cd ghibli-cafe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your environment variables:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   SUMUP_API_KEY=your-sumup-api-key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── admin/          # Admin pages
│   └── (routes)/       # Customer-facing pages
├── components/         # React components
├── styles/            # Global styles
├── lib/               # Utility functions
└── types/             # TypeScript type definitions
```

## Development

### Adding New Features

1. Create new components in `src/components/`
2. Add new pages in `src/app/`
3. Create API routes in `src/app/api/`
4. Update types in `src/types/`

### Styling

The app uses Tailwind CSS with custom Ghibli-inspired colors and components. Global styles are defined in `src/styles/globals.css`.

### Testing

Run tests with:
```bash
npm test
```

### Building for Production

```bash
npm run build
```

## Deployment

1. Build the production version:
   ```bash
   npm run build
   ```

2. Deploy to your hosting service (e.g., Vercel, Netlify)

3. Verify PWA functionality using Lighthouse in Chrome DevTools

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Studio Ghibli for design inspiration
- Next.js team for the amazing framework
- Tailwind CSS team for the utility-first CSS framework
