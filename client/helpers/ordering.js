// function to reorder result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default (letters, source, destination) => {
  console.log("letters", letters, "source", source, "dest", destination);
  const current = [...letters[source.droppableId]];
  const next = [...letters[destination.droppableId]];
  const target = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);
    return { ...letters, [source.droppableId]: reordered };
  }

  // moving to different list
  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  return {
    ...letters,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };
};

// const copy = (source, destination, droppableSource, droppableDestination) => {
//   console.log("==> dest", destination);

//   const sourceClone = Array.from(source);
//   const destClone = Array.from(destination);
//   const item = sourceClone[droppableSource.index];

//   destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
//   return destClone;
// };

// const move = (source, destination, droppableSource, droppableDestination) => {
//   const sourceClone = Array.from(source);
//   const destClone = Array.from(destination);
//   const [removed] = sourceClone.splice(droppableSource.index, 1);

//   destClone.splice(droppableDestination.index, 0, removed);

//   const result = {};
//   result[droppableSource.droppableId] = sourceClone;
//   result[droppableDestination.droppableId] = destClone;

//   return result;
// };
