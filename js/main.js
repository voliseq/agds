((w) => {

    let agds = w.agds,
        graph = {},
        similarTo = 25;

    iris = agds.commaToDot(iris);
    graph.param = agds.createMainNode(iris);
    agds.fillPropertiesWithObjects(graph.param, iris);
    let similar = agds.findSimilar(iris[similarTo], iris, graph.param);

    console.log(iris[similarTo]);

    similar.map(x => {
        let diff = [];
        for(property in iris[x.i]){
            if(property != 'class')
                diff.push(Math.abs(iris[x.i][property] - iris[similarTo][property]).toFixed(3));
        }
        console.log(diff, x.val.toFixed(3) * 100 + "%");
        console.log(iris[x.i]);

    })



})(window);
