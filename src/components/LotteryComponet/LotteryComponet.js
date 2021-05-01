import React, { useEffect, useState } from 'react'
import api from '../../Api/api';
import web3 from '../../Utils/web3';
import './LotteryComponet.css';

export default function LotteryComponet() {
  const [players, setPlayers] = useState();
  const [balance, setBalance] = useState();

  const [etherAmount, setEtherAmount] = useState(0);
  const [lotteryVisible, setLotteryVisible] = useState(false);
  const [notification, setNotification] = useState();

  useEffect(() => {
    const onInit = () => {
      api.getPlayers().then((res) => setPlayers(res));
      api.getBalance().then((res) => setBalance(res));
    }

    onInit()
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (etherAmount === 0) {
      setNotification('Prosze podać ilość etheru')
      return false
    } else if (etherAmount < 0) {
      setNotification('Ilość etheru nie może być mniejsza niż 0')
      return false
    }

    const accounts = await api.getAccounts();

    setNotification('Oczekiwanie na sukces transakcji...')

    api.enterLottery(accounts, etherAmount)
      .then(() => {
        api.getPlayers().then((res) => setPlayers(res));
        api.getBalance().then((res) => setBalance(res));
        setNotification('Dołączyłes do loterii!')
      })
      .catch(() => setNotification())
  };

  const handleInput = (event) => {
    setEtherAmount(event.target.value)
  }

  return (
    <div className="lotteryContainer">
      <hr className="myHr" />
      {(players && balance) &&
        <>
          <p >Obecnie {players.length} {players.length === 1 ? 'człowiek' : 'ludzi'} bierze udział w loterii.</p>
          <p >Rywalizacja o wygraną {web3.utils.fromWei(balance, 'ether')} etheru!</p>
        </>
      }
      {!lotteryVisible ?
        <>
          <p className="text"> Chcesz spóbować szczęścia?</p>
          <button
            onClick={() => { setLotteryVisible(true) }}
            className="button">
            Spróbuj szczęścia
          </button>
        </> :
        <form className="inputContainer" onSubmit={onSubmit}>
          <p className="text">Ilość eteru wysyłana do loterii</p>
          <div className="inputSubContainer">
            <input type='number' className="input" value={etherAmount} onChange={handleInput} />
            <button
              type="submit"
              className="button">
              Dołącz
            </button>
          </div>
          {notification && <p>{notification}</p>}
        </form>
      }
    </div>
  )
}
