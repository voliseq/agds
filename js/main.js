((w) => {

    let agds = w.agds,
        graph = {};

    iris = agds.commaToDot(iris);

    graph.param = agds.createMainNode(iris);
    console.log(graph.param);
    agds.fillPropertiesWithObjects(graph.param, iris);




})(window);
