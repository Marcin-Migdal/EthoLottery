import lottery from '../Utils/lottery';
import web3 from '../Utils/web3';

class ApiServce {
  getMenager() {
    return lottery.methods.manager().call();
  }

  getPlayers() {
    return lottery.methods.getPlayers().call()
  }

  getBalance() {
    return web3.eth.getBalance(lottery.options.address)
  }

  getAccounts() {
    return web3.eth.getAccounts()
  }

  enterLottery(accounts, value) {
    return lottery.methods.enter().send(
      {
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether')
      }
    );
  }

  pickWinner(accounts) {
    return lottery.methods.pickWinner().send(
      {
        from: accounts[0]
      }
    );
  }
}

const api = new ApiServce();
export default api;
