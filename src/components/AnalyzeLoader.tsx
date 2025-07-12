import { ColorRing } from 'react-loader-spinner'

function Loader() {
  return (
    <div className="flex justify-center items-center p-4">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#2563eb', '#1d4ed8', '#2563eb', '#1d4ed8', '#2563eb']}
      />
    </div>
  )
}

export default Loader