TRI-VALLEY YOUTH LEAGUE SOFTBALL — FALL BALL CONCESSIONS
Deploy folder for Netlify

WHAT IS IN HERE
  index.html                     the sign-up page (logo and styling built in)
  netlify/functions/slots.mjs    saves and returns the names
  package.json                   one dependency the function needs
  netlify.toml                   tells Netlify where the function lives

HOW IT WORKS
  Names are stored in Netlify Blobs, which is included free with your
  Netlify account. Nothing else to sign up for, no database to manage.
  When someone types a name it is saved on the server, so the next person
  to open the link sees it. The page also refreshes itself every 30
  seconds so an open tab stays current.

DEPLOYING — USE THE GIT METHOD
  The function needs its dependency installed, and Netlify only does that
  when it builds from a repository. Drag-and-drop deploys skip the install
  step and the saving will not work.

  1. Put this folder in a GitHub repository.
  2. In Netlify choose "Add new site" then "Import an existing project".
  3. Pick the repository. Leave the build command empty.
     Set the publish directory to:  .
  4. Deploy. The URL Netlify gives you is the link to send out.

  If you would rather use the Netlify CLI:
     npm install
     npx netlify deploy --prod

CHANGING THE SCHEDULE
  Team assignments and dates live near the top of the script in
  index.html, in the WEEKS list. Shift times are in the SHIFTS list just
  above it.

CLEARING ALL THE NAMES
  Netlify dashboard, then Blobs, then the "tvyls-concessions" store.
  Delete the "fall2026" entry and the sheet starts over empty.

A NOTE ON ACCESS
  Anyone with the link can add a name and can remove a name. There is no
  password. That is deliberate so parents do not need an account, but it
  means the link should go to league families rather than a public post.
