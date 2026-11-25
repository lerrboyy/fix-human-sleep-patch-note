# Fix Human Sleep: Funniest Patch Note

[![make.fun](https://make.fun/badge/u-yuki-kato-fix-human-sleep-funniest-patch-note-f6ad4c27.svg)](https://make.fun/bounty/u-yuki-kato-fix-human-sleep-funniest-patch-note-f6ad4c27)
[![rank](https://make.fun/badge/u-yuki-kato-fix-human-sleep-funniest-patch-note-f6ad4c27/lerrboyy/fix-human-sleep-patch-note/rank.svg)](https://make.fun/bounty/u-yuki-kato-fix-human-sleep-funniest-patch-note-f6ad4c27)
[![reward](https://make.fun/badge/u-yuki-kato-fix-human-sleep-funniest-patch-note-f6ad4c27/lerrboyy/fix-human-sleep-patch-note/reward.svg)](https://make.fun/bounty/u-yuki-kato-fix-human-sleep-funniest-patch-note-f6ad4c27)

One line of patch notes announcing that human sleep has been fixed — funny enough to make a reader laugh, plausible enough to sit in a real changelog. Entry for the [make.fun bounty](https://make.fun/bounty/u-yuki-kato-fix-human-sleep-funniest-patch-note-f6ad4c27).

## The entry

> Fixed a bug where the brain kept 47 tabs open overnight; background tabs now close automatically so sleep can load.

115 characters, one line, no trailing newline.

## Why this line

A racing mind at 2 a.m. feels exactly like a browser with too many tabs open — so the fix is a concrete mechanism (background tabs auto-close at bedtime) instead of a flat claim that sleep works now. The number 47 makes it read like a real bug report, "so sleep can load" treats sleep as a program that can finally start, and the whole thing is phrased the way a real changelog line would be: terse, confident, "Fixed a bug where…".

## How it works

`main.ts` writes the line to `/output/entry.txt`, then reads the file back and re-verifies it against the gate: UTF-8, 1–160 characters, a single line, no leading or trailing whitespace, and the only file left in the output directory.

```sh
node main.ts
```
