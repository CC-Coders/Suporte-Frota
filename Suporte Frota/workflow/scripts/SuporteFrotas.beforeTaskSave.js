function beforeTaskSave(colleagueId, nextSequenceId, userList) {
	var processo = parseInt(getValue("WKNumProces"));
	var atividade = parseInt(getValue("WKNumState"));	
	if (atividade == 10) {
	   	EnviaNotificacaoEncerramento(processo)
	}
}

function EnviaNotificacaoEncerramento(numSolic) {
	var processo = parseInt(getValue("WKNumProces"));
	var suporte = hAPI.getCardValue("suporte");
	var demanda = hAPI.getCardValue("demanda");
        var obra = hAPI.getCardValue("obra");
        var html = ""
        var assunto = ""
        var regex = /\d+\s-\s(.+)/;
        var match = obra.match(regex);
        if (match && match.length > 1) {
		var obraSemNumero = match[1].trim();
	} 
        var ccMatriz = hAPI.getCardValue("CCMatriz")
        if(ccMatriz != ""){
        	var ccMatrizHTML = "<b>Departamento:</b> " + ccMatriz + "<br>"
        }else{
        	var ccMatrizHTML = ""
        }
        var prazo_dias = hAPI.getCardValue("daterange");
        if(prazo_dias != ""){
        	var prazo_diasHTML = "<b>Período em Dias:</b> " + prazo_dias + "<br>";
        }else{
        	var prazo_diasHTML = ""
        }
        var houveTerceiro = hAPI.getCardValue("houveTerceiro") 
        if(houveTerceiro == "Sim"){
    		var contatoTerceiroHTML = "<b>Contato do Terceiro Envolvido:</b> " + hAPI.getCardValue("contatoTerceiroInput") + "<br>"
        } else {
        		var contatoTerceiroHTML = "";
        }
        var tipoVeiculo = hAPI.getCardValue("tipoVeiculo")
        if(tipoVeiculo !== "Carro de Passeio"){
    		var tipoHTML = "<b>Rodagem:</b> " + hAPI.getCardValue("rodagem") + "<br>" + "<b>Eixos:</b> " + hAPI.getCardValue("eixos") + "<br>"
        } else {
        		var tipoHTML = "";
        }
        var tipoCartao = hAPI.getCardValue("options") || "Não especificado";
	log.info("ENTRO AQUI")
	
	try{
		if(suporte == "Locação de Veículo") {
		assunto = "Locação de Veículo"			
		html +=  
			            	"<p>Segue as informações referentes ao processo  <a href='http://fluig.castilho.com.br:1010/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + processo + "' target='_blank'>Nº" + processo + "</a>.</p>" +
			                "<div>" +
			                    "<p>" +
			                        "<b style='font-size: 16px'>Informações Gerais</b><br>" +
			                        "<b>Suporte:</b> " + suporte + "<br>" +
			                        "<b>Demanda:</b> " + demanda + "<br>" +
			                        "<b>Data de Solicitação:</b> " + hAPI.getCardValue("data_ocorrencia_hidden") + "<br>" + 
			                        "<b>Obra:</b> " + obraSemNumero + "<br>" +
			                        ccMatrizHTML +
			                        "<b>Endereço de Retirada:</b> " + hAPI.getCardValue("enderecoRetirada") + "<br>" +    
			                        "<b>Endereço de Devolução:</b> " + hAPI.getCardValue("enderecoDevolucao") + "<br>" +    
			                        "<b>Previsão de Retirada:</b> " + hAPI.getCardValue("previsao_entrega_oculta") + "<br>" +     
			                        "<b>Prazo do Contrato:</b> " + hAPI.getCardValue("prazoContrato") + "<br>" +
			                        prazo_diasHTML +       
			                        "<b>Quilometragem Mensal:</b> " + hAPI.getCardValue("kmMensal") + " km <br>" +
			                        "<b>Tipos de Modelo:</b> " + hAPI.getCardValue("modeloVeiculo") + "<br>" +
			                        "<b>Setor de Atuação:</b> " + hAPI.getCardValue("setorAtuacao") + "<br>" +
			                        "<b>Motivo da Locação:</b> " + hAPI.getCardValue("motivoLocacao") + "<br><br>" +			                                                        
			                        "<b style='font-size: 16px'>Informações sobre o Condutor</b><br>" +
			                        "<b>Nome:</b> " + hAPI.getCardValue("nomeCondutor") + "<br>" +
			                        "<b>Email:</b> " + hAPI.getCardValue("emailCondutor") + "<br>" +
			                        "<b>Telefone:</b> " + hAPI.getCardValue("telefoneCondutor") + "<br>" +
			                        "<b>Regime:</b> " + hAPI.getCardValue("regimeCondutor") + "<br>" +
			                        "<b>CPF:</b> " +  hAPI.getCardValue("cpfCondutor") + "<br>" +
			                    "</p>" +
			                "</div>";
	}else if(suporte == "Aprovações Custo Obra") {
			assunto = "Aprovações Custo Obra"			
			html +=  
				"<p>Segue as informações referentes ao processo  <a href='http://fluig.castilho.com.br:1010/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + processo + "' target='_blank'>Nº" + processo + "</a>.</p>" +
		                     "<div>" +
		                         "<p>" +
		                             "<b style='font-size: 16px'>Informações Gerais:</b><br>" +
		                             "<b>Suporte:</b> " + suporte + "<br>" +
		                             "<b>Data de Solicitação:</b> " + hAPI.getCardValue("data_ocorrencia_hidden") + "<br>" + 
		                             "<b>Obra:</b> " + obraSemNumero + "<br>" +
		                             ccMatrizHTML +
		                             "<b>Demanda:</b> " + demanda + "<br>" +                      
		                             "<b>Placa do Veículo:</b> " + hAPI.getCardValue("placaManutencoes") + "<br>" + 
		                             "<b>Nome do Condutor:</b> " + hAPI.getCardValue("nomeCondutorAp") + "<br>" + 
		                             "<b>Quilometragem do Veículo:</b> " + hAPI.getCardValue("kmManutencoes") + "<br>" +
		                             "<b>Valor Orçamento Inicial:</b> " + hAPI.getCardValue("orcamentoInicial") + "<br>" +
		                             "<b>Valor Orçamento Final:</b> " + hAPI.getCardValue("orcamentoFinal")  + "<br>" +                                             
		                             "<b>Observação:</b> " + hAPI.getCardValue("observacaoManutencoes")  + "<br>" +                                             
		                         "</p>" +
		                     "</div>";
	}else if(suporte == "Sinistro") {
		assunto = "Suporte Sinistro"			
		html +=  
		"<p>Segue as informações referentes ao processo <a href='http://fluig.castilho.com.br:1010/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + processo + "' target='_blank'>Nº" + processo + "</a>.</p>" +
                "<div>" +
                    "<p>" +
                        "<b style='font-size: 16px'>Informações Gerais</b><br>" +
                        "<b>Suporte:</b> " + suporte + "<br>" +
                        "<b>Data de Solicitação:</b> " + hAPI.getCardValue("data_ocorrencia_hidden") + "<br>" + 
                        "<b>Obra:</b> " + obraSemNumero + "<br>" +
                        ccMatrizHTML +
                        "<b>Demanda:</b> " + demanda + "<br>" +   
                        "<b>Houve Terceiro?</b> " + houveTerceiro + "<br>" +
                        contatoTerceiroHTML +                                          
                        "<b>Localização de Ocorrência:</b> " + hAPI.getCardValue("localOcorrencia") + "<br>" +                         
                        "<b>Número do Boletim de Ocorrência:</b> " + hAPI.getCardValue("numeroBO") + "<br>" +                         
                        "<b>Cidade de Localização Atual dos Veículos</b> " + hAPI.getCardValue("cidadeLocalizacao") + "<br><br>" +       
                        "<b>Placa:</b> " + hAPI.getCardValue("placaSinistro") + "<br><br>" +  
                        "<b style='font-size: 16px'>Informações sobre o Condutor:</b><br>" +
                        "<b>Nome:</b> " + hAPI.getCardValue("nomeCondutor") + "<br>" +
                        "<b>Email:</b> " + hAPI.getCardValue("emailCondutor") + "<br>" +
                        "<b>Telefone:</b> " + hAPI.getCardValue("telefoneCondutor") + "<br>" +
                        "<b>Regime:</b> " + hAPI.getCardValue("regimeCondutor") + "<br>" +
                        "<b>CPF:</b> " +  hAPI.getCardValue("cpfCondutor") + "<br>" +
                    "</p>" +
                "</div>";
	}else if(demanda == "Recarga Complementar") {
		assunto = "Recarga Complementar de Cartão Combustível"			
			html +=  
				"<p>Segue as informações referentes ao processo <a href='http://fluig.castilho.com.br:1010/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + processo + "' target='_blank'>Nº" + processo + "</a>.</p>" +
		                  "<div>" +
		                      "<p>" +
		                          "<b style='font-size: 16px'>Informações Gerais:</b><br>" +
		                          "<b>Suporte:</b> " + suporte + "<br>" +
		                          "<b>Data de Solicitação:</b> " + hAPI.getCardValue("data_ocorrencia_hidden") + "<br>" + 
		                          "<b>Obra:</b> " + obraSemNumero + "<br>" +
		                          ccMatrizHTML +
		                          "<b>Demanda:</b> " + demanda + "<br>" +   
		                          "<b>Placa do Veículo:</b> " + hAPI.getCardValue("placaRecarga") + "<br>" +   
		                          "<b>Valor:</b> " + hAPI.getCardValue("valorRecarga") + "<br>" +   
		                          "<b>Motivo:</b> " + hAPI.getCardValue("motivoRecarga") + "<br>" +                                                                                  
		                      "</p>" +
		                  "</div>";
	}else if(demanda == "Solicitação de Cartão") {
		assunto = "Solicitação de Cartão Combustível"			
			html +=  
				"<p>Segue as informações referentes ao processo <a href='http://fluig.castilho.com.br:1010/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + processo + "' target='_blank'>Nº" + processo + "</a>.</p>" +
		                  "<div>" +
		                      "<p>" +
		                          "<b style='font-size: 16px'>Informações Gerais:</b><br>" +
		                          "<b>Suporte:</b> " + suporte + "<br>" +
		                          "<b>Data de Solicitação:</b> " + hAPI.getCardValue("data_ocorrencia_hidden") + "<br>" + 
		                          "<b>Obra:</b> " + obraSemNumero + "<br>" +
		                          ccMatrizHTML +
		                          "<b>Demanda:</b> " + demanda + "<br>" +   
		                          "<b>Tipo de Cartão:</b> " + tipoCartao + "<br>" +   
		                          "<b>Limite do Cartão:</b> " + hAPI.getCardValue("limiteSolicitacao") + "<br>" +   
		                          "<b>Motivo:</b> " + hAPI.getCardValue("motivoDesbloqueio") + "<br>" +                                                                                  
		                      "</p>" +
		                  "</div>";
	}else if(demanda == "Cancelamento de Cartão" || demanda == "Reemissão de Cartão"){
		assunto = demanda
		html +=  
	 	"<p>Segue as informações referentes ao processo <a href='http://fluig.castilho.com.br:1010/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + processo + "' target='_blank'>Nº" + processo + "</a>.</p>" +
                "<div>" +
                    "<p>" +
                        "<b style='font-size: 16px'>Informações Gerais:</b><br>" +
                        "<b>Suporte:</b> " + suporte + "<br>" +
                        "<b>Data de Solicitação:</b> " + hAPI.getCardValue("data_ocorrencia_hidden") + "<br>" + 
                        "<b>Obra:</b> " + obraSemNumero + "<br>" +
                        ccMatrizHTML +
                        "<b>Demanda:</b> " + demanda + "<br>" +    
                        "<b>Placa do Veículo:</b> " + hAPI.getCardValue("placaCancelamento") + "<br>" +   
                        "<b>Motivo:</b> " + hAPI.getCardValue("motivoCancelamento") + "<br>" +                                                                                  
                    "</p>" +
                "</div>";
	}else if(demanda == "Cancelamento de Código de Motorista" || demanda == "Criação de Código de Motorista"){
                assunto = demanda
                html +=  
                "<p>Segue as informações referentes ao processo <a href='http://fluig.castilho.com.br:1010/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + processo + "' target='_blank'>Nº" + processo + "</a>.</p>" +
                "<div>" +
                    "<p>" +
                    "<b style='font-size: 16px'>Informações sobre o Condutor:</b><br>" +
                    "<b>Nome:</b> " + hAPI.getCardValue("nomeCondutor") + "<br>" +
                    "<b>Email:</b> " + hAPI.getCardValue("emailCondutor") + "<br>" +
                    "<b>Telefone:</b> " + hAPI.getCardValue("telefoneCondutor") + "<br>" +
                    "<b>Regime:</b> " + hAPI.getCardValue("regimeCondutor") + "<br>" +
                    "<b>CPF:</b> " +  hAPI.getCardValue("cpfCondutor") + "<br>" +                                                                              
                    "<b>Motivo:</b> " +  hAPI.getCardValue("motivoCondutor") + "<br>" +                                                                              
                    "</p>" +
                "</div>";
        }
	else if(demanda == "Desbloqueio de Cartão"){
		assunto = "Desbloqueio de Cartão Combustível"
		html +=  
		"<p>Segue as informações referentes ao processo <a href='http://fluig.castilho.com.br:1010/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + processo + "' target='_blank'>Nº" + processo + "</a>.</p>" +
                "<div>" +
                    "<p>" +
                        "<b style='font-size: 16px'>Informações Gerais:</b><br>" +
                        "<b>Suporte:</b> " + suporte + "<br>" +
                        "<b>Data de Solicitação:</b> " +  hAPI.getCardValue("data_ocorrencia_hidden") + "<br>" + 
                        "<b>Obra:</b> " + obraSemNumero + "<br>" +
                        ccMatrizHTML +
                        "<b>Demanda:</b> " + demanda + "<br>" +    
                        "<b>Placa do Veículo:</b> " + hAPI.getCardValue("placaDesbloqueio") + "<br>" +   
                        "<b>Número do Cartão:</b> " + hAPI.getCardValue("numeroDesbloqueio") + "<br>" +                                                                                  
                        "<b>Data de Recebimento:</b> " + hAPI.getCardValue("dataDesbloqueio") + "<br>" +                                                                                  
                    "</p>" +
                "</div>";
	}else if(demanda == "Alteração de Limite"){
		assunto = "Alteração de Limite de Cartão Combustível"
		html +=  
		"<p>Segue as informações referentes ao processo <a href='http://fluig.castilho.com.br:1010/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + processo + "' target='_blank'>Nº" + processo + "</a>.</p>" +
                "<div>" +
                    "<p>" +
                        "<b style='font-size: 16px'>Informações Gerais:</b><br>" +
                        "<b>Suporte:</b> " + suporte + "<br>" +
                        "<b>Data de Solicitação:</b> " +  hAPI.getCardValue("data_ocorrencia_hidden") + "<br>" + 
                        "<b>Obra:</b> " + obraSemNumero + "<br>" +
                        ccMatrizHTML +
                        "<b>Demanda:</b> " + demanda + "<br>" +    
                        "<b>Placa do Veículo:</b> " + hAPI.getCardValue("placaAltera") + "<br>" +   
                        "<b>Número do Cartão:</b> " + hAPI.getCardValue("numeroAltera") + "<br>" +                                                                                  
                        "<b>Limite Atual:</b> " + hAPI.getCardValue("limiteAtual") + "<br>" +                                                                                  
                        "<b>Limite Desejado:</b> " + hAPI.getCardValue("limiteDesejado") + "<br>" +                                                                                  
                        "<b>Motivo:</b> " + hAPI.getCardValue("motivoAltera") + "<br>" +                                                                                  
                    "</p>" +
                "</div>";
	}else if(demanda == "Solicitação Tag"){
		assunto = "Solicitação de Tag de Pedágio"
		html +=  
			"<p>Segue as informações referentes ao processo <a href='http://fluig.castilho.com.br:1010/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + processo + "' target='_blank'>Nº" + processo + "</a>.</p>" +
	                    "<div>" +
	                        "<p>" +
	                            "<b style='font-size: 16px'>Informações Gerais:</b><br>" +
	                            "<b>Suporte:</b> " + suporte + "<br>" +
	                            "<b>Data de Solicitação:</b> " + hAPI.getCardValue("data_ocorrencia_hidden") + "<br>" + 
	                            "<b>Obra:</b> " + obraSemNumero + "<br>" +
	                            ccMatrizHTML +
	                            "<b>Demanda:</b> " + demanda + "<br>" +    
	                            "<b>Quantidade:</b> " + hAPI.getCardValue("quantidade") + "<br>" +   
	                            "<b>Motivo:</b> " + hAPI.getCardValue("motivoTagSolicita") + "<br>" +                                                                                  
	                        "</p>" +
	                    "</div>";
	}else if(demanda == "Desbloqueio Tag"){
		assunto = "Desbloqueio de Tag de Pedágio"
		html +=  
			"<p>Segue as informações referentes ao processo <a href='http://fluig.castilho.com.br:1010/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + processo + "' target='_blank'>Nº" + processo + "</a>.</p>" +
	                 "<div>" +
	                     "<p>" +
	                         "<b style='font-size: 16px'>Informações Gerais:</b><br>" +
	                         "<b>Suporte:</b> " + suporte + "<br>" +
	                         "<b>Data de Solicitação:</b> " + hAPI.getCardValue("data_ocorrencia_hidden") + "<br>" + 
	                         "<b>Obra:</b> " + obraSemNumero + "<br>" +
	                         ccMatrizHTML +
	                         "<b>Demanda:</b> " + demanda + "<br>" +    
	                         "<b>Placa do Veículo:</b> " + hAPI.getCardValue("placaTrans") + "<br>" +   
	                         "<b>Número da Tag:</b> " + hAPI.getCardValue("numeroTag") + "<br>" +   
	                         "<b>Condutor Responsável:</b> " + hAPI.getCardValue("condutorTag") + "<br>" +    
	                         "<b>Tipo de Veículo:</b> " + hAPI.getCardValue("tipoVeiculo") + "<br>" +  
	                         tipoHTML +
	                         "<b>Motivo:</b> " + hAPI.getCardValue("motivoTagDesbloqueia") + "<br>" +                                                                                  
	                     "</p>" +
	                 "</div>";
	}else if(demanda == "Cancelamento Tag"){
		assunto = "Cancelamento de Tag de Pedágio"
		html +=  
		"<p>Segue as informações referentes ao processo <a href='http://fluig.castilho.com.br:1010/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + processo + "' target='_blank'>Nº" + processo + "</a>.</p>" +
                "<div>" +
                    "<p>" +
                        "<b style='font-size: 16px'>Informações Gerais:</b><br>" +
                        "<b>Suporte:</b> " + suporte + "<br>" +
                        "<b>Data de Solicitação:</b> " + hAPI.getCardValue("data_ocorrencia_hidden") + "<br>" + 
                        "<b>Obra:</b> " + obraSemNumero + "<br>" +
                        ccMatrizHTML +
                        "<b>Demanda:</b> " + demanda + "<br>" +    
                        "<b>Placa do Veículo:</b> " + hAPI.getCardValue("placaCancelamento") + "<br>" +   
                        "<b>Motivo:</b> " + hAPI.getCardValue("motivoCancelamento") + "<br>" +                                                                                     
                    "</p>" +
                "</div>";
	}else if(demanda == "Transferência Obras"){
		assunto = "Transferência de Veículo entre Obras"
			html +=  
			"<p>Segue as informações referentes ao processo <a href='http://fluig.castilho.com.br:1010/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + processo + "' target='_blank'>Nº" + processo + "</a>.</p>" +
	                "<div>" +
	                    "<p>" +
	                        "<b style='font-size: 16px'>Informações Gerais:</b><br>" +
	                        "<b>Suporte:</b> " + suporte + "<br>" +
	                        "<b>Data de Solicitação:</b> " + hAPI.getCardValue("data_ocorrencia_hidden") + "<br>" + 
	                        "<b>Obra:</b> " + obraSemNumero + "<br>" +
	                        ccMatrizHTML +
	                        "<b>Demanda:</b> " + demanda + "<br>" +    
	                        "<b>Placa do Veículo:</b> " + hAPI.getCardValue("placaTransOb")  + "<br>" +   
	                        "<b>Obra de Destino:</b> " + hAPI.getCardValue("obraDestino") + "<br>" +   
	                        "<b>Data de Transferência:</b> " + hAPI.getCardValue("dataTransfObra") + "<br>" +   
	                        "<b>Motivo:</b> " + hAPI.getCardValue("motivoTransObra") + "<br>" +                                                                                  
	                    "</p>" +
	                "</div>";
		}else if(demanda == "Transferência Condutor"){
			assunto = "Transferência de Veículo entre Condutor"
				html +=  
				"<p>Segue as informações referentes ao processo <a href='http://fluig.castilho.com.br:1010/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + processo + "' target='_blank'>Nº" + processo + "</a>.</p>" +
		                "<div>" +
		                    "<p>" +
		                        "<b style='font-size: 16px'>Informações Gerais:</b><br>" +
		                        "<b>Suporte:</b> " + suporte + "<br>" +
		                        "<b>Data de Solicitação:</b> " + hAPI.getCardValue("data_ocorrencia_hidden") + "<br>" + 
		                        "<b>Obra:</b> " + obraSemNumero + "<br>" +
		                        ccMatrizHTML +
		                        "<b>Demanda:</b> " + demanda + "<br>" +    
		                        "<b>Placa do Veículo:</b> " + hAPI.getCardValue("placaTransCond") + "<br>" +   
		                        "<b>Data de Transferência:</b> " + hAPI.getCardValue("dataTransCond") + "<br>" +   
		                        "<b>Motivo:</b> " + hAPI.getCardValue("motivoTransCond") + "<br>" +                                                                                  
		                    "</p>" +
		                "</div>";
			}
		
		var anexos = BuscaAnexos();
		if (anexos != false && anexos != "") {
			html +=
				"<div>\
				<p>\
					<b>Anexos:</b>\
					<ul>\
            			" + anexos + "<br>\
					</ul>\
				</p>\
			</div>";
		}
		log.info("html geral:" + html)	
		
		var url = 'http://fluig.castilho.com.br:1010';//Prod
		//var url = 'http://desenvolvimento.castilho.com.br:3232';//Teste	
		 var listRemetentes = BuscaRemetentes();
		 listRemetentes += "frota@castilho.com.br; paola.rosa@castilho.com.br";
		var data = {
			companyId: getValue("WKCompany").toString(),
			serviceCode: 'ServicoFluig',
			endpoint: '/api/public/alert/customEmailSender',
			method: 'post',
			timeoutService: '100',
			params: {
				to: listRemetentes,
				//to: "paola.rosa@castilho.com.br",
				from: "fluig@construtoracastilho.com.br", //Prod
				subject: "[FLUIG] Chamado Suporte Frota - " + assunto,
				templateId: "TPL_SUPORTE_TI2",
				dialectId: "pt_BR",
				param: {
					"CORPO_EMAIL": html,
					"SERVER_URL": url,
					"TENANT_ID": "1"
				}
			}
		}
		var clientService = fluigAPI.getAuthorizeClientService();
		var vo = clientService.invoke(JSONUtil.toJSON(data));
		if (vo.getResult() == null || vo.getResult().isEmpty()) {
			throw "Retorno está vazio";
		} else {
			log.info("voResult");
			log.info(vo.getResult());
		}
		log.info("Fim envia email");
	} catch (error) {
		throw "Erro ao enviar e-mail de notificação: " + error;
	}
}	             
		
function BuscaEmailUsuario(usuario) {
	var ds = DatasetFactory.getDataset("colleague", null, [DatasetFactory.createConstraint("colleagueId", usuario, usuario, ConstraintType.MUST)], null);
	if (ds.values.length > 0) {
		return ds.getValue(0, "mail") + "; ";
	}
	else {
		return "";
	}
}

function BuscaAnexos() {
	var retorno = "";
	var docs = hAPI.listAttachments();
	for (var i = 0; i < docs.size(); i++) {
		var doc = docs.get(i);
		retorno += "<li><a href='" + fluigAPI.getDocumentService().getDownloadURL(doc.getDocumentId()) + "'>" + doc.getDocumentDescription() + "</a></li>"
	}
	return retorno;
}


function BuscaRemetentes() {
	var usuario = hAPI.getCardValue('usuario');
	var solicitante = hAPI.getCardValue('solicitante');
	var emailsCopia = hAPI.getCardValue("email");  
	var listRemetentes = BuscaEmailUsuario(solicitante); 
	if (emailsCopia != null && emailsCopia != "" && emailsCopia != undefined) {
		listRemetentes += ";" + emailsCopia; 
	}
    return listRemetentes;
}     

