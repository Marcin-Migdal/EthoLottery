import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import api from './Api/api';
import './App.css';
import PickWinnerComponent from './components/PickWinnerComponent/PickWinnerComponent';
import LotteryComponet from './components/LotteryComponet/LotteryComponet';

export default function App() {
  const [manager, setManager] = useState();

  useEffect(() => {
    const getManager = () => {
      api.getMenager().then((res) => setManager(res));
    }

    const ethEnabled = () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        return true;
      }
      return false;
    }

    getManager()
    ethEnabled()
  }, []);

  return (
    <div className="container">
      <p className="title">EthoLottery</p>
      <span className="description">
        Blockchain w swojej naturze jest bardzo odporny na próby oszustwa dlatego jest świetnym miejscem do tworzenia wszelkich gier losowych.
        Jako wielka rozproszona baza danych dostępna dla każdego wszelkie proby niechcianych działań są odrazu widoczne.
        </span>
      <LotteryComponet />
      <PickWinnerComponent manager={manager} />
      {manager &&
        <p className="footer"> Kontrakt jest zarządzany przez: {manager}.</p>
      }
    </div>
  )
}