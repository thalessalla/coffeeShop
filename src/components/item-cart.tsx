import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  addItemToCart,
  removeItemFromCart,
  removerProductCart,
} from "../slices/cartSlice";
import { useDispatch } from "react-redux";

interface Props {
  id: number;
  name: string;
  price: number;
  photo: string;
  qtd: number;
}

function ItemCard({ name, price, photo, qtd, id }: Props) {
  const dispatch = useDispatch();

  const handleRemoveItem = (id: number) => {
    dispatch(removeItemFromCart(id));
  };

  const HandleremoverProductCart = (id: number) => {
    dispatch(removerProductCart(id));
  };

  const addToCartHandler = () => {
    dispatch(
      addItemToCart({
        id,
        title: "",
        price: 0,
        picture: "",
      })
    );
  };

  return (
    <>
      <div className="flex gap-3 min-w-full justify-between mt-6 items-center ">
        <div className="w-[60px] ">
          <img src={photo} alt={name} className="h-[150px] object-cover" />
        </div>

        <div>
          <h3 className="font-bold text-xl">{name}</h3>

          <div className="flex  mt-2 gap-3">
            <div className="flex bg-gray-300">
              <Button
                variant="text"
                className="text-text hover:bg-background"
                onClick={() => handleRemoveItem(id)}
              >
                -
              </Button>
              <p className="px-4 mt-1">{qtd}</p>
              <Button
                variant="text"
                className="text-text hover:bg-background"
                onClick={addToCartHandler}
              >
                +
              </Button>
            </div>

            <Button
              variant="text"
              className="bg-gray-300 hover:bg-background"
              onClick={() => HandleremoverProductCart(id)}
            >
              <DeleteIcon className="text-text" />
            </Button>
          </div>
        </div>

        <div>
          <p className="font-bold ">R$ {price.toFixed(2)} </p>
        </div>
      </div>
    </>
  );
}

export default ItemCard;
