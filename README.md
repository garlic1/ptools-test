# Projeto Hachuras

Este projeto é uma aplicação web que permite desenhar e manipular retângulos em um canvas. 
O projeto também integra uma API para buscar imagens de fundo que são exibidas no canvas. 
O objetivo é possibilitar a interação visual por meio do desenho de formas geométricas em diferentes páginas de um documento, além de ampliar ou reduzir o zoom.

## Demo (GitHub Pages):
https://garlic1.github.io/ptools-test/

## Como Utilizar
   - Clique no botão "Ativar Modo de Desenho" para começar a desenhar retângulos no canvas.
   - Clique e arraste o mouse para desenhar um retângulo. O retângulo será salvo ao soltar o mouse.
   - Clique novamente sobre um retângulo existente para removê-lo.
   - Use os botões de navegação no rodapé da página para alternar entre as diferentes páginas do documento. Cada página pode ter seus próprios retângulos.
   - Utilize o scroll do mouse para ampliar ou reduzir o zoom do canvas.
   - As imagens de fundo são carregadas automaticamente ao navegar pelas páginas, sendo obtidas via uma API externa.

### Funcionalidades Principais:
- **Desenho de Retângulos**: O usuário pode ativar o modo de desenho e criar retângulos no canvas ao clicar e arrastar.
- **Zoom In/Zoom Out**: É possível aumentar ou diminuir o zoom do canvas.
- **Armazenamento Local**: Os retângulos desenhados são salvos no local storage para que persistam entre as sessões.
- **Paginação**: O usuário pode navegar por várias páginas de um documento, cada uma com seu conjunto de retângulos.
- **Integração com API**: Imagens de fundo para o canvas são carregadas por meio de uma chamada a uma API externa.

## Dependências

Nenhuma biblioteca ou framework externo é necessário para rodar o projeto. Todo o código é baseado em **JavaScript** puro (vanilla JS).

## Armazenamento de Dados

- Os retângulos desenhados são armazenados no **localStorage**, permitindo que os desenhos permaneçam mesmo após a página ser recarregada.
- O estado do canvas e as páginas são restaurados a partir do localStorage ao carregar a página.