 var unidadesMonitoradas = [];
        $(document).ready(function () {

            $('.disp-col a').click(function (e) {


                var idUnidade = null;
                var $link = $(this);
                var modulo = $(this).parents().filter('.disponibilidade-grupo').find('h3').text();
                var unidade = $('#bloco38 > div > div:nth-child(1) > a').find("span").text()

                var hrefDetalheImovel = $link.attr("href");

                try {

                    idUnidade = hrefDetalheImovel.split("/").reverse()[0];

                } catch (error) {
                    var index = hrefDetalheImovel.lastIndexOf("/");
                    idUnidade = hrefDetalheImovel.substring(index + 1);
                }


                var eParaMonitorar = confirm("Deseja monitorar a unidade : " + unidade + " " + modulo + " ?");

                if (eParaMonitorar) {

                    var jaEstaMonitorando = unidadesMonitoradas.filter(function (unidade) {
                        return unidade.unidade == idUnidade;
                    }).length > 0;

                    if (jaEstaMonitorando) {

                        console.log('ja esta monitorando')

                    } else {
                        unidadesMonitoradas.push({
                            unidade: unidade,
                            idUnidade: idUnidade,
                            url: hrefDetalheImovel,
                            modulo: modulo
                        });
                    }




                }



                console.log($link.attr("href"));
                console.log(modulo)

            });
        });


        var timerMonitor = window.setInterval(function () {

            if (unidadesMonitoradas && unidadesMonitoradas.length > 0) {

                unidadesMonitoradas.forEach(function (unidade) {
                    var url = unidade.url;

                    var request = window.setTimeout(function () {

                        $.get(url, function (response) {
                            console.log(response);

                            debugger;
                            var botaoReserva = $(response).find(".btn");
                            if (botaoReserva && botaoReserva.length > 0 && botaoReserva.text().toLowerCase() == "Iniciar uma nova reserva.".toLowerCase()) {

                                alert('Avisar sobre imovel disponivel')
                            }

                            window.clearTimeout(request);

                        })

                    }, 500);

                })
            }

        }, 5000)
