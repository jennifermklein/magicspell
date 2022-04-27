import React from "react";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";

export const LetterList = ({ listId, listType, letters }) => {
  return (
    <Droppable
      droppableId={listId}
      type={listType}
      direction="horizontal"
      isCombineEnabled={false}
    >
      {(dropProvided) => (
        <div {...dropProvided.droppableProps}>
          <div>
            <div className="list-container">
              <div className="letter-list" ref={dropProvided.innerRef}>
                {letters.map((letter, index) => (
                  <Draggable key={letter} draggableId={letter} index={index}>
                    {(dragProvided) => (
                      <div
                        {...dragProvided.dragHandleProps}
                        {...dragProvided.draggableProps}
                        ref={dragProvided.innerRef}
                      >
                        <div>{letter}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {dropProvided.placeholder}
              </div>
            </div>
          </div>
        </div>
      )}
    </Droppable>
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
