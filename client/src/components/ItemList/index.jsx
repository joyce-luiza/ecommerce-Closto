import "../styles/itemListStyle.css";

function ItemList({ title, children }) {
    return (
        <div className="list-container">
            <span className="list-title">{title}</span>

            <div className="list-children">{children}</div>
        </div>
    );
}

export default ItemList;
