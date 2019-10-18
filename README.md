# redux-action-graph

Repo to discover data flow between redux actions

# Setup

## Setup graph generator

Install graphviz: https://graphviz.gitlab.io/download/
```
brew install graphviz
```

Install node dependencies with
``` 
npm ci
```

## Setup image generator

You can skip this if you don't want to have any png generated.

Install graphviz: https://graphviz.gitlab.io/download/
```
brew install graphviz
```

Install node dependencies in `imagegenerator` folder with
``` 
npm ci
```

## Setup viewer

Install node dependencies in `viewer` folder with
``` 
npm ci
```
# Usage

## Running graph generator

Run project with 
``` 
npm run graph -- "<<typescript files path>>"
```

Examples:
``` 
npm run graph -- "./example/graph.example.ts"
npm run graph -- "./example/**/*.ts"
npm run graph -- "../<<otherrepo>>/packages/app/src/**/*.ts"
```

## Running Viewer

After running the generator, verifiy you can see the output, then
run project with 
``` 
npm run viewer
```

## Running image generator

After running the generator, verifiy you can see the output, then
run project with 

``` 
npm run image -- "graph.png"
```