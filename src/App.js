import React, { useEffect, useState } from "react";
import "./style/index.scss"
import Collection from "./components/Collection";


const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];


function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    fetch(`https://65f87be9df151452460f822f.mockapi.io/collections?page=${page}&limit=3&${category}`)
    .then((res) => res.json())
    .then((json) => {
      setCollections(json);
    })
    .catch((err) => {
      console.warn(err);
      alert("Ошибка при получении данных");
    })
    .finally(() => setIsLoading(false))
  }, [categoryId, page]);


  return ( 
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, index) => (
            <li onClick={() => setCategoryId(index)} 
            className={categoryId === index ? "active" : ""} 
            key={obj.name}>
              {obj.name}
            </li>
          ))}
        </ul>
        <input 
        value={searchValue} 
        onChange={(e) => setSearchValue(e.target.value)} 
        className="search-input" 
        placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? <h2>Идёт загрузка...</h2> :
        collections.filter((obj) => {return obj.name.toLowerCase().includes(searchValue.toLowerCase())})
        .map((obj, index) => (
          <Collection
          key={index}
          name={obj.name}
          images={obj.photos}
          />
        ))
        }
      </div>
      <ul className="pagination">
        {[...Array(5)].map((el, index) => (
          <li onClick={() => setPage(index + 1)} className={index + 1 === page ? "active" : ""} key={index + 1}>{index + 1}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
