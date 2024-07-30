import { useContext, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';
import { useWarning } from './redux/context/WarningContext';
import { CartContext } from './redux/context/cartContext';

const AppContent = () => {
  const { showWarning } = useWarning();
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('CartContext must be used within a CartProvider');
  }

  const { state } = cartContext;
  const cartItems = state.cart;

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (cartItems.length === 0) {
        return;
      }
      e.preventDefault();
      e.returnValue = '';
      showWarning(() => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        window.location.reload();
      });
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [cartItems.length, showWarning]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppContent;
