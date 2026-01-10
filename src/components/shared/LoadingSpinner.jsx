import { HashLoader } from 'react-spinners'

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <HashLoader  size={80} color='hsl(var(--p))' />
    </div>
  )
}

export default LoadingSpinner
