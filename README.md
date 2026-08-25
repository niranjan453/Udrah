# UDRAH — Website (Node / React)

A Vite + React + React Router rebuild of the UDRAH site: Home, Product, Smart Air,
About Us, and Reserve / Be The Member, sharing one design system.

## Run it

```bash
npm install
npm run dev       # local dev server, usually http://localhost:5173
```

## Build for production

```bash
npm run build      # outputs static files to dist/
npm run preview    # preview the production build locally
```

`dist/` is a fully static bundle — deploy it anywhere that serves static files
(Vercel, Netlify, S3 + CloudFront, GitHub Pages, etc). No backend is required;
the Reserve page's form is front-end only and doesn't submit anywhere yet.

## Structure

```
src/
  main.jsx            # React root, router setup
  App.jsx             # routes
  index.css           # full design system (colors, type, buttons, nav, etc.)
  components/
    Nav.jsx            # floating nav, scroll-to-glass state, mobile menu
    Footer.jsx
    Flowline.jsx        # signature animated air/oxygen divider
    Reveal.jsx           # scroll-reveal wrapper (IntersectionObserver)
  pages/
    Home.jsx
    Product.jsx
    SmartAir.jsx
    About.jsx
    Reserve.jsx          # waitlist form (client-side only)
```

## Adding video

Hero and Product-intro video slots are commented out in `Home.jsx` / ready to
add in `Product.jsx`. Drop files into `public/assets/` and uncomment the
`<video>` tags, pointing `src` at `/assets/your-file.mp4`.

## Adding the 3D purifier later

Not implemented yet, per the design brief. When ready, `three` + `@react-three/fiber`
drop in cleanly alongside this component structure — happy to wire it into the
Product page on request.
