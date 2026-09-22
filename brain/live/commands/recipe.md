---
description: RECIPE. Run a named automation recipe (see brain/recipes/index.md). E.g. /recipe new-next-app, /recipe auth-setup, /recipe responsive-audit, /recipe dependency-upgrade, /recipe refactor-module, /recipe landing-upgrade.
agent: build
---

Recipe: $ARGUMENTS

Load the recipe index (brain/recipes/index.md) + workflow-recipes skill.
The first token names the recipe; the rest are its inputs. Resolve its pipeline,
follow it with the project's conventions, verify per the S37 gate
(IMPLEMENTED/TESTED/VERIFIED/KNOWN LIMITATIONS), and note `$ARGUMENTS` scope
in the change plan. If the recipe doesn't exist, design the minimal workflow
from existing tools instead.