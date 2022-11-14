import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import React, { useState, useEffect } from "react";
import Form, { Item, GroupItem, ColCountByScreen } from 'devextreme-react/form';
import './home.scss'

export default function Home() {
  const [data, setData] = useState([]);
  const db = getFirestore();
  const colRef = collection(db, "monsters");

  useEffect(() => {
    let monsters = [];
    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        monsters.push({ ...doc.data(), id: doc.id });
      });
      setData(monsters);
    });
  }, []);
  if(data){
    return (
    <div className="App-header">
    <Form>
    <GroupItem colCount={3}>
    <ColCountByScreen xs={1} sm={1} />
          {data.map((item) => (
            <Item >
             <div className="monster-border">
          <img
            src={item.monster_url}
            alt={item.monster}
            className="center monster-img"
          />
          <h3 className="center title">{item.monster}</h3>
        </div>
            </Item> 
      ))}
    </GroupItem>
    </Form>
    </div>
  );
  }else{
    return(
    <div className="App-header">
    <h1>error: no data</h1>
    </div>
      )
  }
  
}
