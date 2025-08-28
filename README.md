# Eltuhami Project - Next.js

This is a Next.js project that recreates the design interface you provided, featuring a video player in the center.

## Features

- ✅ Black background with elegant layout
- ✅ Header with "eltuhami" and "FT. AbabilSec"
- ✅ Hamburger menu icon
- ✅ Arabic text "أتهوم" in the center
- ✅ Interactive video player component
- ✅ "Alight Motion ×" footer
- ✅ Responsive design for mobile and desktop
- ✅ Smooth hover effects and transitions

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd eltuhami-project
```

2. Install dependencies:
```bash
npm install
```

3. Add your video file:
   - Place your video file in the `public` folder
   - Name it `sample-video.mp4` or update the `src` prop in the VideoPlayer component
   - Supported formats: MP4, WebM, OGG

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Video Player Features

- Click to play/pause
- Hover to show controls
- Muted by default (click to unmute)
- Loop playback
- Responsive sizing
- Custom play/pause overlay

## Customization

### Adding Your Video
1. Place your video file in the `public` folder
2. Update the `src` prop in `src/app/page.tsx`:
```tsx
<VideoPlayer 
  className="w-full h-60 sm:h-72 md:h-80"
  src="/your-video-name.mp4"
  poster="/your-poster-image.jpg"
/>
```

### Styling
- Main styles are in `src/app/globals.css`
- Component styles use Tailwind CSS classes
- Arabic text styling is handled with the `.arabic-text` class

## Project Structure

```
eltuhami-project/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       └── VideoPlayer.tsx
├── public/
│   └── sample-video.mp4 (add your video here)
└── README.md
```

## Technologies Used

- Next.js 15.5.2
- React 18
- TypeScript
- Tailwind CSS
- Custom video player component

## Deployment

To build for production:

```bash
npm run build
npm start
```

Or deploy to Vercel, Netlify, or any other hosting platform that supports Next.js.

## Notes

- The video component is fully responsive
- Arabic text is properly styled with RTL support
- All hover effects and transitions are smooth
- The design matches the original image layout
- Video controls appear on hover and when paused
