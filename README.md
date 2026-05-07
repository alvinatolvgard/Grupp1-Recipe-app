# CodeCuisine 🍳

CodeCuisine är en React-applikation för att utforska, söka efter och spara recept. Användare kan bläddra genom recept efter kategorier, söka efter specifika rätter, och spara sina favoriter.

## Projektbeskrivning

CodeCuisine är en recept-app byggd med React och Vite som ett grupparbete för kursen JavaScript 2. Applikationen hämtar receptdata från **TheMealDB API** och ger användare möjlighet att:

- Bläddra genom recept efter kategori (Frukost, Dessert, Vegetarisk, Vegan)
- Söka efter recept efter namn eller ingrediens
- Visa detaljerad receptinformation med ingredienser och instruktioner
- Spara favoriter
- Se ett featured recept på startsidan

## Innehållsförteckning

- [Uppfyllda Krav](#-uppfyllda-krav)
- [Installation & Körning](#-installation--körning)
- [Projektstruktur](#-projektstruktur)
- [Tools](#-tools)
- [Features](#-features)
- [Gruppmedlemmar](#-gruppmedlemmar)
- [Lärdomar & Utmaningar](#-lärdomar--utmaningar)
- [Anteckningar](#-anteckningar)
- [Resurser](#-resurser)

## Uppfyllda Krav

### För Godkänt (G)

- [x] Vite + React med JavaScript
- [x] 5+ komponenter (Header, RecipeCard, Footer, Toast, ScrollToTopButton, etc.)
- [x] Props för datakommunikation mellan komponenter
- [x] `useState` för lokal state
- [x] Extern API (TheMealDB) med `fetch`
- [x] Loading state visas medan data hämtas
- [x] Error handling för API-fel
- [x] React Router med 5 routes (/, /recipe/:id, /favourites, /login, /profile)
- [x] Zustand för global state (favoriter, autentisering, sökning)
- [x] Formulär med controlled components (login, search, create recipe)
- [x] Konsekvent kodformatering
- [x] Git med commits från alla gruppmedlemmar
- [x] README med instruktioner

### För Väl Godkänt (VG)

- [x] Genomtänkt mappstruktur (components/, pages/, stores/, api/, utilities/)
- [x] Components med tydligt ansvar (separerade i folders)
- [x] Flera Zustand stores (useAuthStore, useFavoritesStore, useSearchStore)
- [x] URL-parametrar (`/recipe/:id`)
- [x] ProtectedRoute för autentisering
- [x] Edge cases hanteras (tom favorit-lista, ogiltiga IDs, etc.)
- [x] Kvalitetskod: prevent re-renders, DRY-princip, tydliga namngivningar

## Installation & Körning

### Förutsättningar

- Node.js 16+ och npm installerat

### Setup

```bash
# 1. Klona repot (eller download)
git clone <https://github.com/alvinatolvgard/Grupp1-Recipe-app.git>
cd Grupp1-Recipe-app

# 2. Installera dependencies
npm install

# 3. Starta utvecklingsservern
npm run dev

# Öppna http://localhost:5173 i din webbläsare
```

### Build för produktion

```bash
npm run build
npm run preview
```

## Projektstruktur

```
src/
├── pages/                 # Fullsida-komponenter
│   ├── LandingPage.jsx   # Startsida med recept och sökning
│   ├── RecipeDetailPage.jsx  # Detaljerad receptsida
│   ├── Favourites.jsx    # Favoritsida
│   ├── LoginPage.jsx     # Inloggningssida
│   └── ProfilePage.jsx   # Profilsida för inloggade
│
├── components/           # Återanvändbara komponenter
│   ├── Header/          # Navigation och sökning
│   ├── RecipeCard/      # Receptkort med favorit-toggle
│   ├── Footer/          # Footer
│   ├── Toast/           # Notismeddelanden
│   ├── SearchBar.jsx    # Sökfält
│   ├── ScrollToTopButton.jsx  # Scroll-to-top knapp
│   └── ProtectedRoute.jsx     # Route-skydd för inloggade
│
├── stores/              # Zustand state management
│   ├── useAuthStore.js        # Inloggning och användare
│   ├── useFavoritesStore.js   # Favoriter med toast
│   └── useSearchStore.js      # Sökning och filtrering
│
├── api/
│   └── mealdb.js       # TheMealDB API-hooks
│
├── utilities/          # Hjälpfunktioner
│   ├── getDifficulty.js       # Beräkna svårighetsgrad
│   └── searchHelpers.js       # Söklogik
│
├── App.jsx            # Root-komponent med routes
├── index.css          # Globala stilar och CSS-variabler
└── main.jsx           # Entry point
```

## Tools

- **React 19** - UI-bibliotek
- **Vite** - Build tool och dev server
- **React Router v7** - Client-side routing
- **Zustand** - State management
- **TheMealDB API** - Receptdata
- **CSS** - Styling med CSS-variabler
- **Lucide React** - SVG-ikoner
- **ESLint** - Kodkvalitet

## Features

### Användarfunktioner

- **Sökning** - Sök efter recept efter namn eller ingrediens
- **Kategorifilter** - Filtrera efter Frukost, Dessert, Vegetarisk, Vegan
- **Favoriter** - Spara dina favoritrecept
- **Autentisering** - Enkel inloggning (mock-implementation)
- **Responsiv design** - Fungerar på mobil, tablet och desktop
- **Scroll-to-top** - Knapp för snabb scrolling tillbaks upp
- **Egna recept** - Skapa egna recept från profilsidan
- **Recept-detaljer** - Visa ingredienser, instruktioner, näringsvärde
- **Skriv ut recept** - Skriv ut receptet direkt
- **Dela recept** - Kopiera länk eller dela direkt

### Utvecklarfunktioner

- Loading states under API-anrop
- Error handling med användarmeddelanden
- Toast-notiseringar för användaråtgärder
- ProtectedRoute för säkra sidor
- Debouncing på sökning
- localStorage för att spara autentisering och favoriter

## Gruppmedlemmar

- **Ivana** - Favoriter, Header, Root CSS, Toasts, Figma design
- **Sanel** - Autentisering, RecipeCard, ProtectedRoute, LoginPage
- **Maryam** - Stores (Zustand), RecipeDetailPage, API-integration
- **Alvina** - Sökning, SearchBar, Utilities, ScrollToTopButton
- **Albrim** - About, Footer

_Alla medlemmar har bidragit med commits och kodgranskning._

## Lärdomar & Utmaningar

### Det som gick bra

- Zustand gjorde global state management enkel
- Arbetuppdelningen mellan komponenter var effektiv
- API-integreringen gick smidigt med bra error-hantering
- Responsiv design implementerades utan större problem

### Utmaningar

- [Här får vi fylla på senare!]

### Framtida Förbättringar

- [ ] Lägg till användarprofiler med personliga recept
- [ ] Lägg till recept-rekommendationer baserat på favoriter
- [ ] Lägg till print-stylesheet för bättre utskrift
- [ ] Implementera recept-favoriter synchronisering med backend

## Anteckningar

- Denna app använder mock-inloggning (localStorage). I produktion skulle detta behöva en riktig backend.
- TheMealDB API är gratis men har rate limits, alltså i stor skala skulle caching behövas.
- Favoriter sparas i localStorage per webbläsare, de synkroniseras inte mellan enheter.

## Resurser

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [React Router](https://reactrouter.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [TheMealDB API](https://www.themealdb.com/api.php)
- [Lucide React Icons](https://lucide.dev)
- [ESLint](https://eslint.org)
- [GitHub](https://github.com/alvinatolvgard/Grupp1-Recipe-app) för versionskontroll och samarbete
- [Figma](https://www.figma.com/design/ZdIJoOtGjNzzF8KR4nZfHF/Recipe-App?node-id=0-1&t=9sOltb3FTmfbQuad-1) för designskisser

---

**Projekt slutfört:** [2026-05-14]
