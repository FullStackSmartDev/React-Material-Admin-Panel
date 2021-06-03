import { useContext } from 'react';
import DialerContext from 'src/context/DialerContext';

export default function useDialer() {
  const context = useContext(DialerContext);

  return context;
}
