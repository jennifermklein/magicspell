import React from "react";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";

export const LetterPool = ({ listId, listType, alpha }) => {
  return (
    <div className="list-container">
      <div className="letter-list">
        {alpha.map((letter, index) => (
          <div key={letter}>{letter}</div>
          /* <Draggable key={letter} draggableId={letter} index={index}>
            {(dragProvided) => (
              <div
                {...dragProvided.dragHandleProps}
                {...dragProvided.draggableProps}
                ref={dragProvided.innerRef}
              >
                <div>{letter}</div>
              </div>
            )}
          </Draggable> */
        ))}
      </div>
    </div>
  );
};

// export class LetterList extends React.Component {
//   static defaultProps = { isCombineEnabled: false };

//   renderBoard = (dropProvided) => {
//     const { letters } = this.props;
//     return (
//       <div>
//         <div style={{ display: "flex" }} ref={dropProvided.innerRef}>
//           {letters.map((letter, index) => (
//             <Draggable key={letter} draggableId={letter} index={index}>
//               {(dragProvided) => (
//                 <div
//                   {...dragProvided.dragHandleProps}
//                   {...dragProvided.draggableProps}
//                   ref={dragProvided.innerRef}
//                 >
//                   <div>{letter}</div>
//                 </div>
//               )}
//             </Draggable>
//           ))}
//           {dropProvided.placeholder}
//         </div>
//       </div>
//     );
//   };

//   render() {
//     const { listId, listType, internalScroll, isCombineEnabled } = this.props;

//     return (
//       <Droppable
//         droppableId={listId}
//         type={listType}
//         direction="horizontal"
//         isCombineEnabled={isCombineEnabled}
//       >
//         {(dropProvided) => (
//           <div {...dropProvided.droppableProps}>
//             {internalScroll ? (
//               <div>{this.renderBoard(dropProvided)}</div>
//             ) : (
//               this.renderBoard(dropProvided)
//             )}
//           </div>
//         )}
//       </Droppable>
//     );
//   }
// }
