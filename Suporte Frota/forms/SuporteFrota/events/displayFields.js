
function displayFields(form, customHTML) {
    try {
        form.setValue("atividade", getValue('WKNumState'));
        form.setValue("formMode", form.getFormMode());
        form.setValue("userCode", getValue("WKUser"));
        if (getValue('WKNumState') == 0) {
            form.setValue("solicitante", getValue("WKUser"));
        }

        log.info("DisplayFields - WKNumState: " + getValue('WKNumState'));
        log.info("DisplayFields - UserCode: " + getValue("WKUser"));

        if (getValue('WKNumState') == 5) {
            form.setValue("atendimento", getValue("WKUser"));
        }

        if (form.getFormMode() == "VIEW") {
       	 var dataOcorrenciaEnviada = form.getValue("data_ocorrencia_hidden");
       	 if (dataOcorrenciaEnviada) {
       		    form.setValue("data_ocorrencia", dataOcorrenciaEnviada);
       	}
       }

    } catch (err) {
        console.log(err);
        log.error("Erro ao exibir campos: " + err);
    }
}