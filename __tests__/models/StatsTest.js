import Stats from '../../src/model/Stats.js';

describe('Stats 모델 테스트', () => {
  let userLottos;
  let winningNumbers;
  let bonusNumber;

  beforeEach(() => {
    userLottos = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
    ];
    winningNumbers = [1, 2, 3, 4, 5, 6];
    bonusNumber = 7;
  });

  test('인스턴스 테스트', () => {
    const statsInsatance = new Stats(userLottos, winningNumbers, bonusNumber);

    expect(statsInsatance).toBeInstanceOf(Stats);
  });

  test('getStats() 메소드 테스트', () => {
    const stat = new Stats(userLottos, winningNumbers, bonusNumber);

    const stats = stat.getStats();

    expect(stats).toEqual([0, 0, 0, 0, 1]);
  });
});