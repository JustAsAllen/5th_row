# Tool Profiles (S1/S11)

Strong/weak/pairs/fallback for each capability class, used by the router.

## Browser automation (three, choose by job)
| Tool | Best for | Fallback |
|---|---|---|
| chrome-devtools | performance traces, lighthouse, heapsnapshot, network+console, screenshots | playwright |
| playwright | snapshot-driven UI/flows, forms, cross-viewport, wait/text assertions | chrome-devtools |
| puppeteer | scripted navigation/screenshots via selector map | chrome-devtools |

If the first browser MCP fails or returns e.g. a 409 on the same payload, DO
NOT blindly resend identical calls — switch tools or reconcile the request ID.

## Web research
| Tool | When | Fallback |
|---|---|---|
| context7 | library/framework docs (always prefer for APIs) | websearch → official docs |
| firecrawl search | current web, fav search engine operators | websearch |
| firecrawl scrape | one known page, structured extract | webfetch |
| firecrawl crawl/map | whole site inventory | sequential scraps |
| firecrawl agent | answer spans many sites / unknown URLs | search+scrape |
| firecrawl research | papers (PubMed/arXiv), biomedical | websearch research |
| webfetch | single URL, markdown/text/html | firecrawl scrape |
| websearch | fast current-info | firecrawl search |

Rule: for library API questions ALWAYS context7 before anything else.
For structured data across many entities, check Alexandria providers before
repeated scraping.

## Filesystem
- Within workspace: native read/edit/write/glob/grep.
- Outside workspace (Desktop/Downloads/OneDrive...): `filesystem` MCP
  (root: `C:\Users\Allen Saji`) or the `bash` tool.
- Backups of important configs: always copy before destructive edits.

## GitHub
- `gh` CLI via bash for repo/auth/PR/issue management. `gh repo delete`,
  `gh auth refresh -h github.com -s delete_repo`, etc.
- Never commit/push/delete without explicit user authorization.

## Data & docs
- Supabase work: `supabase-backend` skill + browser (SQL editor) if needed.
- Rive: `rive-animation` skill. Premium UI: `ui-ux-premium`. Cloning:
  `website-cloner`. Client work: `client-project`.

## No-op / don't do
- Start a new MCP server just because it sounds useful. Reuse first.
- Hammer a failing provider with identical retries.