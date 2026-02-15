# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static personal website for ryanross.dev, hosted on GitHub Pages. No build step, no framework — just plain HTML, CSS, and vanilla JS.

## Architecture

- `index.html` — Single-page site with inline `<script>` for a typewriter animation
- `style.css` — All styling, uses CSS custom properties defined in `:root`
- `gol.js` — Conway's Game of Life background animation (ambient canvas behind content)
- `CNAME` — GitHub Pages custom domain (`ryanross.dev`)

## Development

Open `index.html` directly in a browser or use any local server (e.g., `python3 -m http.server`). There is no build, lint, or test tooling.

## Design Conventions

- Monospace font stack (`--font-mono`)
- Dark theme with cyan accent (`--color-accent: #22d3ee`)
- Minimal, terminal-inspired aesthetic
