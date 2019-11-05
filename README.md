# Crawler

## Processo de resolução
Primeiro inspeciona-se a página para saber como chegar até os elementos desejados, depois foi usada a lib "cheerio", que implementa um subconjunto do core de jQuery, para pegar os elementos.
Foi pego as threads "naquele momento", não precisou fazer uma busca em profundidade. Se o mesmo fosse preciso, era só pegar o link do botão "next" e fazer o mesmo procedimento.
Os subreddits foram pesquisados em paralelos.

## Como utilizar
O nome do bot do Telegram criado foi @CrawlerGustavoOliveira, basta pesquisar por ele no próprio Telegram e fazer o procedimento descrito em Entrada. Como ta na nuvem não precisa rodar local.

## Tratamento de erros e exceções
Também tratei os casos: se o corpo da mensagem foi muito grande, se a página não existe, se a página é privada e se a página foi movida (3xx).

## Testes unitários ou de integração
Foi feito, com 100% de cobertura:
![current coverage](https://i.ibb.co/tsptnCX/Screenshot-from-2019-09-24-07-36-17.png)

Além dos testes unitários, esses foram os casos cobertos pelo teste de integração:

![current integration test](https://i.ibb.co/86CnQ3b/Screenshot-from-2019-09-24-07-35-43.png)

## Docker
Foi usado, inclusive na nuvem.

## Entrada
- Lista com nomes de subreddits separados por ponto-e-vírgula (`;`). Ex: /NadaPraFazer cats;randomAopiuwetdsgf
