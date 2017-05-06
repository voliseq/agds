((w) => {

    let agds = w.agds;



    let leaf_length = agds.propertyValues(iris, "leaf-length"),
        leaf_width = agds.propertyValues(iris, "leaf-width"),
        petal_length = agds.propertyValues(iris, "petal-length"),
        petal_width = agds.propertyValues(iris, "petal-width"),
        classes = agds.getClasses(iris);



    let graph = {
        param: {
            "leaf-length": leaf_length,
            "leaf-width": leaf_width,
            "petal-length": petal_length,
            "petal-width": petal_width
        }
    };

    console.log(graph);

    leaf_length.map(object => {
        let key = Object.keys(object)[0];
    })



})(window);
