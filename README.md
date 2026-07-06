# RiCoDeKu.github.io

This is Riku Yamaguchi's personal website. It is built as a static site for GitHub Pages.

## Pages

- `index.html`: Japanese homepage
- `index-en.html`: English homepage

## Features

- Profile, activities, research, and contact information
- Language switching between Japanese and English
- Lazy loading for research slides
  - PowerPoint `iframe` elements are not loaded on the initial page load.
  - Slides are loaded only after the user clicks the load button.
  - A loading indicator is shown while each slide is loading.

## Files

```text
.
├── index.html
├── index-en.html
├── index.js
├── fonts/
│   ├── NotoSansJP-VariableFont_wght.ttf
│   ├── Roboto-Italic-VariableFont_wdth,wght.ttf
│   └── Roboto-VariableFont_wdth,wght.ttf
└── src/
    ├── favicon.ico
    └── selfie.png
```

## Notes

- Styling uses the Tailwind CSS CDN and inline CSS in `index.html` / `index-en.html`.
- JavaScript is kept in `index.js`.
- Slide loading text switches between Japanese and English based on the HTML `lang` attribute.
