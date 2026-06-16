import { useState } from 'react';

const InputAnswer = () => {
  const [textAnswer, setTextAnswer] = useState<string>('');

  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        value={textAnswer}
        onChange={(e) => setTextAnswer(e.target.value)}
        placeholder="Type your answer here..."
        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
      />
    </div>
  );
};

export default InputAnswer;
