/* O código abaixo adiciona um evento de submit ao formulário presente no site, quando
o usuário digita algo no input e aperta enter ou clica no botão buscar, todo o código abaixo é executado */

document.querySelector('.search').addEventListener('submit', async (event) => {
  event.preventDefault();
  let input = document.querySelector('.searchInput').value;

  /* Se o value do input for diferente de vazio, o progama mostra um aviso de "carregando"
    na tela enquanto é feito o fetch na API */
  if (input !== '') {
    showWarning('Carregando...');
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input,
    )}&appid=93424960a0074e04a75937639da482c8&units=metric&lang=pt_br`;
    let results = await fetch(url);
    let json = await results.json();
    // Se o atributo .cod do json retornado for igual a 200 significa que foi digitada uma localização válida
    if (json.cod === 200) {
      showResults({
        name: json.name,
        country: json.sys.country,
        temperature: json.main.temp,
        wind: json.wind.speed,
        tempDescription: json.weather[0].description,
        tempIcon: json.weather[0].icon,
      });
      // Se o atributo for diferente de 200 significa que foi digitada uma localização inválida
    } else {
      document.querySelector('.infos-container').style.display = 'none';
      showWarning('Localizaçao não encontrada.');
    }
    // Esse else se refere ao primeiro if do código, caso o input esteja vazio o código abaixo é executado
  } else {
    document.querySelector('.infos-container').style.display = 'none';
    showWarning('Informe uma localização.');
  }

  // Essa função é responsável por preencher na tela os avisos de cada if/else acima
  function showWarning(warning) {
    document.querySelector('.warning').innerHTML = warning;
  }

  // Já a função abaixo preenche na tela cada informação retornada pelo fetch feito na API
  function showResults(json) {
    showWarning('');
    document.querySelector(
      '.cityAndCountry',
    ).innerHTML = `${json.name}, ${json.country}`;
    document.querySelector(
      '.temperature .number',
    ).innerHTML = `${json.temperature} °C`;
    document.querySelector('.wind .number').innerHTML = `${json.wind} km/h`;
    document.querySelector('.description').innerHTML = json.tempDescription;
    document
      .querySelector('.img img')
      .setAttribute(
        'src',
        `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`,
      );
    document.querySelector('.img img').addEventListener('load', () => {
      document.querySelector('.infos-container').style.display = 'flex';
    });
  }
});
