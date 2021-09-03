import getLocalStorage from '../../services/localStorage/getLocalStorage';
import removeItemArrayLocalStorage
  from '../../services/localStorage/removeItemArrayLocalStorage';
import setLocalStorage from '../../services/localStorage/setLocalStorage';

describe('testa funcoes do local storage', () => {
  it('testa funcionamento das funçoes', () => {
    expect(getLocalStorage('test')).toBeNull();

    setLocalStorage('test', [{ id: 1 }, { id: 2 }]);

    expect(getLocalStorage('test')).toEqual([{ id: 1 }, { id: 2 }]);

    removeItemArrayLocalStorage('test', 1);

    expect(getLocalStorage('test')).toEqual([{ id: 2 }]);
  });
});
