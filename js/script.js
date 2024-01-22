import { retrieveDataFromRange } from "./algorithm/retrieveNecessaryData.js";

window.onload = () => {
  let rangeFrom = '01.04.2023';
  let rangeTo = '31.01.2024';
  const dropdownList = document.querySelector('.button');
  const range = retrieveDataFromRange('Months', rangeFrom, rangeTo);

  $('input[name="dates"]').daterangepicker({ 
    startDate: '01.04.2023',
    endDate: '31.01.2024',
    locale: { format: 'DD/MM/YYYY' } 
  });

  google.charts.load('current', {'packages': ['corechart']});
  google.charts.setOnLoadCallback(drawChart(range));

  function drawChart(range) {
    return function() {
      const chartDiv = document.getElementById('myChart');
      const chart = new google.visualization.LineChart(chartDiv);
      const data = new google.visualization.DataTable();
      const options = { 
        width: 1100, 
        height: 400, 
        backgroundColor: 'transparent' 
      };

      data.addColumn('string', 'date');
      data.addColumn('number', 'amount')
      data.addRows(range.map((item) => [item.date, item.amount]));

      chart.draw(data, options);
    }
  }

  function handleChangeDropdown() {
    const type = dropdownList.options[dropdownList.selectedIndex].value;
    const range = retrieveDataFromRange(type, rangeFrom, rangeTo);

    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(drawChart(range));
  }

  function handleSubmitDate () {
      rangeFrom = $('input[name="dates"]').data('daterangepicker').startDate._d.toLocaleDateString();
      rangeTo = $('input[name="dates"]').data('daterangepicker').endDate._d.toLocaleDateString();

      const type = dropdownList.options[dropdownList.selectedIndex].value;
      const range = retrieveDataFromRange(type, rangeFrom, rangeTo);

      google.charts.load('current', {'packages': ['corechart']});
      google.charts.setOnLoadCallback(drawChart(range));
  }

  dropdownList.addEventListener('change', handleChangeDropdown);

  if (document.querySelector('.applyBtn')) {
    document.querySelector('.applyBtn').addEventListener('click', handleSubmitDate)
  }
}
