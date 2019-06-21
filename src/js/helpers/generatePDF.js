import * as jsPDF from 'jspdf';

import store from "../store/index";

const margins = {
  top: 70,
  bottom: 40,
  left: 30,
  width: 550
};

const generatePDF = (props) => {
  const doc = new jsPDF('p', 'pt', 'a4');
  doc.setFontSize(18);

  doc.text('hello world', 10, 10);

  const iframe = document.createElement('iframe');
  iframe.setAttribute('class', 'visualizer_pdf');
  document.getElementById('visualizer_container').innerHTML = "";
  document.getElementById('visualizer_container').append(iframe);
  iframe.src = doc.output('datauristring');

}

export default generatePDF;
