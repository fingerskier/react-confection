import { useScreenOrientation } from 'react-confection'


export default function ScreenOrientation() {
  const { orientation } = useScreenOrientation()

  return (
    <div>
      <h2>Screen Orientation</h2>
      <pre>{JSON.stringify(orientation, null, 2)}</pre>
    </div>
  )
}
