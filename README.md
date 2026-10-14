# HULKs Website

Alle Inhalte (Team, Publikationen, Sponsoren, Events, Presse …) liegen als JSON in `src/data/`. Um Inhalte zu ändern, muss kein Code angepasst werden.

## Installation

Voraussetzung: Node.js 22 oder neuer (<https://nodejs.org/>).

```bash
git clone https://github.com/HULKs/hulks.github.io.git
cd hulks.github.io
npm ci
npm run dev
```

Danach die Seite unter <http://localhost:5173> im Browser öffnen.

Für einen Produktions-Build: `npm run build` (Ergebnis liegt in `dist/`). Mit `npm run preview` lässt sich der Build lokal testen.

## Die Daten-JSONs

Alle Inhalte werden aus den Dateien in `src/data/` geladen.

**`site.json`** — Grunddaten der Seite: Teamname, Beschreibung, Gründungsjahr, Adresse, Kontakt-E-Mails, Social-Media-Links, Statistiken für die Startseite, „Über uns“-Text, YouTube-Video, Navigation.

**`team.json`** — Das aktuelle Team, gruppiert nach Rolle (Vorstand, Leads, Team). Pro Person: Name, Rolle, Studiengang, E-Mail, GitHub-Handle und Avatar-Bild.

**`team-history.json`** — Chronik vergangener Saisons mit Gruppenfoto und Mitgliedern pro Jahr. Wird auf der Team-Seite unterhalb des aktuellen Teams angezeigt.

**`code.json`** — Inhalte der Code-Seite: Einleitungstext, GitHub-Organisation, hervorgehobene Repositories

**`meet.json`** — Informationen für neue Teammitglieder, Telegram-Bootcamp, GitHub-Projektboard und RoboCup-Aftermovies.

**`publications.json`** — Publikationsliste, geordnet nach Kategorien (Papers, Peer-Reviewed, White Papers, Theses …). Pro Eintrag: Titel, Autoren, optional Jahr und Link zur PDF (aus `public/publications/`).

**`events.json`** — Events und Wettbewerbe, die auf der Startseite als Karten erscheinen. Pro Event: Titel, Ort, Datum, Tags, kurze Beschreibung, Bild und optional ein Erfolgs-Highlight.

**`sponsors.json`** — Sponsoren der Seite `/sponsors`, gruppiert nach Stufen (Industry Partners, Supporters, Academic). Pro Sponsor: Name, Website, Logo (aus `public/sponsors/`) und optional eine Beschreibung.

**`press.json`** — Inhalte der Presse-Seite: Einleitung, Presse-Kontakt, Logo-Downloads (SVG/PDF/PNG) und der Pressespiegel mit Datum, Quelle, Titel und Link zum Artikel.

## Inhalte pflegen

1. Passende JSON-Datei in `src/data/` öffnen und bearbeiten.
2. Bilder und PDFs in den passenden Unterordner von `public/` legen:
   - Team-Fotos → `public/team/members/` bzw. `public/team/groups/`
   - Sponsoren-Logos → `public/sponsors/`
   - Logos → `public/logos/`
   - Publikations-PDFs → `public/publications/`
3. Im JSON den Pfad absolut zum Web-Root angeben, z. B. `/team/members/max.jpg`.

Solange `npm run dev` läuft, sind Änderungen dank Hot Reload sofort im Browser sichtbar.

## Veröffentlichung auf hulks.de

Das Repository `HULKs/hulks.github.io` veröffentlicht die Seite über GitHub Pages. Jeder Push auf `main` startet `.github/workflows/deploy.yml`: Abhängigkeiten installieren, Vite bauen, lokale Bild- und PDF-Verweise prüfen und `dist/` im bestehenden Environment `github-pages` veröffentlichen. Pull Requests prüfen den Build, ohne zu veröffentlichen. Der Workflow kann auch manuell gestartet werden.

Die Domain bleibt über die GitHub-Pages-Einstellungen und `public/CNAME` auf `hulks.de` konfiguriert. Das ursprüngliche Jekyll-Deployment wird durch den Vite-Workflow ersetzt.

`scripts/build-pages.mjs` erstellt HTML-Einstiegspunkte für alle Seiten und frühere Team-URLs, damit direkte Aufrufe bei GitHub Pages funktionieren. Team-Saisons sind über `/team?season=2026` verlinkbar; ältere URLs wie `/team/team2026.html` öffnen automatisch die passende Saison. Nicht vorhandene Seiten verwenden die Vue-404-Seite.

`legacy-assets.json` ordnet die ursprünglichen `/_files/`-Downloads den Dateien unter `public/` zu. Vorhandene historische Asset-Ordner im Repository (`_photos`, `_style`, `_fonts`, `_js`) werden ebenfalls in den Build übernommen. Die alten Quellen bleiben für diese Links und als Archiv erhalten; die aktuellen Inhalte werden ausschließlich unter `src/data/` gepflegt.
