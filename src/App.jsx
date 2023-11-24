import { useState, useEffect } from 'react';
import Header from "./components/Header";
import Button from './components/Button';
import {formatearDinero, calcularTotalPagar} from './helpers';

//siempre tienen que ser en mayusculas las funciones en react
function App() {
  //useState => Siempre tiene dos valores, el state y la funcion que modifica ese state. A todos los use se los conoce como hooks, y siempre tienen que ir al principio. Los 10000 que coloco, representa el valor inicial. Para modificar el valor de cantidad, o sea del state, se tiene que llamar a su funcion en este caso setCantidad.
  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(0);
  const [pago, setPago] = useState(0);

  //useEffect => Tiene un arreglo de dependencias, en donde si yo cambio la variable que esté adentro se va a ejecutar useEffect todas las veces que esa variable cambie
  useEffect(() => {
    //calcular el total a pagar
    const resultadoTotalPagar = calcularTotalPagar(cantidad,meses);
    setTotal(resultadoTotalPagar);
  }, [cantidad, meses]);

  useEffect(() => {
    //calcular el pago mensual
    setPago(total / meses);
  }, [total, meses]);

  //Todo lo que no se modifique, o sea que queda fijo, no agregarlo a State.
  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  //En react cuando se crea una funcion para el evento, siempre nombrarla como handle+evento.
  function handleChange(e){
    setCantidad(e.target.value)
  }

  function handleClickDecremento(){
    const valor = cantidad - STEP;
    if(valor<MIN){
      alert('Cantidad no válidad');
      return;
    }
    setCantidad(valor)
  }

  function handleClickIncremento(){
    const valor = cantidad + STEP;
    if(valor>MAX){
      alert('Cantidad no válidad');
      return;
    }
    setCantidad(valor)
  }

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header/>
      <div className='flex justify-between my-6'> 
        {/* todo lo que yo pase, en este caso operador y fn, dentro del llamado de un componente vendrían siendo los props del componente */}
        <Button 
          operador='-'
          fn={handleClickDecremento}
        />
        <Button 
          operador='+'
          fn={handleClickIncremento}
        />
      </div>
      <input 
        type="range" 
        className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
        //los eventos de js se inician con "on" y tienen que ir en el HTML
        onChange={handleChange}
        min={MIN}
        max={MAX}
        step={STEP}
        value={cantidad}
      />
      <p className='text-center my-20 text-5xl font-extrabold text-indigo-600'>
        {formatearDinero(cantidad)}
      </p>
      <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
        Elige un <span className='text-indigo-600'>Plazo</span> a pagar
      </h2>
      <select 
        className='mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500'
        value={meses}
        onChange={e => setMeses(Number(e.target.value))}
      >
        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>
      </select>
      <div className='my-5 space-y-3 bg-gray-50 p-5'> 
        <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
          Resumen <span className='text-indigo-600'>de pagos</span>
        </h2>
        <p className='text-xl text-gray-500 text-center font-bold'>{meses} Meses</p>
        <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(total)} Total a pagar</p>
        <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(pago)} Mensuales</p>
      </div>
    </div>
  )
}

export default App
