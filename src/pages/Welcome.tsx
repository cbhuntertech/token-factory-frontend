import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../utils/web3';
import { useNavigate } from 'react-router-dom'; // Убрал неиспользуемый Link

const Welcome: React.FC = () => {
  const { account, activate, active } = useWeb3React();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (active && account) {
      navigate('/create');
    }
  }, [active, account, navigate]);

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage.getItem('previouslyConnected') === 'true') {
        try {
          await activate(injected);
        } catch (error) {
          console.error('Error on auto-connect:', error);
        }
      }
    };
    connectWalletOnPageLoad();
  }, [activate]);

  const connectWallet = async () => {
    try {
      setError('');
      await activate(injected, undefined, true);
      localStorage.setItem('previouslyConnected', 'true');
    } catch (error: any) {
      setError(error?.message || 'Failed to connect wallet');
      console.error('Failed to connect:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-300">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Secure Token Creator 🛡️</h1>
          
          <div className="inline-block bg-amber-50 rounded-full px-6 py-3 shadow-lg mb-6">
            <p className="text-2xl font-bold text-amber-800">
              Just 0.35 BNB! 🚀
            </p>
          </div>
          
          <p className="text-xl text-gray-700 mb-8">
            Create your own secure token with advanced anti-bot and anti-dump protection (Currently supports MetaMask wallet only)
          </p>

          <button 
            onClick={connectWallet}
            className="bg-amber-500 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-amber-600 transition-colors inline-flex items-center gap-2"
          >
            Create Token Now
            <span className="text-sm">Only 0.35 BNB</span>
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">🛡️ Advanced Security</h3>
            <p>Anti-bot & anti-dump protection built-in</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">💰 Fair Price</h3>
            <p>Just 0.35 BNB for a professional token</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">🚀 Ready to Use</h3>
            <p>Instant deployment, no coding needed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;