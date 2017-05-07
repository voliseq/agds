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
            oMinMax = {},
            properties = Object.keys(objects[0]);

        properties.map((property) => {
            oMinMax = w.agds.propertyValuesMinMax(objects, property);
            main_node[property] = {
                max: oMinMax.max,
                min: oMinMax.min,
                nodes: w.agds.propertyValuesObjs(objects, property)
            }
        });

        return main_node;

    };

    w.agds.fillPropertiesWithObjects = (graph_object, objects) => {
        let key;
        for (property in graph_object) {
            graph_object[property].nodes.map((node) => {
                key = Object.keys(node)[0];
                node[key] = objects.map((object, index) => {
                    return {
                        [property]: object[property],
                        index: index
                    }
                }).filter(object => {
                    return object[property] == key;
                }).map(object => object.index)
            })
        }
    };

    w.agds.getObjectsWithPropertyValue = ((objects, property, value) => {
        return objects.filter((object) => {
            return object[property] == value
        })
    });

    w.agds.propertyValuesMinMax = (objects, property) => {
        let min,
            max,
            propArr = objects.map((object) => {
                return object[property];
            }).sort();

        min = Math.min(...propArr);
        max = Math.max(...propArr);

        return {
            min: min,
            max: max
        }
    };

    w.agds.propertyValuesObjs = (objects, property) => {
        let key,
            range,
            oMinMax = agds.propertyValuesMinMax(objects, property),
            propArr = objects.map((object) => {
            return object[property];
        }).sort();

        propArr = [... new Set(propArr)].sort();

        propArr = propArr.map((object, index) => {
            key = object;
            range = oMinMax.max - oMinMax.min;

            if(index == 0){
                return {
                    [key]: [],
                    weight_next: 1 - (Math.abs(object - propArr[index+1])/range)
                }
            }
            else if(index == propArr.length - 1){
                return {
                    [key]: [],
                    weight_prev: 1 - (Math.abs(object - propArr[index-1])/range)
                }
            }
            else{
                return {
                    [key]: [],
                    weight_prev: 1 - (Math.abs(object - propArr[index-1])/range),
                    weight_next: 1 - (Math.abs(object - propArr[index+1])/range)
                }
            }
        });

        return propArr;

    };


})(window);
