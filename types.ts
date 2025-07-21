export interface AITool {
  name: string;
  summary: string;
  category: string;
  link: string;
  icon: string;
}

export interface ComparisonCriterion {
  feature: string;
  model_a_details: string;
  model_b_details: string;
}

export interface ComparisonResult {
  model_a_name: string;
  model_b_name: string;
  summary: string;
  comparison: ComparisonCriterion[];
}

export interface NewsSource {
  uri: string;
  title?: string;
}

export interface NewsResult {
  summary:string;
  sources: NewsSource[];
}

export interface UndergroundResult {
  summary: string;
  sources: NewsSource[];
}

export interface AttackStep {
  tatica: string;
  tecnica: string;
  descricao_operacional: string;
  mitigacoes: string;
}

export interface ToolResource {
  nome: string;
  descricao: string;
}

export interface RedTeamResult {
  objetivo: string;
  cadeia_de_ataque: AttackStep[];
  ferramentas_e_recursos: ToolResource[];
  referencias: string[];
}

// New types for Red Team How-To
export interface HowToStep {
  passo: number;
  titulo: string;
  descricao_detalhada: string;
  comandos_exemplos: string;
  consideracoes_opsec: string;
}

export interface RedTeamHowToResult {
  tecnica_alvo: string;
  resumo_operacional: string;
  passo_a_passo: HowToStep[];
  ferramentas_recomendadas: ToolResource[];
}

// New types for Scam Guide
export interface ScamGuideStep {
  passo: number;
  titulo: string;
  descricao_operacional: string;
  ferramentas_necessarias: string;
  consideracoes_chave: string;
}

export interface ScamGuideResult {
  titulo_da_operacao: string;
  resumo_executivo: string;
  passo_a_passo_detalhado: ScamGuideStep[];
  fontes_e_referencias: NewsSource[];
}

// New types for Persona Generator
export interface PersonaProfile {
  nome_completo: string;
  cargo_ficticio: string;
  historico_profissional: string;
}

export interface OperationalPlan {
  pretexto_de_abordagem: string;
  canal_primario: string;
  script_de_abordagem_inicial: string;
  pontos_de_escalada: string;
}

export interface PsychologicalAnalysis {
  gatilhos_de_influencia: string[];
  linguagem_e_tom: string;
}

export interface PersonaResult {
  resumo_do_alvo: string;
  perfil_da_persona: PersonaProfile;
  plano_operacional: OperationalPlan;
  analise_psicologica: PsychologicalAnalysis;
}

// New types for Message Generator
export interface MessageStrategy {
  pretexto: string;
  gatilhos_psicologicos: string[];
  call_to_action: string;
}

export interface MessageResult {
  assunto: string;
  corpo: string;
  analise_estrategica: MessageStrategy;
  publico_alvo: string;
}

// New types for Delicate Search
export interface FoundDataPoint {
  tipo_de_dado: string;
  conteudo: string;
  fonte: NewsSource;
}

export interface DelicateSearchResult {
  titulo_da_investigacao: string;
  resumo_dos_achados: string;
  pontos_de_dados_encontrados: FoundDataPoint[];
}

// New types for Ultra Dorks
export interface UltraDorkSuggestion {
  dork: string;
  description: string;
  category: string;
}

export interface UltraDorkExecutionResult {
  investigation_summary: string;
  final_dork_used: string;
  data_points: FoundDataPoint[];
}
