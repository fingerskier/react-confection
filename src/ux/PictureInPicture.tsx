import { useRef } from 'react'
import type { ReactNode } from 'react'
import { usePictureInPicture } from '@hook/usePictureInPicture'

type PictureInPictureProps = {
  children: ReactNode
  width?: number
  height?: number
  onPiPEnter?: () => void
  onPiPExit?: () => void
  className?: string
  controls?: boolean
}

export const PictureInPicture = ({
  children,
  width = 320,
  height = 240,
  onPiPEnter,
  onPiPExit,
  className = '',
  controls = true
}: PictureInPictureProps) => {
  const containerRef = useRef(null);
  const { isPiP, isSupported, togglePiP } = usePictureInPicture({ width, height });

  const handleToggle = async () => {
    if (!containerRef.current) return
    await togglePiP(containerRef.current)
    if (!isPiP && onPiPEnter) onPiPEnter()
    if (isPiP && onPiPExit) onPiPExit()
  };

  if (!isSupported) {
    return (
      <div className={className}>
        {children}
        {controls && (
          <button disabled>PiP Not Supported</button>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className}>
      {children}
      {controls && (
        <button onClick={handleToggle}>
          {isPiP ? 'Exit PiP Mode' : 'Enter PiP Mode'}
        </button>
      )}
    </div>
  );
};
