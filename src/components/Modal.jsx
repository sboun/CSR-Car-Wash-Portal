import "./modal.css";

export default function Modal({ children, onClose }) {
  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
