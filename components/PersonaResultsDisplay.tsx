import React from 'react';
import type { PersonaResult } from '../types';

// Icons for each section
const ProfileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const PlanIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 10V7m0 0L3 4m6 3l6-3m-6 3l-6 3" /></svg>;
const PsychologyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-2a6 6 0 00-12 0v2" /></svg>;

const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
        <div className="flex items-center gap-3 mb-4">
            {icon}
            <h3 className="text-xl font-bold text-slate-100">{title}</h3>
        </div>
        <div className="space-y-4 pl-9">
            {children}
        </div>
    </div>
);

const DetailItem: React.FC<{ label: string; value: string | string[] }> = ({ label, value }) => (
    <div>
        <h4 className="font-semibold text-yellow-400 mb-1">{label}:</h4>
        {Array.isArray(value) ? (
            <div className="flex flex-wrap gap-2">
                 {value.map((item, index) => (
                    <span key={index} className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-semibold rounded-full">
                        {item}
                    </span>
                 ))}
            </div>
        ) : (
            <p className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">{value}</p>
        )}
    </div>
);

const PersonaResultsDisplay: React.FC<{ result: PersonaResult }> = ({ result }) => {
    const { resumo_do_alvo, perfil_da_persona, plano_operacional, analise_psicologica } = result;

  return (
    <div className="w-full animate-fade-in bg-slate-900/50 border border-yellow-500/50 rounded-xl shadow-lg p-6 sm:p-8">
      
      <div className="mb-8 text-center border-b border-yellow-500/30 pb-6">
         <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-400">
            Dossiê de Persona
         </h2>
         <p className="text-lg text-slate-300 font-semibold">Objetivo: <span className="font-normal">{resumo_do_alvo}</span></p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <SectionCard title="Perfil da Persona" icon={<ProfileIcon />}>
            <DetailItem label="Nome Completo" value={perfil_da_persona.nome_completo} />
            <DetailItem label="Cargo Fictício" value={perfil_da_persona.cargo_ficticio} />
            <DetailItem label="Histórico Profissional" value={perfil_da_persona.historico_profissional} />
        </SectionCard>

        {/* Operational Plan Section */}
        <SectionCard title="Plano Operacional" icon={<PlanIcon />}>
            <DetailItem label="Pretexto de Abordagem" value={plano_operacional.pretexto_de_abordagem} />
            <DetailItem label="Canal Primário de Contato" value={plano_operacional.canal_primario} />
            <DetailItem label="Script de Abordagem Inicial" value={plano_operacional.script_de_abordagem_inicial} />
            <DetailItem label="Pontos de Discussão e Escalada" value={plano_operacional.pontos_de_escalada} />
        </SectionCard>

        {/* Psychological Analysis Section */}
        <SectionCard title="Análise Psicológica" icon={<PsychologyIcon />}>
            <DetailItem label="Gatilhos de Influência" value={analise_psicologica.gatilhos_de_influencia} />
            <DetailItem label="Linguagem e Tom Recomendados" value={analise_psicologica.linguagem_e_tom} />
        </SectionCard>
      </div>
    </div>
  );
};

export default PersonaResultsDisplay;
