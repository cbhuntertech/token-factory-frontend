import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Success: React.FC<{ tokenAddress: string; txHash: string }> = ({ tokenAddress, txHash }) => {
  const navigate = useNavigate();
  const [copyStatus, setCopyStatus] = useState('');

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(`${type} copied!`);
      setTimeout(() => setCopyStatus(''), 2000);
    } catch (err) {
      setCopyStatus('Failed to copy');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Token created successfully! 🎉</h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded relative group">
            <p className="text-sm text-gray-600">Transaction Hash:</p>
            <div className="flex items-center gap-2">
              <p className="font-mono text-sm break-all">{txHash}</p>
              <button 
                onClick={() => copyToClipboard(txHash, 'Hash')}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                📋
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded relative group">
            <p className="text-sm text-gray-600">Token Address:</p>
            <div className="flex items-center gap-2">
              <p className="font-mono text-sm break-all">{tokenAddress}</p>
              <button 
                onClick={() => copyToClipboard(tokenAddress, 'Address')}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                📋
              </button>
            </div>
          </div>

          {copyStatus && (
            <div className="text-center text-sm text-green-600">
              {copyStatus}
            </div>
          )}

          <button
            onClick={() => navigate(`/token-details?address=${tokenAddress}&tx=${txHash}`)}
            className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition-colors font-bold"
          >
            Continue to Token Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;