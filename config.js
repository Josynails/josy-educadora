window.JOSY = {
  demo: false,
  educator: 'Josylene Santos',
  experienceYears: 26,
  contact: {
    whatsapp: '5565993378198',                 // número com DDI+DDD, só dígitos
    whatsappDisplay: '65 9337-8198',          // como o número aparece escrito no site
    whatsappLabel: 'Falar no WhatsApp',       // texto do botão do topo e do botão flutuante
    whatsappMessage: 'Olá, Josy! Quero mais informações sobre as formações.', // mensagem que já aparece escrita na conversa
    instagram: 'josylenesantos.manicuremoderna',
    email: ''
  },
  experience: [
    { id: 'inicio',  label: 'Ainda não comecei',                        level: 'iniciante' },
    { id: 'basico',  label: 'Já tenho conhecimentos básicos',           level: 'iniciante' },
    { id: 'atuo',    label: 'Já atuo profissionalmente',                level: 'aperfeicoamento' },
    { id: 'tecnica', label: 'Quero aperfeiçoar uma técnica específica', level: 'especializacao' }
  ],
  areas: [
    { id: 'fundamentos', label: 'Fundamentos de manicure' },
    { id: 'extensao',    label: 'Extensão de unhas' },
    { id: 'nailart',     label: 'Nail art' },
    { id: 'acabamento',  label: 'Acabamento e técnica' }
  ],
  modalities: [
    { id: 'presencial', label: 'Presencial' },
    { id: 'online',     label: 'Online' },
    { id: 'hibrida',    label: 'Híbrida' },
    { id: 'conhecer',   label: 'Quero conhecer as opções' }
  ],
  levels: { iniciante: 'Iniciante', aperfeicoamento: 'Aperfeiçoamento', especializacao: 'Especialização' },
  // Preencha modality/workload/nextClass/seats/price/certificate quando a Josy definir; campos null não aparecem.
  courses: [
    { id: 'f-iniciante', level: 'iniciante', title: 'Formação para quem está começando',
      blurb: 'Caminho para conhecer os fundamentos e iniciar a aprendizagem com acompanhamento.',
      areas: ['fundamentos', 'extensao'], modality: null, workload: null, nextClass: null, seats: null, price: null, certificate: null, checkoutUrl: null },
    { id: 'f-aperfeicoamento', level: 'aperfeicoamento', title: 'Formação para quem já trabalha com unhas',
      blurb: 'Aperfeiçoamento e atualização para profissionais que buscam mais segurança e acabamento.',
      areas: ['extensao', 'acabamento', 'nailart'], modality: null, workload: null, nextClass: null, seats: null, price: null, certificate: null, checkoutUrl: null },
    { id: 'f-especializacao', level: 'especializacao', title: 'Formação avançada e especialização',
      blurb: 'Para profissionais interessadas em aprofundar uma técnica específica em nível avançado.',
      areas: ['extensao', 'nailart', 'acabamento'], modality: null, workload: null, nextClass: null, seats: null, price: null, certificate: null, checkoutUrl: null }
  ],
  videos: [
    { id:'t03', cat:'depoimento', caption:'Depoimento de aluna — mentoria VIP', dur:'2:41' },
    { id:'t08', cat:'extensao',   caption:'Extensão de unhas no molde F1', dur:'0:04' },
    { id:'t02', cat:'extensao',   caption:'Técnica de molde F1 sanduíche', dur:'0:10' },
    { id:'t15', cat:'gel',        caption:'Esmaltação em gel efeito magnético', dur:'0:11' },
    { id:'t13', cat:'decoracao',  caption:'Técnica de manicure combinada', dur:'0:03' },
    { id:'t10', cat:'decoracao',  caption:'Francesinha efeito magnético', dur:'0:07' },
    { id:'t06', cat:'gel',        caption:'Esmaltação em gel', dur:'0:16' },
    { id:'t01', cat:'gel',        caption:'Extensão molde F1  ', dur:'0:47' },
    { id:'t09', cat:'gel',        caption:null, dur:'0:16' },
    { id:'t17', cat:'gel',        caption:null, dur:'0:04' },
    { id:'t16', cat:'gel',        caption:null, dur:'0:03' },
    { id:'t11', cat:'gel',        caption:null, dur:'0:19' },
    { id:'t07', cat:'gel',        caption:null, dur:'0:07' },
    { id:'t05', cat:'decoracao',  caption:null, dur:'0:04' },
    { id:'t04', cat:'gel',        caption:null, dur:'0:04' },
    { id:'t12', cat:'gel',        caption:null, dur:'0:05' },
    { id:'t14', cat:'gel',        caption:null, dur:'0:04' }
  ],
  videoCats: { todos:'Todos', extensao:'Extensão', gel:'Esmaltação em gel', decoracao:'Decoração', depoimento:'Depoimento' },
  testimonials: [],
  /* ============================ TEXTOS DA PÁGINA ============================
     Troque só o que estiver entre aspas. Use *palavra* para o destaque em letra
     artística e **palavra** para negrito. \n quebra a linha. */
  meta: {
    title: 'Josy Santos Educadora Nail — Formações profissionais em Nail',
    description: 'Conheça as formações profissionais de Josy Santos, educadora nail com 26 anos de experiência na área de manicure. Do básico ao avançado.'
  },
  texts: {
    'hero.eyebrow': 'A arte de dominar as unhas',
    'hero.sub': 'Conheça as formações e técnicas ensinadas por Josy Santos, educadora nail com uma trajetória construída ao longo de 26 anos de experiência na área.',
    'proximo-passo.eyebrow': 'Para quem são as formações',
    'proximo-passo.title': 'Qual é o seu *próximo passo?*',
    'proximo-passo.lead': 'Cada caminho leva às formações compatíveis com o seu momento. Escolha o que mais se parece com você.',
    'trilha.eyebrow': 'Ferramenta exclusiva',
    'trilha.title': 'Descubra sua *trilha Nail*',
    'trilha.lead': 'Três perguntas rápidas para encontrar por onde começar. Sem cadastro, sem compromisso — o resultado aparece na hora.',
    'trilha.fine': 'Um guia de orientação, não um diagnóstico de habilidades.',
    'educadora.eyebrow': 'Conheça Josy Santos',
    'educadora.title': 'Mais que ensinar técnicas. *Compartilhar experiência.*',
    'educadora.lead': 'Josylene Santos é mentora de manicure e especialista em extensão de unhas com naturalidade. Seu trabalho reúne **26 anos de experiência na área de manicure** e uma atuação que também inclui aulas e cursos profissionalizantes, **do básico ao avançado**.',
    'evolucao.eyebrow': 'A jornada de aprendizagem',
    'evolucao.title': 'Sua evolução *começa aqui.*',
    'evolucao.lead': 'Três momentos possíveis de uma jornada educacional: dos fundamentos à especialização.',
    'evolucao.fine': 'Representa uma possibilidade de jornada de aprendizagem, não uma promessa de resultados.',
    'tecnica.eyebrow': 'A arte por trás da técnica',
    'tecnica.title': 'A técnica *em detalhes.*',
    'tecnica.lead': 'Preparação, estrutura, acabamento e arte: o olhar profissional está no cuidado com cada etapa.',
    'aulas.eyebrow': 'Na prática',
    'aulas.title': 'Técnicas *em vídeo.*',
    'aulas.lead': 'Registros de atendimentos e aulas: veja o preparo, a aplicação e o acabamento de cada técnica.',
    'formacoes.eyebrow': 'Formações',
    'formacoes.title': 'Escolha sua *formação*',
    'formacoes.lead': 'Escolha o nível que combina com o seu momento e fale direto com a Josy para conhecer turmas, datas e condições.',
    'como.eyebrow': 'Como funciona',
    'como.title': 'Da dúvida à *matrícula.*',
    'como.lead': 'Um caminho claro e sem pressão. Os detalhes comerciais são combinados diretamente com a educadora.',
    'depoimentos.eyebrow': 'Alunas',
    'depoimentos.title': 'Quem aprende, *conta.*',
    'faq.eyebrow': 'Dúvidas frequentes',
    'faq.title': 'Antes de *decidir.*',
    'inscricao.eyebrow': 'Pronta para começar?',
    'inscricao.title': 'Seu próximo passo *começa aqui.*',
    'inscricao.lead': 'Deixe seu contato e receba informações sobre as formações e as próximas turmas. Você escolhe como seguir — sem compromisso.',
    'inscricao.fine': 'Seus dados são usados apenas para retornar este contato.',
    'hero.title1': 'Domine a arte',
    'hero.title2': 'das unhas.',
    'hero.title3': 'Eleve sua trajetória profissional.',
    'hero.btn1': 'Conhecer os cursos',
    'hero.btn2': 'Falar com a Josy',
    'educadora.btn': 'Conhecer as formações',
    'tecnica.btn': 'Ver formações',
    'hero.tag': 'Técnica em vídeo',
    'form.name': 'Seu nome',
    'form.whats': 'WhatsApp',
    'form.interest': 'Formação de interesse',
    'form.submit': 'Quero receber informações',
    'form.wa': 'Ou chame direto no WhatsApp',
    'footer.copy': '© 2026 Josy Santos Educadora Nail. Todos os direitos reservados.',
    'footer.tag': 'Josy Santos · Educadora Nail',
  },

  // Vídeo do topo (arquivo dentro de assets/video/)
  heroVideo: '/assets/video/hero.mp4',

  // Menu do topo (o rodapé usa os itens marcados com footer:true)
  nav: [
    { href: '#proximo-passo', label: 'Seu caminho', footer: true },
    { href: '#trilha',        label: 'Trilha Nail', footer: true },
    { href: '#educadora',     label: 'A educadora', footer: true },
    { href: '#tecnica',       label: 'Técnica' },
    { href: '#aulas',         label: 'Vídeos' },
    { href: '#formacoes',     label: 'Formações', footer: true },
    { href: '#faq',           label: 'Dúvidas', footer: true }
  ],

  // Faixa que corre abaixo do topo
  marquee: ['A arte de dominar as unhas', 'Josy Santos', 'Educadora Nail', 'Do básico ao avançado'],

  // Três destaques do topo. count = número que "sobe" na animação (opcional)
  facts: [
    { big: '26', count: 26, small: 'anos de experiência\nna área de manicure' },
    { big: 'Do básico', small: 'ao avançado,\naulas e cursos' },
    { big: 'Extensão', small: 'de unhas com\nnaturalidade' }
  ],

  // Três destaques da seção "Conheça Josy Santos"
  stats: [
    { big: '26', count: 26, small: 'anos de experiência\nna área de manicure' },
    { big: 'Básico → avançado', small: 'aulas e cursos\nprofissionalizantes' },
    { big: 'Naturalidade', small: 'especialidade em\nextensão de unhas' }
  ],

  // Cartões "Qual é o seu próximo passo?" (level: iniciante | aperfeicoamento | especializacao)
  // img: número do vídeo (ex.: 't04') ou caminho de uma imagem (ex.: '/assets/img/foto.jpg')
  paths: [
    { level: 'iniciante', img: 't04', alt: 'Unhas naturais com acabamento em gel', title: 'Estou começando', text: 'Para quem deseja conhecer os fundamentos e iniciar sua aprendizagem.', cta: 'Ver formações' },
    { level: 'aperfeicoamento', img: 't15', alt: 'Esmaltação em gel com efeito magnético', title: 'Já trabalho com unhas', text: 'Para profissionais que procuram aperfeiçoamento, atualização ou novas técnicas.', cta: 'Ver formações' },
    { level: 'especializacao', img: 't08', alt: 'Extensão de unhas no molde F1', title: 'Quero me especializar', text: 'Para profissionais interessadas em formações avançadas.', cta: 'Ver formações' }
  ],

  // Perguntas e título do resultado da "Trilha Nail"
  quiz: {
    q1: 'Qual sua experiência atual?',
    q2: 'O que você deseja aprender?',
    q3: 'Qual sua preferência de formação?',
    result: 'Sua próxima etapa pode começar por aqui.',
    btnGo: 'Conhecer minha formação',
    btnTalk: 'Falar com a educadora',
    back: '← Voltar',
    reset: 'Refazer trilha'
  },

  // Passos "A técnica em detalhes" (lista) e cartões da galeria horizontal
  steps: ['Preparação da unha natural', 'Estrutura e extensão', 'Acabamento e brilho', 'Arte e detalhes'],
  gallery: [
    { img: 't08', caption: 'Extensão no molde F1', alt: 'Extensão de unhas no molde F1' },
    { img: 't15', caption: 'Esmalte em gel efeito magnético', alt: 'Esmaltação em gel efeito magnético' },
    { img: 't10', caption: 'Esmaltação efeito magnético', alt: 'Esmaltação efeito magnético' },
    { img: 't13', caption: 'Técnica de cuticulagem', alt: 'técnica de cuticulagem' },
    { img: 't06', caption: 'Esmaltação em gel', alt: ' Esmaltaçao em gel' },
    { img: 't02', caption: 'Molde F1 sanduíche', alt: 'Técnica de molde F1 sanduíche' }
  ],

  // As 3 etapas de "Sua evolução começa aqui" (level liga ao curso do mesmo nível)
  evolution: [
    { n: '01', title: 'Fundamentos', text: 'Conhecer princípios e técnicas fundamentais.', level: 'iniciante', img: 't04' },
    { n: '02', title: 'Aperfeiçoamento', text: 'Desenvolver precisão, acabamento e domínio técnico.', level: 'aperfeicoamento', img: 't13' },
    { n: '03', title: 'Especialização', text: 'Explorar técnicas avançadas e aprofundar conhecimentos.', level: 'especializacao', img: 't08' }
  ],

  // "Como funciona"
  flow: [
    { title: 'Escolha a formação', text: 'Use a trilha ou os caminhos acima para ver o que combina com você.' },
    { title: 'Fale com a equipe', text: 'Envie seu contato e tire dúvidas sobre conteúdo, turmas e condições.' },
    { title: 'Confirme sua vaga', text: 'Formas de pagamento, materiais e certificação são informados antes da inscrição.' },
    { title: 'Comece a aprender', text: 'Receba as orientações da turma e dê o primeiro passo na sua formação.' }
  ],

  // Dúvidas frequentes
  faq: [
    { q: 'Para quem são as formações?', a: 'Para quem está começando e também para profissionais que desejam se aperfeiçoar — as aulas e cursos de Josy vão do básico ao avançado. Use a trilha Nail para ver o caminho mais compatível.' },
    { q: 'Preciso ter experiência?', a: 'Existem caminhos pensados para iniciantes e para quem já atua. Os pré-requisitos de cada formação são informados pela Josy no atendimento.' },
    { q: 'As aulas são presenciais ou online?', a: 'Modalidade, datas e turmas variam conforme a formação. A Josy passa todos os detalhes diretamente pelo WhatsApp.' },
    { q: 'Há certificado?', a: 'Ao finalizar o curso, a aluna receberá o certificado de conclusão com a carga horária correspondente.Os cursos são livres, oferecidos nas modalidades presenciais e on-line, conforme a ligislação vigente.O certificado comprova a participação e a conclusão do curso, podendo ser utilizado para fins de atualização e comprovação de atividade.' },
    { q: 'Quanto custa e como posso pagar?', a: 'Investimento nos Cursos.Os valores variam de acordo com o curso,a modalidade e a carga horária da formação escolhida.Para consultar preços, formas de pagamento e condições especiais, entre em contato conosco pelo WhatsApp.
Invista no seu conhecimento e transforme seu futuro profissional' },
   { q: 'A formação garante renda ou resultados iguais para todas?', a: 'Não. Nenhuma formação garante renda ou resultado idêntico para todas as alunas.O aprendizado depende de prática, dedicação e do contexto de cada pessoa.' }
  ],
};
