import React from 'react';

const PopupConsumo = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <main>
    {isPopupOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
          <h2 className="text-xl font-bold mb-4">Descripción</h2>
          <p>Super descripcion, hola jp </p>

          <Table>
            data={consumo}
            columns={columnsconsumo}


          </Table>


          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
            onClick={togglePopup}
          >
            Cerrar
          </button>
        </div>
      </div>
    )}

</main>
  );
};

export default PopupConsumo;
