
# Samba Tech - Node

![Samba Tech](https://sambatech.com/wp-content/themes/tema-sambatech/img/logo-sambatech-rodape.png)

O projeto consiste em construir e colocar no ar uma aplicação web que possibilite a conversão de arquivos de vídeo de um formato específico, não compatível com padrões da web, para um formato que seja compatível com os padrão da web. A aplicação deve possuir uma interface web que permita a inclusão de um novo arquivo de entrada e, após finalizado o processo, permita o usuário assistir ao vídeo no navegador.

## Estrutura do projeto
|Pasta|Descrição|
|--|--|
|frontend|Código do sistema frontend em React, podendo rodar separado ou em conjunto com o server|
|server|Código do sistema servidor em node/koa, podendo rodar separado ou em conjunto com o frontend|
|~|Contem este arquivo de o enunciado do sistema|

## Como Iniciar?

Após a realização do clone da branch master, segue abaixo as instruções: 

**O sistema de frontend é necessário seguir os passos em terminal:**

    $ npm install
    $ npm start

**O sistema de servidor é necessário seguir os passos em terminal:**

    $ npm install
    $ npm run serve

## Como Utilizar?

- Ao iniciar aplicação apresentará uma página com a lista de vídeos
- O usuário tem a opção de enviar um novo vídeo clicando no botão "Envie seu vídeo"
- O usuário tem a opção de clicar no nome do vídeo (ID - FileName) para assistí-lo
- Após assistir o vídeo para voltar a tela inicial deve-se clciar no link "Home" descrito de SAMBA-VIDEO-NODE

## Exemplo com a aplicação rodando

[http://rodcoura-samba-tech.s3-website-sa-east-1.amazonaws.com/#/](http://rodcoura-samba-tech.s3-website-sa-east-1.amazonaws.com/#/)
