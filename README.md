# One-Tap Tracker

One-Tap Tracker is an Obsidian plugin for quickly logging user-defined events and reviewing them later with simple aggregate views. It is designed around fast mobile input, while keeping the recorded data accessible inside the vault.

## Current Scope

- Dedicated tracker tab for fast event logging
- GUI-based event creation, editing, and deletion
- Optional memo input per event type
- Aggregate views for hourly, daily, weekly, and monthly counts
- Bar chart and list views for the selected aggregation unit
- Shared event definitions through a vault settings file
- Record storage in a vault file at `OneTapTracker/records.csv.md`
- Automatic reload when `settings.json.md` or `records.csv.md` is edited in the vault

## Aggregation Modes

- Daily: `30 days` or `All time`
- Weekly: `7 weeks` or `All time`
- Monthly: `12 months` or `All time`
- Hourly: `24 hours` or `All time`

## File Layout

- [manifest.json](manifest.json): Obsidian plugin manifest
- [main.js](main.js): Plugin implementation
- [styles.css](styles.css): UI styles
- [docs/mvp-spec.md](docs/mvp-spec.md): MVP specification
- [docs/technical-design.md](docs/technical-design.md): Technical design notes

## Data Storage

- Event definitions and the currently selected event are stored in the vault at `OneTapTracker/settings.json.md`
- Event records are stored in the vault at `OneTapTracker/records.csv.md`

### Migrating from Pebble Tracker

This plugin was previously named Pebble Tracker (plugin id `pebble-tracker`). On first load, if a `PebbleTracker/` folder exists in the vault and `OneTapTracker/` does not, the folder is renamed to `OneTapTracker/` automatically. If both folders exist, nothing is moved and `OneTapTracker/` is used.

Because the plugin id changed to `one-tap-tracker`, Obsidian treats it as a new plugin. Install One-Tap Tracker, then disable and remove the old Pebble Tracker plugin.

CSV header:

```csv
id,eventTypeId,timestamp,memo
```

The file uses a `.md` suffix so it stays visible and openable in Obsidian's file tree, while the content itself remains CSV-formatted.

## Usage

1. Enable the plugin in Obsidian Community Plugins
2. Open `One-Tap Tracker` from the left ribbon or the `Open One-Tap Tracker` command
3. Create one or more event types
4. Select an event, optionally add a memo, and tap the record button
5. Switch to the stats view to inspect hourly, daily, weekly, or monthly aggregates

## Installation

### Install with BRAT

1. Install the `BRAT` plugin from Obsidian Community Plugins
2. Open `BRAT` settings
3. Choose `Add Beta plugin`
4. Enter `https://github.com/lighty/one-tap-tracker`
5. Install and enable `One-Tap Tracker`

BRAT expects this repository to publish GitHub Releases. If installation fails, make sure you are using a released version instead of an unreleased commit.

### Manual install

Copy these files into your vault at `.obsidian/plugins/one-tap-tracker/`:

- `manifest.json`
- `main.js`
- `styles.css`

## Releases

This repository publishes GitHub Releases for BRAT and future Community Plugins distribution. Each release includes these assets:

- `manifest.json`
- `main.js`
- `styles.css`

## Local Check

There is no build pipeline yet. Run the syntax check and the automated tests with:

```bash
npm run check
npm test
```

Tests use the built-in Node.js test runner (`node --test`) and live in `tests/`.
