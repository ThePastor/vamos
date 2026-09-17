# Vamos

Learn **Spanish, French or Japanese** from the first word to reading a novel in the original — six levels, a verb trainer, six games and a house full of companions you raise as you go. It installs to a phone and works with no connection.

**Live app:** https://thepastor.github.io/vamos/

---

## What it does

Pick a language and start. There is nothing to sign up for until you have done a real amount of work.

- **Three languages, six levels each.** Spanish, French and Japanese, from the alphabet or the kana through to reading Camus, Kawabata and García Márquez in the original. Every level is open from the first second — nothing is locked behind a checkpoint, so you can look at level 5 before deciding whether the app is for you.
- **Each language keeps its own progress.** Your Spanish lessons, level and words stay Spanish; your XP, streak, coins and casita follow you between all three.
- **A placement test** if you already know some — it sets you down at the right level instead of making you start at the beginning.
- **Lessons, grammar and dialogues.** Explanations in plain English, examples that are read aloud, and conversations you work through line by line.
- **A verb trainer** that goes past tense: in Japanese it drills ている, たい, potential, passive and causative; in Spanish and French it covers the tenses and moods a course actually asks for. A verb with no form in a column says so rather than inventing one.
- **Spaced repetition** on every word and grammar point, so the things you keep missing come back and the things you know do not.
- **Speaking and listening.** Read a phrase aloud and the browser's own speech recogniser scores it; listen and type what you heard.
- **Six games** — Word Hunt, Mercado, Lotería, Crucigrama, Escucha y Escribe and the gender game — all paying XP into the same pot.
- **Twelve companions, four per language**, drawn from each language's own legends rather than its wildlife: a quetzal and a guardian of the milpa in Spanish, the gargouille of Rouen and an Alpine dwarf who skis on his own feet in French, a kitsune and the toad of the Jiraiya tales in Japanese. They grow through five stages on the XP you earn, and whoever you were raising in each language is waiting when you come back to it.
- **A casita** to spend coins on — outfits for your companions, furniture for the room, and chests that open on a daily streak.
- **Install it.** Tap Install in the top bar (on an iPhone: Share → Add to Home Screen) and Vamos sits on the home screen with its own icon, opens with no browser bar and works with no connection at all.
- **Light, dark, or match your device**, in three colour schemes, all behind the settings gear.

## The account

Everything above is free until **100 XP**, counted across every language and every game. At that point the app asks for a name, an email and a password, and everything you have earned up to then comes with you into the account.

The account is what lets you pick the app back up on another phone, or after clearing your browser, with your streak and your companions intact. The same name and password sign you in anywhere.

## Privacy

Below 100 XP **nothing is written to any server** — no row, no id, no record that you opened the link. Progress lives in your browser's own storage.

Once you make an account, what leaves your device is: your first name, the email address you gave, an identifier derived from your password (never the password itself), and your practice progress. It goes to a Supabase project **hosted in Canada**, owned by JohnsonXCorp, and is used to tell learners apart and to reach you about the app. It is not sold, not shared, and not added to any mailing list you did not ask for.

Clearing your browser's site data removes the local copy; the account copy stays until you ask for it to be removed.

## How it's built

One self-contained `index.html` — no build step to serve it, no dependencies to install, and no network calls except the web fonts and the progress sync. The companions, the icons and the share card are all inline SVG drawn for this app. A service worker keeps the last good copy of the page, so a new version going up never leaves you looking at an error.

Vamos and **Hablemos** are the same engine with different brand files: same lessons and mechanics, different cast, palette and languages.

Built by **Johnson[X]Corp**. The version and build date sit in the footer of every page, next to *What changed*.

## Licence — this is not open source

**Copyright © 2026 JohnsonXCorp. All rights reserved.**

The repository is public so the app can be served from GitHub Pages, and so anyone can check for themselves what the page does. It is **not** published for reuse.

You may use the app, install it, read the source, and keep your own progress. You may not republish it, rehost it, redistribute it, sell it, strip its notices, or build another product out of it.

- Full terms: **[LICENSE](LICENSE)**
- Terms of use for the live app: **[TERMS.md](TERMS.md)**
- Other people's code inside the build, and their licences: **[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)**

GitHub's own terms let any GitHub user fork a public repository. That is a licence to fork here, and nothing more — every restriction above still applies to a fork.

To ask for permission for anything the licence does not allow, open an issue.
