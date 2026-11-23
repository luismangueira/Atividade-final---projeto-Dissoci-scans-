# Dissoci-scans

Repositório de scans de mangás e HQs feito com HTML, CSS e JavaScript puros, sem frameworks e sem etapa de build. Interface pensada para celular, inspirada em apps de leitura de mangá.

## Como rodar

Extraia o projeto e abra `index.html` no navegador. Não precisa de servidor nem de instalação.

Conta de moderador de teste: `mod@dissoci.com` / `mod123`.

## Estrutura

```
dissoci-scans/
├── index.html            página única; carrega o CSS e os scripts na ordem certa
├── css/
│   └── style.css         estilos, temas claro/escuro e layout mobile
└── js/
    ├── core/
    │   ├── helpers.js    atalhos, escape de HTML, datas, avisos, reduzir imagens
    │   ├── store.js      dados no localStorage, migrações, catálogo inicial
    │   └── state.js      estado da interface (aba ativa, filtros, editor de páginas)
    ├── views/            uma tela (ou componente) por arquivo
    │   ├── shared.js     capas, cartões, cálculo das notas, chips, mensagem de catálogo vazio
    │   ├── login.js      entrar e criar conta
    │   ├── onboarding.js escolha de gostos após o login
    │   ├── home.js       início: destaque, recomendações, ranking, novidades
    │   ├── search.js     busca e filtro por gênero
    │   ├── work.js       página da obra, avaliação por estrelas e lista de capítulos
    │   ├── reader.js     leitor (rolagem vertical ou página por página)
    │   ├── comments.js   comentários da obra e dos capítulos
    │   ├── profile.js    biblioteca (lendo, lidos, favoritos) e edição de perfil
    │   ├── settings.js   configurações, backup, suporte
    │   └── moderation.js painel de moderação (capítulos, capas, obras, chamados)
    ├── router.js         rotas por #hash e montagem da página
    ├── events/
    │   ├── click.js      ações dos botões e links (data-a)
    │   ├── change.js     selects, checkboxes, campo de busca, envio de imagens
    │   └── forms.js      formulários (login, comentários, perfil, capítulos...)
    └── main.js           ponto de entrada
```

Os scripts são carregados em sequência pelo `index.html` e compartilham o mesmo escopo global. Por isso a **ordem das tags `<script>` importa**: `core` primeiro, depois `views`, depois `router` e `events`, e `main.js` por último.

## Como funciona

- **Rotas:** o hash da URL escolhe a tela (`#inicio`, `#buscar`, `#obra-1`, `#ler-1-2`, `#perfil`, `#config`, `#mod`, `#gostos`).
- **Dados:** tudo fica no `localStorage` do navegador (chave `dsc`). Não há servidor, então cada navegador tem os próprios dados.
- **Telas:** cada função `v...` devolve HTML como texto, e o `router.js` coloca esse HTML na página.
- **Eventos:** em vez de um listener por botão, há um listener global por tipo de evento. Os botões indicam a ação em `data-a`, e os formulários em `data-f`.
- **Perfis:** usuário comum lê, comenta, favorita e configura. Moderador também publica capítulos, define capas, cria obras e atende chamados.


## Limitações

- Senhas ficam salvas em texto no navegador. Serve para protótipo, não para produção.
- O armazenamento do navegador é limitado (cerca de 5 MB). Capítulos com muitas imagens podem não caber.
- Para publicar de verdade, será preciso um backend com banco de dados, autenticação e armazenamento de imagens.

## Onde mexer primeiro

| O que você quer mudar | Onde procurar |
| --- | --- |
| Textos e botões de uma tela | Arquivo da tela em `js/views/` |
| O que acontece ao clicar em um botão | Procure o valor de `data-a` em `js/events/click.js`. Para campos e opções, veja `js/events/change.js`. |
| O que acontece ao enviar um formulário | Procure o valor de `data-f` em `js/events/forms.js`. |
| A tela que aparece ao abrir um endereço como `#obra-1` | `js/router.js` |
| O catálogo que aparece ao abrir o site pela primeira vez | `batmanAbsoluto` em `js/core/store.js` |
| Cores, tamanhos e espaçamento | `css/style.css` |

### Exemplo: do botão Favoritar até a Biblioteca

A tela da obra monta um botão com `data-a="fv"` e passa o ID da obra em `data-v`. Em `js/events/click.js`, a ação `fv` adiciona ou remove esse ID dos favoritos e chama `save()`. Na Biblioteca, a aba Favoritos usa a mesma lista para exibir os cartões das obras.
