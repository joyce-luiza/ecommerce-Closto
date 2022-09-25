import "../styles/tableRowStyle.css";

// export default function Table({ children }) {
//     return <div className="table-container">{children}</div>;
// }

export default function Table({
    type,
    data,
    deleteObj,
    setContent,
    setProduct,
}) {
    return (
        <div className="table-container">
            {data.map((product) => {
                return (
                    <div key={product.id} className="row-container">
                        <div className="table-column">
                            <div className="table-label">ID</div>
                            <div className="table-content">{product.id}</div>
                        </div>
                        <div className="table-column">
                            <div className="table-label">Nome</div>
                            <div className="table-content">{product.name}</div>
                        </div>
                        <div className="table-column">
                            <div className="table-label">Status</div>
                            <div className="table-content">
                                {product.status}
                            </div>
                        </div>
                        <div className="table-column">
                            <div className="table-label">Preço</div>
                            <div className="table-content">{product.price}</div>
                        </div>
                        <div className="table-column">
                            <div className="table-label">Quantidade</div>
                            <div className="table-content">
                                {product.quantity}
                            </div>
                        </div>
                        <div className="table-column row-actions">
                            <div className="table-label"></div>
                            <div className="table-content">
                                <i
                                    className="ri-pencil-fill ri-xl"
                                    onClick={() => {
                                        setProduct(product);
                                        setContent("product");
                                    }}
                                ></i>
                                <i
                                    className="ri-delete-bin-fill ri-xl"
                                    onClick={() => {
                                        deleteObj(product.id, "products");
                                    }}
                                ></i>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
