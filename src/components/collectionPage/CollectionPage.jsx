import React, { useState, useEffect, useContext } from "react";
import CollectionItem from "../collection/CollectionItem";
import { Collection } from "../Components";
import Context from "../context";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./collectionPage.scss";

function CollectionPage() {
  const val = useContext(Context);
  console.log(val);
  let coll = window.location.href.slice(-1);
  console.log(coll);

  const database = getDatabase(app);
  const [data, setData] = useState({});

  useEffect(() => {
    get(child(ref(database), `collection/${coll}/collectionProducts`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData({ ...snapshot.val() });
        } else {
          setData({});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(data);

  return (
    <div className="collectionPage">
      <div className="container">
        <h1 className="collectionPage__title"></h1>
        <div className="collectionPage__inner">
          {Object.keys(data).map((id, index) => {
            return (
              <div className="collectionPage__card" key={index + id}>
                <img
                  className="collectionPage__card-photo"
                  src={data[id].productImg}
                  alt={data[id].productName}
                  data_id={data[id].collectionId}
                />
                <h2 className="collectionPage__card-name">
                  {data[id].productName}
                </h2>
                <p className="collectionPage__card-price">
                  {`${data[id].productPrice} р`}
                </p>
                <p className="collectionPage__card-size">
                  {`Размер: ${data[id].productSize}`}
                </p>
                <p className="collectionPage__card-colors">
                  {data[id].productColors.map((color) => {
                    return (
                      <span style={{ backgroundColor: `${color}` }}></span>
                    );
                  })}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CollectionPage;