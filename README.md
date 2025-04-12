# Kanban Board - Desafio Nexum

## Olá!
Esse é o meu projeto para o desafio de desenvolvimento front da Nexum. Eu criei um Kanban Board com Vue 3 que ficou bem legal, com tudo que o desafio pedia e um toque extra de funcionalidade que eu achei que ia fazer diferença. Vou contar um pouco sobre o que fiz e como rodar ele aí na sua máquina!

## O que eu fiz
Eu desenvolvi um Kanban Board , pensando em algo simples de usar, mas que tivesse um visual bacana e funcional. Aqui estão os principais pontos:

- **Colunas**: Comecei com três colunas básicas: "A Fazer", "Em Progresso" e "Concluído". Você pode arrastar as tarefas entre elas pra acompanhar o progresso, o que ficou bem fluido com o vuedraggable.
- **Tarefas**: Dá pra criar, editar e excluir tarefas em qualquer coluna. Cada tarefa tem título, descrição e uma data de vencimento opcional. Tentei deixar tudo bem organizado nos cards.
- **Busca**: Adicionei uma barra de pesquisa no header que filtra as colunas pelo título enquanto você digita. Por exemplo, se digitar "A", só "A Fazer" aparece. Foi um dos pontos extras que eu quis incluir pra deixar o projeto mais completo.
- **Tema Claro/Escuro**: Coloquei um botão pra alternar entre modo claro e escuro. O fundo muda, as cores se ajustam, e ficou com uma vibe bem moderna.
- **Persistência**: Os dados ficam salvos no localStorage, então se você recarregar a página, tudo continua lá.
- **Visual**: Usei a fonte IBM Plex Mono pra dar um ar de "dev" e caprichei no CSS com bordas, sombras e um fundo quadriculado que achei que combinou bem.

Eu me preocupei em dividir o código em componentes reutilizáveis, como `AppHeader`, `KanbanBoard`, `KanbanColumn`, `TaskCard` e `TaskForm`, pra deixar tudo mais fácil de manter. Também adicionei umas transições simples pras colunas aparecerem e sumirem quando filtradas, o que deu um charme extra.

## Como rodar o projeto

### Pré-requisitos
Você vai precisar ter o Node.js instalado (eu usei a versão 18, mas deve rodar em outras recentes também). Além disso, o projeto usa o Vite como bundler, então é bem rápido pra subir.

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Suba o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Depois, é só abrir o navegador em [http://localhost:5173](http://localhost:5173) (ou a porta que aparecer no terminal).

### Teste tudo:
- Adicione uma tarefa clicando no "+" em alguma coluna.
- Arraste ela pra outra coluna pra ver o drag-and-drop funcionando.
- Digite "A" ou "Prog" na busca pra filtrar as colunas.
- Clique no botão de tema pra mudar entre claro e escuro.
- Se quiser resetar os dados, é só abrir o console do navegador (`F12`) e rodar `localStorage.clear()`.

## Hospedagem
Eu publiquei o projeto no Vercel pra facilitar o teste. Você pode acessar aqui: [https://seu-projeto.vercel.app](https://seu-projeto.vercel.app) (troque pelo link real depois que subir). Foi bem tranquilo de deployar, só precisei conectar o repositório do GitHub e deixar o Vercel fazer o resto.

## Estrutura do projeto
Aqui está como organizei os arquivos:

- `src/App.vue`: O componente raiz que junta o header e o board.
- `src/components/AppHeader.vue`: O header com a busca e o botão de tema.
- `src/views/KanbanBoard.vue`: Onde as colunas são renderizadas.
- `src/components/KanbanColumn.vue`: Cada coluna com suas tarefas.
- `src/components/TaskCard.vue`: Os cards das tarefas.
- `src/components/TaskForm.vue`: O formulário pra criar/editar tarefas.
- `src/stores/useTaskStore.js`: O store do Pinia que gerencia colunas, tarefas e a busca.
- `src/main.js`: Configuração do Vue e Pinia.

## O que eu aprendi
Esse desafio foi bem legal pra praticar Vue 3 com Composition API e Pinia. Tive que quebrar a cabeça pra fazer a busca funcionar direitinho sem bagunçar o resto, mas no final deu tudo certo. Também gostei de mexer com o vuedraggable – foi mais fácil do que eu esperava pra implementar o drag-and-drop.

## Possíveis melhorias
Se eu tivesse mais tempo, eu:

- Adicionaria um filtro pras tarefas também, não só pras colunas.
- Colocaria um datepicker bonitinho no formulário de tarefas.
- Faria o layout ficar ainda mais responsivo pra celulares (já funciona, mas dá pra polir mais).

## Considerações finais
Eu curti muito fazer esse projeto e espero que você goste do resultado! Tentei seguir as boas práticas que conheço, como componentização e tratamento de erros básicos, e dei um toque pessoal no design. Qualquer feedback é bem-vindo – é sempre bom aprender mais!

Feito por **Jhuan Camargo**
