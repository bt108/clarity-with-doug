# Public-release plan — DO NOT force-push without owner sign-off

> ⚠️ **WARNING: the working tree is sanitized, but git history is NOT.**
> All ~203 commits on `main` still contain the pre-sanitization secrets (PayPal production
> client-ID, two Web3Forms keys, GTM container ID) plus client PII (phone, email) and
> bot-template ancestry. **Force-push + key rotation are REQUIRED before flipping the repo
> to public.** Making it public first would publish live keys to the open internet.

Status of local work (no push, no rename, no visibility change performed):

- Working tree: secrets moved to `PUBLIC_*` env vars, `.env.example` added, docs scrubbed.
- History: untouched (rewrite commands below are staged, NOT executed).
- Remote: untouched.

## 1. What must happen before "public"

1. **Rotate the keys** (history retains them forever until rewritten AND rotated):
   - [ ] PayPal production client-ID → regenerate/restrict in PayPal dashboard
   - [ ] Web3Forms checkout key (`128e…`) → regenerate in Web3Forms dashboard
   - [ ] Web3Forms contact key (`9a8b…`) → regenerate in Web3Forms dashboard
   - [ ] Review GTM container (`GTM-KGV8PCBP` in code; `GTM-KRWLBFDN` in old doc) — confirm which is live, restrict access
   - [ ] Redeploy live site with the NEW keys via CI/host env
2. **Rewrite history** (Option A recommended), then **force-push** with owner confirmation.
3. **Verify** post-push: fresh clone, grep for old secrets (commands below), confirm live site still builds.
4. Only then flip GitHub repo visibility to public.

## 2. Recommended strategy: Option A — single squashed export (simplest, safest)

Bot-template ancestry (first commit `929a9a4 template: tanstack_start_ts` by
`gpt-engineer-app[bot]`, ~62 bot commits) + vague `Changes` commits add no portfolio value
and maximize scrub risk. Export a clean snapshot instead of filtering 203 commits:

```bash
cd /tmp/opencode/portfolio/Clarity-with-Doug
git status                    # must be clean; commit or stash local sanitization work first
git checkout main && git pull

# 1) Create the public repo content from a clean snapshot (preserves untracked-ignored safety)
git archive main | mkdir -p /tmp/clarity-with-doug-public && tar -x -C /tmp/clarity-with-doug-public

cd /tmp/clarity-with-doug-public
git init -b main
git add .
git commit -m "Initial public release

Portfolio snapshot of a sold client build (claritywithdoug.com):
Astro 6 + Tailwind v4 static site with PayPal checkout, Web3Forms
contact flows, and GTM analytics wiring. Secrets via env (see
.env.example). Full private history retained separately by owner."

# 2) Point at the (renamed) public remote and push
git remote add origin <new-public-remote-url>
git push -u origin main
```

Keep the existing private repo archived (owner-only) as the full-history record. No force-push needed under this option.

## 3. Alternative: Option B — filter + keep history (only if linear history matters)

Use `git filter-repo` (preferred; `filter-branch` is deprecated). **BFG** cannot easily do
multi-string content replacement across arbitrary file types — prefer filter-repo.

```bash
# ONE-TIME setup
pip install git-filter-repo   # or: brew install git-filter-repo
cd /tmp/opencode/portfolio/Clarity-with-Doug
git checkout main && git pull
cp -r . /tmp/cwd-backup-$(date +%F)   # full working-tree backup

# 1) Dry run on a CLONE first — never on the only copy
git clone . /tmp/cwd-filter-test && cd /tmp/cwd-filter-test

# 2) Write literal replacements (one `literal:replacement` per line)
# NOTE: full original values intentionally NOT pasted here — reconstruct them
# from the private-repo history / secrets manager when you run this.
cat > /tmp/replacements.txt <<'EOF'
BAAbvqoS<full-paypal-prod-client-id-remainder>==>PUBLIC_PAYPAL_CLIENT_ID_REDACTED
<full-checkout-key>==>WEB3FORMS_CHECKOUT_KEY_REDACTED
<full-contact-key>==>WEB3FORMS_CONTACT_KEY_REDACTED
<full-dev-checkout-key>==>WEB3FORMS_DEV_PLACEHOLDER_REDACTED
<full-dev-contact-key>==>WEB3FORMS_DEV_PLACEHOLDER_REDACTED
GTM-KGV8PCBP==>GTM-XXXXXXX
GTM-KRWLBFDN==>GTM-XXXXXXX
17273089422==>PHONE_REDACTED
727-308-9422==>PHONE_REDACTED
contact@claritywithdoug.com==>EMAIL_REDACTED
EOF

git filter-repo --replace-text /tmp/replacements.txt --force

# 3) Collapse bot-template noise: squash everything before the Astro rebuild
#    (inspect first: git log --oneline --reverse | head -80)
#    Example — soft-reset to the first human Astro commit, then recommit:
# git reset --soft <first-good-commit-sha>
# git commit -m "Initial public release (history squashed; secrets scrubbed)"

# 4) Verify in the test clone
git log --oneline | wc -l
git grep -n "BAAbvqoS\|128e7720\|9a8b0d2d\|GTM-KGV8PCBP\|GTM-KRWLBFDN\|17273089422\|contact@claritywithdoug" $(git rev-list --all) -- | head
# ^ must print NOTHING. Also scan all blobs:
git rev-list --all | xargs git grep -l "BAAbvqoS" -- | head   # expect no output

# 5) ONLY with explicit owner confirmation, push from the REAL repo (repeat filter there first):
# cd /tmp/opencode/portfolio/Clarity-with-Doug
# git filter-repo --replace-text /tmp/replacements.txt --force
# git remote -v          # triple-check remote + branch
# git push --force --all && git push --force --tags
```

Post-force-push checklist:

- [ ] Every collaborator re-clones (old clones contain secrets + divergent history).
- [ ] Re-create GitHub releases/tags if any (rewritten SHAs invalidate them).
- [ ] Confirm FTP deploy secret set still works; redeploy with rotated keys.
- [ ] Fresh-clone grep (see verification below) returns zero hits.

## 4. Key-rotation checklist (owner must do — scrubbing ≠ revoking)

| Secret | Where to rotate | Done? |
|---|---|---|
| PayPal prod client-ID (`BAAb…`) | PayPal dashboard → app credentials → regenerate; update CI/host env `PUBLIC_PAYPAL_CLIENT_ID` | [ ] |
| Web3Forms checkout key (`128e…`) | Web3Forms dashboard → regenerate; update `PUBLIC_WEB3FORMS_CHECKOUT_KEY` | [ ] |
| Web3Forms contact key (`9a8b…`) | Web3Forms dashboard → regenerate; update `PUBLIC_WEB3FORMS_CONTACT_KEY` | [ ] |
| GTM container | Confirm live ID, audit user access, update `PUBLIC_GTM_ID` | [ ] |

Secrets in git history are compromised the moment the repo goes public — rotation is
non-negotiable even after a perfect scrub (forks/caches may retain old SHAs).

## 5. Rename + description proposal (NOT executed — owner confirms in GitHub UI)

- Rename: `Clarity-with-Doug` → **`clarity-with-doug`** (lowercase convention; matches `package.json` name).
- One-line description: **`Sold client build — Astro + Tailwind static site with PayPal checkout for claritywithdoug.com`**
- Local remotes unchanged; after GitHub rename, collaborators run:
  `git remote set-url origin <new-url>`.

## 6. Verification commands (run after any rewrite, before going public)

```bash
cd /tmp/opencode/portfolio/Clarity-with-Doug
bun run build   # must pass
git grep -n "BAAbvqoS\|128e7720\|9a8b0d2d\|GTM-KGV8PCBP\|GTM-KRWLBFDN" -- . ':!docs/public-release-plan.md' ':!bun.lockb'
git rev-list --all | xargs git grep -l "BAAbvqoS\|128e7720\|9a8b0d2d" -- | head
```
