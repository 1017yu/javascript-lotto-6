import SYMBOLS from '../constants/symbols.js';
import Lotto from '../model/Lotto.js';
import LottoStore from '../model/LottoStore.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class LottoController {
  #purchaseAmount;

  #inputView;

  #lottos;

  #winningNumbers;

  constructor() {
    this.#inputView = new InputView();
  }

  async start() {
    await this.#buyLottos();
    await this.#showLottos();
    await this.#drawWinningNumbers();
  }

  async #buyLottos() {
    try {
      this.#purchaseAmount = await this.#inputView.readPurchaseAmount();
      const lottoStoreInstance = new LottoStore(this.#purchaseAmount);
      this.#lottos = lottoStoreInstance.getUserLottos();
    } catch (error) {
      OutputView.printError(error);
      await this.#buyLottos();
    }
  }

  async #showLottos() {
    OutputView.printLottosQuantity(this.#lottos.length);
    OutputView.printLottos(this.#lottos);
  }

  async #drawWinningNumbers() {
    try {
      const numbers = await this.#inputView.readWinningNumbers();
      const LottoInstance = new Lotto(
        numbers.split(SYMBOLS.comma).map(number => Number(number)),
      );
      this.#winningNumbers = LottoInstance.getWinningNumbers(numbers);
    } catch (error) {
      OutputView.printError(error);
      await this.#drawWinningNumbers();
    }
  }
}

export default LottoController;
