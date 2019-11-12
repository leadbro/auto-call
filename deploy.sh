# deploy.sh

#!/usr/bin/env sh

# abort on errors
#set -e

# build
echo Linting..
yarn lint
echo Building. this may take a minute...
yarn build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'example.com' > CNAME

echo Deploying..
git init
git add -A
git commit -m 'deploy'

# deploy
git push -f git@github.com:leadbro/auto-call.git master:gh-pages

cd -