import "../styles/itemListStyle.css";

function ItemList({ title, children, showBtn, btnText, btnFunction }) {

    function handleNewRegistry() {
        btnFunction('post');
    }

    return (
        <div className="list-container">
            <div className="list-container_top">
                <span className="list-title">{title}</span>
                { showBtn === true &&
                    <button onClick={() => handleNewRegistry()}>{btnText}</button>
                }
            </div>


            <div className="list-children">{children}</div>
        </div>
    );
}

export default ItemList;
