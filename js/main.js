((w) => {

    let agds = w.agds,
        graph = {},
        similarTo = 15;

    iris = agds.commaToDot(iris);
    graph.param = agds.createMainNode(iris);
    agds.fillPropertiesWithObjects(graph.param, iris);
    let similar = agds.findSimilar(iris[similarTo], iris, graph.param);

    similar.map(x => {
        let diff = [];
        for(property in iris[x.i]){
            if(property != 'class')
                diff.push(Math.abs(iris[x.i][property] - iris[similarTo][property]).toFixed(3));
        }

    })


    let inRange = agds.findPropertyInRange("leaf-length", 4.8, 4.8, iris, graph.param);


})(window);
