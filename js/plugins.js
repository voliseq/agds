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
                values: w.agds.propertyValuesObjs(objects, property)
            }
        });

        return main_node;

    };

    w.agds.fillPropertiesWithObjects = (graph_object, objects) => {
        let key;
        for (property in graph_object) {
            graph_object[property].values.map((node) => {
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

            if (index == 0) {
                return {
                    [key]: [],
                    weight_next: 1 - (Math.abs(object - propArr[index + 1]) / range)
                }
            }
            else if (index == propArr.length - 1) {
                return {
                    [key]: [],
                    weight_prev: 1 - (Math.abs(object - propArr[index - 1]) / range)
                }
            }
            else {
                return {
                    [key]: [],
                    weight_prev: 1 - (Math.abs(object - propArr[index - 1]) / range),
                    weight_next: 1 - (Math.abs(object - propArr[index + 1]) / range)
                }
            }
        });

        return propArr;

    };


    w.agds.findSimilar = (object, objects, graph) => {

        let results = {},
            indexes = [],
            iter = 0;

        objects.map((x,i) => {
            results[i] = 0;
        });

        for (property in object) {
            if (property != 'class') {
                let firstConLeaLen = graph[property].values.filter((x, i) => {
                    if (Object.keys(x)[0] == object[property]) {
                        indexes[iter] = i;
                        return true;
                    }
                })[0];

                firstConLeaLen.weight = 1;

                for (let i = indexes[iter]; i < graph[property].values.length - 1; i++) {
                    let item = graph[property].values[i],
                        next_item = graph[property].values[i + 1],
                        key = Object.keys(next_item)[0],
                        weight;

                        weight = item.weight - (1 - item.weight_next);

                    next_item.weight = weight;

                    for (let objI of next_item[key]) {
                        results[objI] += next_item.weight / 4.0;
                    }


                }

                for (let i = indexes[iter]; i > 0; i--) {
                    let item = graph[property].values[i],
                        prev_item = graph[property].values[i - 1],
                        key = Object.keys(prev_item)[0];

                    prev_item.weight = item.weight - (1 - item.weight_prev);

                    for (let objI of prev_item[key]) {
                        results[objI] += prev_item.weight / 4.0;
                    }

                }
            }
            iter++;
        }
        let resultsSort = Object.keys(results).sort((a,b) => results[b] - results[a])
            .map(x => {
                return {
                    i: x,
                    val : results[x]
                }
            });

        return resultsSort;

    };

    //
    // w.agds.findSimilar = (object, objects, graph) => {
    //
    //
    //     let results = {},
    //         indexes = [],
    //         firstConLeaLen = graph["leaf-length"].values.filter((x, i) => {
    //             if (Object.keys(x)[0] == object["leaf-length"]) {
    //                 indexes[0] = i;
    //                 return true;
    //             }
    //         })[0];
    //
    //     objects.map((x, i) => {
    //         results[i] = 0;
    //     });
    //
    //     firstConLeaLen.weight = 1;
    //
    //     for (let i = indexes[0]; i < graph["leaf-length"].values.length - 1; i++) {
    //         let item = graph["leaf-length"].values[i],
    //             next_item = graph["leaf-length"].values[i + 1],
    //             key = Object.keys(next_item)[0];
    //
    //         next_item.weight = item.weight - (1 - item.weight_next);
    //
    //         for (let objI of next_item[key]) {
    //             results[objI] += next_item.weight / 4.0;
    //         }
    //
    //
    //     }
    //
    //     for (let i = indexes[0]; i > 0; i--) {
    //         let item = graph["leaf-length"].values[i],
    //             prev_item = graph["leaf-length"].values[i - 1],
    //             key = Object.keys(prev_item)[0];
    //
    //         prev_item.weight = item.weight - (1 - item.weight_prev);
    //
    //         for (let objI of prev_item[key]) {
    //             results[objI] += prev_item.weight / 4.0;
    //         }
    //
    //     }
    //
    //
    //     firstConLeaLen = graph["leaf-width"].values.filter((x, i) => {
    //         if (Object.keys(x)[0] == object["leaf-width"]) {
    //             indexes[1] = i;
    //             return true;
    //         }
    //     })[0];
    //
    //     firstConLeaLen.weight = 1;
    //
    //     for (let i = indexes[1]; i < graph["leaf-width"].values.length - 1; i++) {
    //         let item = graph["leaf-width"].values[i],
    //             next_item = graph["leaf-width"].values[i + 1],
    //             key = Object.keys(next_item)[0];
    //
    //         next_item.weight = item.weight - (1 - item.weight_next);
    //
    //         for (let objI of next_item[key]) {
    //             results[objI] += next_item.weight / 4.0;
    //         }
    //
    //
    //     }
    //
    //     for (let i = indexes[1]; i > 0; i--) {
    //         let item = graph["leaf-width"].values[i],
    //             prev_item = graph["leaf-width"].values[i - 1],
    //             key = Object.keys(prev_item)[0];
    //
    //         prev_item.weight = item.weight - (1 - item.weight_prev);
    //
    //         for (let objI of prev_item[key]) {
    //             results[objI] += prev_item.weight / 4.0;
    //         }
    //
    //     }
    //
    //
    //     firstConLeaLen = graph["petal-width"].values.filter((x, i) => {
    //         if (Object.keys(x)[0] == object["petal-width"]) {
    //             indexes[2] = i;
    //             return true;
    //         }
    //     })[0];
    //
    //     firstConLeaLen.weight = 1;
    //
    //     for (let i = indexes[2]; i < graph["petal-width"].values.length - 1; i++) {
    //         let item = graph["petal-width"].values[i],
    //             next_item = graph["petal-width"].values[i + 1],
    //             key = Object.keys(next_item)[0];
    //
    //         next_item.weight = item.weight - (1 - item.weight_next);
    //
    //         for (let objI of next_item[key]) {
    //             results[objI] += next_item.weight / 4.0;
    //         }
    //
    //
    //     }
    //
    //     for (let i = indexes[2]; i > 0; i--) {
    //         let item = graph["petal-width"].values[i],
    //             prev_item = graph["petal-width"].values[i - 1],
    //             key = Object.keys(prev_item)[0];
    //
    //         prev_item.weight = item.weight - (1 - item.weight_prev);
    //
    //         for (let objI of prev_item[key]) {
    //             results[objI] += prev_item.weight / 4.0;
    //         }
    //
    //     }
    //
    //     firstConLeaLen = graph["petal-length"].values.filter((x, i) => {
    //         if (Object.keys(x)[0] == object["petal-length"]) {
    //             indexes[3] = i;
    //             return true;
    //         }
    //     })[0];
    //
    //     firstConLeaLen.weight = 1;
    //
    //     for (let i = indexes[3]; i < graph["petal-length"].values.length - 1; i++) {
    //         let item = graph["petal-length"].values[i],
    //             next_item = graph["petal-length"].values[i + 1],
    //             key = Object.keys(next_item)[0];
    //
    //         next_item.weight = item.weight - (1 - item.weight_next);
    //
    //         for (let objI of next_item[key]) {
    //             results[objI] += next_item.weight / 4.0;
    //         }
    //
    //
    //     }
    //
    //     for (let i = indexes[3]; i > 0; i--) {
    //         let item = graph["petal-length"].values[i],
    //             prev_item = graph["petal-length"].values[i - 1],
    //             key = Object.keys(prev_item)[0];
    //
    //         prev_item.weight = item.weight - (1 - item.weight_prev);
    //
    //         for (let objI of prev_item[key]) {
    //             results[objI] += prev_item.weight / 4.0;
    //         }
    //
    //     }
    //
    //     let resultsSort = Object.keys(results).sort((a, b) => results[b] - results[a])
    //         .map(x => {
    //             return {
    //                 i: x,
    //                 val: results[x]
    //             }
    //         });
    //
    //     return resultsSort;
    // };

})(window);
