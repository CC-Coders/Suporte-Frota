$(document).ready(function () {
	var formMode = $("#formMode").val();
	console.log(formMode)
	var activityValue = document.getElementById("atividade").value;
	var activity = parseInt(activityValue);
	console.log(activity)
	var processo = WKNumProces;
	const suporteSelect = document.getElementById('suporte');
	const demandaSelect = document.getElementById('demanda');
	const demandaContainer = document.getElementById('demanda-container');
	const demandaSalva = document.getElementById('demandaSalva');
        $('#telefoneCondutor').mask('(00) 00000-0000');
        $('#cpfCondutor').mask('000.000.000-00');
        const valorInicialLimite = 1000;
        $('#limiteSolicitacao').val(formatarValor(valorInicialLimite));
        $('#valorRecarga, #orcamentoInicial, #orcamentoFinal, #limiteSolicitacao, #limiteDesejado').mask('R$ 000.000.000,00', { reverse: true });
        atualizarValorHidden($('#limiteSolicitacao'));
	$('#valorRecarga, #orcamentoInicial, #orcamentoFinal, #limiteSolicitacao, #limiteDesejado').on('input', function () {
		    atualizarValorHidden($(this));
		});

	if (formMode == "VIEW") {
		const suporte = $("#suporte").text()
		const demanda = $("#demanda").text()
		console.log(demanda)
		console.log(suporte)
		$("#surprimentos, #divMatriz, #divResolucaoChamado, #divResolucaoChamado2, #tabInfoChamadoMatriz, #divDesbloqueioCartao, #divSolicitacaoCartao, #divCancelamento, #divAlteraLimiteCartao, #divTagSolicita, #divTagDesbloqueia, #divManutencoes, #divSinistro, #divInfosLocacao, #divCondutor, #divTransfObra, #divTransfCond, #divRecarga, #divInfosSpot").hide();
		$("#divPrazoContrato").removeClass("col-md-6").addClass("col-md-3");	
			if (suporte == "Locação de Veículo") {		    
				$("#divInfosLocacao, #divCondutor").show();
			}
			if (suporte == "Aprovações Custo Obra") {	
				console.log("entro aprovação")
				$("#divManutencoes").show()
			}
			if (suporte == "Sinistro") {	
				$("#divSinistro, #divCondutor").show()
			}
			if (demanda == "Locação Spot") {
				$("#divInfosSpot").show();
			}
			if (demanda == "Solicitação de Cartão") {
				$("#divSolicitacaoCartao").show()
			}
			if (demanda == "Cancelamento de Cartão" || demanda == "Reemissão de Cartão") {
				$("#divCancelamento").show()
				$("#messageReemissao").hide()
			}
			if (demanda == "Desbloqueio de Cartão") {
				$("#divDesbloqueioCartao").show()
			}
			if (demanda == "Alteração de Limite") {
				$("#divAlteraLimiteCartao").show()
			}
			if(demanda == "Cancelamento de Código de Motorista" || demanda == "Criação de Código de Motorista"){
                                $("#divCondutor").show();
                        }
			if (demanda == "Solicitação Tag") {
				$("#divTagSolicita").show()
			}
			if (demanda == "Desbloqueio Tag") {
				$("#divTagDesbloqueia").show()
				$("#divTipoVeiculo").removeClass("col-md-12").addClass("col-md-6");
			}if(demanda == "Cancelamento Tag"){
				$("#divCancelamento").show()
				$("#messageReemissao").hide()
				console.log("tag")
			}
			if (demanda == "Transferência Obras") {
				$("#divTransfObra").show()
			}
			if (demanda == "Transferência Condutor") {
				$("#divTransfCond, #divCondutor").show()
			}
			if(demanda == "Recarga Complementar"){
				$("#divRecarga").show()
			}
	}
	
	  document.getElementById("quantidade").addEventListener("input", function() {
		        const maxValue = 20;
		        const currentValue = parseInt(this.value, 10);
		        if (currentValue > maxValue) {
		            this.value = maxValue;
		            FLUIGC.toast({
		                    message: "O limite máximo para Tags Solicitadas é 20!",
		                    type: "warning"
		                });
		        }
		    });

	$('.btn').button();
	$('input[name="options"]').on('change', function () {
		const selectedValue = $('input[name="options"]:checked').val();
		if (selectedValue == "Placa") {
			$("#divAnexoCRLVSol").show()
		} else {
			$("#divAnexoCRLVSol").hide()
		}
	});
        
	$("#tipoVeiculo").on("change", function () {
	if ($(this).val() == "Caminhão" || $("#tipoVeiculo").val() == "Ônibus") {
		$("#divRodagem, #divEixos").show();
		$("#divTipoVeiculo").removeClass("col-md-12").addClass("col-md-6");
	} else {
		$("#divRodagem, #divEixos").hide();
		$("#divTipoVeiculo").removeClass("col-md-6").addClass("col-md-12");
	}
	});
	$("#prazoContrato").on("change", function () {
		if ($(this).val() == "Período em Dias") {
			$("#divPrazo").show();
			$("#divPrazoContrato").removeClass("col-md-6").addClass("col-md-3");
		} else {
			$("#divPrazo").hide();
		}
	});
	$("#obraDestino").on("change", function () {
		    var selectedValue = $(this).val().split(" - ");
		    $("#coligadaDestino").val(selectedValue[0]);
		    $("#obraDestinoHidden").val(selectedValue[2]);
		    $("#obraDestinoInteira").val($(this).val());
		    atribuicaoEngCoord();
	});	

	$("#obra").on("change", function () {
		var nm = $(this).val().split(" - ");
		$("#hiddenCodColigada").val(nm[0]);
		$("#hiddenCODGCCUSTO").val(nm[1]);
		$("#hiddenObra").val(nm[2]);
		$("#obraView").val($(this).val())
		console.log($(this).val())
	});
	$("#orcamentoFinal").on("change", function () {
		atribuicaoEngCoord();
	});
	$("#orcamentoInicial").on("change", function () {
		atribuicaoEngCoord();
	});

	$("#suporte").on("change", function () {
	        console.log($("#suporte").val())
		const obraSelecionada = $("#obra").val()
		 if (!obraSelecionada) { 
			   FLUIGC.toast({
		                    message: "Favor selecionar o centro de custo!",
		                    type: "warning"
		               });
			   $(this).val('');
		 }
		const suporte = $(this).val();
		$("#suporte_hidden").val(suporte)
		$("#divDesbloqueioCartao, #divSolicitacaoCartao, #divCancelamento, #divAlteraLimiteCartao, #divTagSolicita, #divTagDesbloqueia, #divInfosLocacao, #divCondutor, #divTransfObra, #divTransfCond, #divRecarga, #divInfosSpot, #divMotivoCondutor, #divCodigoMotorista, #divSinistro").hide();
		if (suporte == "Aprovações Custo Obra") {
			$("#divManutencoes").show();
			
		} else {
			$("#divManutencoes").hide();
		}
		if (suporte == "Sinistro") {
			atribuicaoEngCoord();
			$("#divSinistro, #divCondutor").show();			
		}
		if (suporte == "Locação de Veículo" || suporte == "Sinistro" || suporte == "Cartão Combustível") {
			var fields = $("#divCondutor").find("input, button");
			fields.each(function () {
				var $field = $(this);
				var $label = $field.prev('label');
				if ($label.length) {
					$label.after("<strong class='strongAlert'>*</strong>");
					$field.addClass("inputInfoChamado");
				}
			});
			  var $anexoLabel = $("#divAnexoCNHCondutor label[for='inputFileCNHCondutor']");
			    var $anexoInput = $("#divAnexoCNHCondutor .classe-anexo");
			    
			    if ($anexoLabel.length && $anexoInput.length) {
			        $anexoLabel.after("<strong class='strongAlert'>*</strong>");
			    //    $anexoInput.addClass("inputInfoChamado");
			    }
		}
		else {
			$("#divSinistro, #divCondutor").hide();
			$("#divCondutor").find(".strongAlert").remove();
			$("#divCondutor").find(".inputInfoChamado").removeClass("inputInfoChamado");
		}
		if (suporte != "Locação de Veículo" && suporte != "Sinistro") {
			$("#divCondutor").hide();
		}
		if (suporte == "" || suporte == null) {
			$("#divDesbloqueioCartao, #divSolicitacaoCartao, #divCancelamento, #divAlteraLimiteCartao, #divTagSolicita, #divTagDesbloqueia, #divInfosLocacao, #divCondutor, #divTransfObra, #divTransfCond, #divRecarga, #divInfosSpot, #divMotivoCondutor, #divCodigoMotorista").hide();
		}
	});

	$("#demanda").on("change", function () {
		const demanda = $(this).val();
		$("#demandaSalva").val(demanda)
		const prazoContratoSelect = $("#prazoContrato");
		prazoContratoSelect.empty();
		prazoContratoSelect.append('<option value=""></option>');
		$("#divDesbloqueioCartao, #divSolicitacaoCartao, #divCancelamento, #divAlteraLimiteCartao, #divTagSolicita, #divTagDesbloqueia, #divInfosLocacao, #divCondutor, #divAnexoCRLVSol, #divTransfObra, #divTransfCond, #divRecarga, #divInfosSpot, #divMotivoCondutor, #divCodigoMotorista").hide();
		$('#previsaoEntrega').val('');
		$("#previsaoEntrega").remove();
		$("#divPrevisaoEntrega").append('<input type="text" id="previsaoEntrega" class="form-control" />');
		$(document).on("input", "#previsaoEntrega", function () {
			const dataSelecionada = $(this).val();
			$("#previsao_entrega_oculta").val(dataSelecionada);
		});
		if (demanda === "Locação Spot") {
			prazoContratoSelect.append('<option value="Período em Dias" >Período em Dias</option>');
			$("#divInfosLocacao, #divCondutor, #divInfosSpot").show();
			setupDatePickers("#previsaoEntrega", null);
		} else if (demanda === "Locação Anual") {
			prazoContratoSelect.append('<option value="12 meses (seminovo)">12 meses (seminovo)</option>');
			prazoContratoSelect.append('<option value="24 meses (novo)">24 meses (novo)</option>');
			$("#divInfosLocacao, #divCondutor").show();
			setupPrevisaoEntregaDatePicker();
		}
		if (demanda == "Desbloqueio de Cartão") {
			$("#divDesbloqueioCartao").show();
		}
		if (demanda == "Solicitação de Cartão") {
			$("#divSolicitacaoCartao").show();
		}
		if (demanda == "Cancelamento de Cartão") {
			$("#divCancelamento").show();
			$("#messageReemissao").hide()
		}
		if (demanda == "Reemissão de Cartão") {
			$("#divCancelamento").show();
			$("#messageReemissao").show()
		}
		if (demanda == "Alteração de Limite") {
			$("#divAlteraLimiteCartao").show();
		}
	        if(demanda == "Criação de Código de Motorista"){
	                $("#divCondutor").show();
	         }
	        if(demanda == "Cancelamento de Código de Motorista"){
	                 $("#divCondutor, #divMotivoCondutor").show();
	         }
		if (demanda == "Solicitação Tag") {
			$("#divTagSolicita").show();
		}
		if (demanda == "Desbloqueio Tag") {
			$("#divTagDesbloqueia, #tagCondutor, #numeroTag").show();
			$("#placaTag").removeClass("col-md-12").addClass("col-md-6");
		}
		if (demanda == "Cancelamento Tag") {
			$("#divCancelamento").show();
			$("#messageReemissao").hide()
			$("#tagCondutor, #numeroTag, #divTipoVeiculo").hide()

		}
		if (demanda == "Transferência Obras") {
			$("#divTransfObra").show()
		}
		if (demanda == "Transferência Condutor") {
			$("#divTransfCond, #divCondutor").show()
		}
		if(demanda == "Recarga Complementar"){
			$("#divRecarga").show()
		}
		if (demanda == "" || demanda == null) {
			$("#divDesbloqueioCartao, #divSolicitacaoCartao, #divCancelamento, #divAlteraLimiteCartao, #divTagSolicita, #divTagDesbloqueia, #divInfosLocacao, #divCondutor, #divTransfObra, #divTransfCond, #divRecarga, #divInfosSpot, #divMotivoCondutor, #divCodigoMotorista").hide();
		}
		if(demanda == "Alteração de Limite" || demanda == "Cancelamento de Cartão" || demanda == "Desbloqueio de Cartão" || demanda == "Recarga Complementar" || demanda == "Reemissão de Cartão" || demanda == "Solicitação de Cartão" || demanda == "Locação Anual" || demanda == "Locação Spot" || demanda == "Cancelamento Tag" || demanda == "Desbloqueio Tag" || demanda == "Solicitação Tag" || demanda == "Transferência Condutor") {
			atribuicaoEngCoord();
		}
	});

	$("input[name='terceiro']").on("change", function () {
		if ($(this).val() === "Sim") {
			console.log("sim")
			$("#divContatoTerceiro").show();
		} else {
			console.log("não")
			$("#divContatoTerceiro").hide();
		}
	});

	if ($("#prazoContrato").val() == "Período em Dias") {
		$("#divPrazo").show();
		$("#divPrazoContrato").removeClass("col-md-6").addClass("col-md-3");
	} else {
		$("#divPrazo").hide();
		$("#divPrazoContrato").removeClass("col-md-3").addClass("col-md-6");
	}
	
	$('#inputFileRastreador').parent().hide();
	$("#dataOcorrencia").prop("disabled", true)

	$("#divResolucaoChamado,  #divMatriz, #surprimentos, #cartao_combustivel_input, #observacoes_input, #divPrazo, #divCCMatrizContainer, #divInfosLocacao, #divManutencoes, #divCondutor, #divSinistro, #divDesbloqueioCartao, #divSolicitacaoCartao, #divCancelamento, #divAlteraLimiteCartao, #divTagDesbloqueia, #divTagSolicita, #divContatoTerceiro, #divTransfObra, #divTransfCond, #divRecarga, #divRodagem, #divEixos, #divInfosSpot, #divMotivoCondutor, #divCodigoMotorista").hide();            
	var currentDate = moment().format("DD/MM/YYYY");
	if (activity == 0) {	
		$("#divResolucaoChamado,  #divMatriz, #surprimentos, #cartao_combustivel_input, #observacoes_input, #divPrazo, #divCCMatrizContainer, #divInfosLocacao, #divManutencoes, #divCondutor, #divSinistro, #divDesbloqueioCartao, #divSolicitacaoCartao, #divCancelamento, #divAlteraLimiteCartao, #divTagDesbloqueia, #divTagSolicita, #divContatoTerceiro, #divTransfObra, #divTransfCond, #divRecarga, #divRodagem, #divEixos, #divInfosSpot").hide();		
		preencherObrasDoUsuario();
		preencherObrasDestino();
		setupDatePickers("#previsaoEntregaMatriz", null);
		setupDatePickers("#vigenciaContratoMatriz", null);
		setupDatePickers("#dataDesbloqueio", null)
		setupDatePickers("#dataTransCond", null)
		setupDatePickers("#dataTransfObra", null)
		setupDatePickers("#dataOcorrencia", currentDate);
		$("#dataOcorrencia").val(currentDate);
		 $("#data_ocorrencia_hidden").val(currentDate); 
		suporteSelect.addEventListener('change', function () {
			const suporteSelecionado = this.value;
			carregarDemandas(suporteSelecionado);
		});
	}else {
		var dataOcorrenciaEnviada = $("#data_ocorrencia_hidden").val();
		if (dataOcorrenciaEnviada) {
			$("#dataOcorrencia").val(dataOcorrenciaEnviada);
		}
	}
	
	if (formMode == "MOD") {
	if (activity == 1 || activity == 2 || activity == 16 || activity == 10 || activity == 24 || activity == 47) {
		$("#dataOcorrencia").val(currentDate);
		const obraView = $("#obraView").val()
		$("#obra").val(obraView)
		const suporteSalvo = suporteSelect.value;	
		const demandaSalva = $("#demandaSalva").val()
		$("#demanda").val(demandaSalva)		
		const demanda = $("#demanda").val();
		const suporte = $("#suporte").val()	
		$("#divResolucaoChamado,  #divMatriz, #surprimentos, #cartao_combustivel_input, #observacoes_input, #divPrazo, #divCCMatrizContainer, #divInfosLocacao, #divManutencoes, #divCondutor, #divSinistro, #divDesbloqueioCartao, #divSolicitacaoCartao, #divCancelamento, #divAlteraLimiteCartao, #divTagDesbloqueia, #divTagSolicita, #divContatoTerceiro, #divTransfObra, #divTransfCond, #divRecarga, #divInfosSpot, #divMotivoCondutor, #divCodigoMotorista").hide();		
		$("#inputFileCNHCondutor, #buttonFileCNHCondutor, #dataOcorrencia, #demanda, #prazo_contrato_input, #previsaoEntrega, #modeloVeiculo, #suporte, #previsaoEntrega, #setorAtuacao, #kmMensal, #prazo_contrato_dias, #prazo_contrato_meses, #modelo_utilitario, #nomeCondutor, #emailCondutor, #telefoneCondutor, #regimeCondutor, #cpfCondutor, #setorAtuacao, #modelo_leve, #motivoLocacao, #prazoContrato, #daterange, #CCMatriz, #placaManutencoes, #kmManutencoes, #orcamentoInicial, #orcamentoFinal, #observacaoManutencoes, #localOcorrencia, #cidadeLocalizacao, #numeroBO, #contatoTerceiroInput, #limiteSolicitacao, #motivoDesbloqueio, #motivoCancelamento, #placaCancelamento, #placaDesbloqueio, #numeroDesbloqueio, #dataDesbloqueio, #numeroAltera, #placaAltera, #limiteAtual, #limiteDesejado, #motivoTagSolicita, #placaTag, #numeroTag, #condutorTag, #motivoTagDesbloqueia, #quantidade, #dataTransCond, #placaTransCond, #motivoTransCond, #obra, #placaRecarga, #valorRecarga, #motivoRecarga, #nomeCondutorAp, #motivoAltera, #placaTrans, #tipoVeiculo, #rodagem, #eixos, #placaTransOb, #obraDestino, #motivoTransObra, #dataTransfObra, #enderecoRetirada, #enderecoDevolucao, #placaSinistro, #motivoCondutor").prop("disabled", true);
		$("#divPrazoContrato").removeClass("col-md-6").addClass("col-md-3");
		$("#divResolucaoChamado, #divPrazo, #divCCMatrizContainer").show()

		if (demanda == "Locação Spot") {
			$("#divInfosLocacao, #divCondutor, #divInfosSpot").show();
			const dataSalva = $("#previsao_entrega_oculta").val();
			$("#previsaoEntrega").val(dataSalva);
			setupDatePickers("#previsaoEntrega", dataSalva);
		}
		if (demanda == "Locação Anual") {
			$("#divInfosLocacao, #divCondutor").show();
			setupPrevisaoEntregaDatePicker()
		}
		if (suporte == "Aprovações Custo Obra") {
			$("#divManutencoes").show();
		}
		if (suporte == "Sinistro") {
			$("#divSinistro, #divCondutor").show();
			var aprovacao = document.getElementById("decisaoSim").checked ? "Sim" : "Nao";
			if (aprovacao == "Sim") {
				$("#divContatoTerceiro").show();
			} else {
				$("#divContatoTerceiro").hide();
			}
		}
		if (demanda == "Solicitação de Cartão") {
			$("#divSolicitacaoCartao").show()
			const selectedValue = $('input[name="options"]:checked').val();
			if (selectedValue == "PCF") {
				$("#divAnexoCRLVSol").show()
			} else {
				$("#divAnexoCRLVSol").hide()
			}
		}
		if (demanda == "Cancelamento de Cartão" || demanda == "Reemissão de Cartão") {
			$("#divCancelamento").show()
			$("#messageReemissao").hide()
		}
	           if(demanda == "Criação de Código de Motorista"){
	                        $("#divCondutor").show();
	                }
	                if(demanda == "Cancelamento de Código de Motorista"){
	                        $("#divCondutor, #divMotivoCondutor").show();
	                }
		if (demanda == "Desbloqueio de Cartão") {
			$("#divDesbloqueioCartao").show()
		}
		if (demanda == "Alteração de Limite") {
			$("#divAlteraLimiteCartao").show()
		}
		if (demanda == "Solicitação Tag") {
			$("#divTagSolicita").show()
		}
		if (demanda == "Desbloqueio Tag") {
			$("#divTagDesbloqueia, #divTipoVeiculo").show()
			$("#divTipoVeiculo").removeClass("col-md-12").addClass("col-md-6");
			$("#divRodagem, #divEixos").show();
		}
		if(demanda == "Cancelamento Tag"){
			$("#divCancelamento").show()
			$("#messageReemissao").hide()
		}
		if (demanda == "Transferência Obras") {
			$("#divTransfObra").show()
		}
		if (demanda == "Transferência Condutor") {
			$("#divTransfCond, #divCondutor").show()
		}
		if(demanda == "Recarga Complementar"){
			$("#divRecarga").show()
			$("divMatriz").hide()
		}
		$(".radioDecisao").on("change", function () {
			if ($(".radioDecisao:checked").val() == "Enviar") {
				$("#divInfoResolucaoChamado").show();
				$("#divInfoObservacao").hide();
			}
			else if ($(".radioDecisao:checked").val() == "Encerrar") {
				$("#divInfoResolucaoChamado").hide();
				$("#divAnexoResolucao").hide();
				$("#divInfoObservacao").show();
				setDataPrazoRetorno();
			}
		});
	}if(activity == 1){                                                                                                                                                                                                                            
		$("#inputFileCNHCondutor, #buttonFileCNHCondutor, #dataOcorrencia, #prazo_contrato_input, #previsaoEntrega, #modeloVeiculo, #suporte, #demanda, #previsaoEntrega, #setorAtuacao, #kmMensal, #prazo_contrato_dias, #prazo_contrato_meses, #modelo_utilitario, #nomeCondutor, #emailCondutor, #telefoneCondutor, #regimeCondutor, #cpfCondutor, #setorAtuacao, #modelo_leve, #motivoLocacao, #prazoContrato, #daterange, #CCMatriz, #placaManutencoes, #kmManutencoes, #orcamentoInicial, #orcamentoFinal, #observacaoManutencoes, #localOcorrencia, #cidadeLocalizacao, #numeroBO, #contatoTerceiroInput, #limiteSolicitacao, #motivoDesbloqueio, #motivoCancelamento, #placaCancelamento, #placaDesbloqueio, #numeroDesbloqueio, #dataDesbloqueio, #numeroAltera, #placaAltera, #limiteAtual, #limiteDesejado, #motivoTagSolicita, #placaTag, #numeroTag, #condutorTag, #motivoTagDesbloqueia, #quantidade, #dataTransCond, #placaTransCond, #motivoTransCond, #obra, #placaRecarga, #valorRecarga, #motivoRecarga, #nomeCondutorAp, #motivoAltera, #placaTrans, #tipoVeiculo, #rodagem, #eixos, #placaTransOb, #obraDestino, #motivoTransObra, #dataTransfObra, #codigoMotorista").prop("disabled", false);
		 if($("#demanda").val() == "Criação de Código de Motorista"){
	                 $("#inputFileCNHCondutor, #buttonFileCNHCondutor, #dataOcorrencia, #demanda, #prazo_contrato_input, #previsaoEntrega, #modeloVeiculo, #suporte, #previsaoEntrega, #setorAtuacao, #kmMensal, #prazo_contrato_dias, #prazo_contrato_meses, #modelo_utilitario, #nomeCondutor, #emailCondutor, #telefoneCondutor, #regimeCondutor, #cpfCondutor, #setorAtuacao, #modelo_leve, #motivoLocacao, #prazoContrato, #daterange, #CCMatriz, #placaManutencoes, #kmManutencoes, #orcamentoInicial, #orcamentoFinal, #observacaoManutencoes, #localOcorrencia, #cidadeLocalizacao, #numeroBO, #contatoTerceiroInput, #limiteSolicitacao, #motivoDesbloqueio, #motivoCancelamento, #placaCancelamento, #placaDesbloqueio, #numeroDesbloqueio, #dataDesbloqueio, #numeroAltera, #placaAltera, #limiteAtual, #limiteDesejado, #motivoTagSolicita, #placaTag, #numeroTag, #condutorTag, #motivoTagDesbloqueia, #quantidade, #dataTransCond, #placaTransCond, #motivoTransCond, #obra, #placaRecarga, #valorRecarga, #motivoRecarga, #nomeCondutorAp, #motivoAltera, #placaTrans, #tipoVeiculo, #rodagem, #eixos, #placaTransOb, #obraDestino, #motivoTransObra, #dataTransfObra, #enderecoRetirada, #enderecoDevolucao, #placaSinistro, #motivoCondutor, #codigoMotorista").prop("disabled", true);
	                 $("#divCodigoMotorista, #divAlertaTexto").show()
	                 $("#divDecisaoAprovar label[for='decisaoAprovar']").text("Finalizar");
	         }
	}if(activity == 10){         
                if($("#suporte").val() == "Locação de Veículo"){
                        $("#divMatriz").show()
                }else if($("#demanda").val() == "Criação de Código de Motorista"){
                        $("#divCodigoMotorista").show()
                        $("#divAlertaTexto").hide()
                     
                }       
	}
	}
	loadFormData();
	$("form").submit(function () {
		saveFormData();
	});
});