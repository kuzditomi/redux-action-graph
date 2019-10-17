# redux-action-graph

Repo to discover data flow between redux actions

## Setup

Install graphviz: https://graphviz.gitlab.io/download/
```
brew install graphviz
```

Install node dependencies with
``` 
npm ci
```

## Running

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

