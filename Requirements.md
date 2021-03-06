# Atividade Prática de Desenvolvimento Front End Samba Tech - Processo de Seleção
##### Atividade Prática
O desafio consiste em construir e colocar no ar uma aplicação web que possibilite a conversão de arquivos de vídeo de um formato específico, não compatível com padrões da web, para um formato que seja compatível com os padrão da web. A aplicação deve possuir uma interface web que permita a inclusão de um novo arquivo de entrada e, após finalizado o processo, permita o usuário assistir ao vídeo no navegador.

A tela inicial deve conter um botão de upload que fará o envio do arquivo sem a atualização do browser. Após o upload, é necessário adicionar o vídeo em uma listagem de vídeos, onde serão apresentadas informações de seu processamento (considere apenas os status de “enviando”, “encodando”, “finalizado“ e “erro“) e um placeholder com o nome do vídeo. Ao clicar em um item da listagem será exibido uma tela com o player do vídeo para ser tocado (pode ser o player HTML5 nativo do browser ou qualquer um do mercado, como <http://www.videojs.com/>.

##### Entregáveis

1. O endereço web (URL) da aplicação funcionando; 
2. O endereço web do repositório github com o código da aplicação disponível para análise. Os entregáveis devem ser submetidos para giovana.pantuzo@sambatech.com.br.

_Regras e Orientações de código_
1. Utilizar no desenvolvimento de front end, preferencialmente o framework React (ou Vue, caso tenha dificuldades)
2. A aplicação backend deve ser desenvolvida em Java, Python ou NodeJS. Qualquer framework disponível para estas linguagens é permitido.
3. Apresentar um template que seja responsivo.
4. Use o conceito de “single page application” sem o “refresh” da página com rotas para a listagem e para a visualização “única” , assim podendo ser acessado “diretamente” pelo usuário. (Exemplo: “/videos” sendo a listagem e “/videos/:id” o acesso direto a um vídeo)
5. Considere a implementação de testes automatizados (principalmente no frontend).
6. Documente os processos de utilização da sua aplicação

##### Regras e Orientações gerais

1. Para o arquivo de entrada, utilize o exemplo “sample.dv” disponível em <http://dinamica-sambatech.s3.amazonaws.com/sample.dv>
2. Gestão de Código Fonte: os fontes devem ser disponibilizados em um repositório publico do GitHub (http://github.com). Será avaliado o histórico dos commits para verificar a sua frequência e separação temática entre eles. Caso ainda não tenha uma conta, é necessário criar uma nova, e um repositório (ambos gratuitamente);
3. Você deve rodar sua aplicação em algum provedor de Cloud Computing dentre os oferecidos na lista abaixo. Todos eles oferecem versões gratuitas que são suficientes para esta atividade;
4. Para realizar a conversão do arquivo de entrada no arquivo de saída, utilize também algum dos serviços de encoding oferecidos na lista abaixo. Igualmente estes serviços oferecem opções gratuitas que são suficiente para esta atividade;
5. Os arquivos de entrada e de saída devem ficar armazenados no serviço de storage Amazon S3 (também oferecido na lista abaixo).

#### Serviços
_Para rodar sua aplicação_
* Heroku: [http://www.heroku.com/](http://www.heroku.com/)
* Amazon Elastic Compute Cloud (Amazon EC2): [http://aws.amazon.com/ec2/](http://aws.amazon.com/ec2/)
* Google App Engine: https://developers.google.com/appengine/

_Serviço de Storage_
* Amazon Simple Storage Service (Amazon S3) [http://aws.amazon.com/s3/](http://aws.amazon.com/s3/)

_Serviços de Encoding_
* Zencoder: <http://zencoder.com> (Use o profile "Test" para não pagar)
* Encoding.com: <http://www.encoding.com> (Use o plano "Free")


