import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const TokenGuide: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tokenAddress = searchParams.get('address');
  const txHash = searchParams.get('tx');

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-300 pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Complete Token Guide</h1>

        <div className="space-y-12 max-w-3xl">
          {/* Contract Verification */}
          <section className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">1. Contract Verification</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Go to BSCScan and search for your token address</li>
              <li>Click "Verify and Publish" in the Contract tab</li>
              <li>Select Compiler Type: "Solidity (Single file)"</li>
              <li>Choose Compiler Version: "0.8.17"</li>
              <li>Set Optimization: "Yes" with 200 runs</li>
              <li>Copy contract source code from your deployment</li>
              <li>
                Enter Constructor Arguments (in ABI-encoded form):
                <div className="bg-gray-50 p-4 mt-2 rounded">
                  <p className="font-semibold">To get constructor arguments:</p>
                  <ol className="list-decimal pl-5 mt-2">
                    <li>Go to your token's creation transaction</li>
                    <li>Click "Click to see More"</li>
                    <li>Copy the Input Data field after the contract bytecode</li>
                  </ol>
                </div>
              </li>
            </ol>
          </section>

          {/* Adding Liquidity */}
          <section className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">2. Adding Liquidity</h2>
            <p className="mb-4">To make your token tradeable:</p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Visit PancakeSwap: <a href="https://pancakeswap.finance/add" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://pancakeswap.finance/add</a></li>
              <li>Select your token and BNB/BUSD pair</li>
              <li>Enter the amount of tokens and BNB/BUSD</li>
              <li>Click "Supply" and confirm the transaction</li>
              <li>Recommended initial liquidity: $500-1000 worth of BNB/BUSD</li>
            </ol>
          </section>

          {/* Contract Functions Guide */}
          <section className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">3. Contract Functions Guide</h2>
            <div className="space-y-4">
              <p>Your token contract includes several key functions:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><code>transfer(address to, uint256 amount)</code> - Send tokens to another address</li>
                <li><code>approve(address spender, uint256 amount)</code> - Allow another address to spend your tokens</li>
                <li><code>transferFrom(address from, address to, uint256 amount)</code> - Transfer tokens on behalf of another address</li>
                <li><code>balanceOf(address account)</code> - Check token balance of an address</li>
              </ul>
            </div>
          </section>

          {/* Quick Links */}
          <section className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
            <div className="space-y-3">
              <p>
                <strong>Token Address:</strong>{' '}
                <a 
                  href={`https://bscscan.com/address/${tokenAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {tokenAddress}
                </a>
              </p>
              <p>
                <strong>Creation Transaction:</strong>{' '}
                <a 
                  href={`https://bscscan.com/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {txHash}
                </a>
              </p>
              <div className="mt-6">
                <Link 
                  to={`/manage?address=${tokenAddress}`}
                  className="bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600 transition-colors"
                >
                  Manage Token
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TokenGuide;