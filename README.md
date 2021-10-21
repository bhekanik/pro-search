# Pro-search

Search engines are really amazing tools and we all use them everyday. Search engines also have really powerful tools to make queries much more specialised and specific. Unfortunately, few people use these advanced querying capabilities either because they don't know about them or they're just tedious to use. Those who do use them usually just have one or two go to filters. This is where Pro-search comes in. Pro-search is an advanced query builder for search engines. It allows you to build complex queries for search engines in an easy intuitive user interface. You choose which search engine(s) you want your query sent to and Pro-search will format the query for the target and open a new browser tab with the result. It's that simple.

## Contributing

This is the tech used:

- Frontend: SvelteKit
- Styles: SCSS**

** There are some components currently written using Tailwind CSS because the initial plan was to do all styling using TailwindCSS. Plans have since changed so now, whenever you touch a component please convert the styles to SCSS.

### Setting up your Dev Env

This dev app runs in a docker container so all you should need to do is install [Docker Desktop](https://www.docker.com/products/docker-desktop 'Download Docker Desktop'). Once you have that installed you can run `npm run dev` to start up the app. This should run it on port 3000.

NB: The app will continue running even if you stop your terminal session. If you need to stop it you will need to run `npm run stop`.

### Working on an issue

- When you select an issue, make sure to assign it to yourself to avoid someone else picking it up and duplicating work. Also go to the project board and move it to 'In Progress'
- Create a feature branch from `main`. Name your branch starting with the issue number then a little description of what the branch is about seperated by a '/', for example '23/take-over-the-world'
- Your commits should be structured and meaningful inline with [this convention](https://dev.to/bhekanik/supercharge-your-git-history-with-better-commit-messages-32fk).
- Refactor your commits to clean them up (if needed).
- Always rebase your work before opening a PR.
- Open your pull request against `main`. Name your pull request meaningfull, include a description of what you did and reference the issue that the PR relates to so that github can do the automations.
- PR's will not be accepted without appropriate tests where applicable.
- Assign reviewers so that they're pinged to review your code.
