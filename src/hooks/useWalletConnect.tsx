import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { useState } from 'react';

const connector = new WalletConnect({
  bridge: 'https://bridge.walletconnect.org', // Required
  qrcodeModal: QRCodeModal,
});

export const connectWallet = async () => {
  console.log(connector);
  if (!connector.connected && !connector.handshakeTopic) {
    await connector.createSession();
  } else {
    QRCodeModal.open(connector.uri, null,);
  }
};

export const disconnectWallet = async () => {
  if (connector.connected) await connector.killSession();
};

export const useWalletConnect = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  connector.on('connect', (error, payload) => {
    if (error) {
      console.error('Error connecting wallet');
    }

    const {
      accounts,
      chainId
    } = payload.params[0];
    setAccount(accounts[0]);
    setChainId(chainId);
  });

  connector.on('session_update', (error, payload) => {
    if (error) {
      console.error('Error getting updated session info');
    }

    const {
      accounts,
      chainId
    } = payload.params[0];
    setAccount(accounts[0]);
    setChainId(chainId);
  });

  connector.on('disconnect', (error) => {
    if (error) {
      console.error('Error disconnecting wallet');
    }

    setAccount(null);
    setChainId(null);
  });

  return {
    account: account,
    chainId: chainId
  };
};
