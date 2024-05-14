import { useState } from 'react';
import { hashPassword, verifyPassword } from '../utils/hash';

const Home = () => {
  const [password, setPassword] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');
  const [salt, setSalt] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isMatch, setIsMatch] = useState<boolean | null>(null);

  const handleHashPassword = () => {
    const { salt, hash } = hashPassword(password);
    setSalt(salt);
    setHashedPassword(hash);
  };

  const handleVerifyPassword = () => {
    const match = verifyPassword(inputPassword, hashedPassword, salt);
    setIsMatch(match);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-white dark:from-black dark:to-black">
      <h1 className="text-4xl font-bold mb-8 text-balance">Basic Hashing Utility</h1>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Hash a Password</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button onClick={handleHashPassword} className="bg-blue-500 text-white p-2 w-full">Hash Password</button>
        {hashedPassword && (
          <div className="mt-4">
            <h3 className="font-semibold">Salt:</h3>
            <p>{salt}</p>
            <h3 className="font-semibold">Hashed Password:</h3>
            <p>{hashedPassword}</p>
          </div>
        )}
      </div>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Verify a Password</h2>
        <input
          type="password"
          placeholder="Enter password to verify"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button onClick={handleVerifyPassword} className="bg-blue-500 text-white p-2 w-full">Verify Password</button>
        {isMatch !== null && (
          <div className="mt-4">
            <h3 className="font-semibold">Password Match:</h3>
            <p>{isMatch ? '✅ Passwords match!' : '❌ Passwords do not match!'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
