import React from 'react';

const PopupConsumo = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Descripción</h2>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default PopupConsumo;
