((w) => {

    w.agds = w.agds || {};
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
        })

        return propArr;

    };

    w.agds.getClasses = (objects) => {
        return [... new Set(objects.map(object => {
            return object['class'];
        }))]
    };

    w.agds.getObjectsWithPropertyValue = ((objects, property, value) => {
        return objects.map((object) => {
            return object[property] == value
        })
    })



})(window);
