import { useState, useCallback } from 'react';
import { Upload, X, FileImage } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isAnalyzing: boolean;
}

export default function ImageUploader({ onImageSelect, isAnalyzing }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageSelect(file);
    }
  };

  const clearImage = () => {
    setPreview(null);
  };

  if (preview) {
    return (
      <div className="relative">
        <div className="relative rounded-xl overflow-hidden bg-black">
          <img
            src={preview}
            alt="X-ray preview"
            className="w-full h-auto max-h-96 object-contain"
          />
          {!isAnalyzing && (
            <button
              onClick={clearImage}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative border-3 border-dashed rounded-xl p-12 text-center transition-all ${
        dragActive
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/*"
        onChange={handleChange}
        disabled={isAnalyzing}
      />

      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            {dragActive ? (
              <FileImage className="w-10 h-10 text-white" />
            ) : (
              <Upload className="w-10 h-10 text-white" />
            )}
          </div>

          <div>
            <p className="text-xl font-semibold text-gray-700 mb-2">
              {dragActive ? 'Drop your X-ray here' : 'Upload Chest X-ray'}
            </p>
            <p className="text-sm text-gray-500">
              Drag and drop or click to browse
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Supports: JPG, PNG, DICOM (max 10MB)
            </p>
          </div>
        </div>
      </label>
    </div>
  );
}
