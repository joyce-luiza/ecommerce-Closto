import "../styles/tableRowStyle.css";

// export default function Table({ children }) {
//     return <div className="table-container">{children}</div>;
// }

export default function Table({
    user,
    type,
    data,
    deleteObj,
    setContent,
    setData,
}) {
    return (
        <>
            {type === "products" && (
                <div className="table-container">
                    {data.map((product) => {
                        return (
                            <div key={product.id} className="row-container">
                                <div className="table-column">
                                    <div className="table-label">ID</div>
                                    <div className="table-content">
                                        {product.id}
                                    </div>
                                </div>
                                <div className="table-column">
                                    <div className="table-label">Nome</div>
                                    <div className="table-content">
                                        {product.name}
                                    </div>
                                </div>
                                <div className="table-column">
                                    <div className="table-label">Status</div>
                                    <div className="table-content">
                                        {product.status}
                                    </div>
                                </div>
                                <div className="table-column">
                                    <div className="table-label">Preço</div>
                                    <div className="table-content">
                                        {product.price}
                                    </div>
                                </div>
                                <div className="table-column">
                                    <div className="table-label">
                                        Quantidade
                                    </div>
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
                                                setData(product);
                                                setContent("product");
                                            }}
                                        ></i>
                                        <i
                                            className="ri-delete-bin-fill ri-xl"
                                            onClick={() => {
                                                deleteObj(
                                                    product.id,
                                                    "products"
                                                );
                                            }}
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            {(type === "orders" || type === "exchangeableOrders") && (
                <div className="table-container">
                    {data.map((order) => {
                        return (
                            <div key={order.id} className="row-container">
                                <div className="table-column">
                                    <div className="table-label">
                                        Número do pedido
                                    </div>
                                    <div className="table-content column-order-id">
                                        {order.id}
                                    </div>
                                </div>

                                <div className="table-column">
                                    <div className="table-label">Status</div>
                                    <div className="table-content column-order-status">
                                        {order.status}
                                    </div>
                                </div>
                                <div className="table-column">
                                    <div className="table-label">Data</div>
                                    <div className="table-content column-order-date">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="table-column">
                                    <div className="table-label">Valor</div>
                                    <div className="table-content column-order-value">
                                        {order.total}
                                    </div>
                                </div>
                                {type === "orders" && user === "user" && (
                                    <div className="table-column">
                                        <div className="table-label"></div>
                                        <div className="table-content">
                                            <p
                                                onClick={() => {
                                                    setData(order);
                                                    setContent("Pedido");
                                                }}
                                            >
                                                Ver mais
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {type === "exchangeableOrders" &&
                                    user === "user" && (
                                        <div className="table-column">
                                            <div className="table-label"></div>
                                            <div className="table-content">
                                                <button
                                                    className="select-exchange"
                                                    onClick={() => {
                                                        setData(order);
                                                        setContent(
                                                            "Nova Troca"
                                                        );
                                                    }}
                                                >
                                                    Selecionar
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                {user === "admin" && (
                                    <div className="table-column row-actions">
                                        <div className="table-label"></div>
                                        <div className="table-content">
                                            <i
                                                className="ri-pencil-fill ri-xl"
                                                onClick={() => {
                                                    setData(order);
                                                    setContent("order");
                                                }}
                                            ></i>
                                            <i
                                                className="ri-delete-bin-fill ri-xl"
                                                onClick={() => {
                                                    deleteObj(
                                                        order.id,
                                                        "orders"
                                                    );
                                                }}
                                            ></i>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
            {type === "exchanges" && (
                <div className="table-container">
                    {data.map((exchange) => {
                        return (
                            <div key={exchange.id} className="row-container">
                                <div className="table-column">
                                    <div className="table-label">
                                        Número da troca
                                    </div>
                                    <div className="table-content column-exchange-id">
                                        {exchange.id}
                                    </div>
                                </div>
                                <div className="table-column">
                                    <div className="table-label">
                                        Número do pedido
                                    </div>
                                    <div className="table-content column-exchange-order-id">
                                        {exchange.order_id}
                                    </div>
                                </div>

                                <div className="table-column">
                                    <div className="table-label">Status</div>
                                    <div className="table-content column-exchange-status">
                                        {exchange.status}
                                    </div>
                                </div>
                                <div className="table-column">
                                    <div className="table-label">Data</div>
                                    <div className="table-content column-exchange-date">
                                        {new Date(
                                            exchange.createdAt
                                        ).toLocaleDateString()}
                                    </div>
                                </div>
                                {user === "user" && (
                                    <div className="table-column">
                                        <div className="table-label"></div>
                                        <div className="table-content">
                                            <p
                                                onClick={() => {
                                                    setData(exchange);
                                                    setContent(
                                                        "Perfil da Troca"
                                                    );
                                                }}
                                            >
                                                Ver mais
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {user === "admin" && (
                                    <div className="table-column row-actions">
                                        <div className="table-label"></div>
                                        <div className="table-content">
                                            <i
                                                className="ri-pencil-fill ri-xl"
                                                onClick={() => {
                                                    setData(exchange);
                                                    setContent(
                                                        "Perfil da Troca"
                                                    );
                                                }}
                                            ></i>
                                            <i
                                                className="ri-delete-bin-fill ri-xl"
                                                onClick={() => {
                                                    deleteObj(
                                                        exchange.id,
                                                        "exchanges"
                                                    );
                                                }}
                                            ></i>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {type === "coupons" && (
                <div className="table-container">
                    {data.map((coupon) => {
                        return (
                            <div key={coupon.id} className="row-container">
                                <div className="table-column">
                                    <div className="table-label">ID</div>
                                    <div className="table-content coupon-id">
                                        {coupon.id}
                                    </div>
                                </div>
                                <div className="table-column">
                                    <div className="table-label">Código</div>
                                    <div className="table-content coupon-code">
                                        {coupon.code}
                                    </div>
                                </div>
                                <div className="table-column">
                                    <div className="table-label">Valor</div>
                                    <div className="table-content coupon-discount">
                                        R${coupon.discountValue}
                                    </div>
                                </div>
                                <div className="table-column">
                                    <div className="table-label">Validade</div>
                                    <div className="table-content coupon-expiration">
                                        {new Date(
                                            coupon.createdAt
                                        ).toLocaleDateString() || "Não expira"}
                                    </div>
                                </div>
                                {(coupon.active && (
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                coupon.code
                                            );
                                        }}
                                    >
                                        Utilizar
                                    </button>
                                )) || <p>Utilizado</p>}
                                {user === "admin" && (
                                    <div className="table-column row-actions">
                                        <div className="table-label"></div>
                                        <div className="table-content">
                                            <i
                                                className="ri-pencil-fill ri-xl"
                                                onClick={() => {
                                                    setData(coupon);
                                                    setContent("Cupom");
                                                }}
                                            ></i>
                                            <i
                                                className="ri-delete-bin-fill ri-xl"
                                                onClick={() => {
                                                    deleteObj(
                                                        coupon.id,
                                                        "products"
                                                    );
                                                }}
                                            ></i>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}
