import { useEffect, useRef, useState } from 'react';

const users = [
  { name: 'Ahmad', age: 30 },
  { name: 'Ali', age: 32 },
  { name: 'Samy', age: 25 },
];

const UserSearch: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const [user, setUser] = useState<{ name: string; age: number } | undefined>();

  const handleFindUser = () => {
    const foundUser = users.find((user) => user.name === name);

    setUser(foundUser);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleFindUser}>Find User</button>

      {user?.name}
    </>
  );
};

export default UserSearch;
