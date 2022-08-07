import { cellPosition } from "./interfaces"
import { isCellEmpty } from "./isCellEmpty";

export const getListOfEmptyCellsAroundCat = (
    unpackedBoardState: Array<Array<number>>, 
    catPosition: cellPosition, 
) => {
    let list:Array<cellPosition> = [];

    for(let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            try {
                const cellState = unpackedBoardState[catPosition.Y + y][catPosition.X + x];

                if (isCellEmpty(cellState)){
                    list.push({ X: catPosition.X + x, Y: catPosition.Y + y });
                }
            }
            catch(e) {
                continue;
            }  
        }
    }

    return list
}