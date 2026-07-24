import { useCallback, useState } from 'react';

export default function usePracticeModel() {
  const [keyword, setKeyword] = useState('');
  const [lastAction, setLastAction] = useState<string>('');

  const clearKeyword = useCallback(() => {
    setKeyword('');
  }, []);

  const recordAction = useCallback((action: string) => {
    setLastAction(action);
  }, []);

  return {
    keyword,
    setKeyword,
    lastAction,
    setLastAction,
    clearKeyword,
    recordAction,
  };
}
