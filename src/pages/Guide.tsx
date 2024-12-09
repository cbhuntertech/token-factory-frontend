import React from 'react';

const Guide: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h2 className="text-3xl font-bold mb-8">Complete Token Guide</h2>
      
      <div className="space-y-12">
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">1. Contract Verification</h3>
          <ol className="list-decimal pl-6 space-y-4">
            <li>Go to BSCScan and search for your token address</li>
            <li>Click "Verify and Publish" in the Contract tab</li>
            <li>Select Compiler Type: "Solidity (Single file)"</li>
            <li>Choose Compiler Version: "0.8.17"</li>
            <li>Set Optimization: "Yes" with 200 runs</li>
            <li>Copy contract source code from your deployment</li>
            <li>Enter Constructor Arguments (in ABI-encoded form):
              <div className="bg-gray-100 p-4 mt-2 rounded">
                <code>To get constructor arguments:</code>
                <ol className="list-decimal pl-6 mt-2">
                  <li>Go to your token's creation transaction</li>
                  <li>Click "Click to see More"</li>
                  <li>Copy the Input Data field after the contract bytecode</li>
                </ol>
              </div>
            </li>
          </ol>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">2. Adding Liquidity</h3>
          <div className="space-y-4">
            <p>To make your token tradeable:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Visit PancakeSwap: <a href="https://pancakeswap.finance/add" className="text-blue-600 hover:underline">https://pancakeswap.finance/add</a></li>
              <li>Select your token and BNB/BUSD pair</li>
              <li>Enter the amount of tokens and BNB/BUSD</li>
              <li>Click "Supply" and confirm the transaction</li>
              <li>Recommended initial liquidity: $500-1000 worth of BNB/BUSD</li>
            </ol>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">3. Contract Functions Guide</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold">Basic Functions:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>transfer</strong> - Send tokens to another address</li>
                <li><strong>approve</strong> - Allow another address to spend your tokens</li>
                <li><strong>transferFrom</strong> - Transfer tokens on behalf of another address</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold">Owner Functions:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>excludeFromFee</strong> - Remove address from paying transaction fees</li>
                <li><strong>includeInFee</strong> - Add address back to paying transaction fees</li>
                <li><strong>setTaxFeePercent</strong> - Modify reflection fee (1-10%)</li>
                <li><strong>setLiquidityFeePercent</strong> - Modify liquidity fee (1-10%)</li>
                <li><strong>setMaxTxAmount</strong> - Set maximum transaction amount</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold">View Functions:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>balanceOf</strong> - Check token balance of an address</li>
                <li><strong>totalSupply</strong> - View total token supply</li>
                <li><strong>allowance</strong> - Check approved spending amount</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">4. Important Links</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>BSCScan: <a href="https://bscscan.com" className="text-blue-600 hover:underline">https://bscscan.com</a></li>
            <li>PancakeSwap: <a href="https://pancakeswap.finance" className="text-blue-600 hover:underline">https://pancakeswap.finance</a></li>
            <li>Add to MetaMask: 
              <div className="bg-gray-100 p-4 mt-2 rounded">
                <code>Network Name: BSC Mainnet</code><br/>
                <code>RPC URL: https://bsc-dataseed.binance.org</code><br/>
                <code>Chain ID: 56</code><br/>
                <code>Symbol: BNB</code><br/>
                <code>Block Explorer: https://bscscan.com</code>
              </div>
            </li>
          </ul>
        </section>

        <div className="bg-yellow-100 p-4 rounded-lg">
          <p className="font-semibold">⚠️ Important:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Always test functions with small amounts first</li>
            <li>Keep your private keys secure</li>
            <li>Consider locking liquidity for trust</li>
            <li>Join our Telegram for support: [Your Telegram Link]</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Guide;