
// Defina as configurações do canal a ser carregado:

// Digite o nome do canal
var channelName = 'GoogleDevelopers';
// Digite a chave da api criada no google console developers para esta api
var chaveApi = 'AIzaSyCbU92NtkPQnSXD16do3JCBuVd5YVcLhh8';
// Defina o tamanho do player a ser carregado (caso responsivo utilize 100%)
var vidWidth = 500;
var vidHeight = 400;
// Defina a quantidade videos exibidos assim que a página carregar
var maxResults = 4;
var pagina_video;



$(function() {

	// Função para carregar mais videos
	$('#carregar_mais_video').click(function(e){
		console.log("Carregar videos");
		e.preventDefault();
		$('#carregandoImg').show();
		$('#carregar_mais_video').hide();
		carregarVideos(pid);
	});

});


// Realizar autenticação no canal - Carrega o ID da playlist dos favoritos ou dos videos enviados (uploads)
$.get(
	"https://www.googleapis.com/youtube/v3/channels",{
		part: 'contentDetails',
		forUsername: channelName,
		key: chaveApi},
		function(data){
			console.log(data);
			$.each(data.items, function(i, item){
				pid = item.contentDetails.relatedPlaylists.uploads;
				carregarVideos(pid);
			})
		}
);

// Carrega os videos da playlist(uploads) definida acima
function carregarVideos(pid){
	// Parametros de busca na playlist
	var params = {
		part: 'snippet',
		maxResults: maxResults,
		playlistId: pid,
		order: "date",
		key: chaveApi};

	// Verifica se existem mais videos fora os que ja estão sendo exibidos
	if (pagina_video) {
		params.pageToken = pagina_video;
	}

	// Carrega JSON com a playlist do canal
	$.getJSON('https://www.googleapis.com/youtube/v3/playlistItems', params,
	 function(data) {
		console.log(data);	
		if(data.items !== undefined){
			for(var i=0; i<data.items.length; i++) {
				// Captura o ID dos videos no JSON
				idVideo = data.items[i].snippet.resourceId.videoId.split('/');
				idVideo = idVideo[idVideo.length-1];

				// Cria uma copia da li Default que está no .html e replica os videos criando classes
				var customList = $('#listaVideos #customList').clone();
				// Remove o ID da estrutura base utilizada para replicar a lista
				customList.removeAttr('id');


				srcYT = $(customList).find('.video_player').attr('src', '//www.youtube.com/embed/'+idVideo+'?rel=0&showinfo=0');

				//Adiciona URL no link da descrição do vídeo exibido 
				customList.find('.canal').attr('href', 'https://www.youtube.com/watch?v='+idVideo);
				//Carrega o titulo do vídeo
				customList.find('.titulo_video').text(data.items[i].snippet.title);
				//Carrega descrição do video 
				customList.find('.descricao_video').text(data.items[i].snippet.description.substr(0,128));

				// Carrega a data publicada do video e formata para modelo padrão Ex. Maio de 2015
				dia = data.items[i].snippet.publishedAt.substr(8,2);
				mes = data.items[i].snippet.publishedAt.substr(5,2);
				ano = data.items[i].snippet.publishedAt.substr(0,4);
				meses = ['', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
				customList.find('.data_video').text(dia+' de '+meses[parseInt(mes)]+' de '+ano);

				// Adiciona video criado a lista no .html
				$('#listaVideos').append(customList);


			}
			//Verifica se existe paginação na playlist
			pagina_video = data.nextPageToken;
			$('#carregandoImg').hide();
			$('#carregar_mais_video').show();
		} else {
			$('#carregandoImg').hide();
			$('#msgFimVideos').show();
		}
	});


}
	