import "../NewCollections/NewCollections.css";
import new_collection from "../assets/new_collections";
import Item from "../Item/Item";

const NewCollections = () => {
  return (
    <>
    <div className="new-collections-outer">
      <div className="new-collections">
        <div className="new-collections-text">
        <h1 id="new-collections-text-1">NEW</h1>
        <h1 id="new-collections-text-2"> COLLECTIONS</h1>
        </div>
        <hr />
        <div className="collections-item">
          {new_collection.map((item, index) => {
            return (
              <Item
                key={index}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          })}
        </div>
      </div>
      </div>
    </>
  );
};
export default NewCollections;
