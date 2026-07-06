# Assistable Pricing — Your Cheat Sheet

Everything here works on a Mac. Take it slow, one line at a time.

## FIRST TIME ONLY — get it live (do this once)

1. Open the Terminal app
   (press Cmd + Space, type "Terminal", press Enter)

2. Tell Terminal where this folder is:
   Type this, WITH a space after cd, then drag this folder into the window, then press Enter:
   cd 

3. Get the bits it needs (wait for it to finish):
   npm install

4. Save a first snapshot:
   git init
   git add .
   git commit -m "first version"

5. Put it on GitHub:
   - Go to github.com, log in
   - Click "New repository", name it: assistable-pricing
   - Click "Create repository"
   - GitHub shows a box titled "push an existing repository"
   - Copy those 2-3 lines, paste into Terminal, press Enter

6. Connect it to Vercel:
   - Go to vercel.com, log in
   - Click "Add New" then "Project"
   - Pick the assistable-pricing repo
   - Click "Deploy"
   - Wait ~1 minute. It gives you a live link. THAT is your pricing sheet link.
   - Paste that link into your Notion proposal.

Done. It's live.

## EVERY TIME YOU WANT TO CHANGE THE PRICE (the magic part)

1. Replace the file src/PricingSheet.jsx with the new one Claude gives you
   (just drag the new file in and let it replace the old one)

2. In Terminal, in this folder, run these 3 lines one at a time:
   git add .
   git commit -m "updated pricing"
   git push

3. Wait ~30 seconds. Your live site updates itself. You do NOT touch Vercel.

That's it. Same 3 lines every time.

## IF SOMETHING LOOKS WRONG

- Want to see it on your own computer first before pushing?
  Run:  npm run dev
  Then open the link it shows (usually http://localhost:5173)
  Press Ctrl + C in Terminal to stop it.

- Forgot which folder you're in?
  Run:  pwd
  It prints where you are. You want to be in the assistable-pricing folder.
