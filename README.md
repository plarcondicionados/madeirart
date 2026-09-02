# MadeirArt — Site Institucional

Landing page única da **MadeirArt** — marcenaria, serralheria e mesas artesanais em
Ribeirão Preto — SP. Móveis de área gourmet em madeira teca, estrutura de alumínio
preto e corda náutica trançada à mão.

---

## Instalação e execução

```bash
npm install
```

```bash
npm run dev
```

O site sobe em `http://localhost:5173`.

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento com hot reload |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Serve o `dist/` localmente, para conferir antes de publicar |
| `npm run lint` | Checagem de tipos (TypeScript) |
| `npm run images:optimize` | Converte PNG/JPG de `src/assets/images` em WebP otimizado |

Para publicar, basta subir a pasta `dist/` em qualquer hospedagem estática
(Vercel, Netlify, Hostinger, GitHub Pages). Não há backend.

---

## Stack

| Camada | Tecnologia |
| --- | --- |
| Build | Vite 5 + React 18 + TypeScript |
| Estilo | TailwindCSS 3 (paleta "verniz" customizada) |
| Animação | Framer Motion 11 |
| Rolagem suave | Lenis 1.1 |
| Imagens | WebP otimizado via `sharp` |

---

## Estrutura de pastas

```
src/
├── assets/images/          Fotos do catálogo e imagens de ambientação (WebP)
├── components/
│   ├── layout/             Header (menu fixo) e Footer
│   ├── sections/           Uma pasta por seção da página
│   └── ui/                 Peças reutilizáveis (Logo, LazyImage, Reveal…)
├── data/                   TODO o conteúdo em texto fica aqui
│   ├── site.ts             Endereço, WhatsApp, horários, menu
│   ├── collection.ts       Catálogo de produtos
│   ├── process.ts          Etapas do processo artesanal
│   └── testimonials.ts     Depoimentos
├── hooks/
│   ├── useSmoothScroll.tsx Provider do Lenis + navegação por âncoras
│   ├── useActiveSection.ts Item ativo do menu
│   └── useScrollPosition.ts
├── lib/utils.ts            Helpers (classes, link de WhatsApp)
├── pages/Home.tsx          Montagem da landing page
└── App.tsx
```

> **Para alterar textos, preços ou produtos, mexa apenas em `src/data/`.**
> Os componentes não têm texto fixo dentro deles.

---

## Como funciona o contato (sem servidor)

O site é 100% estático — **nada fica armazenado em nenhum servidor**. Mesmo assim
as informações do projeto chegam completas no WhatsApp:

1. O visitante preenche o briefing na seção **Contato** (nome, telefone, tipo de
   peça, medidas e detalhes).
2. Ao clicar em *Enviar pedido pelo WhatsApp*, o site **monta a mensagem já
   formatada** e abre a conversa com o número da MadeirArt.
3. O visitante confere e toca em enviar. A mensagem chega assim:

```
*Pedido de orçamento — site MadeirArt*

*Nome:* Joana Ribeiro
*Telefone:* (16) 98888-7777
*Tipo de peça:* Conjunto de mesa + cadeiras
*Medidas / lugares:* 2,40 m — 8 lugares

*Detalhes do projeto:*
Mesa em teca com 8 cadeiras em corda areia, estrutura preta,
para varanda gourmet coberta.
```

Como o telefone do cliente vem escrito na mensagem, você consegue retornar mesmo
que ele não continue a conversa.

Existem ainda outros caminhos para o mesmo WhatsApp:

- o botão verde flutuante, que aparece assim que o visitante passa do topo;
- o botão *Solicitar* em cada card da coleção (já cita o modelo escolhido);
- os contatos diretos na seção Contato e no rodapé.

### Números cadastrados

| Rótulo | Número | Onde aparece |
| --- | --- | --- |
| Atendimento | (16) 99755-3582 | Formulário, botão flutuante, cards da coleção, contatos diretos |
| Edilson | (16) 99715-3724 | Contatos diretos (seção Contato e rodapé) |
| Werley Alencar | (16) 99715-3971 | Contatos diretos (seção Contato e rodapé) |

O número principal fica em `company.contact` e a lista de contatos diretos em
`directContacts` — ambos em `src/data/site.ts`.

### Se um dia quiser receber por e-mail também

Basta trocar o `window.open(...)` dentro de `handleSubmit`
(`src/components/sections/Contato.tsx`) por um `fetch` para um serviço de
formulário (Formspree, Basin, Web3Forms). A validação e a montagem da mensagem
já estão prontas.

---

## Rolagem suave (Lenis) + Framer Motion

O ponto delicado dessa combinação está resolvido em
[`src/hooks/useSmoothScroll.tsx`](src/hooks/useSmoothScroll.tsx):

- O `raf` do Lenis roda **dentro do loop de frames do Framer Motion**
  (`frame.update`), em vez de um `requestAnimationFrame` próprio. Sem isso, o
  `useScroll` do Framer lê a posição um frame atrasado e o parallax "treme".
- `scrollTo()` é exposto via contexto e usado pelos links de âncora do header,
  do rodapé e dos botões do hero, com um deslocamento que compensa a altura do
  header fixo.
- `setScrollLocked()` congela a página enquanto o menu mobile está aberto.
- Quem tem **"reduzir movimento"** ligado no sistema operacional nunca recebe o
  Lenis: a rolagem cai para o comportamento nativo do navegador e as animações
  são desligadas via CSS.

---

## Imagens

| Origem | Uso |
| --- | --- |
| Fotos reais do acervo (`produto-*`, `ambiente-*`) | Seção Coleção |
| Geradas com Higgsfield (`processo-*`, `sobre-*`, `showroom-*`, `ambiente-area-gourmet-*`) | Hero, Sobre, Processo e Showroom |
| `madeirart-monograma.webp` | Símbolo da marca, recortado da logo original |

As fotos de catálogo tinham uma tarja branca com o nome do produto; ela foi
recortada e o texto virou o conteúdo dos cards em `src/data/collection.ts`.

Todas as imagens foram convertidas para WebP: **30 MB → 1,2 MB** (−96%). Para
adicionar novas, jogue o arquivo em `src/assets/images` e rode:

```bash
npm run images:optimize
```

Carregamento é preguiçoso (`loading="lazy"`) em tudo, menos na imagem do hero.

---

## Pendências — precisam dos seus dados reais

1. **Logo × nome.** A arte original escreve **MADERART**; o site usa
   **MadeirArt**. Para não exibir os dois nomes brigando, o site usa apenas o
   **monograma** da logo (a moldura metálica com a cadeira) e escreve
   "MadeirArt" em tipografia. Se preferir a logo por extenso, mande a versão
   com o nome correto.
2. **Rótulos dos contatos.** Edilson e Werley Alencar aparecem só pelo nome, sem
   cargo. Se quiser identificar cada um (ex.: "Vendas", "Projetos"), é só editar
   `directContacts` em `src/data/site.ts`.
3. **Horários de funcionamento** em `src/data/site.ts` ainda são uma estimativa —
   confirme antes de publicar.
4. **Depoimentos** (`src/data/testimonials.ts`) são fictícios. Substitua por
   avaliações reais antes de publicar.
5. **Preços**: todos os produtos estão como "Preço sob consulta".
6. **Mapa**: aponta para Rua Doutor João Guião, 133. Para o pin exato, gere o
   embed no Google Maps (Compartilhar → Incorporar um mapa) e cole em
   `mapsEmbedUrl`.
7. **Instagram**: fora do site por enquanto — me passe o @ para eu colocar no
   rodapé.
