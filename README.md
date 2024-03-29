# desafio

## Setup
Para executar o projeto, segue o padrão original do vue.
Crie uma pasta, via console, no diretório execute os seguintes comandos
```
git clone https://github.com/Capellaf/DesafioVue
npm install
npm run serve
```
Irá aparecer duas URLs, uma local, podendo abrir no computador em execução e outra em qualquer dispositivo conectado na mesma rede.
Basta inserí-lo no navegador.

### Ferramentas utilizadas
```
Vuex
vue-router
axios
```

### Responsividade
Utilizou-se max-width e em alguns momentos porcentagem como unidade de medida, preparando a tela para resizes.

### Desktop x Mobile
Foi criado um eventListener para modificar uma variável na store conforme o resize da tela. Quando detectada uma tela menor que 991px, entende-se como mobile.

### Customização
Para evitar repetição de códigos, foi criado variáveis root que armazenam as cores utilizadas no projeto.

### Componentização
Na tela principal há somente uma NavBar e a view que é lida a partir do router. Dentro da view buscou-se componentizar ao máximo os elementos de tela, otimizando o código e a responsividade da tela.

### Store
A store foi criada para, além de verificar se é um dispositivo mobile, o estado de algumas variáveis que podem ser utilizadas em vários momentos e o carrinho de compras. Não foi utilizado v-model pensando que o carrinho pode ser aberto em outras views, portanto foi manipulado diretamente na store. A conceito de desafio, não é armazenado no lado do cliente os dados, somente em uma única instância, quando recarregada a tela, é zerado os dados.

### Router
Router foi utilizado para gerenciar rotas e views. Apesar deste projeto só possuir uma única view, permite-se assim a escalabilidade e fácil manutenção.

### Validações e feedback
Acrescentado um feedback de adicionado produto no carrinho quando adicionado na homepage.
Validações de preço promocional, e não permite redução de itens no carrinho a zero, mínimo 1 ou exclusão.


