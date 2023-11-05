import SYMBOLS from '../constants/symbols.js';
import Bonus from '../model/Bonus.js';
import Lotto from '../model/Lotto.js';
import LottoStore from '../model/LottoStore.js';
import Stat from '../model/Stat.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class LottoController {
  #purchaseAmount;

  #inputView;

  #userLottos;

  #winningNumbers;

  #bonusNumber;

  #stats;

  constructor() {
    this.#inputView = new InputView();
  }

  async start() {
    await this.#buyLottos();
    await this.#drawWinningNumbers();
    await this.#drawBonusNumber();
    this.#analyzeLottos();
  }

  async #buyLottos() {
    try {
      this.#purchaseAmount = await this.#inputView.readPurchaseAmount();
      const LottoStoreInstance = new LottoStore(this.#purchaseAmount);
      this.#userLottos = LottoStoreInstance.getUserLottos();

      OutputView.printLottosQuantity(this.#userLottos.length);
      OutputView.printLottos(this.#userLottos);
    } catch (error) {
      OutputView.printError(error);
      await this.#buyLottos();
    }
  }

  async #drawWinningNumbers() {
    try {
      const winningNumbersInput = (await this.#inputView.readWinningNumbers())
        .split(SYMBOLS.comma)
        .map(Number);

      const LottoInstance = new Lotto(winningNumbersInput);
      this.#winningNumbers = LottoInstance.getWinningNumbers();
    } catch (error) {
      OutputView.printError(error);
      await this.#drawWinningNumbers();
    }
  }

  async #drawBonusNumber() {
    try {
      const bonusNumberInput = await this.#inputView.readBonusNumber();
      const bonusInstance = new Bonus(bonusNumberInput, this.#winningNumbers);
      this.#bonusNumber = bonusInstance.getBonusNumber();
    } catch (error) {
      OutputView.printError(error);
      await this.#drawBonusNumber();
    }
  }

  #analyzeLottos() {
    OutputView.printResult();

    const statInstance = new Stat(
      this.#userLottos,
      this.#winningNumbers,
      this.#bonusNumber,
    );
    this.#stats = statInstance.getStats();

    OutputView.printStats(this.#stats);
  }
}

export default LottoController;
