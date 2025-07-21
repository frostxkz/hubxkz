import React from 'react';
import type { MessageResult } from '../types';

// Icons for the strategic analysis
const StrategyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const TargetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;

const DetailItem: React.FC<{ label: string; value: string | string[]; className?: string }> = ({ label, value, className = '' }) => (
    <div className={className}>
        <h4 className="font-semibold text-teal-400 mb-1">{label}:</h4>
        {Array.isArray(value) ? (
            <div className="flex flex-wrap gap-2">
                 {value.map((item, index) => (
                    <span key={index} className="px-3 py-1 bg-teal-500/20 text-teal-300 text-xs font-semibold rounded-full">
                        {item}
                    </span>
                 ))}
            </div>
        ) : (
            <p className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">{value}</p>
        )}
    </div>
);


const MessageResultDisplay: React.FC<{ result: MessageResult }> = ({ result }) => {
    const { assunto, corpo, analise_estrategica, publico_alvo } = result;

  return (
    <div className="w-full animate-fade-in bg-slate-900/50 border border-teal-500/50 rounded-xl shadow-lg p-6 sm:p-8">
      
      <div className="mb-8 text-center border-b border-teal-500/30 pb-6">
         <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
            Dossiê da Mensagem
         </h2>
      </div>

      <div className="space-y-8">
        {/* Strategic Analysis Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
                <StrategyIcon />
                <h3 className="text-xl font-bold text-slate-100">Análise Estratégica</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-9">
                <DetailItem label="Pretexto / História" value={analise_estrategica.pretexto} />
                <DetailItem label="Gatilhos Psicológicos" value={analise_estrategica.gatilhos_psicologicos} />
                <DetailItem label="Call-to-Action (CTA)" value={analise_estrategica.call_to_action} className="md:col-span-2" />
            </div>
        </div>
        
        {/* Target Audience Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-2">
                <TargetIcon />
                <h3 className="text-xl font-bold text-slate-100">Público-Alvo</h3>
            </div>
             <div className="pl-9">
                <p className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">{publico_alvo}</p>
            </div>
        </div>

        {/* Message Preview Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
             <div className="flex items-center gap-3 mb-4">
                <MailIcon />
                <h3 className="text-xl font-bold text-slate-100">Visualização da Mensagem</h3>
            </div>
            <div className="bg-slate-900 rounded-md p-4 space-y-4 pl-9">
                 <div>
                    <span className="text-slate-400 text-sm font-semibold">Assunto: </span>
                    <span className="text-slate-200 font-bold">{assunto}</span>
                </div>
                <hr className="border-slate-700"/>
                <div className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">
                    {corpo}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MessageResultDisplay;