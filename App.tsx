
import React, { useState } from 'react';
import { Header } from './components/Header';
import { EvaluationForm } from './components/EvaluationForm';
import { EvaluationResult } from './components/EvaluationResult';
import { LoadingState } from './components/LoadingState';
import { evaluateAnswer } from './services/geminiService';

export default function App() {
  const [question, setQuestion] = useState('');
  const [questionImage, setQuestionImage] = useState<{ data: string, mimeType: string } | null>(null);
  const [answer, setAnswer] = useState('');
  const [answerImage, setAnswerImage] = useState<{ data: string, mimeType: string } | null>(null);
  const [evaluation, setEvaluation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEvaluate = async () => {
    const hasQuestion = question.trim() || questionImage;
    const hasAnswer = answer.trim() || answerImage;

    if (!hasQuestion || !hasAnswer) {
      setError('Please provide both the question and the student answer (text or image).');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEvaluation(null);

    try {
      const result = await evaluateAnswer(
        question, 
        answer, 
        questionImage || undefined,
        answerImage || undefined
      );
      if (result) {
        setEvaluation(result);
      } else {
        setError('The examiner was unable to generate a response. Please try again.');
      }
    } catch (err) {
      console.error('Evaluation Error:', err);
      setError('A system error occurred. Ensure your API key is valid.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setQuestion('');
    setQuestionImage(null);
    setAnswer('');
    setAnswerImage(null);
    setEvaluation(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {!evaluation && !isLoading && (
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
            <div className="p-6 sm:p-8">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-2">Examination Portal</h2>
                <p className="text-slate-500 text-sm">Submit your response for strict Class 10 CBSE Board level evaluation.</p>
              </div>
              
              <EvaluationForm 
                question={question} 
                setQuestion={setQuestion} 
                questionImage={questionImage}
                setQuestionImage={setQuestionImage}
                answer={answer} 
                setAnswer={setAnswer}
                answerImage={answerImage}
                setAnswerImage={setAnswerImage}
                onEvaluate={handleEvaluate}
                error={error}
              />
            </div>
          </div>
        )}

        {isLoading && <LoadingState />}

        {evaluation && (
          <EvaluationResult 
            evaluation={evaluation} 
            onBack={handleReset} 
          />
        )}
      </main>

      <footer className="mt-12 text-center text-slate-400 text-xs px-4">
        <p>© 2024 AI CBSE Examiner Portal. For educational purposes only.</p>
        <p className="mt-1">Class 10 Board Standards Applied.</p>
      </footer>
    </div>
  );
}
