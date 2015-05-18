Para exibir uma playlist de um canal no seu site basta seguir as ações abaixo:

### Carregue a biblioteca do JQuery mais atualizada
```
http://code.jquery.com/jquery-1.11.3.min.js
```

### Crie sua API-Key no Google
Para obter os recursos da API é necessário criar uma chave para autenticação e monitoramento da sua API, sendo assim acesse sua conta no Google em: https://console.developers.google.com > 

```
API's e Autenticação > API's > Ative a API
API's e Autenticação > Credenciais >  Acesso público à API > Criar nova chave
```

### Configurando o canal a ser utilizado
Localize o arquivo static/js/main.js e siga as configurações comentadas no arquivo

```
// Digite o nome do canal
var channelName = 'GoogleDevelopers';
// Digite a chave da api criada no google console developers para esta api
var chaveApi = ' ';
// Defina o tamanho do player a ser carregado (caso responsivo utilize 100%)
var vidWidth = 500;
var vidHeight = 400;
// Defina a quantidade videos exibidos assim que a página carregar
var maxResults = 4;
var pagina_video;
```


### HTML
Na sua página .html crie uma estrutura conforme exemplo abaixo:
```
<ul id="listaVideos">
	<li id="customList">
		<iframe class="video_player" width="560" height="315" frameborder="0" allowfullscreen></iframe>
		<a class="canal" target="_blank">
			<span class="titulo_video"></span>
			<span class="descricao_video"></span>
			<span class="data_video"></span>
		</a>
	</li>
</ul>
<img id="carregandoImg" src="static/img/carregando.gif" alt="Carregando">
<a href="#" id="carregar_mais_video">Carregar mais</a>
<div id="msgFimVideos">Todos os vídeos foram carregados</div>
```

