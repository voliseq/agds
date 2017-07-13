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
        for (property in iris[x.i]) {
            if (property != 'class')
                diff.push(Math.abs(iris[x.i][property] - iris[similarTo][property]).toFixed(3));
        }

    })


    let propertyInRange = agds.findPropertyInRange("petal-length", 1.4, 1.5, iris, graph.param);

    console.log(propertyInRange);


    let propertiesInRange = agds.findPropertiesInRange([
        {
            name: "leaf-width",
            min: 3.0,
            max: 3.2
        },
        {
            name: "petal-length",
            min: 1.4,
            max: 1.5
        }
    ], iris, graph.param);
    console.log(propertiesInRange);


    let classObjs = agds.findClass("Iris-setosa", iris, graph.param);
    console.log(classObjs);


    let t0 = performance.now();
        agds.findPropertyInRange("petal-length", 1.4, 1.5, iris, graph.param);
    let t1 = performance.now();


    let t2 = performance.now();
    agds.findPropertiesInRange([
        {
            name: "leaf-width",
            min: 3.0,
            max: 3.2
        },
        {
            name: "petal-length",
            min: 1.4,
            max: 1.5
        }
    ], iris, graph.param);
    let t3 = performance.now();


    let t4 = performance.now();

    agds.findClass("Iris-setosa", iris, graph.param);


    let t5 = performance.now();


    console.log(t1 - t0, t3 - t2, t5 - t4);

})(window);
