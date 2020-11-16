import React, { useContext, useEffect, useState } from 'react';
import { getUnit } from '../../services/api';
import PieChart from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import CompanyContext from '../../contexts/CompanyContext';

function Statistics() {
  const { state } = useContext(CompanyContext);
  const { unitId } = state;

  const [unit, setUnit] = useState();
  const [options, setOptions] = useState({});

  useEffect(() => get(), []);

  useEffect(() => setOptions(generateOptions()), [unit]);

  async function get() {
    let response = await getUnit(unitId);

    setUnit(response);
  }

  function generateOptions() {
    let data = classifyActives();

    if (!unit) {
      return {};
    }

    return {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Nível da saúde dos ativos da unidade ' + unit.name,
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      series: [
        {
          data: [
            { name: 'Estável', y: data.estavel },
            { name: 'Em Alerta', y: data.alerta },
            { name: 'Crítico', y: data.critico },
          ],
        },
      ],
    };
  }

  function classifyActives() {
    let data = { estavel: 0, alerta: 0, critico: 0 };

    if (unit) {
      let { active } = unit;
      active.map((item) => {
        if (item.healthscore >= 80) {
          data = { ...data, estavel: data.estavel + 1 };
        } else if (item.healthscore > 60 && item.healthscore < 80) {
          data = { ...data, alerta: data.alerta + 1 };
        } else {
          data = { ...data, critico: data.critico + 1 };
        }
      });
    }

    return data;
  }

  return <PieChart highcharts={Highcharts} options={options} />;
}

export default Statistics;
