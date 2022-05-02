import React from 'react';
import './App.css';
import { connectWallet, disconnectWallet, useWalletConnect } from './hooks/useWalletConnect';

function App() {
  const { account } = useWalletConnect();

  return (
    <div className="App">
      <header className="App-header">
        {!account
          ? (
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={connectWallet}
            >
              Connect your wallet
            </button>
          )
          : (
            <button
              className={'btn btn-primary btn-lg'}
              onClick={disconnectWallet}
            >
              <span>{account} - Log out?</span>
            </button>
          )
        }
      </header>
    </div>
  );
}

export default App;
