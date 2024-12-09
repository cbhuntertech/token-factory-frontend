import { InjectedConnector } from '@web3-react/injected-connector';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const injected = new InjectedConnector({
  supportedChainIds: [56] // BSC Mainnet
});

// Добавьте функцию для проверки и переключения сети
export const switchToBSC = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x38' }], // 56 в hex
    });
  } catch (error: any) {
    if (error.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x38',
          chainName: 'Binance Smart Chain',
          nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18
          },
          rpcUrls: ['https://bsc-dataseed1.binance.org'],
          blockExplorerUrls: ['https://bscscan.com/']
        }]
      });
    }
  }
};