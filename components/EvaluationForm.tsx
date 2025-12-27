
import React, { useRef } from 'react';

interface EvaluationFormProps {
  question: string;
  setQuestion: (val: string) => void;
  questionImage: { data: string, mimeType: string } | null;
  setQuestionImage: (val: { data: string, mimeType: string } | null) => void;
  answer: string;
  setAnswer: (val: string) => void;
  answerImage: { data: string, mimeType: string } | null;
  setAnswerImage: (val: { data: string, mimeType: string } | null) => void;
  onEvaluate: () => void;
  error: string | null;
}

export const EvaluationForm: React.FC<EvaluationFormProps> = ({
  question,
  setQuestion,
  questionImage,
  setQuestionImage,
  answer,
  setAnswer,
  answerImage,
  setAnswerImage,
  onEvaluate,
  error
}) => {
  const qFileInputRef = useRef<HTMLInputElement>(null);
  const aFileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'question' | 'answer') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      const payload = {
        data: base64String,
        mimeType: file.type
      };
      if (type === 'question') setQuestionImage(payload);
      else setAnswerImage(payload);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (type: 'question' | 'answer') => {
    if (type === 'question') {
      setQuestionImage(null);
      if (qFileInputRef.current) qFileInputRef.current.value = '';
    } else {
      setAnswerImage(null);
      if (aFileInputRef.current) aFileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Question Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
            Question Details
          </label>
          <button
            type="button"
            onClick={() => qFileInputRef.current?.click()}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest flex items-center space-x-1"
          >
            <i className="fas fa-image"></i>
            <span>Upload Question</span>
          </button>
          <input
            type="file"
            ref={qFileInputRef}
            onChange={(e) => handleImageUpload(e, 'question')}
            accept="image/*"
            className="hidden"
          />
        </div>
        
        <div className="relative">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type the question or upload an image..."
            className="w-full h-28 p-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-400 text-slate-800 resize-none"
          />
          
          {questionImage && (
            <div className="mt-3 flex items-center space-x-3 p-2 bg-slate-100 rounded-lg w-fit border border-slate-200">
              <div className="relative w-16 h-16 flex-shrink-0">
                <img 
                  src={`data:${questionImage.mimeType};base64,${questionImage.data}`} 
                  alt="Question Thumbnail" 
                  className="w-full h-full rounded-md object-cover border border-slate-300"
                />
                <button
                  onClick={() => removeImage('question')}
                  className="absolute -top-2 -right-2 bg-slate-800 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-lg hover:bg-red-600 transition-colors"
                  title="Remove Image"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="pr-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Question Image</p>
                <p className="text-[10px] text-slate-400">Attached</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Answer Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
            Student Response
          </label>
          <button
            type="button"
            onClick={() => aFileInputRef.current?.click()}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest flex items-center space-x-1"
          >
            <i className="fas fa-camera"></i>
            <span>Upload Photo</span>
          </button>
          <input
            type="file"
            ref={aFileInputRef}
            onChange={(e) => handleImageUpload(e, 'answer')}
            accept="image/*"
            className="hidden"
          />
        </div>
        
        <div className="relative">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer or upload a photo of your handwritten work..."
            className="w-full h-48 p-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-400 text-slate-800 resize-none"
          />
          
          {answerImage && (
            <div className="mt-3 flex items-center space-x-3 p-2 bg-slate-100 rounded-lg w-fit border border-slate-200">
              <div className="relative w-20 h-20 flex-shrink-0">
                <img 
                  src={`data:${answerImage.mimeType};base64,${answerImage.data}`} 
                  alt="Answer Thumbnail" 
                  className="w-full h-full rounded-md object-cover border border-slate-300"
                />
                <button
                  onClick={() => removeImage('answer')}
                  className="absolute -top-2 -right-2 bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] shadow-lg hover:bg-red-600 transition-colors"
                  title="Remove Image"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="pr-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Answer Image</p>
                <p className="text-[10px] text-slate-400">Attached</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center space-x-3 text-sm animate-bounce">
          <i className="fas fa-exclamation-circle"></i>
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={onEvaluate}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center space-x-2"
      >
        <i className="fas fa-file-signature"></i>
        <span className="uppercase tracking-widest font-black">Begin Strict Evaluation</span>
      </button>
    </div>
  );
};
