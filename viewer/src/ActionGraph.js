import React from 'react';
import { Graph } from "react-d3-graph";
import actionPairs from "./graph-data.json";

const nodes = actionPairs.reduce((all, pair) => {
    all.push(pair.from);
    pair.to.forEach(to => all.push(to));
    return all;
}, []);

const links = Object.values(actionPairs.reduce((linkHash, pair) => {
    pair.to.forEach(to => linkHash[pair.from + '-----' + to] = { source: pair.from, target: to });
    return linkHash;
}, {}));

const data = {
    nodes: [...new Set(nodes)].map(n => ({ id: n })),
    links: links
};

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used

function ActionGraph() {
    // console.log(document.getElementsByTagName('body')[0].clientHeight)
    const myConfig = {
        directed: true,
        collapsible: true,
        height: document.getElementsByTagName('body')[0].clientHeight,
        width: document.getElementsByTagName('body')[0].clientWidth,
        nodeHighlightBehavior: true,
        node: {
            color: "lightgreen",
            size: 120,
            highlightStrokeColor: "blue",
            fontColor: 'white'
        },
        link: {
            highlightColor: "lightblue",
        },
    };

    return (
        <Graph
            id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
            data={data}
            config={myConfig}
        />
    );
}

export default ActionGraph;
