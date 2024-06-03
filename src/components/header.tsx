import { useSelector } from "react-redux";
import { RootState } from "../store";
import CoffeeIcon from "@mui/icons-material/Coffee";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  token: boolean;
  onLogout: () => void;
}

function Header({ token, onLogout }: Props) {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <>
      <header>
        <div className="flex justify-between py-3 bg-background fixed top-0 w-[100%] max-w-[1212px] z-50 px-3">
          <div>
            <Link to="/">
              <CoffeeIcon fontSize="large" />
            </Link>
          </div>

          <div className="flex gap-1 sm:gap-3">
            {!token && (
              <Button>
                <Link to="/login">Login</Link>
              </Button>
            )}
            {token && (
              <>
                <Button onClick={onLogout}>
                  <Link to="/">Logout</Link>
                </Button>

                <Button>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              </>
            )}

            <Button
              component={Link}
              to="/carrinho"
              variant="contained"
              color="primary"
              className="bg-primary w-[64px] hover:bg-amber-900"
              startIcon={<ShoppingCartIcon className="text-background" />}
            >
              {cart.totalQuantity}
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
