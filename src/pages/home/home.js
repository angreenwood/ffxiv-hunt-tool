import { getFirestore, collection, getDocs, query, where } from "firebase/firestore/lite";
import React, { useState, useEffect } from "react";
import Form, { Item, GroupItem, ColCountByScreen, Label } from 'devextreme-react/form';
import './home.scss'

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    searchData: "",
  });
  const [searchResult, setSearchResult] = useState([]);
  const [labyrinthos, setLabyrinthos] = useState([]);
  const [thavnair, setThavnair] = useState([]);
  const db = getFirestore();
  const colRef = collection(db, "monsters");
  const monsterquery = query(colRef, where("zone", "==", "Labyrinthos"));
  useEffect(() => {
    let monsters = [];
    getDocs(monsterquery).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        monsters.push({ ...doc.data(), id: doc.id });
      });
      const findLabyrinthos = monsters.filter(
        function(data){ return data.zone === 'Labyrinthos' }
    );
    const findThavnair = monsters.filter(
      function(data){ return data.zone === 'Thavnair' }
  );
    
    setLabyrinthos(findLabyrinthos);
    setThavnair(findThavnair);
    setLoading(false);
    });
  }, []);
  if(!loading && !searchResult.length){
    return (
    <div className="App-header">
    <Form formData={data}>
    <GroupItem colCount={1}>
    <Item
    dataField="searchData"
    editorType="dxTextBox">
    <Label text="Search"></Label>
    </Item>
    </GroupItem>
    </Form>
    <h2 class="text-4xl font-extrabold dark:text-white">The Northern Empty</h2>
    <h3 class="text-2xl font-extrabold dark:text-white">Labyrinthos</h3>
    <Form>
    <GroupItem colCount={3}>
    <ColCountByScreen xs={1} sm={1} />
          {labyrinthos.map((item) => (
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
    <h2 class="text-4xl font-extrabold dark:text-white">Ilsabard</h2>
    <h3 class="text-2xl font-extrabold dark:text-white">Thavnair</h3>
    <Form>
    <GroupItem colCount={3}>
    <ColCountByScreen xs={1} sm={1} />
          {labyrinthos.map((item) => (
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
    <h3 class="text-2xl font-extrabold dark:text-white">Garlemald</h3>
    <Form>
    <GroupItem colCount={3}>
    <ColCountByScreen xs={1} sm={1} />
          {labyrinthos.map((item) => (
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
        <h2 class="text-4xl font-extrabold dark:text-white">The Sea of Stars</h2>
        <h3 class="text-2xl font-extrabold dark:text-white">Mare Lamentorum</h3>
        <Form>
    <GroupItem colCount={3}>
    <ColCountByScreen xs={1} sm={1} />
          {labyrinthos.map((item) => (
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
    <h2 class="text-4xl font-extrabold dark:text-white">The World Unsundered</h2>
    <h3 class="text-2xl font-extrabold dark:text-white">Elpis</h3>
    <Form>
    <GroupItem colCount={3}>
    <ColCountByScreen xs={1} sm={1} />
          {labyrinthos.map((item) => (
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
    <h2 class="text-4xl font-extrabold dark:text-white">The Sea of Stars</h2>
    <h3 class="text-2xl font-extrabold dark:text-white">Ultima Thule</h3>
    <Form>
    <GroupItem colCount={3}>
    <ColCountByScreen xs={1} sm={1} />
          {labyrinthos.map((item) => (
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
  )
  }if(loading){
    return(
    <div className="App-header">
    <h1>error: no data</h1>
    </div>
      )
  }if(!loading && data.searchData){
  <div><h1>test</h1></div>
}
}
