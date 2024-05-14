'use client';

import { useState } from 'react';
import { hashPassword, verifyPassword } from './utils/hash';

const Home = () => {
  const [password, setPassword] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');
  const [salt, setSalt] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const [verifyHashedPassword, setVerifyHashedPassword] = useState('');
  const [verifyPasswordInput, setVerifyPasswordInput] = useState('');
  const [isDecryptedMatch, setIsDecryptedMatch] = useState<boolean | null>(null);

  const handleHashPassword = () => {
    const { salt, hash } = hashPassword(password);
    setSalt(salt);
    setHashedPassword(hash);
  };

  const handleVerifyPassword = () => {
    const match = verifyPassword(inputPassword, hashedPassword, salt);
    setIsMatch(match);
  };

  const handleDecryptPassword = () => {
    const match = verifyPassword(verifyPasswordInput, verifyHashedPassword, salt);
    setIsDecryptedMatch(match);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-200 to-white dark:from-black dark:to-black">
      <h1 className="text-4xl font-bold mb-8 text-balance">Basic Hashing Utility</h1>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Hash a Password</h2>
        <input
          type="text"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button onClick={handleHashPassword} className="bg-blue-500 text-white p-2 w-full">Hash Password</button>
        {hashedPassword && (
          <div className="mt-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Salt:</h3>
            <p className="text-gray-900 dark:text-gray-300 break-all">{salt}</p>
            <h3 className="font-semibold text-gray-900 dark:text-white">Hashed Password:</h3>
            <p className="text-gray-900 dark:text-gray-300 break-all">{hashedPassword}</p>
          </div>
        )}
      </div>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Verify a Password</h2>
        <input
          type="text"
          placeholder="Enter password to verify"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          className="border p-2 w-full mb-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button onClick={handleVerifyPassword} className="bg-blue-500 text-white p-2 w-full">Verify Password</button>
        {isMatch !== null && (
          <div className="mt-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Password Match:</h3>
            <p className={`text-lg ${isMatch ? 'text-green-500' : 'text-red-500'}`}>
              {isMatch ? '✅ Passwords match!' : '❌ Passwords do not match!'}
            </p>
          </div>
        )}
      </div>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Decrypt and Verify a Hashed Password</h2>
        <input
          type="text"
          placeholder="Enter hashed password"
          value={verifyHashedPassword}
          onChange={(e) => setVerifyHashedPassword(e.target.value)}
          className="border p-2 w-full mb-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <input
          type="text"
          placeholder="Enter password to verify"
          value={verifyPasswordInput}
          onChange={(e) => setVerifyPasswordInput(e.target.value)}
          className="border p-2 w-full mb-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button onClick={handleDecryptPassword} className="bg-blue-500 text-white p-2 w-full">Decrypt and Verify</button>
        {isDecryptedMatch !== null && (
          <div className="mt-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Password Match:</h3>
            <p className={`text-lg ${isDecryptedMatch ? 'text-green-500' : 'text-red-500'}`}>
              {isDecryptedMatch ? '✅ Passwords match!' : '❌ Passwords do not match!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;


