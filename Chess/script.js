const board = document.getElementById("board");
const row = document.querySelectorAll(".row");
const boxes = document.querySelectorAll(".box");
const audio = document.querySelectorAll(".audio");
let turn = "white";
let game = 1;
let from = [null, null, null];
let to = [null, null, null];
let selectedBox;
let flag = 0;
let castleBlackLeft = true;
let castleBlackRight = true;
let castleWhiteLeft = true;
let castleWhiteRight = true;
let faltu = 1;

const arr = [['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
['.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.'],
['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']];

const duplicateArr = [[2, 2, 2, 2, 2, 2, 2, 2],
[2, 2, 2, 2, 2, 2, 2, 2],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[2, 2, 2, 2, 2, 2, 2, 2],
[2, 2, 2, 2, 2, 2, 2, 2]];

function switchColour(colour1, colour2, currRow, j) {
    const box = currRow.children;
    for (let i = 0; i < 8; i++) {
        if (arr[j][i] == 'wk' || arr[j][i] == 'bk') {
            if (isCheck(j, i, arr[j][i])) {
                box[i].style.backgroundColor = "#c93430";
                box[i].style.opacity = "1";
            }
            else {
                if (i % 2 == 0) {
                    box[i].style.backgroundColor = colour1;
                    box[i].style.opacity = "1";
                }
                else {
                    box[i].style.backgroundColor = colour2;
                    box[i].style.opacity = "1";
                }
            }
        }
        else {
            if (i % 2 == 0) {
                box[i].style.backgroundColor = colour1;
                box[i].style.opacity = "1";
            }
            else {
                box[i].style.backgroundColor = colour2;
                box[i].style.opacity = "1";
            }
        }
    }
}

function colour() {
    for (let i = 0; i < 8; i++) {
        if (i % 2 == 0) {
            switchColour("#ebecd0", "#779556", row[i], i);
        }
        else {
            switchColour("#779556", "#ebecd0", row[i], i);
        }
    }
}

function colourAllValid() {
    for (let i = 0; i < 8; i++) {
        let temp = row[i];
        for (let j = i * 8; j < i * 8 + 8; j++) {
            if (duplicateArr[i][j - i * 8] == 1) {
                boxes[j].style.opacity = "0.5";
            }
        }
    }
}

function coordinate(currBox) {
    currRow = currBox.parentNode;
    for (let i = 0; i < 8; i++) {
        if (row[i] == currRow) {
            for (let j = i * 8; j < i * 8 + 8; j++) {
                if (boxes[j] == currBox) {
                    return [i, j - i * 8, currBox];
                }
            }
            break;
        }
    }
}

function swap(array, index11, index12, index21, index22) {
    let temp = array[index11][index12];
    array[index11][index12] = array[index21][index22];
    array[index21][index22] = temp;
}

function checkPiece(coordi) {
    return arr[coordi[0]][coordi[1]];
}

function repeatDuplicateArr() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (arr[i][j] != '.') {
                duplicateArr[i][j] = 2;
            }
            else {
                duplicateArr[i][j] = 0;
            }
        }
    }
}

function updateDuplicateArr(piece, coordi) {
    if (piece == 'wp') {
        whitePawn(coordi);
    }
    if (piece == 'bp') {
        blackPawn(coordi);
    }
    if (piece == 'wr' || piece == 'br') {
        rook(coordi, piece);
    }
    if (piece == 'wb' || piece == 'bb') {
        bishop(coordi, piece);
    }
    if (piece == 'wq' || piece == 'bq') {
        rook(coordi, piece);
        bishop(coordi, piece);
    }
    if (piece == 'wn' || piece == 'bn') {
        knight(coordi, piece);
    }
    if (piece == 'wk' || piece == 'bk') {
        king(coordi, piece);
    }
}

function whitePawn(coordi) {
    // console.log(coordi);
    if (coordi[0] == 6) {
        if (duplicateArr[coordi[0] - 1][coordi[1]] == 0) {
            duplicateArr[coordi[0] - 1][coordi[1]] = 1;
            if (duplicateArr[coordi[0] - 2][coordi[1]] == 0) {
                duplicateArr[coordi[0] - 2][coordi[1]] = 1;
            }
        }
    }
    else {
        if (duplicateArr[coordi[0] - 1][coordi[1]] == 0) {
            duplicateArr[coordi[0] - 1][coordi[1]] = 1;
        }
    }

    if (duplicateArr[coordi[0] - 1][coordi[1] + 1] == 2) {
        if (arr[coordi[0] - 1][coordi[1] + 1] == 'bp' ||
            arr[coordi[0] - 1][coordi[1] + 1] == 'br' ||
            arr[coordi[0] - 1][coordi[1] + 1] == 'bn' ||
            arr[coordi[0] - 1][coordi[1] + 1] == 'bb' ||
            arr[coordi[0] - 1][coordi[1] + 1] == 'bq' ||
            arr[coordi[0] - 1][coordi[1] + 1] == 'bk') {
            duplicateArr[coordi[0] - 1][coordi[1] + 1] = 1;
        }
    }

    if (duplicateArr[coordi[0] - 1][coordi[1] - 1] == 2) {
        if (arr[coordi[0] - 1][coordi[1] - 1] == 'bp' ||
            arr[coordi[0] - 1][coordi[1] - 1] == 'br' ||
            arr[coordi[0] - 1][coordi[1] - 1] == 'bn' ||
            arr[coordi[0] - 1][coordi[1] - 1] == 'bb' ||
            arr[coordi[0] - 1][coordi[1] - 1] == 'bq' ||
            arr[coordi[0] - 1][coordi[1] - 1] == 'bk') {
            duplicateArr[coordi[0] - 1][coordi[1] - 1] = 1;
        }
    }
}

function blackPawn(coordi) {
    // console.log(coordi);
    if (coordi[0] == 1) {
        if (duplicateArr[coordi[0] + 1][coordi[1]] == 0) {
            duplicateArr[coordi[0] + 1][coordi[1]] = 1;
            if (duplicateArr[coordi[0] + 2][coordi[1]] == 0) {
                duplicateArr[coordi[0] + 2][coordi[1]] = 1;
            }
        }
    }
    else {
        if (duplicateArr[coordi[0] + 1][coordi[1]] == 0) {
            duplicateArr[coordi[0] + 1][coordi[1]] = 1;
        }
    }

    if (duplicateArr[coordi[0] + 1][coordi[1] + 1] == 2) {
        if (arr[coordi[0] + 1][coordi[1] + 1] == 'wp' ||
            arr[coordi[0] + 1][coordi[1] + 1] == 'wr' ||
            arr[coordi[0] + 1][coordi[1] + 1] == 'wn' ||
            arr[coordi[0] + 1][coordi[1] + 1] == 'wb' ||
            arr[coordi[0] + 1][coordi[1] + 1] == 'wq' ||
            arr[coordi[0] + 1][coordi[1] + 1] == 'wk') {
            duplicateArr[coordi[0] + 1][coordi[1] + 1] = 1;
        }
    }

    if (duplicateArr[coordi[0] + 1][coordi[1] - 1] == 2) {
        if (arr[coordi[0] + 1][coordi[1] - 1] == 'wp' ||
            arr[coordi[0] + 1][coordi[1] - 1] == 'wr' ||
            arr[coordi[0] + 1][coordi[1] - 1] == 'wn' ||
            arr[coordi[0] + 1][coordi[1] - 1] == 'wb' ||
            arr[coordi[0] + 1][coordi[1] - 1] == 'wq' ||
            arr[coordi[0] + 1][coordi[1] - 1] == 'wk') {
            duplicateArr[coordi[0] + 1][coordi[1] - 1] = 1;
        }
    }
}

function rook(coordi, piece) {
    let opponents;
    let team;
    if (piece == 'wr' || piece == 'wq') {
        opponents = ['bp', 'br', 'bn', 'bb', 'bq', 'bk'];
        team = ['wp', 'wr', 'wn', 'wb', 'wq', 'wk'];
    }
    else {
        team = ['bp', 'br', 'bn', 'bb', 'bq', 'bk'];
        opponents = ['wp', 'wr', 'wn', 'wb', 'wq', 'wk'];
    }
    for (let i = coordi[0] + 1; i < 8; i++) {
        if (arr[i][coordi[1]] == '.') {
            duplicateArr[i][coordi[1]] = 1;
        }
        else if (arr[i][coordi[1]] == opponents[0] ||
            arr[i][coordi[1]] == opponents[1] ||
            arr[i][coordi[1]] == opponents[2] ||
            arr[i][coordi[1]] == opponents[3] ||
            arr[i][coordi[1]] == opponents[4] ||
            arr[i][coordi[1]] == opponents[5]) {
            duplicateArr[i][coordi[1]] = 1;
            break;
        }
        else {
            break;
        }
    }
    for (let i = coordi[0] - 1; i > -1; i--) {
        if (arr[i][coordi[1]] == '.') {
            duplicateArr[i][coordi[1]] = 1;
        }
        else if (arr[i][coordi[1]] == opponents[0] ||
            arr[i][coordi[1]] == opponents[1] ||
            arr[i][coordi[1]] == opponents[2] ||
            arr[i][coordi[1]] == opponents[3] ||
            arr[i][coordi[1]] == opponents[4] ||
            arr[i][coordi[1]] == opponents[5]) {
            duplicateArr[i][coordi[1]] = 1;
            break;
        }
        else {
            break;
        }
    }

    for (let i = coordi[1] - 1; i > -1; i--) {
        if (arr[coordi[0]][i] == '.') {
            duplicateArr[coordi[0]][i] = 1;
        }
        else if (arr[coordi[0]][i] == opponents[0] ||
            arr[coordi[0]][i] == opponents[1] ||
            arr[coordi[0]][i] == opponents[2] ||
            arr[coordi[0]][i] == opponents[3] ||
            arr[coordi[0]][i] == opponents[4] ||
            arr[coordi[0]][i] == opponents[5]) {
            duplicateArr[coordi[0]][i] = 1;
            break;
        }
        else {
            break;
        }
    }

    for (let i = coordi[1] + 1; i < 8; i++) {
        if (arr[coordi[0]][i] == '.') {
            duplicateArr[coordi[0]][i] = 1;
        }
        else if (arr[coordi[0]][i] == opponents[0] ||
            arr[coordi[0]][i] == opponents[1] ||
            arr[coordi[0]][i] == opponents[2] ||
            arr[coordi[0]][i] == opponents[3] ||
            arr[coordi[0]][i] == opponents[4] ||
            arr[coordi[0]][i] == opponents[5]) {
            duplicateArr[coordi[0]][i] = 1;
            break;
        }
        else {
            break;
        }
    }
}

function bishop(coordi, piece) {
    let opponents;
    let team;
    if (piece == 'wb' || piece == 'wq') {
        opponents = ['bp', 'br', 'bn', 'bb', 'bq', 'bk'];
        team = ['wp', 'wr', 'wn', 'wb', 'wq', 'wk'];
    }
    else {
        team = ['bp', 'br', 'bn', 'bb', 'bq', 'bk'];
        opponents = ['wp', 'wr', 'wn', 'wb', 'wq', 'wk'];
    }
    for (let i = 1; coordi[0] - i > -1 && coordi[1] - i > -1; i++) {
        if (arr[coordi[0] - i][coordi[1] - i] == '.') {
            duplicateArr[coordi[0] - i][coordi[1] - i] = 1;
        }
        else if (arr[coordi[0] - i][coordi[1] - i] == opponents[0] ||
            arr[coordi[0] - i][coordi[1] - i] == opponents[1] ||
            arr[coordi[0] - i][coordi[1] - i] == opponents[2] ||
            arr[coordi[0] - i][coordi[1] - i] == opponents[3] ||
            arr[coordi[0] - i][coordi[1] - i] == opponents[4] ||
            arr[coordi[0] - i][coordi[1] - i] == opponents[5]) {
            duplicateArr[coordi[0] - i][coordi[1] - i] = 1;
            break;
        }
        else {
            break;
        }
    }
    for (let i = 1; coordi[0] + i < 8 && coordi[1] + i < 8; i++) {
        if (arr[coordi[0] + i][coordi[1] + i] == '.') {
            duplicateArr[coordi[0] + i][coordi[1] + i] = 1;
        }
        else if (arr[coordi[0] + i][coordi[1] + i] == opponents[0] ||
            arr[coordi[0] + i][coordi[1] + i] == opponents[1] ||
            arr[coordi[0] + i][coordi[1] + i] == opponents[2] ||
            arr[coordi[0] + i][coordi[1] + i] == opponents[3] ||
            arr[coordi[0] + i][coordi[1] + i] == opponents[4] ||
            arr[coordi[0] + i][coordi[1] + i] == opponents[5]) {
            duplicateArr[coordi[0] + i][coordi[1] + i] = 1;
            break;
        }
        else {
            break;
        }
    }
    for (let i = 1; coordi[0] - i > -1 && coordi[1] + i < 8; i++) {
        if (arr[coordi[0] - i][coordi[1] + i] == '.') {
            duplicateArr[coordi[0] - i][coordi[1] + i] = 1;
        }
        else if (arr[coordi[0] - i][coordi[1] + i] == opponents[0] ||
            arr[coordi[0] - i][coordi[1] + i] == opponents[1] ||
            arr[coordi[0] - i][coordi[1] + i] == opponents[2] ||
            arr[coordi[0] - i][coordi[1] + i] == opponents[3] ||
            arr[coordi[0] - i][coordi[1] + i] == opponents[4] ||
            arr[coordi[0] - i][coordi[1] + i] == opponents[5]) {
            duplicateArr[coordi[0] - i][coordi[1] + i] = 1;
            break;
        }
        else {
            break;
        }
    }
    for (let i = 1; coordi[0] + i < 8 && coordi[1] - i > -1; i++) {
        if (arr[coordi[0] + i][coordi[1] - i] == '.') {
            duplicateArr[coordi[0] + i][coordi[1] - i] = 1;
        }
        else if (arr[coordi[0] + i][coordi[1] - i] == opponents[0] ||
            arr[coordi[0] + i][coordi[1] - i] == opponents[1] ||
            arr[coordi[0] + i][coordi[1] - i] == opponents[2] ||
            arr[coordi[0] + i][coordi[1] - i] == opponents[3] ||
            arr[coordi[0] + i][coordi[1] - i] == opponents[4] ||
            arr[coordi[0] + i][coordi[1] - i] == opponents[5]) {
            duplicateArr[coordi[0] + i][coordi[1] - i] = 1;
            break;
        }
        else {
            break;
        }
    }
}

function knight(coordi, piece) {
    let opponents;
    let team;
    // console.log(coordi);
    if (piece == 'wn') {
        opponents = ['bp', 'br', 'bn', 'bb', 'bq', 'bk'];
        team = ['wp', 'wr', 'wn', 'wb', 'wq', 'wk'];
    }
    else {
        team = ['bp', 'br', 'bn', 'bb', 'bq', 'bk'];
        opponents = ['wp', 'wr', 'wn', 'wb', 'wq', 'wk'];
    }

    if ((coordi[0] - 2 > -1) && (coordi[1] + 1 < 8) && (arr[coordi[0] - 2][coordi[1] + 1] == '.' ||
        arr[coordi[0] - 2][coordi[1] + 1] == opponents[0] ||
        arr[coordi[0] - 2][coordi[1] + 1] == opponents[1] ||
        arr[coordi[0] - 2][coordi[1] + 1] == opponents[2] ||
        arr[coordi[0] - 2][coordi[1] + 1] == opponents[3] ||
        arr[coordi[0] - 2][coordi[1] + 1] == opponents[4] ||
        arr[coordi[0] - 2][coordi[1] + 1] == opponents[5])) {
        duplicateArr[coordi[0] - 2][coordi[1] + 1] = 1;
    }
    if ((coordi[0] - 2 > -1) && (coordi[1] - 1 > -1) && (arr[coordi[0] - 2][coordi[1] - 1] == '.' ||
        arr[coordi[0] - 2][coordi[1] - 1] == opponents[0] ||
        arr[coordi[0] - 2][coordi[1] - 1] == opponents[1] ||
        arr[coordi[0] - 2][coordi[1] - 1] == opponents[2] ||
        arr[coordi[0] - 2][coordi[1] - 1] == opponents[3] ||
        arr[coordi[0] - 2][coordi[1] - 1] == opponents[4] ||
        arr[coordi[0] - 2][coordi[1] - 1] == opponents[5])) {
        duplicateArr[coordi[0] - 2][coordi[1] - 1] = 1;
    }
    if ((coordi[0] + 2 < 8) && (coordi[1] + 1 < 8) && (arr[coordi[0] + 2][coordi[1] + 1] == '.' ||
        arr[coordi[0] + 2][coordi[1] + 1] == opponents[0] ||
        arr[coordi[0] + 2][coordi[1] + 1] == opponents[1] ||
        arr[coordi[0] + 2][coordi[1] + 1] == opponents[2] ||
        arr[coordi[0] + 2][coordi[1] + 1] == opponents[3] ||
        arr[coordi[0] + 2][coordi[1] + 1] == opponents[4] ||
        arr[coordi[0] + 2][coordi[1] + 1] == opponents[5])) {
        duplicateArr[coordi[0] + 2][coordi[1] + 1] = 1;
    }
    if ((coordi[0] + 2 < 8) && (coordi[1] - 1 > -1) && (arr[coordi[0] + 2][coordi[1] - 1] == '.' ||
        arr[coordi[0] + 2][coordi[1] - 1] == opponents[0] ||
        arr[coordi[0] + 2][coordi[1] - 1] == opponents[1] ||
        arr[coordi[0] + 2][coordi[1] - 1] == opponents[2] ||
        arr[coordi[0] + 2][coordi[1] - 1] == opponents[3] ||
        arr[coordi[0] + 2][coordi[1] - 1] == opponents[4] ||
        arr[coordi[0] + 2][coordi[1] - 1] == opponents[5])) {
        duplicateArr[coordi[0] + 2][coordi[1] - 1] = 1;
    }
    if ((coordi[0] + 1 < 8) && (coordi[1] - 2 > -1) && (arr[coordi[0] + 1][coordi[1] - 2] == '.' ||
        arr[coordi[0] + 1][coordi[1] - 2] == opponents[0] ||
        arr[coordi[0] + 1][coordi[1] - 2] == opponents[1] ||
        arr[coordi[0] + 1][coordi[1] - 2] == opponents[2] ||
        arr[coordi[0] + 1][coordi[1] - 2] == opponents[3] ||
        arr[coordi[0] + 1][coordi[1] - 2] == opponents[4] ||
        arr[coordi[0] + 1][coordi[1] - 2] == opponents[5])) {
        duplicateArr[coordi[0] + 1][coordi[1] - 2] = 1;
    }
    if ((coordi[0] - 1 > -1) && (coordi[1] - 2 > -1) && (arr[coordi[0] - 1][coordi[1] - 2] == '.' ||
        arr[coordi[0] - 1][coordi[1] - 2] == opponents[0] ||
        arr[coordi[0] - 1][coordi[1] - 2] == opponents[1] ||
        arr[coordi[0] - 1][coordi[1] - 2] == opponents[2] ||
        arr[coordi[0] - 1][coordi[1] - 2] == opponents[3] ||
        arr[coordi[0] - 1][coordi[1] - 2] == opponents[4] ||
        arr[coordi[0] - 1][coordi[1] - 2] == opponents[5])) {
        duplicateArr[coordi[0] - 1][coordi[1] - 2] = 1;
    }
    if ((coordi[0] + 1 < 8) && (coordi[1] + 2 < 8) && (arr[coordi[0] + 1][coordi[1] + 2] == '.' ||
        arr[coordi[0] + 1][coordi[1] + 2] == opponents[0] ||
        arr[coordi[0] + 1][coordi[1] + 2] == opponents[1] ||
        arr[coordi[0] + 1][coordi[1] + 2] == opponents[2] ||
        arr[coordi[0] + 1][coordi[1] + 2] == opponents[3] ||
        arr[coordi[0] + 1][coordi[1] + 2] == opponents[4] ||
        arr[coordi[0] + 1][coordi[1] + 2] == opponents[5])) {
        duplicateArr[coordi[0] + 1][coordi[1] + 2] = 1;
    }
    if ((coordi[0] - 1 > -1) && (coordi[1] + 2 < 8) && (arr[coordi[0] - 1][coordi[1] + 2] == '.' ||
        arr[coordi[0] - 1][coordi[1] + 2] == opponents[0] ||
        arr[coordi[0] - 1][coordi[1] + 2] == opponents[1] ||
        arr[coordi[0] - 1][coordi[1] + 2] == opponents[2] ||
        arr[coordi[0] - 1][coordi[1] + 2] == opponents[3] ||
        arr[coordi[0] - 1][coordi[1] + 2] == opponents[4] ||
        arr[coordi[0] - 1][coordi[1] + 2] == opponents[5])) {
        duplicateArr[coordi[0] - 1][coordi[1] + 2] = 1;
    }
}

function king(coordi, piece) {
    let opponents;
    let team;
    // console.log(coordi);
    if (piece == 'wk') {
        opponents = ['bp', 'br', 'bn', 'bb', 'bq', 'bk'];
        team = ['wp', 'wr', 'wn', 'wb', 'wq', 'wk'];
        if (coordi[0] != 7 || coordi[1] != 4) {
            castleWhiteLeft = false;
            castleWhiteRight = false;
        }
    }
    else {
        team = ['bp', 'br', 'bn', 'bb', 'bq', 'bk'];
        opponents = ['wp', 'wr', 'wn', 'wb', 'wq', 'wk'];
        if (coordi[0] != 0 || coordi[1] != 4) {
            castleBlackLeft = false;
            castleBlackRight = false;
        }
    }

    if (piece == 'wk') {
        if (castleWhiteLeft) {
            if (arr[7][0] == 'wr' && arr[7][1] == '.' && arr[7][2] == '.' && arr[7][3] == '.') {
                duplicateArr[7][0] = 1;
            }
        }
        if (castleWhiteRight) {
            if (arr[7][7] == 'wr' && arr[7][5] == '.' && arr[7][6] == '.') {
                duplicateArr[7][7] = 1;
            }
        }
    }
    if (piece == 'bk') {
        if (castleBlackLeft) {
            if (arr[0][0] == 'br' && arr[0][1] == '.' && arr[0][2] == '.' && arr[0][3] == '.') {
                duplicateArr[0][0] = 1;
            }
        }
        if (castleBlackRight) {
            if (arr[0][7] == 'br' && arr[0][5] == '.' && arr[0][6] == '.') {
                duplicateArr[0][7] = 1;
            }
        }
    }


    if ((coordi[0] - 1 > -1) && (coordi[1] + 1 < 8) && (arr[coordi[0] - 1][coordi[1] + 1] == '.' ||
        arr[coordi[0] - 1][coordi[1] + 1] == opponents[0] ||
        arr[coordi[0] - 1][coordi[1] + 1] == opponents[1] ||
        arr[coordi[0] - 1][coordi[1] + 1] == opponents[2] ||
        arr[coordi[0] - 1][coordi[1] + 1] == opponents[3] ||
        arr[coordi[0] - 1][coordi[1] + 1] == opponents[4] ||
        arr[coordi[0] - 1][coordi[1] + 1] == opponents[5])) {
        duplicateArr[coordi[0] - 1][coordi[1] + 1] = 1;
    }
    if ((coordi[0] + 1 < 8) && (coordi[1] + 1 < 8) && (arr[coordi[0] + 1][coordi[1] + 1] == '.' ||
        arr[coordi[0] + 1][coordi[1] + 1] == opponents[0] ||
        arr[coordi[0] + 1][coordi[1] + 1] == opponents[1] ||
        arr[coordi[0] + 1][coordi[1] + 1] == opponents[2] ||
        arr[coordi[0] + 1][coordi[1] + 1] == opponents[3] ||
        arr[coordi[0] + 1][coordi[1] + 1] == opponents[4] ||
        arr[coordi[0] + 1][coordi[1] + 1] == opponents[5])) {
        duplicateArr[coordi[0] + 1][coordi[1] + 1] = 1;
    }
    if ((coordi[0] - 1 > -1) && (coordi[1] - 1 > -1) && (arr[coordi[0] - 1][coordi[1] - 1] == '.' ||
        arr[coordi[0] - 1][coordi[1] - 1] == opponents[0] ||
        arr[coordi[0] - 1][coordi[1] - 1] == opponents[1] ||
        arr[coordi[0] - 1][coordi[1] - 1] == opponents[2] ||
        arr[coordi[0] - 1][coordi[1] - 1] == opponents[3] ||
        arr[coordi[0] - 1][coordi[1] - 1] == opponents[4] ||
        arr[coordi[0] - 1][coordi[1] - 1] == opponents[5])) {
        duplicateArr[coordi[0] - 1][coordi[1] - 1] = 1;
    }
    if ((coordi[0] + 1 < 8) && (coordi[1] - 1 > -1) && (arr[coordi[0] + 1][coordi[1] - 1] == '.' ||
        arr[coordi[0] + 1][coordi[1] - 1] == opponents[0] ||
        arr[coordi[0] + 1][coordi[1] - 1] == opponents[1] ||
        arr[coordi[0] + 1][coordi[1] - 1] == opponents[2] ||
        arr[coordi[0] + 1][coordi[1] - 1] == opponents[3] ||
        arr[coordi[0] + 1][coordi[1] - 1] == opponents[4] ||
        arr[coordi[0] + 1][coordi[1] - 1] == opponents[5])) {
        duplicateArr[coordi[0] + 1][coordi[1] - 1] = 1;
    }
    if ((coordi[0] - 1 > -1) && (coordi[1] < 8) && (arr[coordi[0] - 1][coordi[1]] == '.' ||
        arr[coordi[0] - 1][coordi[1]] == opponents[0] ||
        arr[coordi[0] - 1][coordi[1]] == opponents[1] ||
        arr[coordi[0] - 1][coordi[1]] == opponents[2] ||
        arr[coordi[0] - 1][coordi[1]] == opponents[3] ||
        arr[coordi[0] - 1][coordi[1]] == opponents[4] ||
        arr[coordi[0] - 1][coordi[1]] == opponents[5])) {
        duplicateArr[coordi[0] - 1][coordi[1]] = 1;
    }
    if ((coordi[0] + 1 < 8) && (coordi[1] < 8) && (arr[coordi[0] + 1][coordi[1]] == '.' ||
        arr[coordi[0] + 1][coordi[1]] == opponents[0] ||
        arr[coordi[0] + 1][coordi[1]] == opponents[1] ||
        arr[coordi[0] + 1][coordi[1]] == opponents[2] ||
        arr[coordi[0] + 1][coordi[1]] == opponents[3] ||
        arr[coordi[0] + 1][coordi[1]] == opponents[4] ||
        arr[coordi[0] + 1][coordi[1]] == opponents[5])) {
        duplicateArr[coordi[0] + 1][coordi[1]] = 1;
    }
    if ((coordi[0] > -1) && (coordi[1] - 1 > -1) && (arr[coordi[0]][coordi[1] - 1] == '.' ||
        arr[coordi[0]][coordi[1] - 1] == opponents[0] ||
        arr[coordi[0]][coordi[1] - 1] == opponents[1] ||
        arr[coordi[0]][coordi[1] - 1] == opponents[2] ||
        arr[coordi[0]][coordi[1] - 1] == opponents[3] ||
        arr[coordi[0]][coordi[1] - 1] == opponents[4] ||
        arr[coordi[0]][coordi[1] - 1] == opponents[5])) {
        duplicateArr[coordi[0]][coordi[1] - 1] = 1;
    }
    if ((coordi[0] < 8) && (coordi[1] + 1 > -1) && (arr[coordi[0]][coordi[1] + 1] == '.' ||
        arr[coordi[0]][coordi[1] + 1] == opponents[0] ||
        arr[coordi[0]][coordi[1] + 1] == opponents[1] ||
        arr[coordi[0]][coordi[1] + 1] == opponents[2] ||
        arr[coordi[0]][coordi[1] + 1] == opponents[3] ||
        arr[coordi[0]][coordi[1] + 1] == opponents[4] ||
        arr[coordi[0]][coordi[1] + 1] == opponents[5])) {
        duplicateArr[coordi[0]][coordi[1] + 1] = 1;
    }
}

function checkCastle(from, to) {
    if (from[0] == 0 && from[1] == 0) {
        castleBlackLeft = false;
    }
    else if (from[0] == 7 && from[1] == 0) {
        castleBlackRight = false;
    }
    else if (from[0] == 0 && from[1] == 7) {
        castleWhiteLeft = false;
    }
    else if (from[0] == 7 && from[1] == 7) {
        castleWhiteRight = false;
    }
    else { }
}

function moveCastle() {
    checkCastle(from, to);
    if (arr[from[0]][from[1]] == 'wk' && from[0] == 7 && from[1] == 4) {
        if (arr[to[0]][to[1]] == 'wr' && to[0] == 7 && to[1] == 0) {
            if (isCheck(7, 4, 'wk') || isCheck(7, 3, 'wk') || isCheck(7, 2, 'wk') || isCheck(7, 1, 'wk')) {
                faltu = 0;
            }
            else {
                boxes[57].appendChild(from[2].firstChild);
                boxes[58].appendChild(to[2].firstChild);
                swap(arr, from[0], from[1], 7, 1);
                swap(arr, 7, 2, to[0], to[1]);
                castleWhiteLeft = false;
                castleWhiteRight = false;
                faltu = 0;
                audio[2].play();
                if (turn == "white") {
                    turn = "black";
                }
                else {
                    turn = "white";
                }
            }
        }
        else if (arr[to[0]][to[1]] == 'wr' && to[0] == 7 && to[1] == 7) {
            if (isCheck(7, 4, 'wk') || isCheck(7, 5, 'wk') || isCheck(7, 6, 'wk')) {
                faltu = 0;
            }
            else {
                boxes[62].appendChild(from[2].firstChild);
                boxes[61].appendChild(to[2].firstChild);
                swap(arr, from[0], from[1], 7, 6);
                swap(arr, 7, 5, to[0], to[1]);
                castleWhiteLeft = false;
                castleWhiteRight = false;
                faltu = 0;
                audio[2].play();
                if (turn == "white") {
                    turn = "black";
                }
                else {
                    turn = "white";
                }
            }
        }
    }
    else if (arr[from[0]][from[1]] == 'bk' && from[0] == 0 && from[1] == 4) {
        if (arr[to[0]][to[1]] == 'br' && to[0] == 0 && to[1] == 0) {
            if (isCheck(0, 4, 'bk') || isCheck(0, 3, 'bk') || isCheck(0, 2, 'bk') || isCheck(0, 1, 'bk')) {
                faltu = 0;
            }
            else {
                boxes[1].appendChild(from[2].firstChild);
                boxes[2].appendChild(to[2].firstChild);
                swap(arr, from[0], from[1], 0, 1);
                swap(arr, 0, 2, to[0], to[1]);
                castleBlackLeft = false;
                castleBlackRight = false;
                faltu = 0;
                audio[2].play();
                if (turn == "white") {
                    turn = "black";
                }
                else {
                    turn = "white";
                }
            }
        }
        else if (arr[to[0]][to[1]] == 'br' && to[0] == 0 && to[1] == 7) {
            if (isCheck(0, 4, 'bk') || isCheck(0, 5, 'bk') || isCheck(0, 6, 'bk')) {
                faltu = 0;
            }
            else {
                boxes[6].appendChild(from[2].firstChild);
                boxes[5].appendChild(to[2].firstChild);
                swap(arr, from[0], from[1], 0, 6);
                swap(arr, 0, 5, to[0], to[1]);
                castleBlackLeft = false;
                castleBlackRight = false;
                faltu = 0;
                audio[2].play();
                if (turn == "white") {
                    turn = "black";
                }
                else {
                    turn = "white";
                }
            }
        }
    }
}

function isCheck(j, i, piece) {
    let team;
    let opponents;
    if (piece == 'wk') {
        team = ['wp', 'wr', 'wn', 'wb', 'wq', 'wk'];
        opponents = ['bp', 'br', 'bn', 'bb', 'bq', 'bk'];
        if (j - 1 > -1 && i - 1 > -1 && arr[j - 1][i - 1] == 'bp') {
            return true;
        }
        if (j - 1 > -1 && i + 1 < 8 && arr[j - 1][i + 1] == 'bp') {
            return true;
        }
    }
    else {
        opponents = ['wp', 'wr', 'wn', 'wb', 'wq', 'wk'];
        team = ['bp', 'br', 'bn', 'bb', 'bq', 'bk'];
        if (j + 1 < 8 && i - 1 > -1 && arr[j + 1][i - 1] == 'wp') {
            return true;
        }
        if (j + 1 < 8 && i + 1 < 8 && arr[j + 1][i + 1] == 'wp') {
            return true;
        }
    }

    //rook
    for (let k = i + 1; k < 8; k++) {
        if (arr[j][k] == opponents[1] || arr[j][k] == opponents[4]) {
            return true;
        }
        else if (arr[j][k] == '.') {

        }
        else {
            break;
        }
    }
    for (let k = i - 1; k > -1; k--) {
        if (arr[j][k] == opponents[1] || arr[j][k] == opponents[4]) {
            return true;
        }
        else if (arr[j][k] == '.') {

        }
        else {
            break;
        }
    }
    for (let k = j - 1; k > -1; k--) {
        if (arr[k][i] == opponents[1] || arr[k][i] == opponents[4]) {
            return true;
        }
        else if (arr[k][i] == '.') {

        }
        else {
            break;
        }
    }
    for (let k = j + 1; k < 8; k++) {
        if (arr[k][i] == opponents[1] || arr[k][i] == opponents[4]) {
            return true;
        }
        else if (arr[k][i] == '.') {

        }
        else {
            break;
        }
    }

    //bishop
    for (let k = 1; j + k < 8 && i + k < 8; k++) {
        if (arr[j + k][i + k] == opponents[3] || arr[j + k][i + k] == opponents[4]) {
            return true;
        }
        else if (arr[j + k][i + k] == '.') {

        }
        else {
            break;
        }
    }
    for (let k = 1; j - k > -1 && i + k < 8; k++) {
        if (arr[j - k][i + k] == opponents[3] || arr[j - k][i + k] == opponents[4]) {
            return true;
        }
        else if (arr[j - k][i + k] == '.') {

        }
        else {
            break;
        }
    }
    for (let k = 1; j + k < 8 && i - k > -1; k++) {
        if (arr[j + k][i - k] == opponents[3] || arr[j + k][i - k] == opponents[4]) {
            return true;
        }
        else if (arr[j + k][i - k] == '.') {

        }
        else {
            break;
        }
    }
    for (let k = 1; j - k > -1 && i - k > -1; k++) {
        if (arr[j - k][i - k] == opponents[3] || arr[j - k][i - k] == opponents[4]) {
            return true;
        }
        else if (arr[j - k][i - k] == '.') {

        }
        else {
            break;
        }
    }

    //king
    if ((i + 1 < 8 && arr[j][i + 1] == opponents[5]) || (i - 1 > -1 && arr[j][i - 1] == opponents[5]) || (j + 1 < 8 && arr[j + 1][i] == opponents[5]) || (j - 1 > -1 && arr[j - 1][i] == opponents[5]) || (j + 1 < 8 && i + 1 < 8 && arr[j + 1][i + 1] == opponents[5]) || (j - 1 > -1 && i + 1 < 8 && arr[j - 1][i + 1] == opponents[5]) || (j + 1 < 8 && i - 1 > -1 && arr[j + 1][i - 1] == opponents[5]) || (i - 1 > -1 && j - 1 > -1 && arr[j - 1][i - 1] == opponents[5])) {
        return true;
    }

    //knight
    if ((j + 2 < 8 && i + 1 < 8 && arr[j + 2][i + 1] == opponents[2]) || (j + 2 < 8 && i - 1 > -1 && arr[j + 2][i - 1] == opponents[2]) || (j - 2 > -1 && i + 1 > 8 && arr[j - 2][i + 1] == opponents[2]) || (j - 2 > -1 && i - 1 > -1 && arr[j - 2][i - 1] == opponents[2]) || (j + 1 < 8 && i + 2 < 8 && arr[j + 1][i + 2] == opponents[2]) || (j - 1 > -1 && i + 2 < 8 && arr[j - 1][i + 2] == opponents[2]) || (j + 1 < 8 && i - 2 > -1 && arr[j + 1][i - 2] == opponents[2]) || (j - 1 > -1 && i - 2 > -1 && arr[j - 1][i - 2] == opponents[2])) {
        return true;
    }

    return false;
}

function pawnPromotion(c) {

    let val = prompt("1 for Rook \n 2 for Knight \n 3 for Bishop \n 4 for Queen");
    if(c[0] == 1){
        if(val == 1){
            c[2].firstChild.src = "media/wr.png";
            arr[c[0]][c[1]] = 'wr';
        }
        else if(val == 2){
            c[2].firstChild.src = "media/wn.png";
            arr[c[0]][c[1]] = 'wn';
        }
        else if(val == 3){
            c[2].firstChild.src = "media/wb.png";
            arr[c[0]][c[1]] = 'wb';
        }
        else{
            c[2].firstChild.src = "media/wq.png";
            arr[c[0]][c[1]] = 'wq';
        }
    }
    else{
        if(val == 1){
            c[2].firstChild.src = "media/br.png";
            arr[c[0]][c[1]] = 'br';
        }
        else if(val == 2){
            c[2].firstChild.src = "media/bn.png";
            arr[c[0]][c[1]] = 'bn';
        }
        else if(val == 3){
            c[2].firstChild.src = "media/bb.png";
            arr[c[0]][c[1]] = 'bb';
        }
        else{
            c[2].firstChild.src = "media/bq.png";
            arr[c[0]][c[1]] = 'bq';
        }
    }

}

colour();
for (let i = 0; i < 64; i++) {
    boxes[i].addEventListener("click", (e) => {
        if (game) {
            if (flag == 0) {
                colour();
                if (e.target.parentNode.parentNode.parentNode == board) {
                    e.target.parentNode.style.backgroundColor = "#f4f680";
                    from = coordinate(e.target.parentNode);
                    let piece = checkPiece(from);
                    if (turn == "white" && (piece == 'wp' || piece == 'wr' || piece == 'wn' || piece == 'wb' || piece == 'wq' || piece == 'wk')) {
                        updateDuplicateArr(piece, from);
                        colourAllValid();
                        flag = 1;
                    }
                    else if (turn == "black" && (piece == 'bp' || piece == 'br' || piece == 'bn' || piece == 'bb' || piece == 'bq' || piece == 'bk')) {
                        updateDuplicateArr(piece, from);
                        colourAllValid();
                        flag = 1;
                    }
                    else {
                        form = null;
                        piece = null;
                    }
                }
                else {
                    e.target.style.backgroundColor = "#f4f680";
                }
            }
            else {
                if (e.target.parentNode.parentNode.parentNode == board) {
                    faltu = 1;
                    to = coordinate(e.target.parentNode);
                    if (duplicateArr[to[0]][to[1]] == 1) {
                        if (castleBlackLeft || castleBlackRight || castleWhiteLeft || castleWhiteRight) {
                            moveCastle();
                        }
                        if ((arr[from[0]][from[1]] == 'bp' && to[0] == 7) || arr[from[0]][from[1]] == 'wp' && to[0] == 0) {
                            pawnPromotion(from);
                        }
                        if (faltu) {
                            if (arr[to[0]][to[1]] == 'wk') {
                                alert("Black Wins");
                                game = 0;
                            }
                            if (arr[to[0]][to[1]] == 'bk') {
                                alert("White Wins");
                                game = 0;
                            }
                            to[2].removeChild(to[2].firstChild);
                            to[2].appendChild(from[2].firstChild);
                            arr[to[0]][to[1]] = '.';
                            swap(arr, from[0], from[1], to[0], to[1]);
                            audio[1].play();
                            if (turn == "white") {
                                turn = "black";
                            }
                            else {
                                turn = "white";
                            }
                        }
                    }
                    from = null;
                    colour();
                    repeatDuplicateArr();
                }
                else {
                    to = coordinate(e.target);
                    if (arr[to[0]][to[1]] == '.') {
                        if (duplicateArr[to[0]][to[1]] == 1) {
                            if (castleBlackLeft || castleBlackRight || castleWhiteLeft || castleWhiteRight) {
                                checkCastle(from, to);
                            }
                            if ((arr[from[0]][from[1]] == 'bp' && to[0] == 7) || arr[from[0]][from[1]] == 'wp' && to[0] == 0) {
                                pawnPromotion(from);
                            }
                            to[2].appendChild(from[2].firstChild);
                            swap(arr, from[0], from[1], to[0], to[1]);
                            audio[0].play();
                            if (turn == "white") {
                                turn = "black";
                            }
                            else {
                                turn = "white";
                            }
                        }
                    }
                    from = null;
                    colour();
                    repeatDuplicateArr();
                }
                flag = 0;
            }
        }
    });
}