((w) => {

    let agds = w.agds,
        graph = {};

    iris = agds.commaToDot(iris);
    graph.param = agds.createMainNode(iris);
    agds.fillPropertiesWithObjects(graph.param, iris);
    console.log(graph.param);



})(window);
