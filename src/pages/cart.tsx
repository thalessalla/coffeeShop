import { useSelector } from "react-redux";
import ItemCard from "../components/item-cart";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Button } from "@mui/material";
import Payment from "../components/payment";

function Cart() {
  const cart = useSelector((state: RootState) => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceCupom, setPriceCupom] = useState(0);
  const [cupomInput, setCupomInput] = useState("");

  const handleInputChange = (event: any) => {
    setCupomInput(event.target.value);
  };
  const cupom = "cupom10";
  const handleAddCupom = () => {
    if (cupomInput === cupom) {
      setPriceCupom(totalPrice);
      setTotalPrice((prevPrice) => prevPrice - prevPrice * 0.1);
      // setCupomInput("");
    }
  };

  useEffect(() => {
    if (cupomInput === cupom) {
      let total = 0;
      cart.items.forEach((item) => {
        total += Number(item.totalPrice);
      });
      setPriceCupom(totalPrice);
      setTotalPrice((prevPrice) => prevPrice - prevPrice * 0.1);
    } else {
      let total = 0;
      cart.items.forEach((item) => {
        total += Number(item.totalPrice);
      });
      setTotalPrice(total);
    }
  }, [cart.totalQuantity]);

  return (
    <>
      <div className="mx-5 min-h-screen flex flex-col ">
        <h1 className="font-bold text-3xl my-8 mt-20">Checkout</h1>

        <div className="flex flex-wrap justify-center gap-8 sm:flex ">
          <div className=" w-[100%] md:max-w-[48%]">
            <div className=" bg-secondary flex flex-col p-4 w-full md:p-10">
              <h2 className="text-xl font-bold mb-1">Complete seu pedido!</h2>
              <p className="mb-4">Insira seus dados para receber seu café.</p>

              <Payment />
            </div>
          </div>

          <div className=" w-[100%] md:max-w-[48%]  ">
            <div className="bg-secondary p-4 md:p-10">
              {cart.totalQuantity < 1 && (
                <>
                  <p className="font-bold text-xl ">
                    Seu carrinho ainda está vazio
                  </p>
                  <RemoveShoppingCartIcon className="mt-8 text-7xl text-zinc-300 " />
                </>
              )}

              {cart.totalQuantity > 0 && (
                <>
                  <h2 className="text-xl font-bold mb-1">Você selecionou</h2>
                  <p className="mb-8">
                    Confira se está tudo certo no seu pedido
                  </p>

                  {cart &&
                    cart.items.map((coffe) => (
                      <>
                        <ItemCard
                          key={coffe.id}
                          id={coffe.id}
                          name={coffe.title}
                          price={coffe.totalPrice}
                          photo={coffe.picture}
                          qtd={coffe.quantity}
                        />
                        <hr className="border-zinc-300" />
                      </>
                    ))}

                  {priceCupom > 0 && (
                    <div className="flex justify-between font-bold mt-3 mb-8 ">
                      <p className="text-neutral-600">Preço sem cupom: </p>
                      <p className="text-neutral-600">
                        R$ {priceCupom.toFixed(2)}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between font-bold text-xl mt-3">
                    <p>Total: </p>
                    <p>R$ {totalPrice.toFixed(2)}</p>
                  </div>

                  <input
                    type="text"
                    placeholder="Cupom"
                    value={cupomInput}
                    onChange={handleInputChange}
                    className="p-2 mt-6 rounded-sm mr-4 disabled:bg-gray-300 disabled:text-gray-500"
                    disabled={priceCupom > 0}
                  />
                  <Button
                    variant="outlined"
                    onClick={handleAddCupom}
                    className="border-primary text-primary hover:bg-amber-900 hover:text-white  disabled:cursor-not-allowed disabled:border-neutral-400 disabled:text-neutral-400"
                    disabled={priceCupom > 0}
                  >
                    Aplicar
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
