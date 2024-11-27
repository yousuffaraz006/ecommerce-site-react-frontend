import { useContext } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { ContextComponent } from "@/context";
import CommonForm from "../common-form";

function CommonDialog({ title, formControls, handleSubmit, btnText }) {
  const { showDialog, setShowDialog, currentDeleteId, setCurrentDeleteId, setCurrentUpdateId } =
    useContext(ContextComponent);
  return (
    <Dialog open={showDialog} onOpenChange={() => {
      setCurrentUpdateId(null);
      setCurrentDeleteId(null);
      setShowDialog(false);
    }}>
      <DialogContent className="sm:max-w-screen h-[450px] overflow-auto">
        <DialogTitle>{title}</DialogTitle>
        {currentDeleteId ? (
          <h1 className="text-2xl font-bold">
            Are you sure you want to delete this product?
          </h1>
        ) : (
          ""
        )}
        <CommonForm
          formControls={formControls}
          handleSubmit={handleSubmit}
          btnText={btnText}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CommonDialog;
