/**
 * Created by Maciej on 2017-05-15.
 */



w.agds.findSimilar = (object, objects, graph) => {

    let results = {},
        indexes = [],
        firstConLeaLen = graph["leaf-length"].values.filter((x, i) => {
            if (Object.keys(x)[0] == object["leaf-length"]) {
                indexes[0] = i;
                return true;
            }
        })[0];

    firstConLeaLen.weight = 1;

    for(let i = indexes[0]; i < graph["leaf-length"].values.length - 1; i++){
        let item = graph["leaf-length"].values[i],
            next_item = graph["leaf-length"].values[i+1],
            key = Object.keys(next_item)[0];

        next_item.weight = item.weight - (1 - item.weight_next);

        for(let objI of next_item[key]){
            console.log(objI);
            results[objI] = 0;
            results[objI] +=  next_item.weight/4.0;
        }


    }

    for(let i = indexes[0]; i > 0; i--){
        let item = graph["leaf-length"].values[i],
            prev_item = graph["leaf-length"].values[i-1],
            key = Object.keys(prev_item)[0];

        prev_item.weight = item.weight - (1 - item.weight_prev);

        for(let objI of prev_item[key]){
            results[objI] = 0;
            results[objI] +=  prev_item.weight/4.0;
        }

    }

};
