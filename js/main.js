((w) => {

    let agds = w.agds,
        graph = {};

    iris = agds.commaToDot(iris);
    graph.param = agds.createMainNode(iris);
    agds.fillPropertiesWithObjects(graph.param, iris);
    console.log(JSON.stringify(graph, null ,3));



})(window);
