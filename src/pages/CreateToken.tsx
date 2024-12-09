import React, { useState } from 'react';
import { Contract, utils } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { FACTORY_ADDRESS, FACTORY_ABI } from '../constants/contracts';
import Disclaimer from '../components/Disclaimer';
import Success from '../components/Success';

// Добавляем интерфейс в начало файла после импортов
interface SuccessData {
  tokenAddress: string;
  txHash: string;
}

const CreateToken: React.FC = () => {
  const { library, account } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [whitelistInput, setWhitelistInput] = useState('');
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState<SuccessData | null>(null);

  const validateAddress = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleWhitelistAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && whitelistInput) {
      e.preventDefault();
      if (!validateAddress(whitelistInput)) {
        setError('Invalid address format');
        return;
      }
      if (!whitelist.includes(whitelistInput)) {
        setWhitelist([...whitelist, whitelistInput]);
        setWhitelistInput('');
        setError('');
      }
    }
  };

  const handleWhitelistRemove = (addressToRemove: string) => {
    setWhitelist(whitelist.filter(address => address !== addressToRemove));
  };

  // Проверка валидности формы
  const isValid = tokenName.trim() !== '' && 
                 tokenSymbol.trim() !== '' && 
                 totalSupply.trim() !== '' &&
                 !isNaN(Number(totalSupply)) &&
                 Number(totalSupply) > 0;

  const createToken = async () => {
    try {
      if (!library || !account) {
        setError('Please connect your wallet first');
        return;
      }

      setIsLoading(true);
      setError('');

      const signer = library.getSigner();
      const factory = new Contract(FACTORY_ADDRESS, FACTORY_ABI, signer);
      
      const params = {
        name: tokenName,
        symbol: tokenSymbol,
        totalSupply: utils.parseUnits(totalSupply, 18),
        whitelist: whitelist
      };

      const tx = await factory.createToken(
        params,
        {
          value: utils.parseEther("0.35"),
          gasLimit: 3000000
        }
      );

      const receipt = await tx.wait();
      
      // Получаем событие TokenCreated
      const tokenCreatedEvent = receipt.events?.find(
        (event: any) => event.event === 'TokenCreated'
      );

      // В событии TokenCreated первый аргумент (token) - это адрес токена
      const tokenAddress = tokenCreatedEvent?.args[0]; // или tokenCreatedEvent?.args.token

      setSuccessData({
        tokenAddress: tokenAddress,
        txHash: tx.hash
      });

      setTokenName('');
      setTokenSymbol('');
      setTotalSupply('');
      setWhitelist([]);

    } catch (error: any) {
      console.error('Error details:', error);
      setError(`Failed to create token: ${error.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-300 pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">Create Your Token 🍯</h1>
        
        {/* Добавляем привлекательный баннер с ценой */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r mb-8">
          <p className="text-xl font-bold text-amber-800">
            Just 0.35 BNB for your own secure token! 🚀
          </p>
          <p className="text-gray-600 mt-1">
            Get a professional-grade token with advanced security features
          </p>
        </div>

        {successData ? (
          <Success 
            tokenAddress={successData.tokenAddress}
            txHash={successData.txHash}
          />
        ) : (
          <>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <div className="space-y-6 max-w-2xl">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="font-semibold">Token Name</label>
                  <div className="tooltip cursor-help">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <input
                  type="text"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  placeholder="Bitcoin"
                  className="w-full p-3 rounded border focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <p className="text-sm text-gray-500 mt-1">Example: Bitcoin, Ethereum, etc.</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="font-semibold">Token Symbol</label>
                  <div className="tooltip cursor-help">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <input
                  type="text"
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value)}
                  placeholder="BTC"
                  className="w-full p-3 rounded border focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <p className="text-sm text-gray-500 mt-1">Example: BTC, ETH, USDT. This will be used on exchanges.</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="font-semibold">Total Supply</label>
                  <div className="tooltip cursor-help">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <input
                  type="text"
                  value={totalSupply}
                  onChange={(e) => setTotalSupply(e.target.value)}
                  placeholder="1000000"
                  className="w-full p-3 rounded border focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <p className="text-sm text-gray-500 mt-1">Maximum number of tokens. Common values: 1,000,000 or 100,000,000</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="font-semibold">Whitelist Addresses</label>
                  <div className="tooltip cursor-help">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <input
                  type="text"
                  value={whitelistInput}
                  onChange={(e) => setWhitelistInput(e.target.value)}
                  onKeyPress={handleWhitelistAdd}
                  placeholder="Enter wallet address and press Enter"
                  className="w-full p-3 rounded border focus:ring-2 focus:ring-amber-500 outline-none"
                />
                {whitelist.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {whitelist.map((address, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                        <span className="text-sm truncate">{address}</span>
                        <button
                          onClick={() => handleWhitelistRemove(address)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-1">Optional: Add addresses that will be excluded from fees</p>
              </div>

              <button
                onClick={createToken}
                disabled={!isValid || isLoading}
                className={`w-full bg-amber-500 text-white py-4 rounded-lg text-lg font-bold ${
                  !isValid || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-600'
                }`}
              >
                {isLoading ? (
                  'Creating...'
                ) : (
                  <>
                    Create Token for 0.35 BNB
                    <span className="text-sm block mt-1">Includes all security features!</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
      
      <Disclaimer />
    </div>
  );
};

export default CreateToken;