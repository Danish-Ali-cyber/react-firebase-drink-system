//The given function takes four arguments and creates the copy of "order" array using spread operator.
//It then removes the specified index using "splice" method. this ConstantValue is used in BeverageQueue

import db from "./firebase";
export default function ConstantValue(order, collection1, collection2, item) {
    const mix = [...order];
    mix.splice(item, 1);
    db.collection(collection2).add({
        beverage: item.data.beverage,
        name: item.data.name,
    });
    db.collection(collection1).doc(item.id).delete();
}
