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


    let propertyInRange = agds.findPropertyInRange("leaf-length", 4.8, 4.8, iris, graph.param);
    console.log(propertyInRange);
    let propertiesInRange = agds.findPropertiesInRange([{name: "leaf-width", min: 3.0, max: 3.2}, {name: "petal-length", min: 1.4, max: 1.5}], iris, graph.param);
    console.log(propertiesInRange);
    let classObjs = agds.findClass("Iris-setosa",iris, graph.param);
    console.log(classObjs);



})(window);
