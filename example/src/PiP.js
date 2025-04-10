export const PiP = () => {
  return (
    <PictureInPicture
      width={400}
      height={300}
      onPiPEnter={() => console.log('Entered PiP mode')}
      onPiPExit={() => console.log('Exited PiP mode')}
      className="my-pip-container"
    >
      <div className="content">
        <h2>My PiP Content</h2>
        <p>This content can be viewed in Picture-in-Picture mode!</p>
      </div>
    </PictureInPicture>
  );
};