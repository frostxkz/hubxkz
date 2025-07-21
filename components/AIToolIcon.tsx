
import React from 'react';

interface AIToolIconProps {
  iconKey: string;
}

const IconWrapper: React.FC<{ children: React.ReactNode, className: string }> = ({ children, className }) => (
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${className}`}>
        {children}
    </div>
);

const AIToolIcon: React.FC<AIToolIconProps> = ({ iconKey }) => {
  const iconClasses = "h-7 w-7 text-white";

  switch (iconKey?.toLowerCase()) {
    case 'image':
      return <IconWrapper className="bg-gradient-to-br from-purple-500 to-indigo-600"><svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></IconWrapper>;
    case 'code':
      return <IconWrapper className="bg-gradient-to-br from-emerald-500 to-green-600"><svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg></IconWrapper>;
    case 'text':
      return <IconWrapper className="bg-gradient-to-br from-sky-500 to-blue-600"><svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></IconWrapper>;
    case 'video':
      return <IconWrapper className="bg-gradient-to-br from-red-500 to-orange-600"><svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></IconWrapper>;
    case 'audio':
        return <IconWrapper className="bg-gradient-to-br from-pink-500 to-rose-600"><svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.858 15H4a1 1 0 01-1-1V10a1 1 0 011-1h1.858l4.293-4.293a1 1 0 011.414 0V19.293a1 1 0 01-1.414 0L5.858 15z" /></svg></IconWrapper>;
    case 'design':
        return <IconWrapper className="bg-gradient-to-br from-amber-500 to-yellow-600"><svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></IconWrapper>;
    case 'business':
        return <IconWrapper className="bg-gradient-to-br from-teal-500 to-cyan-600"><svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></IconWrapper>;
    default:
      return <IconWrapper className="bg-gradient-to-br from-slate-600 to-gray-700"><svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg></IconWrapper>;
  }
};

export default AIToolIcon;
