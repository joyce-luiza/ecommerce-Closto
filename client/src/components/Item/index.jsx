import "../styles/itemStyle.css";

export default function Item({ name, price }) {
    return (
        <div className="item-container">
            <img
                className="item-image"
                src="https://via.placeholder.com/187x272"
                alt={name}
            />

            <section className="item-info">
                <span className="item-name">{name}</span>
                <span className="item-price">
                    <strong>R$ {price}</strong>
                </span>
            </section>
        </div>
    );
}
