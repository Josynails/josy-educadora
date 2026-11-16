# Josy Santos Educadora Nail — guia de gestão da página

Site estático (HTML + CSS + JS), sem banco de dados e sem painel. Tudo que muda com frequência fica em **`config.js`**.

## O que editar e onde
Quase tudo fica em **`config.js`** (abra no bloco de notas ou no editor do GitHub). Troque só o que está **entre aspas** e mantenha vírgulas, chaves e colchetes.

| Quero mudar | Onde no `config.js` |
|---|---|
| WhatsApp (número, texto do botão, mensagem pronta, como o número aparece), Instagram, e-mail | `contact` |
| Título e descrição que aparecem no Google | `meta` |
| **Qualquer título, subtítulo, parágrafo e texto de botão** | `texts` (cada linha tem o nome da seção, ex.: `'hero.title1'`) |
| Menu do topo e do rodapé | `nav` |
| Faixa que corre abaixo do topo | `marquee` |
| Três destaques do topo e da seção "Conheça Josy" | `facts` e `stats` |
| Cartões "Qual é o seu próximo passo?" | `paths` |
| Perguntas da Trilha Nail e botões do resultado | `quiz` (as opções de resposta ficam em `experience`, `areas` e `modalities`) |
| Passos e galeria de "A técnica em detalhes" | `steps` e `gallery` |
| As 3 etapas de "Sua evolução começa aqui" | `evolution` |
| Cursos (nome, descrição, modalidade, carga horária, datas, vagas, valor, link de inscrição) | `courses` (campo `null` não aparece no site) |
| "Como funciona" | `flow` |
| Perguntas frequentes | `faq` (para adicionar uma, copie uma linha inteira) |
| Vídeos: legenda, categoria, ordem; vídeo do topo | `videos` e `heroVideo` |
| Depoimentos escritos | `testimonials` |

Marcações nos textos: `*palavra*` = destaque em letra artística; `**palavra**` = negrito; `\n` = quebra de linha.

**Imagens e vídeos novos:** envie o arquivo para a pasta `assets/aulas/` (vídeo `tNN.mp4` e capa `tNN.jpg`, com o mesmo número) e cadastre em `videos`. Nos campos `img` pode-se usar o número (`'t04'`) ou o caminho de uma imagem (`'/assets/img/foto.jpg'`). Vídeos leves (até ~5 MB, MP4, largura 720 px) carregam mais rápido.

**Cores e fontes:** `style.css`, bloco `:root` no início (`--ink` preto, `--bg` branco, `--off` off-white, `--accent` azul-aço). Fontes originais em `assets/fonts/`.

**Estrutura e layout** (ordem das seções, novos blocos): `index.html` e `style.css` — exige conhecimento de código.
## Como publicar (Vercel)
1. Instale o Node.js e o Vercel CLI (`npm i -g vercel`), e faça `vercel login` com a conta dona do projeto.
2. Na pasta do projeto: `vercel deploy --prod --yes`.
3. Para testar antes: `node server.js` e abrir http://localhost:5194

## Contas e domínio
- Hospedagem: projeto `josy-educadora` na Vercel (hoje na conta `netto-ecommerce`). Para passar à Josy: Vercel → Project → Settings → Transfer, ou ela cria o projeto na conta dela e faz o deploy desta pasta.
- Domínio: ainda não registrado. Pode ser registrado pela própria Josy (Registro.br ou Vercel) e apontado em Project → Settings → Domains.

## Pendências de conteúdo
Nome oficial, conteúdo, carga horária, datas, vagas, valores e certificação dos cursos · foto da Josy · fotos reais de trabalhos e alunas · confirmar legendas dos vídeos marcadas como não confirmadas.
## Jeito mais fácil, sem instalar nada (GitHub + Vercel)
1. Criar uma conta grátis em github.com e um repositório novo chamado `josy-educadora`.
2. Clicar em **Add file → Upload files** e arrastar o conteúdo da pasta do projeto (descompactada). Confirmar em **Commit changes**.
3. Em vercel.com, entrar com a conta do GitHub → **Add New → Project** → escolher o repositório `josy-educadora` → **Deploy** (sem mudar nenhuma configuração).
4. Para alterar algo depois (exemplo: o botão "Falar no WhatsApp"): abrir o repositório no GitHub → clicar em `config.js` → ícone de lápis (Edit) → mudar o texto entre aspas → **Commit changes**. A Vercel publica sozinha em cerca de 1 minuto.
5. Vídeos novos: em `assets/aulas/` → **Add file → Upload files**, e depois adicionar a linha do vídeo em `config.js`.