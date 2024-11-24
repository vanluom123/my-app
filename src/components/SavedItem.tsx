import { SavedPattern } from "./SavedList";
import { MdDelete, MdPlayArrow } from "react-icons/md";

interface SavedItemProps {
  pattern: SavedPattern;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export default function SavedItem({ pattern, onDelete, onView }: SavedItemProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">{pattern.title}</h3>
        <div className="flex gap-2">
          <button 
            className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50"
            onClick={() => onView(pattern.id)}
          >
            <MdPlayArrow size={20} />
          </button>
          <button 
            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
            onClick={() => onDelete(pattern.id)}
          >
            <MdDelete size={20} />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Đã lưu: {new Date(pattern.timestamp).toLocaleDateString('vi-VN')}
      </p>
    </div>
  );
} 