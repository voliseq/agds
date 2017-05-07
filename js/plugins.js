((w) => {

    w.agds = w.agds || {};

    w.agds.commaToDot = (objects) => {
        return objects.map(object => {
            for (property in object) {
                object[property] = object[property].replace(",", ".");
            }
            return object;
        });

    };

    w.agds.createMainNode = (objects) => {

        let main_node = {},
            properties = Object.keys(objects[0]);

        properties.map((property) => {
            main_node[property] = w.agds.propertyValues(objects, property);
        });

        return main_node;

    };

    w.agds.fillPropertiesWithObjects = (graph_object, objects) => {
        let properties = Object.keys(graph_object),
            key;

        for(property in graph_object){
            graph_object[property].map(node => {
                key = Object.keys(node)[0];
                node[key] = objects.filter(object => {
                    return object[property] == key;
                })
            })
        }

        console.log(graph_object);

    };

    w.agds.getObjectsWithPropertyValue = ((objects, property, value) => {
        return objects.filter((object) => {
            return object[property] == value
        })
    });

    w.agds.propertyValues = (objects, property) => {
        let propArr = objects.map((object) => {
            return object[property];
        }).sort();

        propArr = [... new Set(propArr)].sort();

        propArr = propArr.map((object) => {
            let key = object;

            return {
                [key]: []
            }
        });

        return propArr;

    };




})(window);
