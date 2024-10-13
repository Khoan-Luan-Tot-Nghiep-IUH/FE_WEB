import { useState } from 'react';
import { ChevronRightIcon } from 'lucide-react';
import moment from 'moment-timezone';

const CustomDatePicker = ({ label, selectedDate, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const [currentDate, setCurrentDate] = useState(selectedDate || today);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const isPastDate = (date) => date < today;

  const isCurrentMonth = (year, month) => year === today.getFullYear() && month === today.getMonth();

  const getCurrentMonthDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const dayArray = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      date: new Date(currentYear, currentMonth, i + 1),
    }));

    const emptyDays = Array(firstDayOfMonth === 0 ? 0 : firstDayOfMonth).fill(null);
    return [...emptyDays, ...dayArray];
  };

  const isSelectedDate = (date) => {
    return selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  const isToday = (date) => {
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  return (
    <div className="relative w-full md:flex-1">
      <div className="mb-1">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      </div>
      <div
        className="border border-blue-300 rounded-lg p-2 cursor-pointer h-[42px] hover:border-blue-500 transition duration-200 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        <input
          type="text"
          className="outline-none w-full text-gray-700"
          value={selectedDate ? moment(selectedDate).format('DD/MM/YYYY') : ''}
          readOnly
          placeholder="Chọn ngày"
        />
      </div>

      {isOpen && (
        <div className="absolute left-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl p-4" style={{ minWidth: '320px' }}>
          <div className="flex justify-between items-center mb-4">
            <button
              className={`text-gray-600 p-1 rounded-full hover:bg-gray-200 transition duration-200 ease-in-out ${isCurrentMonth(currentYear, currentMonth) ? 'invisible' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (!isCurrentMonth(currentYear, currentMonth)) {
                  setCurrentDate(new Date(currentYear, currentMonth - 1));
                }
              }}
            >
              &lt;
            </button>
            <div className="font-medium text-gray-700">THÁNG {currentMonth + 1}/{currentYear}</div>
            <button
              className="text-gray-600 p-1 rounded-full hover:bg-gray-200 transition duration-200 ease-in-out"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentDate(new Date(currentYear, currentMonth + 1));
              }}
            >
              <ChevronRightIcon size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {days.map(day => (
              <div key={day} className="text-center text-sm text-gray-500 h-10 flex items-center justify-center">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-[1px] bg-gray-100">
            {getCurrentMonthDays().map((dayObj, index) => {
              const isPast = dayObj === null || isPastDate(dayObj.date);
              const todayClass = dayObj && isToday(dayObj.date) ? 'bg-yellow-100 border border-yellow-500' : '';
              return (
                <div
                  key={index}
                  className={`h-10 w-10 flex items-center justify-center rounded-sm 
                    ${dayObj ? (isSelectedDate(dayObj.date) ? 'bg-blue-100 border border-blue-500' : 'bg-white') : ''}
                    ${isPast ? 'text-gray-300 cursor-not-allowed' : `hover:bg-blue-50 cursor-pointer transition duration-150 ease-in-out ${todayClass}`}
                  `}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isPast && dayObj) {
                      onDateChange(dayObj.date);
                      setIsOpen(false);
                    }
                  }}
                >
                  {dayObj ? dayObj.day : ''}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
