import "../styles/creditCardStyle.css";

export default function CreditCard({
    creditCard,
    getCreditCards,
    setCrudCreditCard,
    setCreditCard,
    deleteCreditCard,
}) {
    return (
        <section className="creditCard-container">
            <div className="creditCard-title_Desc">
                <div className="creditCard-title">
                    <a>{creditCard.title}</a>
                    <img
                        className="creditCard-delete"
                        src="https://via.placeholder.com/24x24"
                        alt="Excluir"
                        onClick={() => deleteCreditCard(creditCard.id)}
                    />
                </div>
            </div>

            <div className="creditCard-info">
                <span>Nome impresso: {creditCard.cardHolderName}</span>
                <span>Número do cartão: {creditCard.number}</span>
                <span>Bandeira: {creditCard.flag}</span>
            </div>

            <div className="btn-creditCard">
                <button
                    className="toEdit"
                    onClick={() => {
                        setCrudCreditCard("patch");
                        setCreditCard(creditCard);
                    }}
                >
                    Editar
                </button>
            </div>
        </section>
    );
}
