const EventComponent: React.FC = () => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    console.log(event);
  };

  return (
    <>
      <input onChange={handleChange} />
      <div draggable onDragStart={handleDragStart}></div>
    </>
  );
};

export default EventComponent;
