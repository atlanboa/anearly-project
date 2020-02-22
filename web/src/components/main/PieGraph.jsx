import React from "react";
import { Pie } from "react-chartjs-2";
const PieGraph = props => {
  const data = props.data;
  return (
    <div>
      <p>{props.title}</p>
      <Pie 
        data={data}
        height={300}
        options={{
          maintainAspectRatio: true,
          legend:{
            display:true,
            position: 'bottom',
            labels: {
              boxWidth: 12
              }
            }
          }} />
    </div>
  );
};
export default PieGraph;

// height={null} width={null} options={{maintainAspectRatio: true, legend:{display:true, boxWidth: 100 }}}