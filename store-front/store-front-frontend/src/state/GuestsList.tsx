import { useState } from 'react';

const GuestsList: React.FC = () => {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState<string[]>([]);

  const handleAddGuest = () => {
    setName('');
    setGuests([...guests, name]);
  };

  return (
    <>
      <h3>Guests List</h3>
      <ul>
        {guests.map((guest, i) => (
          <li key={i}>{guest}</li>
        ))}
      </ul>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAddGuest}>Add Guest</button>
    </>
  );
};

export default GuestsList;
