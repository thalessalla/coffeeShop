import { Alert, Button, Snackbar } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../slices/cartSlice";
import { useState } from "react";

interface Props {
  id: number;
  title: string;
  price: number;
  description: string;
  picture: string;
}

function Card({ title, price, picture, description, id }: Props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  // Fechar O alert de add ao carrinho
  const handleClose = () => {
    setOpen(false);
  };

  const addToCartHandler = () => {
    dispatch(addItemToCart({ title, price, picture, id }));
    setOpen(true);
  };

  return (
    <>
      <div className="max-w-[280px] bg-secondary p-6 rounded-sm h-full relative flex flex-col items-center">
        <img src={picture} alt={title} className="h-[150px]" loading="lazy" />
        <h3 className="text-center font-bold text-xl mb-2">{title}</h3>
        <p className="text-center mb-24">{description}</p>

        <div className=" mt-5 absolute bottom-6">
          <p className="text-center mb-4 text-xs">
            R$ <span className="text-xl font-bold">{price}</span>
          </p>
          <Button
            variant="contained"
            color="primary"
            className="bg-primary w-[200px] hover:bg-amber-900"
            endIcon={<AddShoppingCartIcon className="text-white" />}
            onClick={addToCartHandler}
          >
            Comprar
          </Button>
        </div>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            className="w-full"
          >
            O item foi adicionado ao carrinho
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default Card;
