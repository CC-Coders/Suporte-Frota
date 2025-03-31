///////////CALENDÁRIOS:
function setupDatePickers(selector, initialDate) {
	var today = moment().format('DD/MM/YYYY');
	if (initialDate !== null) {
		FLUIGC.calendar(selector, {
			pickTime: false,
			language: 'pt-br',
			startDate: moment(initialDate, 'DD/MM/YYYY').toDate(),
			endDate: moment(initialDate, 'DD/MM/YYYY').toDate(),
			defaultDate: moment(initialDate, 'DD/MM/YYYY').toDate(),
			minDate: moment(today, 'DD/MM/YYYY').toDate()
		});
	} else {
		FLUIGC.calendar(selector, {
			pickTime: false,
			language: 'pt-br',
			minDate: moment(today, 'DD/MM/YYYY').toDate()
		});
	}
}

function setupPrevisaoEntregaDatePicker() {
	var enabledStartDate = moment().add(15, 'days').format('DD/MM/YYYY');
	$("#previsaoEntrega").val(enabledStartDate);
	$("#previsao_entrega_oculta").val(enabledStartDate);
	FLUIGC.calendar("#previsaoEntrega", {
		pickTime: false,
		language: 'pt-br',
		startDate: enabledStartDate,
		enabledDates: getEnabledDates(enabledStartDate),
		defaultDate: null
	});
	 $("#previsaoEntrega").on('change', function () {
		        var newDate = $(this).val();
		        $("#previsao_entrega_oculta").val(newDate);
	});
}

function getEnabledDates(enabledStartDate) {
	var enabledDates = [];
	if (enabledStartDate) {
		var currentDate = moment().startOf('day');
		var startDate = moment(enabledStartDate, "DD/MM/YYYY").startOf('day');
		var daysToGenerate = 200;
		while (startDate.isSameOrAfter(currentDate)) {
			for (var i = 0; i < daysToGenerate; i++) {
				enabledDates.push(startDate.format('DD/MM/YYYY'));
				startDate = startDate.add(1, 'days');
				if (startDate.isAfter(currentDate.add(15, 'days'))) {
					break;
				}
			}
			setTimeout(() => { }, 0);
		}
	}
	return enabledDates;
}

$(function () {
	    moment.locale('pt-br'); 
	    $('input[name="daterange"]').daterangepicker({
	        opens: 'left',
	        autoUpdateInput: false,
	        locale: {
	            format: 'DD/MM/YYYY',
	            separator: ' - ',
	            applyLabel: 'Aplicar',
	            cancelLabel: 'Cancelar',
	            fromLabel: 'De',
	            toLabel: 'Até',
	            customRangeLabel: 'Selecionar Período Personalizado',
	            weekLabel: 'W',
	            daysOfWeek: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
	            monthNames: [
	                'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
	                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
	            ],
	            firstDay: 1
	        }
	    }, function (start, end) {
	        var maxAllowedEndDate = moment(start).add(12, 'months');
	        if (end.isAfter(maxAllowedEndDate)) {
	            $("#daterange").addClass("has-error"); 
	            FLUIGC.toast({
	                message: "Selecione um período de até 12 meses.",
	                type: "warning"
	            });
	            $('input[name="daterange"]').val(''); 
	        } else {
	            $('input[name="daterange"]').val(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
	        }
	    });
	    $('input[name="daterange"]').on('apply.daterangepicker', function (ev, picker) {
	        var maxAllowedEndDate = moment(picker.startDate).add(12, 'months');
	        if (picker.endDate.isAfter(maxAllowedEndDate)) {
	            $("#daterange").addClass("has-error"); 
	            FLUIGC.toast({
	                message: "Selecione um período de até 12 meses.",
	                type: "warning"
	            });
	            $(this).val(''); 
	        } else {
	            $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
	        }
	    });
});

//////////////////OUTRAS FUNÇÕES
function formatarValor(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function atualizarValorHidden(campo) {
	    let id = campo.attr('id'); 
	    let valorFormatado = campo.val();
	    let valorPuro = valorFormatado
	        .replace(/[^\d,]/g, '') 
	        .replace(',', '.');
	    let valorNumerico = parseFloat(valorPuro) || 0; 
	    let hiddenFieldId = '#' + id + 'Number'; 
	    $(hiddenFieldId).val(valorNumerico); 
	    console.log(`Campo hidden (${hiddenFieldId}): ${$(hiddenFieldId).val()}`);
}

function carregarDemandas(suporteSelecionado) {
	const suporteSelect = document.getElementById('suporte');
	const demandaSelect = document.getElementById('demanda');
	const demandaContainer = document.getElementById('demanda-container');
	const demandaSalva = document.getElementById('demandaSalva');
	demandaSelect.innerHTML = '';
	demandaContainer.style.display = 'none';
	if (suporteSelecionado === 'Locação de Veículo') {
		demandaSelect.innerHTML = `
        <option value=""></option>
        <option value="Locação Anual">Locação Anual</option>
        <option value="Locação Spot">Locação Spot</option>
    `;
		demandaContainer.style.display = 'block';
	} else if (suporteSelecionado === 'Aprovações Custo Obra') {
		demandaSelect.innerHTML = `
        <option value=""></option>
        <option value="Avarias de Devolução">Avarias de Devolução</option>
        <option value="Manutenção Corretiva">Manutenção Corretiva</option>
        <option value="Manutenção Preventiva">Manutenção Preventiva</option>
	<option value="Sinistro">Sinistro</option>
    `;
		demandaContainer.style.display = 'block';
	} else if (suporteSelecionado === 'Sinistro') {
		demandaSelect.innerHTML = `
        <option value="Acionamento de Sinistros" selected>Acionamento de Sinistros</option>
    `;
		demandaContainer.style.display = 'block';
	} else if (suporteSelecionado === 'Cartão Combustível') {
		demandaSelect.innerHTML = `
        <option value=""></option>
         <option value="Alteração de Limite">Alteração de Limite Mensal</option>
         <option value="Cancelamento de Cartão">Cancelamento de Cartão</option>
        <option value="Cancelamento de Código de Motorista">Cancelamento de Código de Motorista</option>
        <option value="Criação de Código de Motorista">Criação de Código de Motorista</option>
         <option value="Desbloqueio de Cartão">Desbloqueio de Cartão</option>
        <option value="Recarga Complementar">Recarga Complementar</option>		                           
        <option value="Reemissão de Cartão">Reemissão de Cartão</option>
        <option value="Solicitação de Cartão">Solicitação de Cartão</option>
       
    `;
		demandaContainer.style.display = 'block';
	} else if (suporteSelecionado === 'Tag de Pedágio') {
		demandaSelect.innerHTML = `
        <option value=""></option>
        <option value="Cancelamento Tag">Cancelamento Tag</option>
        <option value="Desbloqueio Tag">Desbloqueio Tag</option>
        <option value="Solicitação Tag">Solicitação Tag</option>                              
    `;
		demandaContainer.style.display = 'block';
	}
	else if (suporteSelecionado === 'Transferência de Veículo') {
		demandaSelect.innerHTML = `
            <option value=""></option>
            <option value="Transferência Obras">Transferência Obras</option>
            <option value="Transferência Condutor">Transferência Condutor</option>
        `;
		demandaContainer.style.display = 'block';
	}
}

function saveFormData() {
	const formData = new FormData(document.forms['form']);
	const serializedData = JSON.stringify(Array.from(formData.entries()));
	localStorage.setItem('formDataStorage', serializedData);
}

function loadFormData() {
	const serializedData = localStorage.getItem('formDataStorage');
	if (serializedData) {
		const formData = new FormData(document.forms['form']);
		const dataEntries = JSON.parse(serializedData);
		dataEntries.forEach(([key, value]) => {
			formData.set(key, value);
		});
	}
}

function downloadFile() {
	    var documentId = "1331443";
	    var apiUrl = "/api/public/ecm/document/downloadURL/" + documentId;	    
	    $.ajax({
	        url: apiUrl,
	        method: "GET",
	        success: function (response) {
	            var downloadUrl = response.content;
	            var link = document.getElementById("downloadLink");
	            link.href = downloadUrl;
	            link.download = "Aviso_de_Sinistro_CCV_Locadora.docx";
	            link.click();
	            FLUIGC.toast({
	                message: 'Download do arquivo concluído!',
	                type: 'success',
	                timeout: 5000
	            });
	        },
	        error: function () {
	            FLUIGC.toast({
	                message: 'Erro ao obter o link de download do arquivo.',
	                type: 'danger',
	                timeout: 5000
	            });
	        }
	    });
}

function downloadFileCartao() {
	    var documentId = "1414080";
	    var apiUrl = "/api/public/ecm/document/downloadURL/" + documentId;	    
	    $.ajax({
	        url: apiUrl,
	        method: "GET",
	        success: function (response) {
	            var downloadUrl = response.content;
	            var link = document.getElementById("downloadLinkCartao");
	            link.href = downloadUrl;
	            link.download = "TERMO DE RECEBIMENTO DE CARTÃO ALELO.docx";
	            link.click();
	            FLUIGC.toast({
	                message: 'Download do arquivo concluído!',
	                type: 'success',
	                timeout: 5000
	            });
	        },
	        error: function () {
	            FLUIGC.toast({
	                message: 'Erro ao obter o link de download do arquivo.',
	                type: 'danger',
	                timeout: 5000
	            });
	        }
	    });
}
function atribuiValorCheckbox() {
	var aprovacao = document.getElementById("decisaoSim").checked ? "Sim" : "Nao";
	if (aprovacao === "Sim") {
		$("#divContatoTerceiro").show();
	} else {
		$("#divContatoTerceiro").hide();
	}
	$("#aprovacao").val(aprovacao);
	$("#houveTerceiro").val(aprovacao);
	console.log("Valor de houveTerceiro definido como: " + aprovacao);
}

///PREENCHE SELECT OBRAS GERAIS
//function preencherObrasDoUsuario() {
//	    buscarObrasDoUsuario()
//	        .then((options) => {
//	            var selectElement = $("#obra");
//	            selectElement.append("<option id='option' value=''>Selecione...</option>" + options);
//	        })
//	        .catch((error) => {
//	            console.log("Erro ao buscar obras do usuário: " + error);
//	        });
//}
function preencherObrasDoUsuario() {
	    buscarObrasDoUsuario()
	        .then((options) => {
	            var selectElement = $("#obra");
	            selectElement.append("<option id='option' value=''>Selecione...</option>" + options);
	            
	            const novasOpcoes = `
	                <option value="1 - 1.4.025 - Obra VLI Paulista">1.4.025 - Obra VLI Paulista</option>
	                <option value="1 - 1.4.025 - Obra VLI Planalto">1.4.025 - Obra VLI Planalto</option>
	            `;

	            // Localiza o item de referência para inserir após ele
	            const referenciaInserirDepois = selectElement.find("option[value='1 - 1.4.025 - Obra VLI Manutenção']");
	            if (referenciaInserirDepois.length > 0) {
	                $(novasOpcoes).insertAfter(referenciaInserirDepois);
	            } else {
	                selectElement.append(novasOpcoes); // Caso não encontre, adiciona no final
	            }
	        })
	        .catch((error) => {
	            console.log("Erro ao buscar obras do usuário: " + error);
	        });
	}

function buscarObrasDoUsuario(permissaoGeral = false) {
	    return new Promise((resolve, reject) => {
	        DatasetFactory.getDataset("colleagueGroup", null, [       
	            DatasetFactory.createConstraint("groupId", "Administrador TI", "Administrador TI", ConstraintType.SHOULD),
	            DatasetFactory.createConstraint("groupId", "SuporteFrotas", "SuporteFrotas", ConstraintType.SHOULD),
	            DatasetFactory.createConstraint("colleagueId", $("#solicitante").val(), $("#solicitante").val(), ConstraintType.MUST)
	        ], null, {
	            success: (grupos => {
	                var constraints = [
	                    DatasetFactory.createConstraint("usuario", $("#solicitante").val(), $("#solicitante").val(), ConstraintType.MUST)
	                ];
	                if (grupos.values.length > 0 || permissaoGeral === true) {	                
	                    constraints.push(
	                        DatasetFactory.createConstraint("permissaoGeral", "true", "true", ConstraintType.MUST)
	                    )                  
	                }
	         
	                DatasetFactory.getDataset("BuscaPermissaoColigadasUsuario", null, constraints, null, {
	                    success: (CentrosDeCusto => {
	                        if (CentrosDeCusto.values.length > 0) {
	                            var options = "";
	                            var codcoligada = "";
	                            CentrosDeCusto.values.forEach(ccusto => {
	                                    if (codcoligada != ccusto.CODCOLIGADA) {
	                                        if (codcoligada != "") {
	                                            options += "</optgroup>";
	                                        }
	                                        options +=
	                                            "<optgroup label='" + ccusto.CODCOLIGADA + " - " + ccusto.NOMEFANTASIA + "'>";
	                                        codcoligada = ccusto.CODCOLIGADA;
	                                    }

	                                    options += "<option value='" + ccusto.CODCOLIGADA + " - " + ccusto.CODCCUSTO + " - " + ccusto.perfil + "'>" + ccusto.CODCCUSTO + " - " + ccusto.perfil + "</option>";
	                       
	                            });
	                            options += "</optgroup>";
	                            resolve(options);
	                        }
	                        else {
	                            DatasetFactory.getDataset("colleagueGroup", null, [
	                                DatasetFactory.createConstraint("colleagueId", $("#userCode").val(), $("#userCode").val(), ConstraintType.MUST),
	                                DatasetFactory.createConstraint("groupId", "Obra", "Obra", ConstraintType.MUST, true),
	                            ], null, {
	                                success: (ds => {
	                                    var options = "";
	                                    ds.values.forEach(obra => {
	                                        var ds2 = DatasetFactory.getDataset("GCCUSTO", null, [
	                                            DatasetFactory.createConstraint("NOME", obra["colleagueGroupPK.groupId"], obra["colleagueGroupPK.groupId"], ConstraintType.MUST)
	                                        ], null);
	                                        var ccusto = ds2.values[0];

	                                        options += "<option value='" + ccusto.CODCOLIGADA + " - " + ccusto.CODCCUSTO + " - " + ccusto.NOME + "'>" + ccusto.CODCCUSTO + " - " + ccusto.NOME + "</option>";
	                                    });
	                                    resolve(options);
	                                    
	                                }),
	                                error: (error => {
	                                    FLUIGC.toast({
	                                        title: "Erro ao buscar obras: ",
	                                        message: error,
	                                        type: "warning"
	                                    });
	                                })
	                            });
	                        }

	                    }),
	                    error: (error => {
	                        FLUIGC.toast({
	                            title: "Erro ao buscar Centros de Custo: ",
	                            message: error,
	                            type: "warning"
	                        });
	                    })
	                });
	            }),
	            error: (error => {
	                FLUIGC.toast({
	                    title: "Erro ao verificar permissões do usuário",
	                    message: error,
	                    type: "warning"
	                });
	            })
	        });
	    });
	}

function buscarObrasDestino() {
	    return new Promise((resolve, reject) => {
	        var constraints = [
	            DatasetFactory.createConstraint("permissaoGeral", "true", "true", ConstraintType.MUST)
	        ];
	        
	        DatasetFactory.getDataset("BuscaPermissaoColigadasUsuario", null, constraints, null, {
	            success: (CentrosDeCusto => {
	                if (CentrosDeCusto.values.length > 0) {
	                    let options = "<option value=''></option>";
	                    let codcoligada = "";
	                    
	                    CentrosDeCusto.values.forEach(ccusto => {
	                        if (codcoligada != ccusto.CODCOLIGADA) {
	                            if (codcoligada != "") {
	                                options += "</optgroup>";
	                            }
	                            options += `<optgroup label='${ccusto.CODCOLIGADA} - ${ccusto.NOMEFANTASIA}'>`;
	                            codcoligada = ccusto.CODCOLIGADA;
	                        }
	                        options += `<option value='${ccusto.CODCOLIGADA} - ${ccusto.CODCCUSTO} - ${ccusto.perfil}'>${ccusto.CODCCUSTO} - ${ccusto.perfil}</option>`;
	                    });
	                    options += "</optgroup>";
	                    
	                    resolve(options);
	                } else {
	                    resolve("<option>Nenhuma obra encontrada</option>");
	                }
	            }),
	            error: (error => {
	                reject("Erro ao buscar Centros de Custo: " + error);
	            })
	        });
	    });
	}

function preencherObrasDestino() {
	    buscarObrasDestino()
	        .then((options) => {
	            $("#obraDestino").empty().append(options);
	            const obraDestino = $("#obraDestinoInteira").val()
	            if(obraDestino){
	        	    $("#obraDestino").val(obraDestino);
	            }
	        })
	        .catch((error) => {
	            console.warn(error);
	            $("#obraDestino").empty().append("<option>Erro ao carregar obras</option>");
	            FLUIGC.toast({
	                title: "Erro ao buscar Centros de Custo: ",
	                message: error,
	                type: "warning"
	            });
	     });
}

///////////// VALIDAÇÕES
function ValidaCampos() {
	var activityValue = document.getElementById("atividade").value;
	var activity = parseInt(activityValue);
	var valida = true;

	if (activity == 0) {
		$(".inputInfoChamado").each(function () {
			if ($(this).is(":visible") && ($(this).val() == null || $(this).val() == undefined || $(this).val() == "")) {
				$(this).addClass("has-error");

				if (valida == true) {
					valida = false;
					FLUIGC.toast({
						message: "Campo não preenchido!",
						type: "warning"
					});
					$([document.documentElement, document.body]).animate({
						scrollTop: $(this).offset().top - (screen.height * 0.15)
					}, 700);
				}
			}
		})
		  var anexosObrigatorios = [
			  {id: "textFileFotosSinistro", label: "Fotos de Acidente e Veículos Envolvidos", inputId: "inputFileFotosSinistro" },
		          {id: "textFileBO", label: "Boletim de Ocorrência", inputId: "inputFileBO" },
		          {id: "textFileCRLV", label: "Orçamento", inputId: "inputFileCRLV" },
		          {id: "textFileCRLVSol", label:"CRLV", inputId:"inputFileCRLVSol"},
		          {id: "textFileCRLV", label:"CRLV", inputId:"inputFileCRLVTag"},
		          {id: "textFotosTrans", label:"Fotos do Veículo", inputId:"inputFileFotosTrans"}		          
		];
		      anexosObrigatorios.forEach(function (anexo) {
			            if ($("#" + anexo.inputId).closest('.divAnexo').is(":visible")) {
			                var fileStatusText = $("#" + anexo.id).text().trim();
			                if (fileStatusText === "Nenhum arquivo selecionado" || fileStatusText === "") {
			                    FLUIGC.toast({
			                        message: `Anexo obrigatório não preenchido: ${anexo.label}`,
			                        type: "warning"
			                    });
			                    valida = false;
			                } else {
			                    console.log(`Anexo ${anexo.label} preenchido com sucesso.`);
			                }
			            }
			        });

		if ($("#previsaoEntrega").length && $("#demanda").val() == "Locação Anual") {
			var enteredDate = moment($("#previsaoEntrega").val(), 'DD/MM/YYYY', true);
			var dataOcorrencia = $("#dataOcorrencia").val();
			if (!enteredDate.isValid()) {
				$("#previsaoEntrega").addClass("has-error");
				FLUIGC.toast({
					message: "Data inválida!",
					type: "warning"
				});
				valida = false;
			} else {
				var currentDate = moment(dataOcorrencia, 'DD/MM/YYYY', true);
				var minDate = currentDate.add(15, 'days').startOf('day');			
				if (enteredDate.isBefore(minDate)) {
					$("#previsaoEntrega").addClass("has-error");
					FLUIGC.toast({
						message: `A Data de Retirada pode ser agendada a partir de 15 dias após a data atual (${dataOcorrencia}).`,
						type: "warning"
					});
					valida = false;
				} else {
					$("#previsaoEntrega").removeClass("has-error");
				}
			}
		}	     

		if (!valida) {
			FLUIGC.toast({
				message: "Preencha todos os campos obrigatórios!",
				type: "warning"
			});
		} else {
			saveFormData();
		}
	}
	return valida;

}

////////////APROVADORES
function atribuicaoEngCoord() {
	var coord = null;
	var eng = null;
	var adm = null;
	var valorTotal;
	var obra;
	var coligada;
	var valorFinal = parseFloat($("#orcamentoFinal").val());
	var valorInicial = parseFloat($("#orcamentoInicial").val());	
	if($("#demanda").val() !== "Transferência Obras"){
		obra = $("#hiddenObra").val();
		coligada = $("#hiddenCodColigada").val();
	}
	if ($("#suporte").val() == "Aprovações Custo Obra" || $("#demanda").val() == "Transferência Obras") {
		if ($("#suporte").val() == "Aprovações Custo Obra"){
			 if (!isNaN(valorFinal) && valorFinal > 0) {
				 console.log("FINAL")
			        valorTotal = valorFinal;
			    }  else {
				    console.log("INICIAL")
				        valorTotal = valorInicial;
				    } 
		}
		if($("#demanda").val() == "Transferência Obras"){
		//	valorTotal = 1000
			valorTotal = 1
			obra = $("#obraDestinoHidden").val();
			coligada = $("#coligadaDestino").val();
		}

		DatasetFactory.getDataset("verificaAprovadorFrota", null, [
			DatasetFactory.createConstraint("paramCodcoligada", coligada, coligada, ConstraintType.MUST),
			DatasetFactory.createConstraint("paramLocal", obra, obra, ConstraintType.MUST),
			DatasetFactory.createConstraint("paramCodTmv", "1.1.98", "1.1.98", ConstraintType.MUST),
			DatasetFactory.createConstraint("paramValorTotal", 1, 1, ConstraintType.MUST)
			//DatasetFactory.createConstraint("paramValorTotal", 1000, 1000, ConstraintType.MUST)
		], null, {
			success: (UsuariosComPermissaoDeAprovacao) => {
				for (const Aprovador of UsuariosComPermissaoDeAprovacao.values) {
					if (Aprovador.limite == 1) {
					    //    if (Aprovador.limite == 1000) {
						console.log("entro no adm")
						adm = Aprovador.usuarioFLUIG;
						$("#administrador").val(adm);
						console.log("Administrador encontrado: " + adm + " com limite de " + Aprovador.limite);
						break;
					}
				}
			}
		});
	} else {
		//valorTotal = 1001; 
		valorTotal = 2; 
	}

	if ($("#hiddenCodColigada").val() == 1 && $("#hiddenObra").val() == 'Matriz Curitiba') {
		$("#engenheiro").val(1);
		$("#coordenador").val("padilha");
		return;
	}
	if ($("#hiddenCodColigada").val() == 5) {
		$("#engenheiro").val(1);
		$("#coordenador").val("marcelo.passerotti");
		return;
	}

	DatasetFactory.getDataset("verificaAprovadorFrota", null, [
		DatasetFactory.createConstraint("paramCodcoligada", coligada, coligada, ConstraintType.MUST),
		DatasetFactory.createConstraint("paramLocal", obra, obra, ConstraintType.MUST),
		DatasetFactory.createConstraint("paramCodTmv", "1.1.98", "1.1.98", ConstraintType.MUST),
		DatasetFactory.createConstraint("paramValorTotal", valorTotal, valorTotal, ConstraintType.MUST)
	], null, {
		success: (UsuariosComPermissaoDeAprovacao) => {
			for (const Aprovador of UsuariosComPermissaoDeAprovacao.values) {
				if (Aprovador.limite > 1 && Aprovador.limite <= 20000 && valorTotal <= Aprovador.limite) {
			//	        if (Aprovador.limite > 1000 && Aprovador.limite <= 20000 && valorTotal <= Aprovador.limite) {
					let engRole = DatasetFactory.getDataset("workflowColleagueRole", null, [
						DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", Aprovador.usuarioFLUIG, Aprovador.usuarioFLUIG, ConstraintType.MUST),
						DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", "user", "user", ConstraintType.MUST)
					], null);

					if (engRole.values.length > 0) {
						eng = Aprovador.usuarioFLUIG;
						console.log("Engenheiro encontrado: " + eng + " com limite de " + Aprovador.limite);
					}
				}
				else if (Aprovador.limite > 20000 && Aprovador.limite <= 250000 && valorTotal <= Aprovador.limite) {
					let coordRole = DatasetFactory.getDataset("workflowColleagueRole", null, [
						DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", Aprovador.usuarioFLUIG, Aprovador.usuarioFLUIG, ConstraintType.MUST),
						DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", "user", "user", ConstraintType.MUST)
					], null);

					if (coordRole.values.length > 0) {
						coord = Aprovador.usuarioFLUIG;
						console.log("Coordenador encontrado: " + coord + " com limite de " + Aprovador.limite);
					}
				}
			}
			console.log(valorTotal)
			console.log(coligada, obra)
			if (eng) {
				$("#engenheiro").val(eng);
				console.log(eng)
			}
			if (coord) {
				$("#coordenador").val(coord);
				console.log(coord)
			}
			if (adm) {
				$("#administrador").val(adm);
				console.log(adm)
			}
		}
	});
}

//// FUNÇÕES DE ANEXO
function uploadSelectedFile(inputId, fileDescription) {
	try {
		var tabAttachments = parent.document.getElementById("tab-attachments");
		if (tabAttachments) {
			var element = parent.document.getElementById("ecm-navigation-inputFile-clone");
			if (element && document.createEvent) {
				element.setAttribute("data-on-camera", "true");
				if (fileDescription && inputId) {
					element.setAttribute("data-file-name-camera", fileDescription);
					element.setAttribute("data-inputNameFile", inputId);
				}
				element.addEventListener('change', function (event) {
					var files = event.target.files;
					if (files.length > 0) {
						var fileName = files[0].name;
						var hiddenInput = document.getElementById("hiddenFileName");
						var newHidden = hiddenInput.value = fileName;
						var inputFile = document.getElementById(inputId);
						var button = inputFile.nextElementSibling;
						var fileStatus = button.nextElementSibling;
						fileStatus.textContent = 'Arquivo selecionado: ' + fileName;
						 if (["inputFileFotosSinistro", "inputFileBO", "inputFileCRLV"].includes(inputId)) {
				                            CriacaoDocumentosFluig(inputId, files);
				                        }
					} else {
						console.log("Nenhum arquivo selecionado");
					}
				});
				element.click();
			}
		}
	} catch (e) {
		console.error("Houve um erro inesperado na função uploadSelectedFile");
		console.error(e);
	}
}

function CriacaoDocumentosFluig(inputId, files) {
	var processo = WKNumProces;
	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		var fileName = file.name;
		var arquivoJaExiste = false;
		if (!arquivoJaExiste) {
			var reader = new FileReader();
			reader.onload = function (e) {
				var bytes = e.target.result.split("base64,")[1];
				var folderId;
				if (inputId === 'inputFileBO') {
					folderId = 1329903;
					//folderId = 4544;
				} else if (inputId === 'inputFileFotosSinistro') {
					folderId = 1329898;
					//folderId = 4545;
				} else if (inputId === 'inputFileCRLV') {
					folderId = 1329914;
				//	folderId = 4567;
				}  else {
					console.error("Pasta não determinada para o inputId: " + inputId);
					return;
				}

				DatasetFactory.getDataset("CriacaoDocumentosFluig", null, [
					DatasetFactory.createConstraint("processo", "SuporteFrota", "SuporteFrota", ConstraintType.MUST),
					DatasetFactory.createConstraint("conteudo", bytes, bytes, ConstraintType.MUST),
					DatasetFactory.createConstraint("nome", fileName, fileName, ConstraintType.SHOULD),
					DatasetFactory.createConstraint("descricao", fileName, fileName, ConstraintType.SHOULD),
					DatasetFactory.createConstraint("pasta", folderId, folderId, ConstraintType.SHOULD)
				], null, {
					success: function (dataset) {
						console.log("Documento criado com sucesso:", fileName);
					},
					error: function (error) {
						console.error("Erro ao criar documento no Fluig: ", error);
					}
				});
			};
			reader.readAsDataURL(new Blob([file]));
		} else {
			console.log("Arquivo duplicado. Não será adicionado novamente:", fileName);
		}
	}
}

