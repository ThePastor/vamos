# Third-party notices

This is a compliance document, not a formality. Everything below travels with any
copy of this software, including the copyright holder's own.

## Summary

**This application bundles no third-party code.** No framework, no library, no
polyfill. It is one HTML file of first-party JavaScript and CSS. The only
third-party material is typefaces.

That is unusual enough to be worth stating plainly, because it means there are no
inherited licence obligations on the code itself, and no dependency whose terms
could restrict how this software is licensed.

## Typefaces — SIL Open Font License 1.1

Three families are requested from Google Fonts when the application loads:

| Family | Used for | Licence |
|---|---|---|
| Bricolage Grotesque | headings, the wordmark, display type | SIL OFL 1.1 |
| Instrument Sans | body text | SIL OFL 1.1 |
| DM Mono | labels, statistics, small caps | SIL OFL 1.1 |

The OFL permits use, embedding, modification and redistribution. Its conditions are
that the fonts are not sold on their own, that this notice travels with any
redistributed font file, and that a modified font is not distributed under a
reserved font name.

**One font file is kept in the project's source tree** (not in this published repository, which contains only the built application), and therefore falls
squarely under that second condition:

- `source/pwa/wordmark-font.woff2` — Bricolage Grotesque, weight 800, Latin subset.
  It is embedded so the application's icons can be generated identically on any
  machine, with or without a network connection. It is a build-time input; it is not
  served to users.

The application icons are raster images derived from that typeface. Rendered
lettering is not itself a font file, so the OFL imposes no further obligation on
them, and the OFL explicitly permits this use.

Full licence text: <https://openfontlicense.org>
Upstream sources:
- <https://github.com/google/fonts/tree/main/ofl/bricolagegrotesque>
- <https://github.com/google/fonts/tree/main/ofl/instrumentsans>
- <https://github.com/google/fonts/tree/main/ofl/dmmono>

## Services used at runtime

These are services the application talks to. No code from them is included.

| Service | Role |
|---|---|
| Google Fonts | serves the three typefaces above |
| Supabase | the database behind accounts and progress sync, reached over its REST interface with no SDK |
| GitHub Pages | hosts the published application |
| The browser's Web Speech API | speech synthesis and recognition, provided by the browser itself |

What each of these receives is set out in TERMS.md.

## Build-time tools

Used to produce the application; not part of it and not distributed with it.

| Tool | Licence | Role |
|---|---|---|
| Playwright + Chromium | Apache-2.0 / BSD-3-Clause | renders the icon set from the wordmark |
| Node.js, Python 3, Perl, standard Unix tools | various permissive | the build scripts |

## If a dependency is ever added

Add it here before it ships, with its licence. Two things to watch:

- A **copyleft** dependency (GPL, AGPL, and to a lesser degree LGPL and MPL) can
  change what this software as a whole may be licensed as. That would conflict
  directly with the proprietary LICENSE in this repository.
- **Permissive** licences (MIT, Apache-2.0, BSD, ISC) are compatible with a
  proprietary application, but almost all of them require that their copyright and
  licence notice be reproduced in any distribution — which means listing it here,
  not merely installing it.

Last verified against the built application: 4 September 2026.
