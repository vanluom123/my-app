'use client';

import { useState, useEffect } from 'react';
import { MdClose, MdAdd } from 'react-icons/md';
import { Collection } from '@/types/collection';

interface SaveProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  onSaveComplete: () => void;
}

export default function SaveProductModal({ isOpen, onClose, productId, onSaveComplete }: SaveProductModalProps) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Load collections whenever modal is opened
  useEffect(() => {
    if (isOpen) {
      loadCollections();
    }
  }, [isOpen]);

  // Function to load collections from localStorage
  const loadCollections = () => {
    const savedCollections = localStorage.getItem('collections');
    if (savedCollections) {
      setCollections(JSON.parse(savedCollections));
    }
  };

  const saveToCollection = (collectionId: string) => {
    const updatedCollections = collections.map(collection => {
      if (collection.id === collectionId) {
        if (!collection.products.includes(productId)) {
          return {
            ...collection,
            products: [...collection.products, productId]
          };
        }
      }
      return collection;
    });
    
    localStorage.setItem('collections', JSON.stringify(updatedCollections));
    setCollections(updatedCollections);
    onSaveComplete();
    onClose();
  };

  const createNewCollection = () => {
    if (!newCollectionName.trim()) return;

    const newCollection: Collection = {
      id: Date.now().toString(),
      name: newCollectionName.trim(),
      createdAt: new Date().toISOString(),
      products: [productId]
    };

    const updatedCollections = [...collections, newCollection];
    localStorage.setItem('collections', JSON.stringify(updatedCollections));
    setCollections(updatedCollections);
    setNewCollectionName('');
    setIsCreatingNew(false);
    onSaveComplete();
    onClose();
  };

  // Reset form when closing modal
  const handleClose = () => {
    setNewCollectionName('');
    setIsCreatingNew(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 max-w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Lưu vào...</h2>
          <button 
            onClick={handleClose} 
            className="p-1.5 hover:bg-red-50 rounded-full group transition-colors"
          >
            <MdClose 
              size={24} 
              className="text-red-500 group-hover:text-red-600" 
            />
          </button>
        </div>

        <div className="p-4 max-h-96 overflow-y-auto">
          {collections.length > 0 ? (
            collections.map(collection => (
              <button
                key={collection.id}
                onClick={() => saveToCollection(collection.id)}
                className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center gap-2 mb-2 border"
              >
                <span className="font-medium text-gray-800">
                  {collection.name}
                </span>
                {collection.products.includes(productId) && (
                  <span className="text-green-500 text-sm ml-auto font-medium">
                    Đã lưu
                  </span>
                )}
              </button>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">
              Chưa có bộ sưu tập nào
            </p>
          )}

          {isCreatingNew ? (
            <div className="mt-4">
              <input
                type="text"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Tên bộ sưu tập mới"
                className="w-full p-3 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={createNewCollection}
                  disabled={!newCollectionName.trim()}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                >
                  Tạo mới
                </button>
                <button
                  onClick={() => setIsCreatingNew(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium text-gray-700"
                >
                  Hủy
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsCreatingNew(true)}
              className="w-full mt-4 p-3 text-left hover:bg-blue-50 rounded-lg flex items-center gap-2 text-blue-500 border border-dashed border-blue-200"
            >
              <MdAdd size={24} />
              <span className="font-medium">Tạo bộ sưu tập mới</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}