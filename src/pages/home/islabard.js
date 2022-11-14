import { getFirestore, collection, getDocs, query, where } from "firebase/firestore/lite";
import React, { useState, useEffect } from "react";
import Form, { Item, GroupItem, ColCountByScreen } from 'devextreme-react/form';
import './home.scss'

export default function Ilsabard() {
  const [loading, setLoading] = useState(true);
  const [garlemald, setGarlemald] = useState([]);
  const [thavnair, setThavnair] = useState([]);
  const db = getFirestore();
  const colRef = collection(db, "monsters");
  const monsterquery = query(colRef, where("area", "==", "ilsabard"));
  useEffect(() => {
    let monsters = [];
    getDocs(monsterquery).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        monsters.push({ ...doc.data(), id: doc.id });
      });
    const findThavnair = monsters.filter(
      function(data){ return data.zone === 'Thavnair' }
  );
  const findGarlemald = monsters.filter(
    function(data){ return data.zone === 'Garlemald' }
);
    
    setGarlemald(findGarlemald);
    setThavnair(findThavnair);
    setLoading(false);
    });
  }, []);
  if(!loading){
    return (
    <div className="App-header">
    <h2 class="text-4xl font-extrabold dark:text-white">Thavnair</h2>
    <Form>
    <GroupItem colCount={3}>
    <ColCountByScreen xs={1} sm={1} />
          {thavnair.map((item) => (
            <Item >
             <div className="monster-border">
          <img
            src={'./images/monsters/'+item.monster_url}
            alt={item.monster}
            className="center monster-img"
          />
          <h3 className="center title">{item.monster}</h3>
        </div>
            </Item> 
      ))}
    </GroupItem>
    </Form>
    <h2 class="text-4xl font-extrabold dark:text-white">Garlemald</h2>
    <Form>
    <GroupItem colCount={3}>
    <ColCountByScreen xs={1} sm={1} />
          {garlemald.map((item) => (
            <Item >
             <div className="monster-border">
          <img
            src={'./images/monsters/'+item.monster_url}
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
