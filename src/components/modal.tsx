import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";

interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
  handleOpenModal: (open: boolean) => void;
}

export default function ModalConfirmation({
  isOpen,
  onCancel,
  onConfirm,
  isPending,
  handleOpenModal,
}: Props) {
  return (
    <div>
      <Dialog open={isOpen} onClose={() => handleOpenModal(false)}>
        <DialogTitle>Excluir Pedido</DialogTitle>
        <DialogContent>Você realmente quer excuir este pedido</DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancelar</Button>

          <LoadingButton
            variant="outlined"
            onClick={onConfirm}
            loading={isPending}
            disabled={isPending}
          >
            Excluir
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
