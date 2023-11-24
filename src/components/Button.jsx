//Si coloco rfc crea el bloque comun de un componente
//En los archivos que son componentes viene implícito el parámetro props, por lo que si lo coloco o no da lo mismo. En el caso de que no lo quiera colocar, entre parentesis por ejemplo en este caso irian operador y fn; y en el momento en que los llamo despues en las {} tienen que ir sin el props de adelante.

export default function Button(props) {
  return (
    <button 
        type='button'
        className='h-10 w-10 flex items-center justify-center font-bold text-white text-2xl bg-lime-500 rounded-full hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-lime-500'
        onClick={props.fn}
    >{props.operador}</button>
  )
}
