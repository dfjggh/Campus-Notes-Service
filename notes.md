# Technical Notes

## Biggest Docker problem I faced and how I solved it
The first `docker build` took a very long time because Docker had to download the
`node:20-alpine` base image over a slow internet connection. I kept the terminal open
and waited until it finished. Later builds took only a few seconds because Docker
cached the image layers.

I also made a mistake at the beginning: I ran `node server.js` from inside the `src`
folder and got "Cannot find module 'express'". I learned that the project must be run
from the project root and that Docker installs the dependencies for me through
`npm ci` in the Dockerfile.

## Most important Git/GitHub lesson I learned
Small commits with clear messages make the project history easy to understand. I also
learned to work with a feature branch and merge it through a Pull Request instead of
pushing everything directly to `main`: the CI workflow checked my changes before the
merge. Finally, I learned to always check which folder/repository I am in (`pwd`)
before running Git commands.
