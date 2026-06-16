import InputAnswer from './TypeSpecificElements/InputAnswer';
import BooleanAnswer from './TypeSpecificElements/BooleanAnswer';
import CheckboxAnswer from './TypeSpecificElements/CheckboxAnswer';

import { type FullQuizDetails } from '../../services/quizService';
type QuestionType = FullQuizDetails['questions'][number];

interface QuestionItemProps {
  question: QuestionType;
  index: number;
}

const QuestionItem = ({ question, index }: QuestionItemProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex gap-4 items-start">
      <div className="w-7 h-7 bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-sm rounded-lg flex items-center justify-center shrink-0">
        {index + 1}
      </div>

      <div className="space-y-4 flex-1 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-bold text-base text-slate-800 tracking-tight">
            {question.questionText}
          </h3>
        </div>

        {question.type === 'input' && <InputAnswer />}

        {question.type === 'boolean' && <BooleanAnswer />}

        {question.type === 'checkbox' && question.options && (
          <CheckboxAnswer options={question.options} />
        )}
      </div>
    </div>
  );
};

export default QuestionItem;
