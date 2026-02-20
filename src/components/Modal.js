import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      
      // Focus trap
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    } else {
      // Return focus to previous element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111111] bg-opacity-80"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-[#f7f7f5] border-2 border-[#111111] max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#f7f7f5] border-b border-[#111111] p-6 flex justify-between items-start">
          <h2 className="text-3xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] px-3"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
