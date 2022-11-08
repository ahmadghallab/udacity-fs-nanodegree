import ReactDOM from 'react-dom/client';
import GuestsList from './state/GuestsList';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div>
    <GuestsList />
  </div>
);
