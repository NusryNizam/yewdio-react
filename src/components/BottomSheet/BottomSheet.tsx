import { FunctionComponent, ReactNode } from "react";

import { Pressable } from "@ark-ui/react";
import "./BottomSheet.css";

type BottomSheetProps = {
  title: string;
  closeEvent: () => void;
  children: ReactNode;
};
const BottomSheet: FunctionComponent<BottomSheetProps> = (props) => {
  const closeModal = () => {
    props.closeEvent();
  };

  return (
    <div className="bottom-sheet">
      <div className="bottom-sheet-content">
        <div className="header">
          <Pressable
            className="icon-button close-btn"
            aria-label="Close"
            onPress={closeModal}
          >
            ✕
          </Pressable>
        </div>
        <div>{props.children}</div>
      </div>
      <div className="modal-bg" onClick={closeModal}></div>
    </div>
  );
};

export default BottomSheet;
