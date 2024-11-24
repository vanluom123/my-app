import { useState, useEffect } from 'react';
import { SavedPattern } from '@/components/SavedList';

export function useSavePattern() {
  const [savedPatterns, setSavedPatterns] = useState<SavedPattern[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedPatterns');
    if (saved) {
      setSavedPatterns(JSON.parse(saved));
    }
  }, []);

  const savePattern = (title: string) => {
    const newPattern: SavedPattern = {
      id: Date.now().toString(),
      title,
      timestamp: new Date().toISOString(),
    };

    const updatedPatterns = [...savedPatterns, newPattern];
    localStorage.setItem('savedPatterns', JSON.stringify(updatedPatterns));
    setSavedPatterns(updatedPatterns);
  };

  const removePattern = (id: string) => {
    const updatedPatterns = savedPatterns.filter(pattern => pattern.id !== id);
    localStorage.setItem('savedPatterns', JSON.stringify(updatedPatterns));
    setSavedPatterns(updatedPatterns);
  };

  return { savedPatterns, savePattern, removePattern };
} 