import "../../styles/Cart.css";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import CartItem from "../../components/CartItem";
import Axios from "axios";
import { useEffect } from "react";

function Cart() {
    const { cart, clearCart } = useContext(CartContext)
    const [userCreditCards, setUserCreditCards] = useState([]);
    const [paymentCards, setPaymentCards] = useState([]);

    const addCardToPayment = ((creditCard, checked) => {
        if(checked){
            creditCard.checked = checked
            setPaymentCards([...paymentCards, creditCard])
        } else {
            creditCard.checked = checked
            const filteredPaymentCards = paymentCards.filter((card) => card.id !== creditCard.id)
            setPaymentCards(filteredPaymentCards);
        }
    })

    const addValueToCardToPayment = ((creditCard, value) => {
            creditCard.toPay = value;
    })

    const getCreditCards = (async () => {
        await Axios.get("http://localhost:3333/user/cards", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })
            .then((res) => {
                setUserCreditCards(res.data);

            })
            .catch((error) => {
                console.log(error);
            });
    });

    useEffect(() => {
        getCreditCards()
    }, [])

    return(
        <section className="cart-container">
            <div className="cartContent">
                <div className="cartContent-title">
                    <h1>Meu carrinho</h1>
                    <button onClick={clearCart}>Limpar</button>
                </div>
                {cart.map((product, index) => {
                    return(
                        <CartItem key={index} product={product} index={index}/>
                    )
                })}

            </div>

            <div className="cartCreditCards">
                <h1>Cartões cadastrados</h1>

                {userCreditCards.map((creditCard) => {
                    return (
                        <>
                            <div className="cardCheckbox">
                                <label for={`card-${creditCard.id}`}>{creditCard.number}</label>
                                <input
                                    type="checkbox"
                                    id={`card-${creditCard.id}`}
                                    name={`card-${creditCard.id}`}
                                    onChange={((e) => {
                                        addCardToPayment(creditCard, e.target.checked)
                                        console.log(creditCard)
                                    })}
                                />
                            </div>


                            {creditCard.checked &&
                                <>
                                    <label for="valueToPay">Insira o valor a ser cobrado: </label>
                                    <input type="number" name="valueToPay" id="valueToPay" onChange={(e) => {addValueToCardToPayment(creditCard, parseFloat(e.target.value))}}/>
                                </>
                            }
                        </>
                    )
                })}
            </div>

        </section>
    )
}

export default Cart;