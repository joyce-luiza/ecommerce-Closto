import "../styles/creditCardStyle.css";
import "remixicon/fonts/remixicon.css";

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
                    <i
                        class="ri-delete-bin-line"
                        onClick={() => deleteCreditCard(creditCard.id)}
                    ></i>
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
