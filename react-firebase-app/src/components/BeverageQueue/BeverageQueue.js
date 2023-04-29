import React, { useEffect, useState } from "react";
import db from "../firebase";
import './beverage-queue.css'
import ConstantValue from "../BeverageConstants";

//useState: it contains an empty array
//inQueue: order is in queue but not started mixing
//beingMixed: orders are currently being mixed
//readyToCollect: orders that are ready for customers to collect

function BeverageQueue() {
    const [inQueue, setInQueue] = useState([]);
    const [beingMixed, setBeingMixed] = useState([]);
    const [readyToCollect, setReadyToCollect] = useState([]);

    //useEffect: whole data is stored in "drink" collection. When customer places the order it goes into "order" collection. We fetch and place the order data in "In Queue".
    // When we click on "In Queue" the data goes into  a new collection named "mixed" and previous data is gets deleted from the "In Queue " state in order to do state updation.
    //After "mixed" collection it goes to a new collection named "ready". In the end it goes to the collection name "collect" where all data is stored and it can be easily seen the firebase.
    //docs: array of documents in the collection and onSnapshot: method of firestore collection to setup a listener for a real-time updation of the collection in the firebase.
    useEffect(() => {
        db.collection("order").onSnapshot((snapshot) => {
            setInQueue(
                snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
            );
        });
        db.collection("mixed").onSnapshot((snapshot) => {
            setBeingMixed(
                snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
            );
        });
        db.collection("ready").onSnapshot((snapshot) => {
            setReadyToCollect(
                snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
            );
        });
    }, []);

    //ConstantValue function takes four arguments - an array of items, the name of the source collection, the name of the destination collection, and the item to be moved.
    //The function creates a copy of the array, removes the item from the source collection, adds the item to the destination collection, and deletes the item from the source collection in the Firebase database.

    const moveFromQueueToBeingMixed = (item) => {
        ConstantValue(inQueue, "order", "mixed", item)
    };
    const moveFromBeingMixedToReadyToCollect = (item) => {
        ConstantValue(beingMixed, "mixed", "ready", item)
    };
    const removeFromReadyToCollect = (item) => {
        ConstantValue(readyToCollect, "ready", "collect", item)
    };

    //includes(): checcks whether that array include that certain value or not.

    const handleItemClick = (item) => {
        if (inQueue.includes(item)) {
            moveFromQueueToBeingMixed(item);
        } else if (beingMixed.includes(item)) {
            moveFromBeingMixedToReadyToCollect(item);
        } else if (readyToCollect.includes(item)) {
            removeFromReadyToCollect(item);
        }
    };

    //The below render method manages the firebase collection and maps the beverage name and customer name into firebase collection.
    //The handleItemClick handles the onClick functionality when the mixologist clicks on the data present in "In Queue", "Being Mixed" and "Ready To Coleect".

    return (
        <div className="container">
            <h1>BEVERAGE QUEUE</h1>
            <div className="queue-container">
                <div className="queue">
                    <h2>IN THE QUEUE</h2>
                    <ul>
                        {inQueue.map((item, index) => (
                            <div className="hoverStyle" key={index} onClick={() => handleItemClick(item)}>
                                <div className="upperStyle">{item.data.beverage}</div>
                                <div className="lowerStyle">{item.data.name.toUpperCase()}</div>
                            </div>
                        ))}

                    </ul>
                </div>
                <div className="queue">
                    <h2>BEING MIXED</h2>
                    <ul>
                        {beingMixed.map((item, index) => (
                            <div key={index} onClick={() => handleItemClick(item)}>
                                <div className="upperStyle">{item.data.beverage}</div>
                                <div className="lowerStyle">{item.data.name.toUpperCase()}</div>
                            </div>
                        ))}
                    </ul>
                </div>
                <div className="queue">
                    <h2>READY TO COLLECT</h2>
                    <ul>
                        {readyToCollect.map((item, index) => (
                            <div key={index} onClick={() => handleItemClick(item)}>
                                <div className="upperStyle">{item.data.beverage}</div>
                                <div className="lowerStyle">{item.data.name.toUpperCase()}</div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BeverageQueue;