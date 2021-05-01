import React, { useEffect, useState } from 'react'
import api from '../../Api/api';
import './PickWinnerComponent.css'

export default function PickWinnerComponent({ manager }) {
  const [managerNotification, setManagerNotification] = useState();
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    const checkIfManager = async () => {
      const accounts = await api.getAccounts();
      let isManager = false

      accounts.forEach(account => {
        if (account === manager) {
          isManager = true
        }
      });

      setIsManager(isManager)
    }

    checkIfManager()
  }, [manager]);

  const pickWinner = async () => {
    const accounts = await api.getAccounts();

    setManagerNotification('Oczekiwanie na wybór zwycięzcy...')
    api.pickWinner(accounts)
      .then(() => setManagerNotification('Zwyciezca został wybrany!'))
  };

  return (
    <>
      {true &&
        <div className="managerContainer">
          <hr className="myHr" />
          <p >Gotowy do wybrania zwycięzcy ?</p>
          <button
            className="button"
            onClick={pickWinner}>
            Wybierz zwycięzce
          </button>
          {managerNotification && <p className="text">{managerNotification}</p>}
        </div>
      }
    </>
  )
}
