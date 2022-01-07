# Pro-search

Search engines are really amazing tools and we all use them everyday. Search engines also have really powerful tools to make queries much more specialised and specific. Unfortunately, few people use these advanced querying capabilities either because they don't know about them or they're just tedious to use. Those who do use them usually just have one or two go to filters. This is where Pro-search comes in. Pro-search is an advanced query builder for search engines. It allows you to build complex queries for search engines in an easy intuitive user interface. You choose which search engine(s) you want your query sent to and Pro-search will format the query for the target and open a new browser tab with the result. It's that simple.

## Resources

To learn more about what is possible in terms of filters, etc. Here are some helpful links:

- [Google Advanced Queries Reference](http://www.googleguide.com/advanced_operators_reference.html)
- [A New Google](https://dcgross.com/a-new-google)
- [Use Google like a pro twitter thread](https://twitter.com/denicmarko/status/1385460520707313666?s=09)
- [Advanced Google Search operators twitter thread](https://twitter.com/hnshah/status/1335622960401457152?s=19)
- [Request for side project](https://twitter.com/swyx/status/1335627133956153344?s=19)
- [Dorking: How to find anything on the internet](https://www.alec.fyi/dorking-how-to-find-anything-on-the-internet.html)
- [Neat little Google hack twitter thread](https://twitter.com/stephsmithio/status/1388622741037666308?s=19)
- [How to 'Google it' like a senior engineer](https://youtu.be/cEBkvm0-rg0)

## Contributing

### Tech

This is the tech used:

- Frontend: SvelteKit
- Styles: CSS\*\*
- Hosting: Vercel

\*\* There are some components currently written using Tailwind CSS because the initial plan was to do all styling using TailwindCSS. Plans have since changed so now, whenever you touch a component please convert the styles to SCSS.

### Setting up your Dev Env

#### With Docker

This dev app runs in a docker container so all you should need to do is install [Docker Desktop](https://www.docker.com/products/docker-desktop 'Download Docker Desktop').

There is a devcontainer already setup in the project so we advise that you use that. If you're using vscode as your editor (recommended) install the [Remote - Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) then to run the dev container simply type CMD + SHIFT + P on mac or CTRL + SHIFT + P on windows and search for "Open in container" and press enter. This will run a container that has the dev environment already set up. This might take a while the first time but subsequent times should be faster.

Once you have that installed you can run `npm run dev` to start up the app. This should run it on port 3000.

### Working on an issue

- When you select an issue, make sure to assign it to yourself to avoid someone else picking it up and duplicating work. Also go to the project board and move it to 'In Progress'
- Create a feature branch from `main`. Name your branch starting with the issue number then a little description of what the branch is about seperated by a '/', for example '23/take-over-the-world'
- Your commits should be structured and meaningful inline with [this convention](https://dev.to/bhekanik/supercharge-your-git-history-with-better-commit-messages-32fk).
- Refactor your commits to clean them up (if needed).
- Always rebase your work before opening a PR.
- Open your pull request against `main`. Name your pull request meaningfull, include a description of what you did and reference the issue that the PR relates to so that github can do the automations.
- PR's will not be accepted without appropriate tests where applicable.
- A preview of the app will be deployed to vercel and the link attached to the PR as a comment.
- Assign reviewers so that they're pinged to review your code.

### Troubleshooting

- If you encounter this error on your style tags:

```bash
Cannot find any of modules: sass,node-sass

Error: Missing binding /home/bk/dev/personal/pro-search/node_modules/node-sass/vendor/linux-x64-83/binding.node
Node Sass could not find a binding for your current environment: Linux 64-bit with Node.js 14.x
```

You may need to run `npm rebuild node-sass`. That should fix the issue
