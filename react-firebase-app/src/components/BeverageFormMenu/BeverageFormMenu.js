//Here we have use 2 hooks and also have a db which will fetch and store the menu item and order data.
//Imported firebase database as db from firebase file which consists on firebase authentication setup.
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './beverage-form-menu.css'
import db from "../firebase";

//menu: array that holds the beverage menu items
//selectedBeverage: string that holds the selected beverages selected by user.
//customerName: string that holds the customer name entered by user.

function BeverageFormMenu() {
    const [menu, setMenu] = useState([]);
    const [selectedBeverage, setSelectedBeverage] = useState("");
    const [customerName, setCustomerName] = useState("");
    const navigate = useNavigate();

//handleSubmit: It's a asynchronous function that triggers when the order form is submitted.
//It adds the selected beverage and customer name to the order collection in Firebase database using add method.
//Finally it navigates to ./queue page.

    const handleSubmit = async (event) => {
        event.preventDefault();
        db.collection('order').add({
            beverage: selectedBeverage,
            name: customerName
        })
        navigate("./queue")
    };

//useEffect: fetch the beverage menu item from firebase database and store them in menu state using setMenu. 
//It runs only when component mounts and its dependency array is empty.

    useEffect(() => {
        db.collection('drink').onSnapshot(snapshot => {
            setMenu(snapshot.docs.map(doc => doc.data()))
        })
    }, []);

//Here, component renders two section which uses display:flex property.
//Left-section: Beverage Menu- Renders each item name as div orelse it goes to loading menu.
//Right-section: Order your beverage- It has customer name and selected beverage, when form is submitted, handleSubmit function is called.

    return (
        <div className="bodyStyle">
      <div className="menuFormStyle">
        <div>
          <h2>BEVERAGE MENU</h2>
          {menu.length > 0 ? (
            <div className="menuStyle">
              {menu.map((item) => (
                <div className="menuItemStyle" key={item.id}>
                  {item.name}
                </div>
              ))}
            </div>
          ) : (
            <div className="menuStyle">
              <p className="menuItemStyle">Loading menu...</p>
            </div>
          )}
        </div>
        <div>
          <h2>ORDER YOUR BEVERAGE</h2>
          <div className="formStyle">
            <form onSubmit={handleSubmit}>
              <div className="fieldStyle">
                <label className="label">NAME</label>
                <input
                  type="text"
                  className="inputStyle"
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="fieldStyle">
                <label className="label">BEVERAGE</label>
                <select
                  className="selectStyle"
                  id="beverage-select"
                  value={selectedBeverage}
                  onChange={(event) => setSelectedBeverage(event.target.value)} required
                >
                  <option value="">-- Please Select --</option>
                  {menu.map((item) => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <button className="button" type="submit">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
}

export default BeverageFormMenu;