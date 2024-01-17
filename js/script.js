import { defineGraphicSettings } from "./algorithm/retrieveNecessaryData.js";

window.onload = () => {
  const dropdownList = document.querySelector('.button');
  const dateFrom = document.querySelector('.dateFrom');
  const dateTo = document.querySelector('.dateTo');
  const ctx = document.getElementById('myChart');
  const monthsSettings = defineGraphicSettings('Months', '2023-04-01', '2023-12-31');
  let myChart = new Chart(ctx, monthsSettings);
  let rangeFrom = '';
  let rangeTo = '';

  function handleChangeDropdown() {
    const type = dropdownList.options[dropdownList.selectedIndex].value;
    const graphicsSettings = defineGraphicSettings(type, rangeFrom, rangeTo);

    myChart.destroy();
    myChart = new Chart(ctx, graphicsSettings);
  }

  function handleChangeDate(e) {
    if (e.target.classList[0] === 'dateFrom') {
      rangeFrom = e.target.value;
    }

    if (e.target.classList[0] === 'dateTo') {
      rangeTo = e.target.value;
    }

    if (rangeFrom !== '' && rangeTo !== '' ) {
      const type = dropdownList.options[dropdownList.selectedIndex].value;
      const graphicsSettings = defineGraphicSettings(type, rangeFrom, rangeTo);

      myChart.destroy();
      myChart = new Chart(ctx, graphicsSettings);
    }
  }

  dropdownList.addEventListener('change', handleChangeDropdown);
  dateFrom.addEventListener('change', handleChangeDate);
  dateTo.addEventListener('change', handleChangeDate);
}
