import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      ref.current && !ref.current.contains(e.target) && close();
    }

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [close]);

  if (openName !== name) return null;

  return createPortal(
    <div className="overlay">
      <div className="position-relative w-75" ref={ref}>
        <button onClick={close} className="btn close-btn position-absolute">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <>{cloneElement(children, { onCloseModal: close })}</>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
